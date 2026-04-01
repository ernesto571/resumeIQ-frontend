import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useResumeStore } from "../../store/ResumeStore";
import { FileText, Upload, X, CheckCircle } from "lucide-react";

interface UploadModalProps {
    onClose: () => void;
}

export default function UploadModal({ onClose }: UploadModalProps) {
    const { uploadResume, isUploading } = useResumeStore();
    const [droppedFile, setDroppedFile] = useState<File | null>(null);
    const [done, setDone] = useState(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        },
        maxFiles: 1,
        onDrop: (accepted) => {
            if (accepted[0]) setDroppedFile(accepted[0]);
        },
    });

    const handleUpload = async () => {
        if (!droppedFile) return;
        const id = await uploadResume(droppedFile);
        if (id) {
            setDone(true);
            setTimeout(() => onClose(), 1200);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-modal">

                {/* close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X size={20} />
                </button>

                {/* header */}
                <div className="mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "#fdf2f8" }}>
                        <FileText size={20} style={{ color: "#9D174D" }} />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">Upload Resume</h2>
                    <p className="text-sm text-gray-500 mt-0.5">PDF or DOCX · max 5 MB</p>
                </div>

                {/* dropzone */}
                <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200"
                    style={{
                        borderColor: isDragActive ? "#9D174D" : droppedFile ? "#86efac" : "#e5e7eb",
                        backgroundColor: isDragActive ? "#fdf2f8" : droppedFile ? "#f0fdf4" : "transparent",
                    }}
                >
                    <input {...getInputProps()} />
                    {droppedFile ? (
                        <div className="flex flex-col items-center gap-2">
                            <FileText size={36} className="text-green-500" />
                            <p className="text-sm font-medium text-gray-700">{droppedFile.name}</p>
                            <p className="text-xs text-gray-400">
                                {(droppedFile.size / 1024).toFixed(0)} KB
                            </p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setDroppedFile(null); }}
                                className="text-xs text-red-400 hover:text-red-600 mt-1 underline"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 text-gray-400">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#fdf2f8" }}
                            >
                                <Upload size={22} style={{ color: isDragActive ? "#9D174D" : "#c084a0" }} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    {isDragActive ? "Drop it here!" : "Drag & drop your resume"}
                                </p>
                                <p className="text-xs mt-1">
                                    or{" "}
                                    <span className="underline font-medium" style={{ color: "#9D174D" }}>
                                        browse files
                                    </span>
                                </p>
                            </div>
                            <p className="text-xs text-gray-300">PDF, DOCX up to 5MB</p>
                        </div>
                    )}
                </div>

                {/* actions */}
                <div className="flex gap-3 mt-5">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!droppedFile || isUploading || done}
                        className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium
                            disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                        style={{ backgroundColor: "#9D174D" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#831440")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9D174D")}
                    >
                        {done ? (
                            <><CheckCircle size={16} /> Done!</>
                        ) : isUploading ? (
                            <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Uploading...</>
                        ) : (
                            <><Upload size={16} /> Upload</>
                        )}
                    </button>
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
    );
}