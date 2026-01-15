"use client"

import { useEffect, useState } from "react"

interface ScrollProgressProps {
  showPercentage?: boolean
}

export function ScrollProgress({ showPercentage = false }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-background-secondary z-[55]">
        <div
          className="h-full bg-gradient-to-r from-green-dark via-green-medium to-green-light transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Side progress indicator (dots) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
        {["hero", "work", "projects", "about", "skills", "contact"].map((section, i) => (
          <button
            key={section}
            onClick={() => {
              const el = document.getElementById(section === "hero" ? "top" : section)
              if (el) {
                el.scrollIntoView({ behavior: "smooth" })
              } else if (section === "hero") {
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              progress > (i * 100) / 6 && progress <= ((i + 1) * 100) / 6
                ? "bg-green-light scale-150"
                : "bg-text-muted/30 hover:bg-text-muted"
            }`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          />
        ))}
      </div>

      {/* Percentage indicator */}
      {showPercentage && progress > 5 && (
        <div className="fixed bottom-20 right-4 z-50 font-mono text-xs text-text-muted bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border">
          {Math.round(progress)}%
        </div>
      )}
    </>
  )
}
