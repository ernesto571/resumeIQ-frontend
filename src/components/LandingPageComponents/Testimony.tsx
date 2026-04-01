import { testimony } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Testimony(){
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
        <section ref={ref} className="pt-10" id="reviews">
            <main className="relative ">
                <div className="relative min-h-screen w-full">
                    <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774733372/bg-2_gdpdkx.jpg" alt="bg" className="h-[200vh] md:h-screen w-full" />
                </div>

                <div className="absolute inset-0 w-[90%] lg:w-[85%] mx-auto pt-16">
                    <span >
                        <h1  className="text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] text-[#9D174D] font-semibold tracking-wide">What Users Are Saying</h1>
                        <p className=" text-gray-800 md:text-[1.2rem] pt-2">See how our platform helps users improve their resumes and stand out.</p>
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                        {testimony.map((t) => (
                            <div>
                                <div className="">
                                    <img src={t.pic} alt="profile picture"  className="object-hover hover:brightness-90 h-[200px] md:h-[250px] lg:h-[300px] w-full rounded-t-lg"/>
                                </div>
                                <span className="mt-4 flex flex-col gap-y-2">
                                    <h3 className= "text-[1.3rem] md:text-[1.5rem] lg:text-[1.8rem] text-gray-800 font-semibold ">{t.name} </h3>
                                    <p className="text-sm md:text-base">{t.role} </p>
                                    <p className="text-gray-800 md:text-[1.1rem] lg:text-[1.3rem] font-medium font-heading ">{t.text} </p>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </section>
    )
}