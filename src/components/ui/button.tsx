import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "glow"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-medium disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-green-medium text-background hover:bg-green-dark hover:glow-green-subtle",
      ghost: "text-green-light hover:bg-green-dark/20 hover:text-green-medium",
      outline: "border border-green-dark text-green-light hover:bg-green-dark/20 hover:border-green-medium",
      glow: "bg-green-medium text-background hover:bg-green-dark glow-green hover:animate-glow-pulse"
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-8 text-lg"
    }

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }