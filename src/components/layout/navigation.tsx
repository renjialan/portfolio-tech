"use client"

import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  className?: string
}

const navLinks = [
  { href: "#work", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export function Navigation({ className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll to update active section and nav background
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state for nav background
      setIsScrolled(window.scrollY > 50)

      // Find active section
      const sections = navLinks.map(link => link.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 transition-all duration-300",
        isScrolled && "pt-2 sm:pt-3"
      )}>
        <nav className={cn(
          "flex items-center gap-4 sm:gap-12 px-4 sm:px-8 py-2.5",
          "backdrop-blur-2xl",
          "rounded-[999px]",
          "transition-all duration-300",
          isScrolled
            ? "bg-background/80 border border-green-medium/20"
            : "bg-white/[0.03]",
          className
        )}>
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <Zap className="h-5 w-5 text-green-light" />
            <span className="text-sm font-medium tracking-tight text-white">
              Funstuff
            </span>
          </a>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ href, label }) => (
              <button
                key={href}
                onClick={() => scrollToSection(href)}
                className={cn(
                  "text-xs tracking-wide transition-colors duration-200 min-h-[44px] flex items-center",
                  activeSection === href.slice(1)
                    ? "text-green-light"
                    : "text-white/50 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("#contact")}
              className="text-xs tracking-wide text-green-light hover:text-green-medium transition-colors duration-200 min-h-[44px] flex items-center"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[70] w-[280px] max-w-[85vw] bg-background/95 backdrop-blur-2xl border-l border-green-medium/20 transition-transform duration-300 ease-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors rounded-xl hover:bg-white/5"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="px-4 py-4">
          <div className="space-y-1">
            {navLinks.map(({ href, label }, index) => (
              <button
                key={href}
                onClick={() => scrollToSection(href)}
                className={cn(
                  "w-full text-left px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 min-h-[52px] flex items-center",
                  activeSection === href.slice(1)
                    ? "text-green-light bg-green-dark/20 border border-green-medium/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
                style={{
                  animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms"
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => scrollToSection("#contact")}
              className="w-full px-4 py-4 rounded-xl text-base font-medium bg-gradient-to-r from-green-dark to-green-medium text-white hover:from-green-medium hover:to-green-light transition-all duration-300 min-h-[52px] flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Let's Talk
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-text-muted font-mono">
              PM who codes
            </p>
            <p className="text-xs text-green-medium mt-1">
              Open to opportunities
            </p>
          </div>
        </nav>
      </div>
    </>
  )
}