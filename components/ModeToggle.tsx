"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Ensure client-side hydration is complete
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // Don’t render until mounted
        return null
    }

    return (

        <Button
            variant="outline"
            size="lg"

            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full h-[45px] w-[45px] p-0"
        >
            {theme === "light" ? (
                <Moon className="h-6 w-6" />
            ) : (
                <Sun className="h-6 w-6" />
            )}
        </Button>

    )
}
