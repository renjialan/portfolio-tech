"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

type CursorVariant = "default" | "pointer" | "text" | "hidden"

interface CustomCursorProps {
  enabled?: boolean
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [variant, setVariant] = useState<CursorVariant>("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    // Check if touch device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Detect what we're hovering over
      const target = e.target as HTMLElement

      if (target.closest("a, button, [role='button']")) {
        setVariant("pointer")
      } else if (target.closest("input, textarea, [contenteditable]")) {
        setVariant("text")
      } else {
        setVariant("default")
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
    }
  }, [enabled])

  if (!enabled) return null

  const variantStyles = {
    default: {
      outer: "w-8 h-8 border-green-light/50",
      inner: "w-2 h-2 bg-green-light"
    },
    pointer: {
      outer: "w-12 h-12 border-green-medium bg-green-dark/20",
      inner: "w-1 h-1 bg-green-light"
    },
    text: {
      outer: "w-6 h-6 border-blue-light/50",
      inner: "w-0.5 h-4 bg-blue-light rounded-none"
    },
    hidden: {
      outer: "w-0 h-0 opacity-0",
      inner: "w-0 h-0 opacity-0"
    }
  }

  const styles = variantStyles[variant]

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed pointer-events-none z-[400] hidden lg:flex items-center justify-center",
          "rounded-full border transition-all duration-150 ease-out",
          isClicking ? "scale-75" : "scale-100",
          isVisible ? "opacity-100" : "opacity-0",
          styles.outer
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) ${isClicking ? "scale(0.75)" : "scale(1)"}`
        }}
      >
        <div
          className={cn(
            "rounded-full transition-all duration-150",
            styles.inner
          )}
        />
      </div>

      {/* Trail cursor (follows with delay) */}
      <div
        ref={trailRef}
        className={cn(
          "fixed pointer-events-none z-[399] hidden lg:block",
          "w-6 h-6 rounded-full bg-green-medium/10 blur-sm",
          "transition-all duration-500 ease-out",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Styles to hide cursor on interactive elements */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}

// Section-aware cursor hook
export function useSectionCursor() {
  const [currentSection, setCurrentSection] = useState("hero")

  useEffect(() => {
    const sections = ["hero", "work", "projects", "about", "skills", "contact"]

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return currentSection
}
