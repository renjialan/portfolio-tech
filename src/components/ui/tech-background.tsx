"use client"

import { useEffect, useRef, useState } from "react"
import Silk from "./silk"

interface TechBackgroundProps {
  variant?: "primary" | "secondary" | "subtle" | "minimal" | "accent"
  className?: string
}

export function TechBackground({ variant = "subtle", className = "" }: TechBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const configs = {
    primary: {
      color: "#0a3d5c", // deep teal-blue (between blue-medium and blue-dark)
      speed: 5,
      scale: 1,
      noiseIntensity: 1.5,
      rotation: 0,
      opacity: "opacity-70",
      mixBlendMode: "normal"
    },
    secondary: {
      color: "#004E64", // blue-medium (deep navy)
      speed: 2.5,
      scale: 0.3,
      noiseIntensity: 1.5,
      rotation: 3.14,
      opacity: "opacity-25",
      mixBlendMode: "overlay"
    },
    subtle: {
      color: "#00A5CF", // blue-light
      speed: 2,
      scale: 0.3,
      noiseIntensity: 1.2,
      rotation: 2.5,
      opacity: "opacity-15",
      mixBlendMode: "soft-light"
    },
    minimal: {
      color: "#0d4a6b", // muted deep blue
      speed: 1.5,
      scale: 0.3,
      noiseIntensity: 0.8,
      rotation: 1.5,
      opacity: "opacity-10",
      mixBlendMode: "multiply"
    },
    accent: {
      color: "#25A18E", // teal-green for accent highlights
      speed: 4,
      scale: 0.3,
      noiseIntensity: 2.0,
      rotation: 6.28,
      opacity: "opacity-25",
      mixBlendMode: "screen"
    }
  }

  const config = configs[variant]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { rootMargin: "100px" } // Start loading slightly before entering viewport
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${config.opacity} ${className}`}
      style={{
        mixBlendMode: config.mixBlendMode as any,
        overflow: 'hidden'
      }}
    >
      {isVisible && (
        <Silk
          color={config.color}
          speed={config.speed}
          scale={config.scale}
          noiseIntensity={config.noiseIntensity}
          rotation={config.rotation}
        />
      )}
    </div>
  )
}