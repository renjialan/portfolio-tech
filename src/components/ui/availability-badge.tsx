"use client"

import { cn } from "@/lib/utils"

interface AvailabilityBadgeProps {
  status?: "available" | "busy" | "away"
  text?: string
  className?: string
  showPulse?: boolean
}

export function AvailabilityBadge({
  status = "available",
  text = "Open to opportunities",
  className,
  showPulse = true
}: AvailabilityBadgeProps) {
  const statusColors = {
    available: {
      bg: "bg-green-dark/20",
      border: "border-green-medium/40",
      dot: "bg-green-light",
      text: "text-green-light"
    },
    busy: {
      bg: "bg-red-900/20",
      border: "border-red-500/40",
      dot: "bg-red-400",
      text: "text-red-400"
    },
    away: {
      bg: "bg-yellow-900/20",
      border: "border-yellow-500/40",
      dot: "bg-yellow-400",
      text: "text-yellow-400"
    }
  }

  const colors = statusColors[status]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm",
        colors.bg,
        colors.border,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {showPulse && status === "available" && (
          <span className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
            colors.dot
          )} />
        )}
        <span className={cn(
          "relative inline-flex rounded-full h-2 w-2",
          colors.dot
        )} />
      </span>
      <span className={cn("text-xs font-medium", colors.text)}>
        {text}
      </span>
    </div>
  )
}
