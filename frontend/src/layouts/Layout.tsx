import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import SearchBar from "../components/Search/SearchBar";

const Layout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="bg-indigo-400 pb-12">
                <div className="container mx-auto py-4">
                    <Header />
                </div>
                <Hero />
            </div>
            <div className="container mx-auto">
                <SearchBar />
            </div>
            <div className="container mx-auto flex-1 py-10">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
