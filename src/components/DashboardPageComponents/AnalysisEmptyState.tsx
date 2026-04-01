export default function AnalysisEmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] py-24 text-center px-6">
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No analysis yet</h3>
            <p className="text-sm text-gray-400 max-w-xs">
                Select a resume, paste a job description, and hit <span className="font-medium" style={{ color: "#9D174D" }}>Analyze</span> to see your AI-powered results here.
            </p>
        </div>
    );
}