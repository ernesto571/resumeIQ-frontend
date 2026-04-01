import { ChevronRight } from "lucide-react"
import { features } from "../../constants"
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChhoseUs(){

    const navigate = useNavigate()
    const { openSignUp } = useClerk();
    const { isSignedIn } = useUser();
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
          opacity: 0,
          yPercent: 30,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        });
    }, { scope: ref });

    const handleAuthBrowse = () => {
        if (!isSignedIn) {
          openSignUp({ fallbackRedirectUrl: "/dashboard" });
        } else {
          navigate("/dashboard");
        }
    };

    return(
        <section ref={ref}>
            <main className="pt-12" id="features">
                <div className="grid grid-cols-1  md:grid-cols-2 gap-7 w-[90%]  lg:w-[85%] mx-auto " >
                    <div className="hidden md:flex md:h-[70px]">
                        <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774726005/Brazuca_-_UI_Design_e9i3e8.png" alt="icon" className="object-cover h-fit "/>
                    </div>
                    <div className=" gap-y-3 flex flex-col ">
                        <span  className="text-[2rem] text-[#9D174D] font-semibold tracking-wide">Why Choose Us</span>
                        <p className=" text-gray-800 md:text-[1.2rem] ">We combine modern AI-powered insights with a simple, fast, and reliable workflow to help you make smarter decisions. Our tools are designed for efficiency, clarity, and real results that you can trust.</p>
                        <button onClick={handleAuthBrowse} className=" flex px-5 py-3 mt-3 rounded-lg items-center justify-center  font-bold tracking-wide bg-[#9D174D] hover:bg-[#9D174D]/90 text-white font-sans max-w-[70%] lg:w-[35%]">Get Started <ChevronRight size={25} className="flex items-center"/> </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-7 w-[90%] lg:w-[85%] mx-auto  pt-16" >
                    {features.map((f) => (
                        <div key={f.title} className="flex flex-col gap-y-2 shadow-sm w-full lg:w-[80%] pb-7  ">
                            <h2 className="text-[#9D174D] text-[1.3rem] md:text-[1.5rem] tracking-wide font-sans ">{f.title}</h2>
                            <p className="text-gray-800 md:text-[1.1rem]">{f.subtitle} </p>
                        </div>
                    ))}
                </div>
            </main>
        </section>
    )
}