import { useEffect, useState } from "react";
import Sidebar from "../../components/DashboardPageComponents/Sidebar";
import Topbar from "../../components/DashboardPageComponents/Topbar";
import { useAnalyzeResumeStore } from "../../store/AnalysesStore";
import InsightsEmptyState from "../../components/DashboardPageComponents/InsightsEmptyState";
import { ChevronRight, Clock, Loader } from "lucide-react";
import ViewAnalysisModal from "../../components/DashboardPageComponents/ViewAnalysisModal";

const PRIMARY = "#9D174D";
const PRIMARY_HOVER = "#831440";

const getScoreColor = (score: number) => {
    if (score >= 75) return "#16a34a";
    if (score >= 50) return "#d97706";
    return "#dc2626";
};

const truncate = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
};

export default function Insights() {
    // FIX 1: Store the specific analysis object instead of a boolean
    const [selectedAnalysis, setSelectedAnalysis] = useState<any | null>(null);
    const { all_Analysis, fetchAllAnalysis, analysisLoading } = useAnalyzeResumeStore();

    useEffect(() => {
        fetchAllAnalysis();
    }, [fetchAllAnalysis]);

    return (
        <>
            <section className="page-wrapper">
                <section className="page-grid">
                    <section className="sidebar">
                        <Sidebar />
                    </section>

                    <section className="main">
                        <Topbar />

                        <div className="bg-[#f7f7f7] flex-1 overflow-y-auto">
                            <section className="pt-10 w-[90%] mx-auto pb-10">
                                {/* page header */}
                                <span>
                                    <h1 className="text-gray-700 tracking-wide font-sans text-[1.7rem] font-bold">Analysis Center</h1>
                                    <p className="text-gray-500 text-[0.9rem] pt-1">Your resume history at a glance. Track your scores and bridge the gap to your next role.</p>
                                </span>

                                {analysisLoading ? (
                                    <div className="h-[80vh] flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <Loader className="size-10 animate-spin text-[#9D174D]" />
                                            <p className="text-sm text-gray-500 font-medium">Loading insights...</p>
                                        </div>
                                    </div>
                                ) : all_Analysis.length === 0 ? (
                                    <InsightsEmptyState />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 w-[90%] mx-auto">
                                        {all_Analysis.map((a) => {
                                            const date = new Date(a.analysed_at).toLocaleDateString("en-US", {
                                                month: "short", day: "numeric", year: "numeric",
                                            });

                                            return (
                                                // FIX 2: Added a unique key prop
                                                <div key={a.id } className="bg-white rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition border border-gray-100">
                                                    <div className="flex justify-center">
                                                        <div
                                                            className="w-32 h-32 rounded-full flex items-center justify-center border-8"
                                                            style={{ borderColor: getScoreColor(a.match_score) }}>
                                                            <span className="text-3xl font-bold" style={{ color: getScoreColor(a.match_score) }}>
                                                                {a.match_score}%
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* job */}
                                                    <p className="text-gray-800 text-[0.9rem] overflow-hidden mt-3 text-ellipsis"> <strong className="pr-2">Job : </strong> {truncate(a.job_description, 80)}</p>

                                                    {/* resume */}
                                                    <p className="text-gray-800 text-[0.9rem]"><strong>Resume : </strong>{a.resume_title} </p>
                                                    <div className="flex items-center gap-1.5 text-[0.9rem] text-gray-800">
                                                        <Clock size={15} />
                                                        <span>Analyzed {date}</span>
                                                    </div>

                                                    <button
                                                        // FIX 3: Set the selected analysis when clicked
                                                        onClick={() => setSelectedAnalysis(a)}
                                                        className="flex items-center justify-center mt-2 gap-1.5 rounded-md text-white font-medium transition"
                                                        style={{ backgroundColor: PRIMARY, padding: "8px 20px", fontSize: "13px" }}
                                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                                                    >
                                                        View Analysis <ChevronRight size={18} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        </div>
                    </section>
                </section>
            </section>

            {/* FIX 4: Render the modal OUTSIDE the map loop, conditionally based on if an analysis is selected */}
            {selectedAnalysis && (
                <ViewAnalysisModal 
                    onClose={() => setSelectedAnalysis(null)} 
                    analysis={selectedAnalysis} 
                />
            )}
        </>
    );
}