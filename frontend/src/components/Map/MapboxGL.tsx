import React from "react";
import react from "react-dom";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { HotelType } from "@shared/types/types.ts";

type MapboxGLProps = {
    hotel: HotelType;
    isMapOpen: boolean;
    onClose: () => void;
};

const OVERLAY_STYLES: React.CSSProperties = {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
};
const MAP_STYLE: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    borderRadius: "8px",
    zIndex: 1001,
};

const MapboxGL = ({ hotel, isMapOpen, onClose }: MapboxGLProps) => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_SECRET_TOKEN as string;
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const modalContentRef = useRef<HTMLDivElement | null>(null);

    const longitude = hotel.location.coordinates[0];
    const latitude = hotel.location.coordinates[1];
    const [lng, setLng] = useState(longitude);
    const [lat, setLat] = useState(latitude);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        if (map.current || !isMapOpen) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on("move", () => {
            if (!map.current) return;

            setLng(parseInt(map.current.getCenter().lng.toFixed(4)));
            setLat(parseInt(map.current.getCenter().lat.toFixed(4)));
            setZoom(parseInt(map.current.getZoom().toFixed(2)));
        });
        if (!map.current) return;

        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h1>${hotel.name}</h1>`))
            .addTo(map.current);
    }, [hotel, isMapOpen, lat, lng, zoom]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!isMapOpen) return null;

    return react.createPortal(
        <div>
            <div style={OVERLAY_STYLES} />
            <div ref={modalContentRef} style={MAP_STYLE} className="rounded-md">
                <div ref={mapContainer} className={"h-full w-full rounded-xl"} />
            </div>
        </div>,
        document.getElementById("portal") as HTMLElement,
    );
};

export default MapboxGL;
