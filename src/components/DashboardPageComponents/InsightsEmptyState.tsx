import { Link } from "react-router-dom";

export default function InsightsEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-full py-24 text-center px-6">
            <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#fdf2f8" }}
            >
                <img
                    src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1774718396/analytics-svgrepo-com_z6hcyx.svg"
                    alt="analysis"
                    className="w-10 h-10"
                />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Optimize?</h3>
            <p className="text-gray-500 max-w-sm leading-relaxed">
                Select a resume, paste a job description, and hit 
                <Link to="/dashboard/analyze" className="font-bold px-1 hover:underline" style={{ color: "#9D174D" }}>Analyze</Link> 
                to unlock your first match score and skill gap report.
            </p>

            
        </div>
    );
}