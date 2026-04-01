export default function AnalysisSkeleton() {
    return (
        <div className="flex flex-col gap-6 p-6 animate-pulse">

            {/* match score circle */}
            <div className="flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-full bg-gray-200" />
                <div className="h-4 w-24 bg-gray-200 rounded-full" />
            </div>

            {/* role suitability */}
            <div className="bg-white rounded-xl p-4 flex flex-col gap-2">
                <div className="h-4 w-32 bg-gray-200 rounded-full" />
                <div className="h-3 w-full bg-gray-200 rounded-full" />
                <div className="h-3 w-[90%] bg-gray-200 rounded-full" />
                <div className="h-3 w-[75%] bg-gray-200 rounded-full" />
            </div>

            {/* skills pills block */}
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex flex-col gap-3">
                    <div className="h-4 w-36 bg-gray-200 rounded-full" />
                    <div className="flex flex-wrap gap-2">
                        {[...Array(5)].map((_, j) => (
                            <div key={j} className="h-7 w-20 bg-gray-200 rounded-full" />
                        ))}
                    </div>
                </div>
            ))}

            {/* suggestions */}
            <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
                <div className="h-4 w-28 bg-gray-200 rounded-full" />
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
                        <div className="h-3 bg-gray-200 rounded-full" style={{ width: `${70 + i * 7}%` }} />
                    </div>
                ))}
            </div>

        </div>
    );
}