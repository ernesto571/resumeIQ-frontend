import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { navLinks } from "../../constants";
import Sidebar2 from "./Sidebar2";
import { Menu } from "lucide-react";


export default function Navbar(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => {
          setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return(
        <nav className={`fixed top-0 left-0 py-2 md:py-0 w-full z-30 transition-all duration-300
        ${scrolled ? "backdrop-blur shadow-lg bg-white" : "bg-transparent"}
        `}>
            <section  className="flex justify-between w-[98%] md:w-[85%] mx-auto items-center">
                
                <Link to="/">
                    <img
                    src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774708343/logodesign_1_-removebg-preview_tnbicb.png" alt="logo"
                    className="w-[10rem] md:w-[12rem]"/>
                </Link>

                <span className="hidden lg:flex gap-9 justify-center text-[#080e51] font-sans font-medium tracking-tight">
                    {navLinks.map((link) => {
                        const isActive = location.hash === link.id;
                        return (
                        <div key={link.id}>
                            <a href={link.id} className={`nav-link ${isActive ? "active" : ""}`}>
                            {link.title}
                            </a>
                        </div>
                        );
                    })}
                </span>
                
                <div className="flex gap-1">
                    <SignInButton mode="modal">
                        <button className={`md:px-6 px-4 py-2  transition-colors md:text-[1.1rem] font-medium rounded-md ${scrolled ? "bg-[#9D174D] hover:bg-[#9D174D]/90 text-white" : "bg-white hover:bg-gray-100 text-gray-800"}`}>
                            Sign In
                        </button>
                    </SignInButton>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden hover:bg-[#9D174D] hover:text-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
                    >
                        <Menu size={24} />
                    </button>
                </div>
                
            </section>
        <Sidebar2 isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        </nav>
    )
}