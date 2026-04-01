import { X } from "lucide-react";

interface Analysis {
    id: number;
    resume_id: number;
    job_description: string;
    match_score: number;
    role_suitability: string;
    strengths: string[];
    missing_skills: string[];
    keyword_optimization: string[];
    suggestions: string[];
    red_flags: string[];
    analysed_at: string;
    resume_title: string;
    resume_url: string;
}

interface ViewAnalysisModalProps {
    analysis: Analysis;
    onClose: () => void;
}

const PRIMARY = "#9D174D";

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

export default function ViewAnalysisModal ({ onClose, analysis }: ViewAnalysisModalProps){


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-[95%] md:w-[60%] h-[80%] overflow-y-auto  mx-4 p-6 relative animate-modal">

                {/* close */}
                {/* close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                    <X size={20} />
                </button>

                <div className="flex flex-col gap-y-5 pt-5 pb-10">

                    {/* match score */}
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
                            
                    {/* job description */}
                    
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-gray-700 font-semibold text-[1rem] mb-2">💼 Job Description</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{analysis.job_description}</p>
                    </div>

                    {/* role suitability */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-gray-700 font-semibold text-[1rem] mb-2">🎯 Role Suitability</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{analysis.role_suitability}</p>
                    </div>

                    {/* strengths */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">✅ Strengths</h3>
                        <div className="flex flex-wrap gap-2">
                            {analysis.strengths.map((s: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* missing skills */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">🧩 Missing Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {analysis.missing_skills.map((s: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* keyword optimization */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-gray-700 font-semibold text-[1rem] mb-3">📝 Keyword Optimization</h3>
                        <div className="flex flex-wrap gap-2">
                            {analysis.keyword_optimization.map((k: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">{k}</span>
                            ))}
                        </div>
                    </div>

                    {/* suggestions */}
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

                    {/* red flags */}
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
            </div>
            <style>{`
                @keyframes modal-in {
                    from { opacity: 0; transform: scale(0.95) translateY(8px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modal { animation: modal-in 0.2s ease forwards; }
            `}</style>
        </div>
    )
}