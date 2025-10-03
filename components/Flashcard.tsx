'use client'

import { useState } from 'react'
import { Flashcard as FlashcardType } from '@/types'

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
            <div
                className={`bg-white rounded-2xl shadow-xl min-h-[400px] cursor-pointer transition-all duration-300 ${answered ? 'opacity-50' : ''
                    }`}
                onClick={!flipped ? handleFlip : undefined}
            >
                <div className="p-8 h-full flex flex-col justify-center items-center">
                    {!flipped ? (
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-4">
                                {flashcard.isReview && (
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        Review
                                    </span>
                                )}
                            </div>
                            <h2 className="text-5xl font-bold text-gray-900 mb-6">
                                {flashcard.word.word}
                            </h2>
                            <p className="text-gray-500 text-sm">Click to see definition</p>
                        </div>
                    ) : (
                        <div className="w-full">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                                {flashcard.word.word}
                            </h3>

                            {flashcard.word.definitions.length > 0 ? (
                                <div className="space-y-4 mb-8">
                                    {flashcard.word.definitions.map((def, idx) => (
                                        <div key={idx} className="border-l-4 border-primary pl-4">
                                            <div className="text-sm text-primary font-semibold mb-1">
                                                {def.partOfSpeech}
                                            </div>
                                            <p className="text-gray-800 mb-2">{def.meaning}</p>
                                            {def.example && (
                                                <p className="text-sm text-gray-600 italic">
                                                    "{def.example}"
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 mb-8">
                                    <p>No definition available yet</p>
                                    <p className="text-sm mt-2">
                                        This word was extracted from subtitles
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={() => handleAnswer(false)}
                                    className="flex-1 bg-red-500 text-white py-4 px-8 rounded-xl font-semibold hover:bg-red-600 transition disabled:opacity-50"
                                    disabled={answered}
                                >
                                    Don't Know
                                </button>
                                <button
                                    onClick={() => handleAnswer(true)}
                                    className="flex-1 bg-green-500 text-white py-4 px-8 rounded-xl font-semibold hover:bg-green-600 transition disabled:opacity-50"
                                    disabled={answered}
                                >
                                    Know It
                                </button>
                            </div>

                            {flashcard.progress && (
                                <div className="mt-6 text-center text-sm text-gray-500">
                                    <span className="text-green-600">✓ {flashcard.progress.correctCount}</span>
                                    {' / '}
                                    <span className="text-red-600">✗ {flashcard.progress.incorrectCount}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}