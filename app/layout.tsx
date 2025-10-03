import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vocab Learning',
  description: 'Learn vocabulary from movies and TV shows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  href="/"
                  className="inline-flex items-center px-1 pt-1 text-lg font-semibold text-primary"
                >
                  Vocab Learning
                </Link>
                <Link
                  href="/upload"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  Upload
                </Link>
                <Link
                  href="/flashcards"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  Flashcards
                </Link>
                <Link
                  href="/progress"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary"
                >
                  Progress
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}