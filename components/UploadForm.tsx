'use client'

import { useState, FormEvent } from 'react'
import { uploadSRT } from '@/lib/api'


interface UploadFormProps {
    onSuccess?: () => void
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
    const [file, setFile] = useState<File | null>(null)
    const [title, setTitle] = useState('')
    const [type, setType] = useState<'movie' | 'tvshow' | 'other'>('movie')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!file || !title) {
            setMessage({ type: 'error', text: 'Please fill in all fields' })
            return
        }

        setLoading(true)
        setMessage(null)

        try {
            const formData = new FormData()
            formData.append('srtFile', file)
            formData.append('title', title)
            formData.append('type', type)

            const result = await uploadSRT(formData)

            setMessage({
                type: 'success',
                text: `Successfully processed ${result.wordsProcessed} words!`
            })

            setFile(null)
            setTitle('')
            setType('movie')

            if (onSuccess) onSuccess()
        } catch (error: any) {
            setMessage({
                type: 'error',
                text: error.response?.data?.error || 'Upload failed'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter movie/show title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="movie">Movie</option>
                        <option value="tvshow">TV Show</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        SRT File
                    </label>
                    <input
                        type="file"
                        accept=".srt"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>

                {message && (
                    <div
                        className={`p-4 rounded-lg ${message.type === 'success'
                            ? 'bg-green-50 text-green-800'
                            : 'bg-red-50 text-red-800'
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Upload & Process'}
                </button>
            </form>
        </div>
    )
}