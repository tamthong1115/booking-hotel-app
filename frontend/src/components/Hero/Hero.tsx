import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCar, faLocationDot, faPlane, faSuitcase, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="gird wide">
            <div className="row container mx-auto flex flex-wrap gap-2 md:flex-nowrap">
                <button className="col max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faBed} />
                    <Link to="https://booking.com">Accommodation</Link>
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faPlane} />
                    <Link to="https://flights-vn.gotogate.com/rf/start">Flight</Link>
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faSuitcase} />
                    <Link to="https://www.agoda.com">Flight + Hotel</Link>
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faCar} />
                    <Link to="https://www.rentalcars.com">Car rental</Link>
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faLocationDot} />
                    <Link to="/">Visit location</Link>
                </button>
                <button className="max-w-50 mr-6 flex h-9 items-center rounded-full p-3 text-white hover:border-blue-500 hover:bg-blue-800 md:mr-0 md:max-w-none">
                    <FontAwesomeIcon className="mr-4" icon={faTaxi} />
                    <Link to="https://www.hochiminhcityairport.com/transportation/">Airport taxi</Link>
                </button>
            </div>
        </div>
    );
};

export default Hero;
