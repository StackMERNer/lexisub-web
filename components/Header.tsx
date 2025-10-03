"use client"

import Link from "next/link"
import Image from "next/image"
import { Logo } from "@/lib/images"
import { ModeToggle } from "@/components/ModeToggle"

export function Header() {
    return (
        <nav className="shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side (Logo + Links) */}
                    <div className="flex space-x-8 items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center px-1 pt-1 text-lg font-semibold text-primary"
                        >
                            <Image
                                src={Logo}
                                height={40}
                                width={200}
                                alt="LexiSub Logo, learn vocabularies before watching."
                            />
                        </Link>
                        <Link
                            href="/upload"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-100"
                        >
                            Upload
                        </Link>
                        <Link
                            href="/flashcards"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-100"
                        >
                            Flashcards
                        </Link>
                        <Link
                            href="/progress"
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-100"
                        >
                            Progress
                        </Link>
                    </div>

                    {/* Right side (Dark mode toggle) */}
                    <div className="flex items-center">
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}
