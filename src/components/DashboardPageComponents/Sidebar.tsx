import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import { useClerk } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";

export default function Sidebar(){
    const { signOut } = useClerk()

    return(
        <aside className="flex flex-col h-screen items-center justify-center bg-white text-gray-800 px-1 md:px-4 pt-2 pb-6 border-r border-gray-100 shadow-sm">
            {/* Logo */}
            <div className="mb-8">
                <img
                src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774708343/logodesign_1_-removebg-preview_tnbicb.png"
                alt="logo"
                className="hidden lg:flex w-[10rem]"
                />

                <img
                src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775070818/logodesign_2_-removebg-preview_r6x3nl.png"
                alt="logo"
                className="lg:hidden flex w-[2rem] md:w-[3rem]"
                />
            </div>
        
            

            <p className="text-[0.9rem] font-semibold font-heading tracking-[0.15em] uppercase text-gray-800">
                MENU
            </p>

            {/* Nav Links */}
            <nav className="flex flex-col gap-y-2 flex-1">
                {sidebarLinks.map(({ id, to, icon, label, end }) => (
                <NavLink key={id} to={to} end={end}
                    className={({ isActive }) =>
                    `relative group flex items-center gap-2 px-2 py-1 mt-5 font-medium transition-all duration-200
                    ${isActive ? "border-l-4 border-[#9D174D] " : "text-gray-900 hover:border-l-4 hover:border-[#9D174D] "
                    }`} >
                    {({ isActive }) => (
                    <>
                        <img src={icon} alt={label} className={`w-[20px] transition-all `}/>
                        <span className="hidden lg:flex text-[1.1rem] font-sans">{label}</span>
                        {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                        )}

                        {/* ✅ Tooltip — only shows on small screens where label is hidden */}
                        <span className="lg:hidden absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                        <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                        {label}
                        </span>
                    </>
                    )}
                </NavLink>
                ))}
            </nav> 

            {/* Divider */}
            <div className="border-t border-[#9D174D]/40 mx-2 mb-4" />

            {/* Sign Out */}
            <div className="relative group">
                <button onClick={() => signOut()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-[#9D174D] hover:bg-[#9D174D]/20 transition-all duration-200 w-full">
                <LogOut size={20} />
                <p className="hidden lg:flex">Sign Out</p>
                </button>

                {/* ✅ Tooltip for sign out — only on small screens */}
                <span className="lg:hidden absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                    Sign Out
                </span>
            </div>

        </aside>
    )
}