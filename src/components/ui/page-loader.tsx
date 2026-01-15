"use client"

import { useEffect, useState } from "react"
import { Zap } from "lucide-react"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Accelerate as we go
        const increment = Math.random() * 15 + (prev > 80 ? 10 : 5)
        return Math.min(prev + increment, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      // Start fade out animation
      setTimeout(() => setFadeOut(true), 200)
      // Remove loader completely
      setTimeout(() => setIsLoading(false), 700)
    }
  }, [progress])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo animation */}
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping">
          <Zap className="w-12 h-12 text-green-medium/30" />
        </div>
        <Zap className="w-12 h-12 text-green-light animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="font-mono text-sm text-text-secondary mb-6">
        <span className="text-green-light">&gt;</span> Initializing...
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-background-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-dark via-green-medium to-green-light transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress percentage */}
      <div className="mt-3 font-mono text-xs text-text-muted">
        {Math.round(progress)}%
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-dark/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-medium/10 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  )
}
