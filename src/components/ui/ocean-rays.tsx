"use client"

import { useEffect, useRef } from "react"

interface OceanRaysProps {
  rayCount?: number
  baseColor?: string
  rayColor?: string
  speed?: number
  className?: string
}

export function OceanRays({
  rayCount = 8,
  baseColor = "#001a2c",
  rayColor = "#0d4f6e",
  speed = 1,
  className = ""
}: OceanRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    // Ray properties
    const rays: Array<{
      x: number
      width: number
      speed: number
      opacity: number
      phase: number
    }> = []

    for (let i = 0; i < rayCount; i++) {
      rays.push({
        x: Math.random() * canvas.width,
        width: 80 + Math.random() * 200,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.03 + Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2
      })
    }

    const animate = () => {
      time += 0.01 * speed

      // Deep ocean gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(0.3, "#002438")
      gradient.addColorStop(0.7, "#001520")
      gradient.addColorStop(1, "#000a10")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw light rays from top
      rays.forEach((ray) => {
        const sway = Math.sin(time * ray.speed + ray.phase) * 50
        const pulseOpacity = ray.opacity * (0.7 + 0.3 * Math.sin(time * 0.5 + ray.phase))

        // Create ray gradient (brightest at top, fading down)
        const rayGradient = ctx.createLinearGradient(
          ray.x + sway,
          0,
          ray.x + sway + ray.width * 0.5,
          canvas.height
        )
        rayGradient.addColorStop(0, `rgba(100, 200, 255, ${pulseOpacity * 1.5})`)
        rayGradient.addColorStop(0.1, `rgba(60, 180, 220, ${pulseOpacity})`)
        rayGradient.addColorStop(0.5, `rgba(30, 120, 180, ${pulseOpacity * 0.5})`)
        rayGradient.addColorStop(1, "rgba(0, 60, 100, 0)")

        ctx.beginPath()
        // Cone shape - narrow at top, wide at bottom
        const topWidth = ray.width * 0.3
        const bottomWidth = ray.width * 2

        ctx.moveTo(ray.x + sway - topWidth / 2, 0)
        ctx.lineTo(ray.x + sway + topWidth / 2, 0)
        ctx.lineTo(ray.x + sway * 2 + bottomWidth / 2, canvas.height)
        ctx.lineTo(ray.x + sway * 2 - bottomWidth / 2, canvas.height)
        ctx.closePath()

        ctx.fillStyle = rayGradient
        ctx.fill()
      })

      // Add floating particles (dust/plankton in water)
      ctx.fillStyle = "rgba(150, 220, 255, 0.3)"
      for (let i = 0; i < 30; i++) {
        const particleX = (Math.sin(time * 0.3 + i * 0.5) * 0.5 + 0.5) * canvas.width
        const particleY = ((time * 20 + i * 100) % (canvas.height + 50)) - 25
        const size = 1 + Math.sin(time + i) * 0.5

        ctx.beginPath()
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Caustics effect (light patterns on surfaces)
      ctx.globalCompositeOperation = "screen"
      for (let i = 0; i < 5; i++) {
        const causticX = canvas.width * 0.2 + Math.sin(time * 0.7 + i) * canvas.width * 0.3
        const causticY = canvas.height * 0.3 + Math.cos(time * 0.5 + i * 2) * canvas.height * 0.2

        const causticGradient = ctx.createRadialGradient(
          causticX, causticY, 0,
          causticX, causticY, 150 + Math.sin(time + i) * 50
        )
        causticGradient.addColorStop(0, "rgba(100, 200, 255, 0.05)")
        causticGradient.addColorStop(0.5, "rgba(50, 150, 200, 0.02)")
        causticGradient.addColorStop(1, "rgba(0, 100, 150, 0)")

        ctx.fillStyle = causticGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.globalCompositeOperation = "source-over"

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [rayCount, baseColor, rayColor, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: baseColor }}
    />
  )
}
