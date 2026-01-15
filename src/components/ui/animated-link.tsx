"use client"

import { cn } from "@/lib/utils"

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  underlineStyle?: "slide" | "grow" | "fade" | "gradient"
}

export function AnimatedLink({
  href,
  children,
  className,
  external = false,
  underlineStyle = "slide"
}: AnimatedLinkProps) {
  const underlineClasses = {
    slide: "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
    grow: "after:absolute after:bottom-0 after:left-1/2 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full",
    fade: "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-current after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100",
    gradient: "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-green-light after:to-blue-light after:transition-transform after:duration-300 hover:after:scale-x-100"
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "relative inline-block transition-colors duration-200",
        underlineClasses[underlineStyle],
        className
      )}
    >
      {children}
    </a>
  )
}
