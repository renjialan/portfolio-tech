"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  rippleColor?: string
  onClick?: () => void
  disabled?: boolean
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(159, 255, 203, 0.4)",
  onClick,
  disabled = false
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const ref = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const id = Date.now()

    setRipples(prev => [...prev, { id, x, y, size }])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 600)

    onClick?.()
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      disabled={disabled}
      className={cn("relative overflow-hidden", className)}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
