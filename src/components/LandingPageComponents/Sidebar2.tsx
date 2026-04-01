import { Mail, MapPin, Phone, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { sidebarLinks2 } from "../../constants";


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar2 ({ isOpen, onClose }: SidebarProps){

    const location = useLocation();

    

    return(
         <>
      {/* Backdrop overlay with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onClose}
        ></div>
      )}
 
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[70%] md:w-[50%]  bg-white  shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col w-[98%] md:w-[94%] mx-auto gap-6 pt-6 px-4  text-gray-800">
          {/* Close button */}
          <button
            className="self-end bg-[#9D174D] hover:bg-[#9D174D]/80 rounded-full p-2 transition-colors ease-in-out"
            onClick={onClose}>
            <X size={20} color="white" />
          </button>

          {/* Sidebar Links */}
          <div className="flex flex-col mt-4">
            {sidebarLinks2.map((link) => {
              const isActive = location.hash === link.id;

              return (
                <a
                  key={link.id}
                  href={link.id}
                  className={`border-b hover:text-[#9D174D]/70 hover:translate-x-3 border-gray-200 font-semibold text-[0.9rem] tracking-wide py-3 ease-in duration-100
                  ${isActive ? "text-[#9D174D]" : ""}`}
                  onClick={onClose}
                >
                  {link.title}
                </a>
              );
            })}

            {/* contact info */}
            <div className="mt-4 font-extralight ">

                <span className="flex mt-6 text-[0.9rem] gap-2 items-center">
                    <Mail size={20} className="text-[#9D174D] "/>
                    <p>resumeIQ@gmail.com</p>
                </span>

                <span className="flex mt-6 text-[0.9rem] gap-2 items-center">
                    <Phone size={20} className="text-[#9D174D] "/>
                    <p>+44 20 1234 5678</p>
                </span>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}