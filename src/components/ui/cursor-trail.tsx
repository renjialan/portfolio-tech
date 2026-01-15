"use client"

import { useEffect, useRef, useState } from "react"

interface Point {
  x: number
  y: number
  age: number
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = "ontouchstart" in window
    if (isTouchDevice) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)

      // Add new point
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0
      })

      // Limit points
      if (pointsRef.current.length > 50) {
        pointsRef.current.shift()
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw points
      pointsRef.current = pointsRef.current.filter(point => {
        point.age += 1
        return point.age < 30
      })

      if (pointsRef.current.length > 1) {
        ctx.beginPath()
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y)

        for (let i = 1; i < pointsRef.current.length; i++) {
          const point = pointsRef.current[i]
          const opacity = 1 - point.age / 30
          const size = (1 - point.age / 30) * 3

          // Draw glow trail
          ctx.lineTo(point.x, point.y)

          // Draw point
          ctx.save()
          ctx.beginPath()
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(122, 229, 130, ${opacity * 0.6})`
          ctx.fill()
          ctx.restore()
        }

        ctx.strokeStyle = "rgba(122, 229, 130, 0.3)"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.stroke()
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99] hidden lg:block"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
    />
  )
}
