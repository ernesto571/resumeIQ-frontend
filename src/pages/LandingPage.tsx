import Footer from "../components/LandingPageComponents/Footer";
import Hero from "../components/LandingPageComponents/Hero";
import HowItWorks from "../components/LandingPageComponents/HowItWorks";
import Testimony from "../components/LandingPageComponents/Testimony";
import WhyChhoseUs from "../components/LandingPageComponents/WhyChooseUs";

export default function LamndingPage(){

    return(
        <section>
            <Hero />
            <HowItWorks />
            <WhyChhoseUs />
            <Testimony />
            <Footer />
        </section>
    )
}