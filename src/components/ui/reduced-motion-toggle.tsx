"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { Sparkles, SparklesIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReducedMotionContextType {
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
}

const ReducedMotionContext = createContext<ReducedMotionContextType | undefined>(undefined)

export function useReducedMotion() {
  const context = useContext(ReducedMotionContext)
  if (!context) {
    return { reducedMotion: false, setReducedMotion: () => {} }
  }
  return context
}

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  // Check system preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    // Check localStorage
    const stored = localStorage.getItem("reducedMotion")
    if (stored !== null) {
      setReducedMotion(stored === "true")
    }
  }, [])

  // Apply reduced motion class to document
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
    localStorage.setItem("reducedMotion", String(reducedMotion))
  }, [reducedMotion])

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion, setReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}

interface ReducedMotionToggleProps {
  className?: string
}

export function ReducedMotionToggle({ className }: ReducedMotionToggleProps) {
  const { reducedMotion, setReducedMotion } = useReducedMotion()

  return (
    <button
      onClick={() => setReducedMotion(!reducedMotion)}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
        "border text-sm",
        reducedMotion
          ? "bg-background-secondary border-border text-text-muted"
          : "bg-green-dark/20 border-green-medium/40 text-green-light",
        "hover:border-green-medium/60",
        className
      )}
      title={reducedMotion ? "Enable animations" : "Reduce animations"}
    >
      {reducedMotion ? (
        <SparklesIcon className="w-4 h-4" />
      ) : (
        <Sparkles className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {reducedMotion ? "Enable motion" : "Reduce motion"}
      </span>
    </button>
  )
}
