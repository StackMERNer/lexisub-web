'use client'

import { useState, useEffect } from 'react'
import Flashcard from '@/components/Flashcard'
import { getFlashcards, updateProgress } from '@/lib/api'
import { Flashcard as FlashcardType } from '@/types'

const TEMP_USER_ID = '507f1f77bcf86cd799439011' // Temporary user ID

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 })

  useEffect(() => {
    loadFlashcards()
  }, [])

  const loadFlashcards = async () => {
    setLoading(true)
    try {
      const data = await getFlashcards(TEMP_USER_ID, 20)
      setFlashcards(data.flashcards)
      setCurrentIndex(0)
    } catch (error) {
      console.error('Error loading flashcards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = async (correct: boolean) => {
    const currentCard = flashcards[currentIndex]

    try {
      await updateProgress(TEMP_USER_ID, currentCard.word._id, correct)

      setSessionStats(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        incorrect: prev.incorrect + (correct ? 0 : 1)
      }))

      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        // Session complete
        setTimeout(() => {
          loadFlashcards()
          setSessionStats({ correct: 0, incorrect: 0 })
        }, 1500)
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading flashcards...</p>
        </div>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold mb-2">No flashcards available</h2>
        <p className="text-gray-600 mb-6">Upload some SRT files to start learning!</p>
        <a
          href="/upload"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Upload SRT File
        </a>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <div className="flex gap-4 text-sm">
          <span className="text-green-600 font-semibold">
            ✓ {sessionStats.correct}
          </span>
          <span className="text-red-600 font-semibold">
            ✗ {sessionStats.incorrect}
          </span>
        </div>
      </div>

      <div className="mb-4 text-center">
        <span className="text-sm text-gray-600">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      {currentIndex < flashcards.length && (
        <Flashcard
          flashcard={flashcards[currentIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  )
}