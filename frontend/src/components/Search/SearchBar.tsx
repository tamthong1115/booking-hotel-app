import { FormEvent, useState, useRef } from "react";
import { useSearchContext } from "../../app/context/SearchContext.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const SearchBar = () => {
    const navigate = useNavigate();
    const search = useSearchContext();

    // this is the local, only upload to global context when user submit
    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
        navigate("/search");
    };

    const minDate = new Date();
    const minDateTomorrow = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    //handle

    const inputRef = useRef(document.createElement("input"));

    const handleClear = () => {
        setDestination("");
        inputRef.current.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const destination = e.target.value;

        if (!destination.startsWith(" ")) {
            setDestination(destination);
        }
    };

    return (
        <form
            className="-mt-8 grid grid-cols-2 items-center gap-2 rounded-lg bg-yellow-500 p-2 shadow-md lg:grid-cols-3 2xl:grid-cols-5"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-1 flex-row items-center rounded-lg bg-white p-2">
                <FontAwesomeIcon className="mr-2 text-gray-600" icon={faMagnifyingGlass} />
                <input
                    ref={inputRef}
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={handleChange}
                />
                <button onClick={handleClear} className="px-3 text-gray-600">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-white px-2 py-1">
                <FontAwesomeIcon className="text-gray-600" icon={faUser} />

                <label className="flex items-center gap-2 rounded-md bg-white px-2 py-1">
                    Adults:
                    <input
                        className="w-full p-1 font-bold focus:outline-none"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) => setAdultCount(parseInt(event.target.value))}
                    />
                </label>

                <label className="flex items-center rounded-lg">
                    Children:
                    <input
                        className="w-full p-1 font-bold focus:outline-none"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(event) => setChildCount(parseInt(event.target.value))}
                    />
                </label>
            </div>

            <div className="mr-8 flex items-center rounded-md bg-white">
                <FontAwesomeIcon className="px-2 text-gray-600" icon={faCalendar} />

                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="min-w-full rounded-lg bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div className="mr-8 flex items-center rounded-md bg-white">
                <FontAwesomeIcon className="px-2 text-gray-600" icon={faCalendar} />

                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDateTomorrow}
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="min-w-full rounded-lg bg-white p-2 focus:outline-none"
                    wrapperClassName="min-w-full"
                />
            </div>

            <div className="flex gap-1">
                {destination === "" ? (
                    <button
                        disabled
                        className="h-full w-2/3 rounded-lg bg-blue-400 p-2 text-xl font-bold text-white hover:bg-blue-600"
                    >
                        Search
                    </button>
                ) : (
                    <button className="h-full w-2/3 rounded-lg bg-blue-400 p-2 text-xl font-bold text-white hover:bg-blue-600">
                        Search
                    </button>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
