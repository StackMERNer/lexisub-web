'use client'

import { useState } from 'react'
import UploadForm from '@/components/UploadForm'
import { MediaSource } from '@/types'
import { getMediaSources } from '@/lib/api'

export default function UploadPage() {
  const [mediaSources, setMediaSources] = useState<MediaSource[]>([])
  const [loading, setLoading] = useState(false)

  const loadMediaSources = async () => {
    setLoading(true)
    try {
      const data = await getMediaSources()
      setMediaSources(data.mediaSources)
    } catch (error) {
      console.error('Error loading media sources:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSuccess = () => {
    loadMediaSources()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upload SRT File</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <UploadForm onSuccess={handleUploadSuccess} />
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Uploads</h2>
              <button
                onClick={loadMediaSources}
                className="text-sm text-primary hover:underline"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : mediaSources.length === 0 ? (
              <p className="text-gray-500">No uploads yet</p>
            ) : (
              <div className="space-y-3">
                {mediaSources.map((media) => (
                  <div
                    key={media._id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <h3 className="font-semibold">{media.title}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      <span className="capitalize">{media.type}</span>
                      {' • '}
                      <span>{media.wordCount} words</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(media.processedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}