import { AiFillStar } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import LoadingComponent from "../../../components/Loading/Loading.tsx";
import MapboxGL from "../../../components/Map/MapboxGL.tsx";
import ReviewForm from "../../../forms/ReviewForm/ReviewForm.tsx";
import Reviews from "../../../components/Review/Reviews.tsx";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../app/context/AppContext.tsx";
import Room from "../../../components/Room/Room.tsx";
import { fetchCurrentUser } from "../../../services/api/api-users.ts";
import { fetchHotelById } from "../../../services/api/api-hotels.ts";
import DeleteHotelButton from "../../../components/Button/DeleteHotelButton.tsx";

const Detail = () => {
    const { roles } = useAppContext();
    const { hotelId } = useParams();
    const [isMapOpen, setIsMapOpen] = useState(false);
    const queryClient = useQueryClient();

    const {
        data: hotel,
        isSuccess,
        isLoading,
    } = useQuery("fetchMyHotelById", () => fetchHotelById(hotelId as string), {
        enabled: !!hotelId, // This is to prevent the query from running when the hotelId is not available
    });

    const { data: currentUser } = useQuery("fetchCurrentUser", fetchCurrentUser);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) {
        return LoadingComponent({ isLoading: true });
    }
    if (isSuccess) {
        queryClient.invalidateQueries("getRooms");
    }
    if (!hotel) {
        return LoadingComponent({ isLoading: true });
    }

    return (
        <div className="space-y-6">
            <div className={"flex justify-between"}>
                <div>
                    <span className="flex">
                        {Array.from({ length: hotel?.starRating }).map(() => (
                            <AiFillStar className="fill-yellow-400" />
                        ))}
                    </span>
                    <h1 className="text-3xl font-bold">{hotel.name}</h1>
                    <p className="text-lg font-semibold text-slate-600">{hotel.city + " " + hotel.country}</p>
                </div>

                {roles.includes("admin") && (
                    <div className={"flex items-center"}>
                        <span>
                            <Link
                                to={`/detail/${hotel._id}/add-room`}
                                className="flex rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
                            >
                                Add Rooms
                            </Link>
                        </span>

                        <span className="ml-4">
                            <Link
                                to={`/edit-hotel/${hotel._id}`}
                                className="flex rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
                            >
                                View Details
                            </Link>
                        </span>

                        <span className="ml-4">
                            <DeleteHotelButton hotelId={hotel._id} />
                        </span>
                    </div>
                )}
            </div>
            <div className="flex justify-between gap-6">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {hotel.imageUrls.map((url: string, index: number) => (
                        <div key={index} className="h-[300px]">
                            <img
                                src={url}
                                alt={hotel.name}
                                className="h-full w-full rounded-md object-cover object-center"
                            />
                        </div>
                    ))}
                </div>

                <div className={"flex items-end"}>
                    <div
                        className={"relative flex h-[200px] w-[250px] items-center justify-center rounded-md"}
                        style={{
                            backgroundImage: `url("/MapImage/img.png")`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <button
                            onClick={() => setIsMapOpen(!isMapOpen)}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 transform rounded-md border border-slate-300 bg-blue-600 p-2 text-white"
                            style={{ width: "120px", height: "40px" }}
                        >
                            Show on map
                        </button>
                    </div>
                </div>

                {isMapOpen && <MapboxGL hotel={hotel} isMapOpen={isMapOpen} onClose={() => setIsMapOpen(!isMapOpen)} />}
            </div>

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
                {hotel.facilities.map((facility: string) => (
                    <div className="rounded-sm border border-slate-300 p-3">{facility}</div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line">{hotel.description}</div>
            </div>

            <div>
                <Room hotel={hotel} />
            </div>

            <div>
                <ReviewForm hotelId={hotelId ?? ""} currentUser={currentUser} />
                <Reviews hotelId={hotelId ?? ""} userId={currentUser?._id} />
            </div>
        </div>
    );
};

export default Detail;
