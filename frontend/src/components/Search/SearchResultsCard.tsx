import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HotelTypeFrontend, RoomType } from "../../../shared/types/types.ts";

type Props = {
    hotel: HotelTypeFrontend;
};

const minPrice = (rooms: RoomType[]) => {
    return Math.min(...rooms.map((room: RoomType) => room.pricePerNight));
};
const SearchResultCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-8 rounded-lg border border-slate-300 bg-white p-8 shadow-md xl:grid-cols-[2fr_3fr]">
            <Link to={`/detail/${hotel._id}`}>
                <div className="h-[300px] w-full">
                    <img
                        src={hotel.imageUrls[0]}
                        className="h-full w-full object-cover object-center"
                        alt={hotel.name}
                    />
                </div>
            </Link>

            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(() => (
                                <AiFillStar className="fill-yellow-400" />
                            ))}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    <Link to={`/detail/${hotel._id}`} className="cursor-pointer text-2xl font-bold">
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>

                <div className="grid grid-cols-2 items-end whitespace-nowrap">
                    <div className="flex items-center gap-1">
                        {hotel.facilities.slice(0, 2).map((facitily) => (
                            <span className="whitespace-nowrap rounded-lg bg-slate-200 p-2 text-sm font-bold">
                                {facitily}
                            </span>
                        ))}

                        <span className="text-sm">
                            {hotel.facilities.length > 2 && `+${hotel.facilities.length - 2} more`}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">${minPrice(hotel.rooms as RoomType[]) || 69} per night</span>
                        <Link
                            to={`/detail/${hotel._id}`}
                            className="max-w-fit rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
                        >
                            View more
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
