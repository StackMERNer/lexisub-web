'use client'

import { useState } from 'react'
import { Flashcard as FlashcardType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle } from 'lucide-react'

interface FlashcardProps {
    flashcard: FlashcardType
    onAnswer: (correct: boolean) => void
}

export default function Flashcard({ flashcard, onAnswer }: FlashcardProps) {
    const [flipped, setFlipped] = useState(false)
    const [answered, setAnswered] = useState(false)

    const handleFlip = () => {
        setFlipped(!flipped)
    }

    const handleAnswer = (correct: boolean) => {
        setAnswered(true)
        setTimeout(() => {
            onAnswer(correct)
            setFlipped(false)
            setAnswered(false)
        }, 500)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card
                className={`min-h-[400px] cursor-pointer transition-all duration-300 hover:shadow-xl ${answered ? 'opacity-50' : ''
                    }`}
                onClick={!flipped ? handleFlip : undefined}
            >
                <CardContent className="p-8 h-full flex flex-col justify-center">
                    {!flipped ? (
                        <div className="text-center space-y-4">
                            {flashcard.isReview && (
                                <Badge variant="secondary" className="mb-4">
                                    Review
                                </Badge>
                            )}
                            <CardTitle className="text-5xl font-bold">
                                {flashcard.word.word}
                            </CardTitle>
                            <p className="text-muted-foreground text-sm">
                                Click to see definition
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <CardHeader className="p-0">
                                <CardTitle className="text-3xl text-center">
                                    {flashcard.word.word}
                                </CardTitle>
                            </CardHeader>

                            {flashcard.word.definitions.length > 0 ? (
                                <div className="space-y-4">
                                    {flashcard.word.definitions.map((def, idx) => (
                                        <div key={idx} className="border-l-4 border-primary pl-4 space-y-2">
                                            <Badge variant="outline">{def.partOfSpeech}</Badge>
                                            <p className="text-foreground">{def.meaning}</p>
                                            {def.example && (
                                                <p className="text-sm text-muted-foreground italic">
                                                    "{def.example}"
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground space-y-2">
                                    <p>No definition available yet</p>
                                    <p className="text-sm">
                                        This word was extracted from subtitles
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button
                                    onClick={() => handleAnswer(false)}
                                    variant="destructive"
                                    size="lg"
                                    className="flex-1"
                                    disabled={answered}
                                >
                                    <XCircle className="mr-2 h-5 w-5" />
                                    Don't Know
                                </Button>
                                <Button
                                    onClick={() => handleAnswer(true)}
                                    variant="default"
                                    size="lg"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    disabled={answered}
                                >
                                    <CheckCircle2 className="mr-2 h-5 w-5" />
                                    Know It
                                </Button>
                            </div>

                            {flashcard.progress && (
                                <div className="text-center text-sm text-muted-foreground">
                                    <span className="text-green-600">✓ {flashcard.progress.correctCount}</span>
                                    {' / '}
                                    <span className="text-red-600">✗ {flashcard.progress.incorrectCount}</span>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}