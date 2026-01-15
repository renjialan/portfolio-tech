"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { Terminal, Github, Linkedin, Mail, ChevronDown, Zap } from "lucide-react"

// Dynamically import LightRays to avoid SSR issues
const LightRays = dynamic(() => import("@/components/LightRays"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#001a2c]" />
})

// Typing animation hook
function useTypingEffect(text: string, speed: number = 50, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setHasStarted(true)
    }, startDelay)

    return () => clearTimeout(delayTimer)
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted) return

    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, hasStarted])

  return { displayText, isComplete, hasStarted }
}

// Blinking cursor component
function Cursor({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!show) return
    const interval = setInterval(() => setVisible(v => !v), 530)
    return () => clearInterval(interval)
  }, [show])

  if (!show) return null
  return <span className={`${visible ? 'opacity-100' : 'opacity-0'} text-green-light`}>_</span>
}

// Terminal line component
function TerminalLine({
  prefix = "~",
  command,
  output,
  delay = 0,
  onComplete
}: {
  prefix?: string
  command: string
  output?: React.ReactNode
  delay?: number
  onComplete?: () => void
}) {
  const { displayText, isComplete } = useTypingEffect(command, 40, delay)

  useEffect(() => {
    if (isComplete && onComplete) {
      const timer = setTimeout(onComplete, 100)
      return () => clearTimeout(timer)
    }
  }, [isComplete, onComplete])

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 font-mono text-sm md:text-base">
        <span className="text-green-medium">$</span>
        <span className="text-blue-light">{prefix}</span>
        <span className="text-text-primary">{displayText}</span>
        <Cursor show={!isComplete} />
      </div>
      {isComplete && output && (
        <div className="pl-4 text-text-secondary animate-fadeIn">
          {output}
        </div>
      )}
    </div>
  )
}

export function HeroPortfolio() {
  const [showSecondLine, setShowSecondLine] = useState(false)
  const [showThirdLine, setShowThirdLine] = useState(false)
  const [showContent, setShowContent] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep ocean background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#001a2c] via-[#002438] to-[#000a10]" />

      {/* Light rays - underwater sunbeams effect */}
      <div className="absolute inset-0 z-[1]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4ecdc4"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.15}
          distortion={0.03}
          fadeDistance={1.2}
          saturation={0.8}
        />
      </div>

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,10,16,0.4) 70%, rgba(0,10,16,0.8) 100%)'
      }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Terminal Window */}
        <div className="relative mb-8 sm:mb-12">
          {/* Terminal chrome */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-background/80 backdrop-blur-md border border-green-medium/30 rounded-t-lg sm:rounded-t-xl">
            <div className="flex gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[10px] sm:text-xs font-mono text-text-muted flex items-center justify-center gap-1.5 sm:gap-2">
                <Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="hidden xs:inline">olive@portfolio ~ zsh</span>
                <span className="xs:hidden">~ zsh</span>
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-4 sm:p-6 md:p-8 bg-background/60 backdrop-blur-xl border-x border-b border-green-medium/30 rounded-b-lg sm:rounded-b-xl space-y-3 sm:space-y-4">
            <TerminalLine
              command="whoami"
              output={
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
                    <span className="bg-gradient-to-r from-[#4ecdc4] via-[#44a08d] to-[#093028] bg-clip-text text-transparent">Olive Ren</span>
                  </h1>
                  <p className="text-lg md:text-xl text-text-secondary">
                    AI Product Builder <span className="text-green-light">@ Full-Stack</span>
                  </p>
                  <p className="text-sm text-text-muted font-mono">
                    UMich '25 · CS + UX · GPA 3.9
                  </p>
                </div>
              }
              onComplete={() => setShowSecondLine(true)}
            />

            {showSecondLine && (
              <TerminalLine
                command="cat ./impact.txt"
                delay={300}
                output={
                  <div className="space-y-2">
                    <p className="text-sm md:text-base leading-relaxed max-w-2xl">
                      I ship AI products that drive revenue. Built features generating <span className="text-green-light font-semibold">$37k in 2 weeks</span>,
                      improved <span className="text-green-light font-semibold">CSAT by 10%</span>, and increased <span className="text-green-light font-semibold">user activation by 20%</span>.
                    </p>
                    <p className="text-xs md:text-sm text-text-muted">
                      Currently building agentic AI features at Sugarwish. Previously at HPE AI and Devv AI.
                    </p>
                  </div>
                }
                onComplete={() => setShowThirdLine(true)}
              />
            )}

            {showThirdLine && (
              <TerminalLine
                prefix="~"
                command="echo $APPROACH"
                delay={300}
                output={
                  <p className="text-green-medium italic text-sm md:text-base">
                    "Ship fast, validate with data, iterate with users."
                  </p>
                }
                onComplete={() => setShowContent(true)}
              />
            )}
          </div>
        </div>

        {/* CTA Row - appears after terminal animation */}
        <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              {[
                { icon: Github, href: "https://github.com/jialanren", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/jialanren", label: "LinkedIn" },
                { icon: Mail, href: "mailto:oliveren@umich.edu", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative p-3 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl border border-green-medium/30 bg-background/50 backdrop-blur-sm hover:border-green-light hover:bg-green-dark/20 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-text-muted group-hover:text-green-light transition-colors" />
                </a>
              ))}
            </div>

            {/* Main CTA */}
            <a
              href="#work"
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 min-h-[48px] rounded-xl overflow-hidden"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('work')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-dark via-green-medium to-green-light opacity-80 animate-gradient-x" />
              <div className="absolute inset-[1px] rounded-xl bg-background" />

              <span className="relative z-10 font-mono text-sm text-text-primary group-hover:text-green-light transition-colors">
                See My Work
              </span>
              <Zap className="relative z-10 w-4 h-4 text-green-light group-hover:animate-pulse" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 animate-bounce">
            <span className="text-[10px] sm:text-xs font-mono text-text-muted">scroll</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-medium" />
          </div>
        </div>
      </div>
    </section>
  )
}
