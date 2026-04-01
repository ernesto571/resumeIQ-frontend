import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

// ── types ─────────────────────────────────────────────────────────────────────

interface Resume {
    id: number;
    title: string;
    file_url: string;
    mimetype: string;
    last_analyzed_at: string | null;
    created_at: string;
}

interface ResumeDetail extends Resume {
    extracted_text: string;
}

interface ResumeStore {
    resumes: Resume[];
    selectedResume: ResumeDetail | null;
    isLoading: boolean;
    isUploading: boolean;
    isDeleting: boolean;
    error: string | null;

    // actions
    fetchResumes: () => Promise<void>;
    uploadResume: (file: File) => Promise<number | null>;
    getResumeById: (id: number) => Promise<void>;
    deleteResume: (id: number) => Promise<boolean>;
    setSelectedResume: (resume: ResumeDetail | null) => void;
    clearError: () => void;
}

// ── store ─────────────────────────────────────────────────────────────────────

export const useResumeStore = create<ResumeStore>((set) => ({
    resumes: [],
    selectedResume: null,
    isLoading: false,
    isUploading: false,
    isDeleting:false,
    error: null,

    // ── GET /api/resumes ──────────────────────────────────────────────────────
    fetchResumes: async () => {
        console.log("📡 fetchResumes: starting...");
        set({ isLoading: true, error: null });
        try {
            const res = await axios.get("/resumes");
            console.log("✅ fetchResumes: success", res.data);
            set({ resumes: res.data.resumes, isLoading: false });
        } catch (err: any) {
            console.error("🔴 fetchResumes: failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            set({ error: err.message, isLoading: false });
            toast.error("Failed to fetch resumes");
        }
    },

    // ── POST /api/resumes/upload ──────────────────────────────────────────────
    uploadResume: async (file: File) => {
        console.log("📡 uploadResume: starting...", { name: file.name, size: file.size });
        set({ isUploading: true, error: null });
        try {
            const formData = new FormData();
            formData.append("resume", file); // field name must match multer config

            const res = await axios.post("/resumes/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("✅ uploadResume: success", res.data);

            // add new resume to the top of the list
            set((state) => ({
                resumes: [res.data.resume, ...state.resumes],
                isUploading: false,
            }));

            toast.success("Resume uploaded successfully!");
            return res.data.resume.id;
        } catch (err: any) {
            console.error("🔴 uploadResume: failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            set({ error: err.message, isUploading: false });
            toast.error(err.response?.data?.message || "No Internet Connection.");
            return null;
        }
    },

    // ── GET /api/resumes/:id ──────────────────────────────────────────────────
    getResumeById: async (id: number) => {
        console.log("📡 getResumeById: starting...", { id });
        set({ isLoading: true, error: null });
        try {
            const res = await axios.get(`/resumes/${id}`);
            console.log("✅ getResumeById: success", res.data);
            set({ selectedResume: res.data.resume, isLoading: false });
        } catch (err: any) {
            console.error("🔴 getResumeById: failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            set({ error: err.message, isLoading: false });
            toast.error("No Internet Connection.");
        }
    },

    // ── DELETE /api/resumes/:id ───────────────────────────────────────────────
    deleteResume: async (id: number) => {
        console.log("📡 deleteResume: starting...", { id });
        set({ isDeleting: true, error: null });

        try {
            await axios.delete(`/resumes/${id}`);
            console.log("✅ deleteResume: success, removed id:", id);

            set((state) => ({
                resumes: state.resumes.filter((r) => r.id !== id),
                // clear selectedResume if it's the one being deleted
                selectedResume: state.selectedResume?.id === id ? null : state.selectedResume,
                isDeleting: false,
            }));

            toast.success("Resume deleted!");
            return true;
        } catch (err: any) {
            console.error("🔴 deleteResume: failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            toast.error("No Internet Connection.");
            return false;
        }
    },

    // ── local actions ─────────────────────────────────────────────────────────
    setSelectedResume: (resume) => {
        console.log("📝 setSelectedResume:", resume?.id ?? null);
        set({ selectedResume: resume });
    },

    clearError: () => set({ error: null }),
}));