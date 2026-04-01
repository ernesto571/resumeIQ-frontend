import { Search } from "lucide-react";
import { useAuthStore } from "../../store/AuthStore";
import { UserButton } from "@clerk/clerk-react";


export default function Topbar(){

    const { profile } = useAuthStore()
    

    return(
        <section className="sticky top-0 z-10 flex border-b border-gray-200  bg-white">
            <div  className="flex justify-between items-center w-[98%] md:w-[90%] mx-auto py-1">
                <div className="relative flex items-center">
                    <Search  className="absolute left-3 text-gray-800 size-5" />
                    <input type="text" placeholder="search for resumes..." className="py-2 text-sm md:text-base max-w-[90%] pl-10 md:pr-8 text-gray-800 rounded-md focus:outline-none border bg-[#f7f7f7] focus:border-[#9D174D]"/>
                </div>

                <div className="border-l pl-3 border-gray-200 gap-2 flex">
                    <UserButton />
                    <p className="hidden md:flex font-heading text-[1.3rem] font-medium tracking-wide">{profile?.first_name}   {profile?.last_name} </p>
                </div>
            </div>
        </section>
    )
}