import { How } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks(){

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

    return(
        <section ref={ref} className="pt-8 pb-14 bg-[#f8f8f8]" id="how-it-works">
            <div className="flex flex-col text-center justify-center w-[90%] md:w-[80%] lg:w-[60%] mx-auto font-sans mt-7 gap-y-2">
                <span  className="text-[1.7rem] md:text-[2rem] gap-2 flex text-center justify-center text-gray-800 font-semibold tracking-wide">HOW IT <p className="text-[#9D174D] ">WORKS</p></span>
                <p className="text-[1.3rem] md:text-[1.5rem] text-gray-800 font-heading">Get instant insights in just a few simple steps</p>
            </div>

            <div className="mt-12 w-[90%] lg:w-[80%] mx-auto gap-7 grid grid-cols-1 md:grid-cols-3">
                {How.map((h) => (
                    <div key={h.title} className="bg-white py-8 rounded-md flex justify-center text-center items-center shadow-md">
                        <span className="w-[95%] mx-auto flex flex-col justify-center text-center items-center " >
                            <img src={h.icon} alt="icon" />
                       
                            <div className="font-sans mt-3 flex flex-col gap-y-2">
                                <h2 className="text-[1.5rem] text-[#9D174D] font-medium">{h.title}</h2>
                                <p className="text-gray-800 text-[1.3rem] font-heading font-medium">{h.subtitle}</p>
                            </div>
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}