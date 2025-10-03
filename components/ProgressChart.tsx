import { ProgressStats } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ProgressChartProps {
    stats: ProgressStats
}

export default function ProgressChart({ stats }: ProgressChartProps) {
    const total = stats.totalWords || 1
    const masteredPercent = (stats.mastered / total) * 100
    const learningPercent = (stats.learning / total) * 100
    const reviewingPercent = (stats.reviewing / total) * 100

    return (
        <Card>
            <CardHeader>
                <CardTitle>Learning Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-green-600">Mastered</span>
                        <span className="text-green-600">
                            {stats.mastered} ({masteredPercent.toFixed(1)}%)
                        </span>
                    </div>
                    <Progress value={masteredPercent} className="h-3 bg-green-100" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-blue-600">Learning</span>
                        <span className="text-blue-600">
                            {stats.learning} ({learningPercent.toFixed(1)}%)
                        </span>
                    </div>
                    <Progress value={learningPercent} className="h-3 bg-blue-100" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-yellow-600">Reviewing</span>
                        <span className="text-yellow-600">
                            {stats.reviewing} ({reviewingPercent.toFixed(1)}%)
                        </span>
                    </div>
                    <Progress value={reviewingPercent} className="h-3 bg-yellow-100" />
                </div>

                <div className="pt-6 border-t grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold">{total}</div>
                        <div className="text-sm text-muted-foreground">Total Words</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {masteredPercent.toFixed(0)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Completion</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}