import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="mt-20 rounded-lg bg-indigo-400 text-white">
            <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <div>
                    <h3 className="mb-4 text-xl font-semibold">CUSTOMER CARE</h3>
                    <div className="text-sm">
                        <a href="#" className="mb-2 block">
                            Help Center
                        </a>
                        <a href="#" className="mb-2 block">
                            Contact
                        </a>
                        <a href="#" className="mb-2 block">
                            Partner
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-semibold">INTRODUCE</h3>
                    <div className="text-sm">
                        <a href="#" className="mb-2 block">
                            Introduce
                        </a>
                        <a href="#" className="mb-2 block">
                            Terms of use
                        </a>
                        <a href="#" className="mb-2 block">
                            Privacy Policy
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-semibold">NAVIGATE</h3>
                    <div className="text-sm">
                        <Link className="mb-2 flex items-center" to="/">
                            Home
                        </Link>
                        <Link className="mb-2 flex items-center" to="/my-bookings">
                            My bookings
                        </Link>
                        <Link className="mb-2 flex items-center" to="/about-us">
                            About
                        </Link>
                        <Link className="mb-2 flex items-center" to="/contact-us">
                            Contact
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-semibold">FOLLOWING</h3>
                    <div className="text-sm">
                        <a href="#" className="mb-2 block flex items-center">
                            <FontAwesomeIcon className="mr-2 text-lg" icon={faFacebook} />
                            Facebook
                        </a>
                        <a href="#" className="mb-2 block flex items-center">
                            <FontAwesomeIcon className="mr-2 text-lg" icon={faInstagram} />
                            Instagram
                        </a>
                        <a href="#" className="mb-2 block flex items-center">
                            <FontAwesomeIcon className="mr-2 text-lg" icon={faTiktok} />
                            Tiktok
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-semibold">ADDRESS</h3>
                    <div className="text-sm">
                        <p className="mb-2">253/6, Ward 11, District 2, City. Ho Chi Minh</p>
                        <p className="mb-2">0984 777 666</p>
                        <p className="mb-2">bookingTS@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex grid items-center justify-around border-t-4 border-white p-4 sm:grid-cols-1 lg:grid-cols-2">
                <p className="mb-4">Copyright © 1996–2024 BookingTS.com™. All rights reserved.</p>
                <div className="">
                    <h3 className="text-2xl">bookingTS.com</h3>
                </div>
            </div>
        </div>
    );
}

export default Footer;
