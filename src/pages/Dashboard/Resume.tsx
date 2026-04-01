import { useEffect, useState } from "react";
import Sidebar from "../../components/DashboardPageComponents/Sidebar";
import Topbar from "../../components/DashboardPageComponents/Topbar";
import UploadModal from "../../components/DashboardPageComponents/UploadModal";
import { useResumeStore } from "../../store/ResumeStore";
import { FileText, Loader, Upload} from "lucide-react";
import ResumeCard from "../../components/DashboardPageComponents/ResumeCard";

const PRIMARY = "#9D174D";
const PRIMARY_LIGHT = "#fdf2f8";
const PRIMARY_HOVER = "#831440";

export default function ResumePage() {
    const { resumes, fetchResumes, isLoading } = useResumeStore();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { fetchResumes(); }, []);

    return (
        <>
            {showModal && <UploadModal onClose={() => setShowModal(false)} />}

            <section className="h-screen overflow-hidden">
                <section className="grid grid-cols-7 h-full">

                    {/* sidebar */}
                    <section className="col-span-1 h-screen sticky top-0">
                        <Sidebar />
                    </section>

                    {/* main */}
                    <section className="col-span-6 h-screen flex flex-col">
                        <Topbar />

                        <div className="bg-[#f7f7f7] flex-1 overflow-y-auto">
                            <section className="pt-10 w-[90%] mx-auto pb-10">

                                {/* ── page header ── */}
                                <div className="block md:flex  items-center justify-between mb-8">
                                    <div>
                                        <h1 className="text-gray-700 tracking-wide font-sans text-[2rem] font-semibold">My Resumes</h1>
                                        <p className="text-gray-500 text-[0.9rem] pt-1">Upload, analyze, and track your resume performance</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {resumes.length} resume{resumes.length !== 1 ? "s" : ""} uploaded
                                        </p>
                                    </div>
                                    {resumes.length > 0 && (
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="flex items-center gap-2 px-4 mt-2 md:mt-0 py-2.5 text-white text-sm font-medium rounded-lg transition shadow-sm"
                                            style={{ backgroundColor: PRIMARY }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                                        >
                                            <Upload size={15} /> Upload New
                                        </button>
                                    )}
                                </div>

                                {/* ── loading skeletons ── */}
                                {isLoading ? (
                                    <div className="py-24 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader className="size-10 animate-spin text-[#9D174D]" />
                                            <p className="text-sm text-gray-500 font-medium">Loading your resumes...</p>
                                        </div>
                                    </div>

                                ) : resumes.length === 0 ? (
                                    /* ── empty state ── */
                                    <div className="flex flex-col items-center justify-center py-24 text-center">
                                        <div
                                            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
                                            style={{ backgroundColor: PRIMARY_LIGHT }}
                                        >
                                            <FileText size={36} style={{ color: "#c084a0" }} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No resumes yet</h3>
                                        <p className="text-sm text-gray-400 max-w-xs mb-6">
                                            Upload your first resume to start getting AI-powered insights and job match scores.
                                        </p>
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium rounded-xl transition"
                                            style={{ backgroundColor: PRIMARY }}
                                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}>
                                            <Upload size={15} /> Upload Resume
                                        </button>
                                    </div>

                                ) : (
                                    /* ── resume grid ── */
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto gap-20">
                                        <ResumeCard resumes={resumes}/>
                                    </div>
                                )}

                            </section>
                        </div>
                    </section>

                </section>
            </section>
        </>
    );
}