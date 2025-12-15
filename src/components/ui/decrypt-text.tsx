"use client"

import { useEffect, useState } from "react"

interface DecryptTextProps {
  text: string
  speed?: number
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

export function DecryptText({
  text,
  speed = 30,
  className = "",
  as: Component = "span"
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsComplete(true)
      }

      iteration += 1 / 3
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <Component className={className}>
      {isComplete ? text : displayText}
    </Component>
  )
}
