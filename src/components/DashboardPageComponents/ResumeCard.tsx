import { useResumeStore } from "../../store/ResumeStore";
import { useNavigate } from "react-router-dom";
import { Clock, Loader2, Trash2, Zap } from "lucide-react";

const PRIMARY = "#9D174D";
const PRIMARY_HOVER = "#831440";
const pdfIcon = "https://res.cloudinary.com/dsljbxkfy/image/upload/v1774912122/pdf-file-svgrepo-com_1_wfg5ay.svg";
const docxIcon = "https://res.cloudinary.com/dsljbxkfy/image/upload/v1774909711/docx-removebg-preview_n3ggkw.png";

// ✅ destructure resumes from props correctly
export default function ResumeCard({ resumes }: { resumes: any[] }) {
    const { isDeleting, deleteResume } = useResumeStore();
    const navigate = useNavigate();

    const handleAnalyze = (id: number) => {
        navigate(`/dashboard/analyze?resumeId=${id}`);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Delete this resume?")) await deleteResume(id);
    };

    return (
        <>
            {resumes.map((resume) => {
                const date = new Date(resume.created_at).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                });
                const thumbnailSrc = resume.mimetype?.includes("pdf") ? pdfIcon : docxIcon;

                return (
                    <div
                        key={resume.id}
                        className="bg-white rounded-md border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-4"
                    >
                        {/* thumbnail */}
                        <div className="mt-2 md:mt-4">
                            <img
                                src={thumbnailSrc}
                                alt="icon"
                                className="object-cover w-full h-[140px] lg:h-[180px] rounded-t-md"
                            />
                        </div>

                        <span className="w-[80%] mx-auto">
                            <a href={resume.file_url} target="_blank" rel="noreferrer" className="text-[1.2rem] font-sans font-semibold text-gray-800 truncate hover:underline hover:cursor-pointer">
                                {resume.title}
                            </a>

                            {/* date */}
                            <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-400">
                                <Clock size={12} />
                                <span>Uploaded {date}</span>
                            </div>
 
                            {/* actions */}
                            <div className="flex gap-3 pt-2 pb-4">
                                <button
                                    onClick={() => handleAnalyze(resume.id)}
                                    className="flex items-center justify-center gap-1.5 rounded-md text-white font-medium transition"
                                    style={{ backgroundColor: PRIMARY, padding: "8px 20px", fontSize: "13px" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                                >
                                    <Zap size={18} /> Analyze
                                </button>
                                <button
                                    onClick={() => handleDelete(resume.id)}
                                    disabled={isDeleting}
                                    className="flex items-center justify-center rounded-md text-white transition bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed "
                                    style={{ padding: "8px 20px" }}
                                >
                                    {isDeleting ? (<Loader2 size={14} className="animate-spin"/>) : (<Trash2 size={14} />)}
                                </button>
                            </div>
                        </span>
                    </div>
                );
            })}
        </>
    );
}