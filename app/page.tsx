import Link from 'next/link'

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
        Learn Vocabulary from Movies & TV Shows
      </h1>
      <p className="text-xl text-gray-600 mb-8 dark:text-gray-100">
        Upload subtitle files and master new words with spaced repetition
      </p>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <Link href="/upload">
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer dark:border dark:border-gray-700">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-xl font-semibold mb-2">Upload SRT</h3>
            <p className="text-gray-600">
              Upload subtitle files from your favorite movies and shows
            </p>
          </div>
        </Link>

        <Link href="/flashcards">
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer dark:border dark:border-gray-700">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-semibold mb-2">Learn Words</h3>
            <p className="text-gray-600">
              Practice with flashcards using spaced repetition
            </p>
          </div>
        </Link>

        <Link href="/progress">
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer dark:border dark:border-gray-700">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your learning journey and achievements
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}