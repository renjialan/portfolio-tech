"use client"

import { useEffect, useState, useCallback } from "react"
import { Sparkles, PartyPopper, Rocket } from "lucide-react"

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
]

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  rotation: number
  scale: number
}

export function KonamiEasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [showMessage, setShowMessage] = useState(false)

  const createParticles = useCallback(() => {
    const emojis = ["🚀", "✨", "🎉", "💚", "⚡", "🌟", "💻", "🎮"]
    const newParticles: Particle[] = []

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 1
      })
    }

    setParticles(newParticles)

    // Clear particles after animation
    setTimeout(() => setParticles([]), 4000)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length)
      setInputSequence(newSequence)

      // Check if code matches
      if (newSequence.length === KONAMI_CODE.length &&
          newSequence.every((key, i) => key === KONAMI_CODE[i])) {
        setIsActivated(true)
        setShowMessage(true)
        createParticles()

        // Reset after some time
        setTimeout(() => {
          setIsActivated(false)
          setShowMessage(false)
          setInputSequence([])
        }, 5000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [inputSequence, createParticles])

  if (!isActivated && particles.length === 0) return null

  return (
    <>
      {/* Confetti particles */}
      <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-fall"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
              fontSize: "2rem",
              animation: `fall ${3 + Math.random() * 2}s linear forwards`
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Achievement message */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[301]">
          <div className="bg-background/95 backdrop-blur-xl border border-green-medium/50 rounded-2xl p-8 animate-bounce-in shadow-2xl shadow-green-dark/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-green-dark/40">
                <PartyPopper className="w-8 h-8 text-green-light" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-light">Achievement Unlocked!</h3>
                <p className="text-text-muted">Konami Code Master</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm">
              You found the secret! You're clearly a person of culture. 🎮
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-text-muted">
              <Rocket className="w-4 h-4" />
              <span>+1000 XP</span>
              <Sparkles className="w-4 h-4 ml-2" />
              <span>Easter Egg Hunter Badge</span>
            </div>
          </div>
        </div>
      )}

      {/* Progress indicator - shows how close user is to completing the code */}
      {inputSequence.length > 0 && !isActivated && (
        <div className="fixed bottom-4 left-4 z-[302] pointer-events-none">
          <div className="flex gap-1">
            {KONAMI_CODE.slice(0, inputSequence.length).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  inputSequence[i] === KONAMI_CODE[i] ? "bg-green-light" : "bg-red-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

// Also export a secret terminal command Easter egg
export function useSecretCommand(command: string, callback: () => void) {
  const [typed, setTyped] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        const newTyped = (typed + e.key).slice(-command.length)
        setTyped(newTyped)
        if (newTyped.toLowerCase() === command.toLowerCase()) {
          callback()
          setTyped("")
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [typed, command, callback])
}
