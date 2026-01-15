"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  company?: string
  type: "work" | "education" | "achievement"
}

const events: TimelineEvent[] = [
  {
    id: "1",
    year: "2025",
    title: "Graduating from UMich",
    description: "B.S. in Computer Science with 3.9 GPA",
    company: "University of Michigan",
    type: "education"
  },
  {
    id: "2",
    year: "2024",
    title: "Full Stack AI Product Builder",
    description: "Built AI-powered gifting platform, $37k revenue",
    company: "Sugarwish",
    type: "work"
  },
  {
    id: "3",
    year: "2024",
    title: "YC Top 10%",
    description: "RAG Code Search Engine recognized in YC batch",
    type: "achievement"
  },
  {
    id: "4",
    year: "2023",
    title: "AI PM Intern",
    description: "Improved LLM accuracy by 32%",
    company: "HPE",
    type: "work"
  },
  {
    id: "5",
    year: "2023",
    title: "VP Product",
    description: "Led 100-person dev organization",
    company: "VOID Tech",
    type: "work"
  },
  {
    id: "6",
    year: "2022",
    title: "Product Ops Intern",
    description: "Drove 8% MRR growth",
    company: "Devv AI",
    type: "work"
  }
]

export function InteractiveTimeline() {
  const [activeEvent, setActiveEvent] = useState(events[0].id)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const typeColors = {
    work: {
      bg: "bg-green-dark/30",
      border: "border-green-medium/50",
      dot: "bg-green-light"
    },
    education: {
      bg: "bg-blue-medium/30",
      border: "border-blue-light/50",
      dot: "bg-blue-light"
    },
    achievement: {
      bg: "bg-yellow-900/30",
      border: "border-yellow-500/50",
      dot: "bg-yellow-400"
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = events.findIndex(ev => ev.id === activeEvent)
      if (e.key === "ArrowRight" && currentIndex < events.length - 1) {
        setActiveEvent(events[currentIndex + 1].id)
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setActiveEvent(events[currentIndex - 1].id)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeEvent])

  const active = events.find(e => e.id === activeEvent) || events[0]

  return (
    <div className="relative" ref={containerRef}>
      {/* Timeline track */}
      <div
        ref={timelineRef}
        className="relative overflow-x-auto scrollbar-hide pb-4"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div className="flex items-center gap-0 min-w-max px-4">
          {/* Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2" />

          {events.map((event, index) => {
            const colors = typeColors[event.type]
            const isActive = event.id === activeEvent

            return (
              <div key={event.id} className="relative flex flex-col items-center">
                {/* Connector line */}
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 w-16 sm:w-24 h-[2px] bg-border -translate-y-1/2 -translate-x-full" />
                )}

                {/* Event node */}
                <button
                  onClick={() => setActiveEvent(event.id)}
                  className={cn(
                    "relative z-10 flex flex-col items-center transition-all duration-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-light focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "mx-8 sm:mx-12"
                  )}
                >
                  {/* Year label */}
                  <span className={cn(
                    "text-xs font-mono mb-2 transition-colors duration-300",
                    isActive ? "text-green-light" : "text-text-muted"
                  )}>
                    {event.year}
                  </span>

                  {/* Dot */}
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all duration-300",
                    isActive
                      ? `${colors.dot} border-transparent scale-125`
                      : "bg-background border-border hover:border-green-medium/50"
                  )}>
                    {isActive && (
                      <div className={cn(
                        "absolute inset-0 rounded-full animate-ping opacity-50",
                        colors.dot
                      )} />
                    )}
                  </div>

                  {/* Title preview */}
                  <span className={cn(
                    "text-xs mt-2 max-w-20 text-center line-clamp-2 transition-colors duration-300",
                    isActive ? "text-text-primary" : "text-text-muted"
                  )}>
                    {event.title}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Active event detail */}
      <div className={cn(
        "mt-6 p-6 rounded-xl border backdrop-blur-sm transition-all duration-300",
        typeColors[active.type].bg,
        typeColors[active.type].border
      )}>
        <div className="flex items-start justify-between mb-2">
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-mono",
            typeColors[active.type].bg,
            "text-text-primary"
          )}>
            {active.type.toUpperCase()}
          </span>
          <span className="text-sm font-mono text-text-muted">{active.year}</span>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-1">{active.title}</h3>
        {active.company && (
          <p className="text-sm text-green-light mb-2">{active.company}</p>
        )}
        <p className="text-sm text-text-secondary">{active.description}</p>
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-text-muted mt-4 hidden sm:block">
        Use ← → arrow keys to navigate
      </p>
    </div>
  )
}
