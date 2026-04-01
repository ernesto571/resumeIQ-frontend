import { Twitter, Facebook, Github, Linkedin, Instagram } from "lucide-react"
import { quickLinks } from "../../constants"

export default function Footer (){

    return(
        <section>
            <div className="pt-[5rem] pb-[2rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[85%] mx-auto gap-6">
                {/* first column */}
                <section className="flex flex-col justify-center items-center text-center">
                    <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774708343/logodesign_1_-removebg-preview_tnbicb.png" alt="logo" className="flex pb-2 justify-center items-center w-[12rem] " />
                    <a href="#" className="text-gray-600 font-bold ">support@resumeIQ.com</a>
                    <p className="py-2 text-[#080e51] font-bold">+44 20 1234 5678</p>
                    <div className="flex gap-5 mt-2">
                        <Twitter className="text-[#ababab] fill-[#ababab]" />
                        <Facebook className="text-[#ababab] fill-[#ababab]"  />
                        <Github className="text-[#ababab] " />
                        <Linkedin className="text-[#ababab] fill-[#ababab]" />
                        <Instagram className="text-[#ababab]" />
                    </div>
                </section>

                {/* second column */}
                <section className="flex flex-col" >
                    <h1 className="flex justify-center text-center font-medium text-[1.5rem] text-[#080e51] pb-2" >Quick Links</h1>
                    {quickLinks.map((q) => (
                        <a className="text-gray-600 font-medium flex justify-center py-2 hover:text-[#9D174D] hover:cursor-pointer hover:translate-x-1" href={q.id} key={q.id}>{q.title}</a>
                    ))}
                </section>


                {/* third column */}
                <section>
                    <h1 className="flex justify-center text-center font-medium text-[1.5rem] text-[#080e51] pb-2">Newsletter</h1>
                    <div>
                        <p className="text-gray-600 font-medium flex justify-center py-2 " >Subscribe to our newsletter</p>
                        <input type="text" placeholder="Your Email"  className="w-full pl-5 mt-3 bg-[#f8f8f8] py-3 focus:border-[1px] rounded-sm focus:border-[#9D174D] focus:outline-none transition-colors "/>
                        <button  className=" mt-5 rounded-lg font-medium text-white py-2 w-full hover:cursor-pointer bg-[#9D174D] hover:bg-[#9D174D]/90 ease-in-out duration-200">Subscribe</button>
                    </div>
                </section>
            </div>
        </section>
    )
}