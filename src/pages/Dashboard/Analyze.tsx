import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/DashboardPageComponents/Sidebar";
import Topbar from "../../components/DashboardPageComponents/Topbar";
import AnalysisEmptyState from "../../components/DashboardPageComponents/AnalysisEmptyState";
import AnalysisSkeleton from "../../components/DashboardPageComponents/AnalysisSkeleton";
import { useResumeStore } from "../../store/ResumeStore";
import { useAnalyzeResumeStore } from "../../store/AnalysesStore";
import { Loader, Zap } from "lucide-react";

const PRIMARY = "#9D174D";
const PRIMARY_HOVER = "#831440";

const getScoreColor = (score: number) => {
    if (score >= 75) return "#16a34a";
    if (score >= 50) return "#d97706";
    return "#dc2626";
};

const getScoreLabel = (score: number) => {
    if (score >= 75) return "Strong Match";
    if (score >= 50) return "Moderate Match";
    return "Needs Work";
};

export default function Analyze() {
    const [searchParams] = useSearchParams();
    const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
    const { resumes, fetchResumes, getResumeById, isLoading, selectedResume } = useResumeStore();
    const { formData, analysis, analysisLoading, setFormData, analyzeResume } = useAnalyzeResumeStore();

    useEffect(() => {
        const resumeIdFromUrl = searchParams.get("resumeId");
        if (resumeIdFromUrl) {
            const id = Number(resumeIdFromUrl);
            setSelectedResumeId(id);
            setFormData({ resume_id: id });
        }
    }, [searchParams, setFormData]);

    useEffect(() => {
        if (resumes.length === 0) fetchResumes();
    }, []);

    useEffect(() => {
        if (selectedResumeId) getResumeById(selectedResumeId);
    }, [selectedResumeId, getResumeById]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await analyzeResume(formData);
        } catch (error) {
            console.error("Error in handleSubmit", error);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="size-10 animate-spin text-[#9D174D]" />
                    <p className="text-sm text-gray-500 font-medium">Loading your resumes...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="page-wrapper">
            <section className="page-grid">
                <section className="sidebar">
                    <Sidebar />
                </section>
                <section className="main">
                    <Topbar />
                    <div className="bg-[#f7f7f7] flex-1 overflow-y-auto pb-10">
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[90%] md:w-[95%] mx-auto">
                            <div className="col-span-1 border-r-2 border-gray-200 h-screen overflow-y-auto pr-6">
                                <div className="mt-8">
                                    <h1 className="text-gray-700 tracking-wide font-sans text-[1.3rem] lg:text-[1.6rem] font-bold">Analyze Your Resume</h1>
                                    <p className="text-gray-500 text-[0.9rem] pt-2">Select a resume, paste a job description, and let AI do the rest.</p>
                                </div>
                                <div className="mt-7 flex flex-col gap-y-5 w-full text-gray-800">
                                    <div className="flex flex-col gap-y-2">
                                        <label className="text-[1rem] font-medium">Select Resume *</label>
                                        <select 
                                            value={formData.resume_id || ""}
                                            onChange={(e) => {
                                                const id = Number(e.target.value);
                                                setSelectedResumeId(id);
                                                setFormData({ resume_id: id });
                                            }}
                                            className="w-full px-4 py-3 rounded-lg border bg-white text-sm focus:outline-none focus:border-[#9D174D]"
                                        >
                                            <option value="">-- Select a resume --</option>
                                            {resumes.map((r) => (
                                                <option value={r.id} key={r.id}>{r.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <label className="text-[1rem] font-medium">Job Description *</label>
                                        <textarea
                                            name="job_description"
                                            value={formData.job_description}
                                            onChange={handleChange}
                                            placeholder="Drop the job posting here and let AI do the magic..."
                                            className="resize-none px-4 py-3 h-[12rem] text-sm text-gray-700 bg-white rounded-lg border focus:outline-none focus:border-[#9D174D]"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={analysisLoading || !formData.resume_id || !formData.job_description}
                                        className="flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg text-[1rem] disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        style={{ backgroundColor: PRIMARY }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                                    >
                                        <Zap size={18} />
                                        {analysisLoading ? "Analyzing..." : "Analyze"}
                                    </button>
                                    {selectedResume && (
                                        <div className="flex flex-col gap-y-2">
                                            <label className="text-[1rem] font-medium">Resume Preview</label>
                                            <div className="bg-white px-3 rounded-lg border text-sm text-gray-600 max-h-[14rem] overflow-y-auto leading-relaxed whitespace-pre-wrap">
                                                {selectedResume.extracted_text}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="lg:col-span-2 h-screen overflow-y-auto md:pl-4 lg:pl-8">
                                <div className="mt-8 mb-6">
                                    <h1 className="text-gray-700 tracking-wide font-sans text-[1.3rem] lg:text-[1.6rem] font-bold">AI Analysis Results</h1>
                                    <p className="text-gray-500 text-[0.9rem] pt-1">Here's how your resume stacks up against the job description</p>
                                </div>
                                {analysisLoading ? (
                                    <AnalysisSkeleton />
                                ) : !analysis ? (
                                    <AnalysisEmptyState />
                                ) : (
                                    <div className="flex flex-col gap-y-5 pb-10">
                                        <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-100">
                                            <div
                                                className="w-32 h-32 rounded-full flex items-center justify-center border-8"
                                                style={{ borderColor: getScoreColor(analysis.match_score) }}
                                            >
                                                <span className="text-3xl font-bold" style={{ color: getScoreColor(analysis.match_score) }}>
                                                    {analysis.match_score}%
                                                </span>
                                            </div>
                                            <span
                                                className="text-sm font-semibold px-4 py-1 rounded-full"
                                                style={{
                                                    color: getScoreColor(analysis.match_score),
                                                    backgroundColor: `${getScoreColor(analysis.match_score)}18`,
                                                }}
                                            >
                                                {getScoreLabel(analysis.match_score)}
                                            </span>
                                        </div>
                                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                            <h3 className="text-gray-700 font-semibold text-[1rem] mb-2">🎯 Role Suitability</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{analysis.role_suitability}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                            <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">✅ Strengths</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.strengths.map((s: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                            <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">🧩 Missing Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.missing_skills.map((s: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                            <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">📝 Keyword Optimization</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.keyword_optimization.map((k: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">{k}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                            <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">🛠 Suggestions</h3>
                                            <ol className="flex flex-col gap-y-2">
                                                {analysis.suggestions.map((s: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white" style={{ backgroundColor: PRIMARY }}>{i + 1}</span>
                                                        {s}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                        {analysis.red_flags.length > 0 && (
                                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                                <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">⚠️ Red Flags</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysis.red_flags.map((f: string, i: number) => (
                                                        <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600">{f}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </section>
            </section>
        </section>
    );
}