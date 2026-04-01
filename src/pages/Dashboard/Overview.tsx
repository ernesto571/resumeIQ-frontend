import { ArrowUpRight, ChevronRight, FileText, Upload } from "lucide-react";
import Sidebar from "../../components/DashboardPageComponents/Sidebar";
import Topbar from "../../components/DashboardPageComponents/Topbar";
import { useAuthStore } from "../../store/AuthStore";
import { useResumeStore } from "../../store/ResumeStore";
import { useEffect } from "react";
import ResumeCard from "../../components/DashboardPageComponents/ResumeCard";
import { useNavigate } from "react-router-dom";
import { useAnalyzeResumeStore } from "../../store/AnalysesStore";

const PRIMARY = "#9D174D";
const PRIMARY_LIGHT = "#fdf2f8";
const PRIMARY_HOVER = "#831440";

export default function Overview (){
    const navigate = useNavigate()
    const { profile} = useAuthStore()
    const {resumes , fetchResumes } = useResumeStore()
    const { all_Analysis, fetchAllAnalysis } = useAnalyzeResumeStore()
    const visibleResumes = resumes.slice(0,3)

    const latest_score = all_Analysis.slice(0,1).map((a) => a.match_score)
    useEffect(()=>{
        fetchResumes()
    }, [])

    useEffect(()=>{
        fetchAllAnalysis()
    }, [])

    
    const cards = [
        {id:"1", title:"Total Resumes", value: resumes.length, icon:"https://res.cloudinary.com/dsljbxkfy/image/upload/v1774718396/upload-document-note-svgrepo-com_qobgpi.svg"},
        {id:"2", title:"Total Analyses", value: all_Analysis.length, icon:"https://res.cloudinary.com/dsljbxkfy/image/upload/v1774718396/analytics-svgrepo-com_1_urv0fo.svg"},
        {id:"3", title:"Latest Score", value:`${latest_score} %`, icon:"https://res.cloudinary.com/dsljbxkfy/image/upload/v1774718396/analytics-svgrepo-com_z6hcyx.svg"}
    ]
    return(
        <section className="h-screen overflow-hidden">
            
            <section className="grid grid-cols-7 h-full">
                <section  className="col-span-1 h-screen sticky top-0">
                    <Sidebar />
                </section>

                <section className="col-span-6 h-screen flex flex-col">
                    <Topbar />
                    <div className="bg-[#f7f7f7] flex-1 overflow-y-auto pb-10">
                        <section className="pt-10 w-[90%] mx-auto">
                            <div className="lg:flex block  justify-between ">
                                <span className="max-w-[98%] lg:w-[70%]">
                                    <h1 className="text-gray-700 tracking-wide font-sans text-[1.5rem] lg:text-[2rem] font-bold">Hello, {profile?.first_name}!</h1>
                                    <p className="text-gray-500 text-[0.9rem] pt-1">Track your resume performance and improve your chances with AI insights.</p>
                                </span>

                                <button onClick={()=>{navigate("/dashboard/analyze")}}  className="flex px-3 w-[70%] md:w-[50%] lg:max-w-[20%]  lg:px-4 mt-2 lg:mt-0 text-sm md:text-base py-2 justify-center items-center rounded-md tracking-wide bg-[#9D174D] hover:bg-[#9D174D]/90 text-white font-sans font-semibold ">Analyze Resume <ChevronRight size={30} className="flex items-center"/></button>
                            </div>

                            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 lg:gap-10 mt-12 ">
                                {cards.map(( {id, title, value, icon } )=>(
                                    <div key={id} className="bg-white rounded-lg py-4 border border-gray-100">
                                        <div className="flex w-[90%] mx-auto items-center gap-3 ">
                                            <img src={icon} alt="icon" className="w-[50px] lg:w-[60px]"/>
                                            <span className="block">
                                                <h3 className="text-gray-500  lg:text-[1.1rem]">{title} </h3>
                                                <p className="text-gray-800 font-semibold text-[1.4rem] lg:text-[1.8rem]">{value} </p>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* resumes section */}
                        <section className="mt-10 w-[90%] mx-auto">
                            <span className="block lg:flex   justify-between">
                                <span className="w-[90%] lg:w-[70%]">
                                    <h1 className="text-gray-700 tracking-wide font-sans text-[1.3rem] lg:text-[1.8rem] font-semibold">Your Resumes</h1>
                                    <p className="text-gray-500 text-[0.9rem] pt-1">Access and manage the resumes you've uploaded for AI analysis.</p>
                                </span>
                                <button onClick={()=>{navigate("/dashboard/resumes")}} className="flex mt-2 lg:mt-0 px-3 w-[50%] md:w-[30%] lg:w-[10%] lg:h-[50px] py-2 justify-center items-center rounded-md tracking-wide bg-[#9D174D] hover:bg-[#9D174D]/90 text-white text-sm font-sans font-semibold ">View All <ArrowUpRight size={15} className="flex items-center"/></button>  
                            </span>
                            
                            {resumes.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
                                        style={{ backgroundColor: PRIMARY_LIGHT }}>
                                        <FileText size={36} style={{ color: "#c084a0" }} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No resumes yet</h3>
                                    <p className="text-sm text-gray-400 max-w-xs mb-6">
                                        Upload your first resume to start getting AI-powered insights and job match scores.
                                    </p>
                                    <button
                                        className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium rounded-xl transition"
                                        onClick={() => {navigate("/dashboard/resumes")}}

                                        style={{ backgroundColor: PRIMARY }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}>
                                        <Upload size={15} /> Upload Resume
                                    </button>
                                </div>
                            ) : (
                                <div className=" w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-6 gap-7 md:gap-20">
                                    <ResumeCard resumes={visibleResumes} />
                                </div> 
                            )
                        }
                            
                        </section>
                    </div>
                </section>
                
            </section>
        </section>
    )
}