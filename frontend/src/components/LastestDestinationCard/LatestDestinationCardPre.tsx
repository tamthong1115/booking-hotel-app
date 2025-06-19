import { Link } from "react-router-dom";
import { HotelTypeFrontend } from "../../../shared/types/types.ts";

type Props = {
    hotel: HotelTypeFrontend;
};

const LatestDestinationCardPre = ({ hotel }: Props) => {
    return (
        <div className={"p-4 shadow-md"}>
            <Link to={`/detail/${hotel._id}`} className={"overflow relative cursor-pointer rounded-md"}>
                <div className={"h-[300px]"}>
                    <img
                        src={hotel.imageUrls[0]}
                        className={"h-full w-full object-cover object-center"}
                        alt={hotel.name}
                    />
                </div>

                <div className="bottom-0 w-full rounded-b-md bg-black bg-opacity-50 p-4">
                    <span className={"text-3xl font-bold tracking-tight text-white"}>{hotel.name}</span>
                </div>
            </Link>
        </div>
    );
};

export default LatestDestinationCardPre;
