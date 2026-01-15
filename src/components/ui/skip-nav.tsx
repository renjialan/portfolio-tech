"use client"

import { cn } from "@/lib/utils"

interface SkipNavProps {
  mainId?: string
  className?: string
}

export function SkipNav({ mainId = "main-content", className }: SkipNavProps) {
  return (
    <a
      href={`#${mainId}`}
      className={cn(
        "fixed top-0 left-0 z-[200] px-4 py-2 m-2",
        "bg-green-dark text-green-light font-medium text-sm rounded-lg",
        "border border-green-medium/50",
        "transform -translate-y-full focus:translate-y-0",
        "transition-transform duration-200",
        "focus:outline-none focus:ring-2 focus:ring-green-light focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
    >
      Skip to main content
    </a>
  )
}
