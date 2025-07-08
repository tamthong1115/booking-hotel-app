import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Main/Register/Register.tsx";
import SignIn from "./pages/Main/SignIn/SignIn.tsx";
import AddHotel from "./pages/Main/Hotel/AddHotel.tsx";
import { useAppContext } from "./app/context/AppContext";
import MyHotels from "./pages/Main/Hotel/MyHotels.tsx";
import EditHotel from "./pages/Main/Hotel/EditHotel.tsx";
import Search from "./pages/Main/Search/Search.tsx";
import Detail from "./pages/Main/Hotel/Detail.tsx";
import Booking from "./pages/Main/Booking/Booking.tsx";
import MyBookings from "./pages/Main/Booking/MyBookings.tsx";
import Home from "./pages/Main/Home/Home.tsx";
import "mapbox-gl/dist/mapbox-gl.css";
import Profile from "./components/Profile/Profile.tsx";
import AboutUs from "./pages/Main/AboutUs/AboutUs.tsx";
import AddRoom from "./pages/Main/Hotel/AddRoom.tsx";
import ContactUs from "./pages/Main/Contact/ContactUs.tsx";
import VerifyEmail from "./pages/Main/Register/VerifyEmail.tsx";
import ForgetPassword from "./pages/Main/SignIn/ForgetPassword.tsx";
import ResetPassword from "./pages/Main/SignIn/ResetPassword.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const App = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <Router>
            <Routes>
                {/* Main site layout */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/detail/:hotelId" element={<Detail />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/verify-email/:token" element={<VerifyEmail />} />

                    {isLoggedIn && (
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/hotel/:hotelId/:roomId/booking" element={<Booking />} />
                            <Route path="/my-bookings" element={<MyBookings />} />
                        </>
                    )}

                    <Route element={<ProtectedRoute requiredRoles={["admin"]} />}>
                        <Route path="/add-hotel" element={<AddHotel />} />
                        <Route path="/my-hotels" element={<MyHotels />} />
                        <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
                        <Route path="/detail/:hotelId/add-room" element={<AddRoom />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
