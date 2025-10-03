import { ProgressStats } from '@/types'

interface ProgressChartProps {
    stats: ProgressStats
}

export default function ProgressChart({ stats }: ProgressChartProps) {
    const total = stats.totalWords || 1
    const masteredPercent = (stats.mastered / total) * 100
    const learningPercent = (stats.learning / total) * 100
    const reviewingPercent = (stats.reviewing / total) * 100

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Learning Distribution</h2>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-green-600">Mastered</span>
                        <span className="text-sm font-medium text-green-600">
                            {stats.mastered} ({masteredPercent.toFixed(1)}%)
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-green-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${masteredPercent}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-blue-600">Learning</span>
                        <span className="text-sm font-medium text-blue-600">
                            {stats.learning} ({learningPercent.toFixed(1)}%)
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${learningPercent}%` }}
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-yellow-600">Reviewing</span>
                        <span className="text-sm font-medium text-yellow-600">
                            {stats.reviewing} ({reviewingPercent.toFixed(1)}%)
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${reviewingPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">{total}</div>
                        <div className="text-sm text-gray-600">Total Words</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {masteredPercent.toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-600">Completion</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
