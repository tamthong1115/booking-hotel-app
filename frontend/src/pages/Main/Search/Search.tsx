import { useSearchContext } from "../../../app/context/SearchContext.tsx";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import SearchResultsCard from "../../components/Search/SearchResultsCard.tsx";
import Pagination from "../../components/Pagination/Pagination.tsx";
import StarRatingFilter from "../../components/Search/StarRatingFilter.tsx";
import HotelTypesFilter from "../../components/Search/HotelTypesFilter.tsx";
import FacilitiesFilter from "../../components/Search/FacilitiesFilter.tsx";
import PriceFilter from "../../components/Search/PriceFilter.tsx";
import LoadingComponent from "../../components/Loading/Loading.tsx";
import { searchHotels } from "../../../ApiClient/api-hotels.ts";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption,
    };

    // scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const { data: hotelData, isLoading } = useQuery(["searchHotels", searchParams], () => {
        return searchHotels(searchParams);
    });

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;

        setSelectedStars((prevStars) => {
            return event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating);
        });
    };

    const handleHotelTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;

        setSelectedHotelTypes((prevHotelTypes) => {
            return event.target.checked
                ? [...prevHotelTypes, hotelType]
                : prevHotelTypes.filter((type) => type !== hotelType); //unchecked
        });
    };

    const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelFacility = event.target.value;

        setSelectedFacilities((prevFacilities) => {
            return event.target.checked
                ? [...prevFacilities, hotelFacility]
                : prevFacilities.filter((facility) => facility !== hotelFacility); //unchecked
        });
    };

    if (isLoading) {
        return LoadingComponent({ isLoading: true });
    }

    return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
            <div className="sticky top-10 h-fit rounded-lg border border-slate-300 p-5">
                <div className="space-y-6">
                    <h3 className="border-b border-slate-300 pb-5 text-lg font-semibold">Filter by:</h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />

                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypesChange} />

                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange} />

                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?: number) => setSelectedPrice(value)} />
                </div>
            </div>

            <div className="flex flex-col gap-5 rounded-lg bg-gray-100 p-8">
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>

                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="rounded-md border p-2"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night Asc</option>
                        <option value="pricePerNightDesc">Price Per Night Desc</option>
                    </select>
                </div>

                {hotelData?.data.map((hotel) => <SearchResultsCard hotel={hotel} />)}

                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
