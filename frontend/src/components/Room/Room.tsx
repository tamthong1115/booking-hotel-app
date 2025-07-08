import { RoomType } from "@shared/types/types.ts";
import { useQuery } from "react-query";
import LoadingComponent from "../Loading/Loading.tsx";
import RoomBooking from "./RoomBooking.tsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HotelType } from "@shared/types/types.ts";
import { getRooms } from "../../services/api/api-rooms.ts";

type Props = {
    hotel: HotelType;
};

const Room = ({ hotel }: Props) => {
    const { hotelId } = useParams();
    const [isRoomBookingOpen, setIsRoomBookingOpen] = useState(false);
    const [openRoomId, setOpenRoomId] = useState<string | null>();

    const { data: rooms, isLoading } = useQuery("getRooms", () => getRooms(hotelId as string), {
        enabled: !!hotelId,
    });

    if (isLoading) {
        return LoadingComponent({ isLoading: true });
    }

    if (!rooms) {
        return <div>No rooms available</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <h2 className="col-span-full text-2xl font-bold">Rooms</h2>
            {rooms.map((room: RoomType, index: number) => (
                <div key={index} className="flex justify-between rounded border bg-white p-4 shadow-sm">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold">{room.name}</h3>
                        <h3 className="mb-2 text-lg font-semibold">Type: {room.roomType}</h3>
                        <p className="text-gray-500">Description: {room.description}</p>
                    </div>

                    <div>
                        <h3 className="mb-2 text-lg font-semibold">Price: ${room.pricePerNight}</h3>
                        <button
                            onClick={() => {
                                setOpenRoomId(openRoomId === room._id ? null : room._id);
                                setIsRoomBookingOpen(!isRoomBookingOpen);
                            }}
                            className="rounded bg-blue-600 p-2 font-semibold text-white"
                        >
                            Book
                        </button>
                    </div>

                    {isRoomBookingOpen && openRoomId === room._id && (
                        <RoomBooking
                            hotel={hotel}
                            room={room}
                            isRoomBookingOpen
                            onClose={() => {
                                setOpenRoomId(null);
                                setIsRoomBookingOpen(!isRoomBookingOpen);
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Room;
