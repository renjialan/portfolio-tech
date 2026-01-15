"use client"

import { useCallback, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
  velocityX: number
  velocityY: number
}

const colors = [
  "#9FFFCB", // green-light
  "#7AE582", // green-medium
  "#25A18E", // green-dark
  "#00A5CF", // blue-light
  "#FFD700", // gold
  "#FF69B4", // pink
]

export function useConfetti() {
  const [particles, setParticles] = useState<Particle[]>([])

  const fire = useCallback((x?: number, y?: number) => {
    const centerX = x ?? window.innerWidth / 2
    const centerY = y ?? window.innerHeight / 2

    const newParticles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      const angle = (Math.random() * 360 * Math.PI) / 180
      const velocity = Math.random() * 10 + 5

      newParticles.push({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity - 5
      })
    }

    setParticles(newParticles)

    // Clear after animation
    setTimeout(() => setParticles([]), 3000)
  }, [])

  const ConfettiComponent = () => {
    if (particles.length === 0) return null

    return (
      <div className="fixed inset-0 pointer-events-none z-[500] overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-confetti-fall"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              transform: `rotate(${particle.rotation}deg)`,
              ["--vx" as string]: `${particle.velocityX}px`,
              ["--vy" as string]: `${particle.velocityY}px`,
              animation: "confetti-fall 2.5s ease-out forwards"
            }}
          />
        ))}
        <style jsx>{`
          @keyframes confetti-fall {
            0% {
              transform: translate(0, 0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translate(calc(var(--vx) * 20), calc(var(--vy) * 20 + 500px)) rotate(720deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }

  return { fire, ConfettiComponent }
}

// Standalone confetti button wrapper
interface ConfettiButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ConfettiButton({ children, className, onClick }: ConfettiButtonProps) {
  const { fire, ConfettiComponent } = useConfetti()

  const handleClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    fire(rect.left + rect.width / 2, rect.top + rect.height / 2)
    onClick?.()
  }

  return (
    <>
      <button className={className} onClick={handleClick}>
        {children}
      </button>
      <ConfettiComponent />
    </>
  )
}
