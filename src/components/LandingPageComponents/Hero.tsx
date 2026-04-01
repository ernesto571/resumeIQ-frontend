import { ChevronRight } from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

export default function Hero(){

    const navigate = useNavigate()
    const { openSignUp } = useClerk();
    const { isSignedIn } = useUser();

    const handleAuthBrowse = () => {
        if (!isSignedIn) {
          openSignUp({ fallbackRedirectUrl: "/dashboard" });
        } else {
          navigate("/dashboard");
        }
    };

    useGSAP(() => {

        const tl = gsap.timeline({ delay: 1 });

        const heroSplit = new SplitText(".hero-title", { type: "chars, words" });
        const subtitleSplit = new SplitText(".hero-subtitle", { type: "lines" });

        tl.from(heroSplit.chars, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "back.out",
            stagger: 0.02, // Faster stagger so buttons show sooner
        })
        .from(subtitleSplit.lines, {
            opacity: 0,
            y: 10,
            duration: 0.8,
            stagger: 0.1,
        }, "-=0.4");
        
        tl.from("#hero-btn", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
        }
        )
        

    }, []);

    return(
        <section>
            <div className="relative">
                <div className="  relative ">
                    <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774691013/magicpattern-oPH_5xuMgQw-unsplash_y4jpue.jpg" className="object-cover h-screen w-full" />
                </div>

                <div className="absolute inset-0 w-full lg:w-[60%] flex  flex-col text-center justify-center mx-auto">
                    <div className="flex justify-center rounded-md h-[300px] md:h-[350px] w-[90%] md:w-[70%] mx-auto brightness-90">
                        <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774711315/istockphoto-1272623962-612x612-removebg-preview_khgao6.png " alt="" />
                    </div>

                    <h1 className="hero-title text-[#9D174D] text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] font-sans font-semibold ">Know Exactly Why Your Resume Gets Rejected</h1>
                    <p className="hero-subtitle w-[95%] md:w-[90%] pt-3 md:text-[1.2rem] text-gray-800  mx-auto font-semibold">Analyze your resume against job descriptions and get instant insights, match scores, and improvement suggestions.</p>
                    <button id="hero-btn" onClick={handleAuthBrowse} className="flex mt-6 px-5 py-2 md:py-4 rounded-lg md:text-[1.1rem]  lg:text-[1.3rem] font-bold tracking-wide bg-[#9D174D] hover:bg-[#9D174D]/90 text-white font-sans lg:max-w-[45%] mx-auto">Analyze My Resume <ChevronRight size={30} className="flex items-center"/></button>
                    
                </div>

                
            </div>
        </section>
    )
}