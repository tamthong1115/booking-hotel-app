import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiStar } from "react-icons/bi";
import DeleteHotelButton from "../../../components/Button/DeleteHotelButton.tsx";
import LoadingComponent from "../../../components/Loading/Loading.tsx";
import { fetchMyHotels } from "../../../services/api/api-hotels.ts";
import { useToast } from "../../../app/context/ToastContext.tsx";

const MyHotels = () => {
    const { showToast } = useToast();
    const { data: hotelData, isLoading } = useQuery("fetchMyHotels", fetchMyHotels, {
        onError: (error: Error) => {
            showToast({
                message: error.message ? error.message : "Fetch hotels failed",
                type: "SUCCESS",
            });
        },
    });

    if (isLoading) {
        return LoadingComponent({ isLoading });
    }

    if (!hotelData) {
        return (
            <h1 className="text-3xl">
                No hotels found. <Link to="/add-hotel">Add a hotel</Link>
            </h1>
        );
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">Admin Hotels</h1>
                <Link
                    to="/add-hotel"
                    className="flex rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
                >
                    Add Hotel
                </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {hotelData.map((hotel) => (
                    <div className="flex flex-col justify-between gap-5 rounded-lg border border-slate-300 p-8">
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <img
                            src={hotel.imageUrls[0]}
                            alt={hotel.name}
                            className="h-72 w-full rounded-lg object-cover"
                        />
                        <div className="whitespace-pre-line">{hotel.description}</div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="flex items-center rounded-sm border border-slate-300 p-3">
                                <BsMap className="mr-1" />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className="flex items-center rounded-sm border border-slate-300 p-3">
                                <BsBuilding className="mr-1" />
                                {hotel.type}
                            </div>
                            <div className="flex items-center rounded-sm border border-slate-300 p-3">
                                <BiHotel className="mr-1" />
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>
                            <div className="flex items-center rounded-sm border border-slate-300 p-3">
                                <BiStar className="mr-1" />
                                {hotel.starRating} Star Rating
                            </div>
                        </div>

                        <div className="flex justify-end gap-4">
                            <span>
                                <Link
                                    to={`/edit-hotel/${hotel._id}`}
                                    className="flex rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
                                >
                                    View Details
                                </Link>
                            </span>

                            <span>
                                <DeleteHotelButton hotelId={hotel._id} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;
