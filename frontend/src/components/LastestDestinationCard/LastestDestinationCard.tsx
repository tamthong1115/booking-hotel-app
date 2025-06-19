import { Link } from "react-router-dom";
import styles from "./LastestDestinationCard.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { HotelTypeFrontend } from "../../../shared/types/types.ts";

const cx = classNames.bind(styles);

type Props = {
    hotel: HotelTypeFrontend;
};

const LatestDestinationCard = ({ hotel }: Props) => {
    return (
        <div>
            <Link to={`/detail/${hotel._id}`} className={"relative cursor-pointer overflow-hidden rounded-md"}>
                <div className={cx("place-item")}>
                    <img src={hotel.imageUrls[0]} className={cx("place-img")} alt={hotel.name} />
                    <div className={cx("place-info")}>
                        <div className={cx("place-name")}>
                            <h4 className={cx("name")}>{hotel.name}</h4>
                            <p className={cx("description")}>{hotel.description}</p>
                        </div>
                        <h4 className={cx("place-price")}>$ {hotel.rooms?.[0]?.pricePerNight ?? "69"}</h4>
                        <div className={cx("place-like")}>
                            <FontAwesomeIcon className={cx("icon")} icon={faHeart} />
                            <div className={cx("rating")}>
                                <div className={cx("point")}>8.7</div>
                                <p> 582 evaluate</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("sale-off")}>
                        <span className={cx("percent")}>47%</span>
                        <span className={cx("label")}>Discount</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default LatestDestinationCard;
