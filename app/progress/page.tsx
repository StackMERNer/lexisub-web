'use client'

import { useState, useEffect } from 'react'
import ProgressChart from '@/components/ProgressChart'
import { getProgress } from '@/lib/api'
import { ProgressStats } from '@/types'

const TEMP_USER_ID = '507f1f77bcf86cd799439011'

export default function ProgressPage() {
  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    setLoading(true)
    try {
      const data = await getProgress(TEMP_USER_ID)
      setStats(data)
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Progress</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-sm text-gray-600 mb-1">Total Words</div>
          <div className="text-3xl font-bold text-gray-900">
            {stats?.totalWords || 0}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-sm text-gray-600 mb-1">Mastered</div>
          <div className="text-3xl font-bold text-green-600">
            {stats?.mastered || 0}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-sm text-gray-600 mb-1">Learning</div>
          <div className="text-3xl font-bold text-blue-600">
            {stats?.learning || 0}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-sm text-gray-600 mb-1">Reviewing</div>
          <div className="text-3xl font-bold text-yellow-600">
            {stats?.reviewing || 0}
          </div>
        </div>
      </div>

      {stats && <ProgressChart stats={stats} />}
    </div>
  )
}