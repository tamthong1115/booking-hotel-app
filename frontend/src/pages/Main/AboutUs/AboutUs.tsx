import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEye, faGem } from "@fortawesome/free-regular-svg-icons";
import { faGift, faStar } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const AboutUs = () => {
    return (
        <div className={cx("introduce-hotel")}>
            <div className={cx("inner")}>
                <div className={cx("inner-img")}>
                    <img src="https://tnhotel.id.vn/wp-content/uploads/2024/04/1-768x1365.png" alt="Experience" />
                </div>
                <div className={cx("inner-img")}>
                    <img src="https://tnhotel.id.vn/wp-content/uploads/2024/04/2-768x1365.png" alt="Experience" />
                </div>
                <div>
                    <div>
                        <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                        <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                        <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                        <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                        <FontAwesomeIcon className={cx("inner-icon")} icon={faStar} />
                    </div>
                    <div>
                        <h1 className={cx("inner-title")}>Experience the experience that matters</h1>
                    </div>
                    <div>
                        <h1 className={cx("inner-heading")}>BookingTS</h1>
                    </div>
                    <div>
                        <p className={cx("inner-text")}>
                            Welcome to BookingTS leading hotel booking in Vietnam! We are proud to be a trusted
                            destination for everyone when choosing where to stay in your destinations. With a series of
                            quality hotels and classy services, we are committed to bringing you unforgettable
                            experiences.{" "}
                        </p>
                        <p className={cx("inner-text")}>
                            Whether you&apos;re looking for a relaxing beach holiday, a city adventure or a cultural travel
                            experience, we have everything to suit your needs. Start your journey today with us!{" "}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <img
                    className={cx("introduce-img")}
                    src="https://th.bing.com/th?id=OIP.L3VIe7qfXfx5cHnqgph1LAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                    alt="Introduce"
                />
                <div className={cx("introduce-info")}>
                    <div className={cx("introduce-box")}>
                        <h1 className={cx("introduce-count")}>150+</h1>
                        <h3 className={cx("introduce-title")}>Booking/Month</h3>
                    </div>
                    <div className={cx("introduce-box")}>
                        <h1 className={cx("introduce-count")}>250+</h1>
                        <h3 className={cx("introduce-title")}>Tourist/Day</h3>
                    </div>
                    <div className={cx("introduce-box")}>
                        <h1 className={cx("introduce-count")}>90%</h1>
                        <h3 className={cx("introduce-title")}>Positive feedback</h3>
                    </div>
                    <div className={cx("introduce-box")}>
                        <h1 className={cx("introduce-count")}>10+</h1>
                        <h3 className={cx("introduce-title")}>Awards - Titles</h3>
                    </div>
                </div>
            </div>

            <div>
                <h1 className={cx("experience")}>
                    TN Hotel Brings You the Best Experience at Vietnam&apos;s Leading Hotels
                </h1>
                <div className={cx("experience-inner")}>
                    <div className={cx("experience-box")}>
                        <FontAwesomeIcon className={cx("experience-icon")} icon={faCalendar} />
                        <h1 className={cx("experience-heading")}>Mission</h1>
                        <p>
                            Committed to providing customers with the best accommodation experiences, little by little.
                            We consider every detail to ensure each customer has a memorable and comfortable stay. We
                            always take advantage of every opportunity to provide the best service and create the best
                            memories for our customers.
                        </p>
                    </div>
                    <div className={cx("experience-box")}>
                        <FontAwesomeIcon className={cx("experience-icon")} icon={faEye} />
                        <h1 className={cx("experience-heading")}>Mission</h1>
                        <p>
                            Becoming an ideal destination for all tourists when arriving in the city. We are not just a
                            place to stay, but also an ideal stop to relax and explore unique local culture, locations,
                            and cuisine. We want to make each of your trips special and memorable.
                        </p>
                    </div>
                    <div className={cx("experience-box")}>
                        <FontAwesomeIcon className={cx("experience-icon")} icon={faGem} />
                        <h1 className={cx("experience-heading")}>Mission</h1>
                        <p>
                            Quality: Committed to providing the best Experience Reputation: Trustworthy & Trustworthy
                            Dedication: Always listen and pay attention to all customer requests. Creativity:
                            Continuously improve and look for new ways
                        </p>
                    </div>
                    <div className={cx("experience-box")}>
                        <FontAwesomeIcon className={cx("experience-icon")} icon={faGift} />
                        <h1 className={cx("experience-heading")}>Mission</h1>
                        <p>
                            Discover many attractive offers when booking online with us! Enjoy special rates, up to 50%
                            off for early bookings, free gifts like breakfast, spa services, or gift cards, and more!
                            Don&apos;t miss the chance to experience a memorable vacation with our great deals. Book today to
                            receive these exclusive offers!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
