import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

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
}

interface All_Analysis {
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

interface FormData {
    resume_id: number;
    job_description: string;
}

interface AnalysisStore {
    analysis: Analysis | null;
    all_Analysis : All_Analysis[];
    formData: FormData;
    analysisLoading: boolean;
    error: string | null;
    analyzeResume: (data: FormData) => Promise<void>;
    fetchLatestAnalysis: (resume_id: number) => Promise<void>;
    fetchAllAnalysis: () => Promise<void>;
    setFormData: (data: Partial<FormData>) => void;
    resetAnalysis: () => void;
}

const initialFormData: FormData = {
    resume_id: 0,
    job_description: "",
};

export const useAnalyzeResumeStore = create<AnalysisStore>((set) => ({
    analysis: null,
    all_Analysis: [],
    formData: initialFormData,
    analysisLoading: false,
    error: null,

    analyzeResume: async (data) => {
        console.log("📡 analyzeResume: starting...", data);
        set({ analysisLoading: true, error: null });
        try {
            const res = await axios.post("/analysis", {
                resume_id: data.resume_id,
                job_description: data.job_description,
            });
            console.log("✅ analyzeResume: success", res.data.analysis);
            set({ analysis: res.data.analysis, analysisLoading: false });
        } catch (err: any) {
            console.error("🔴 analyzeResume: failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            set({ error: err.message, analysisLoading: false });
            toast.error(err.response?.data?.message || "No Internet Connection");
        }
    },

    fetchLatestAnalysis: async (resume_id) => {
        console.log("📡 fetchLatestAnalysis: starting for ...", resume_id);
        set({ analysisLoading: true, error: null });
        try {
            const res = await axios.get(`/analysis/latest/${resume_id}` );
            console.log("✅ fetchLatestAnalysis: success", res.data.analysis);
            set({ analysis: res.data.data.analysis, analysisLoading: false });
        } catch (err: any) {
            console.error("🔴 fetchLatestAnalysis: failed", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });
            set({ error: err.message, analysisLoading: false });
            toast.error(err.response?.data?.message || "No Internet Connection.");
        }
    },

    fetchAllAnalysis: async () => {
        console.log("📡 fetchAllAnalysis: starting...");
        set({ analysisLoading: true, error: null });
        try {
          const res = await axios.get("/analysis/all");
          console.log("✅ fetchAllAnalysis: success", res.data);
          set({ all_Analysis: res.data.data, analysisLoading: false });
        } catch (err: any) {
          console.error("🔴 fetchAllAnalysis: failed", {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message,
          });
          set({ error: err.message, analysisLoading: false });
          toast.error("No Internet Connection.");
        }
      },

    setFormData: (data) => {
        console.log("📝 setFormData:", data);
        set((state) => ({ formData: { ...state.formData, ...data } }));
    },

    resetAnalysis: () => {
        set({ analysis: null, formData: initialFormData });
    },
}));