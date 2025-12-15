"use client"

import { useState, useRef, useEffect } from "react"
import { TechBackground } from "@/components/ui/tech-background"
import GradualBlur from "@/components/GradualBlur"
import {
  GraduationCap,
  Smartphone,
  Sparkles,
  Bot,
  MessageCircle,
  Rocket,
  Coffee,
  Zap
} from "lucide-react"

interface Fact {
  text: string
  icon: React.ReactNode
  color: "green" | "blue" | "teal"
}

// Marquee row for infinite scroll effect
function MarqueeRow({ facts, reverse = false, speed = 40 }: { facts: Fact[]; reverse?: boolean; speed?: number }) {
  return (
    <div className="relative overflow-hidden py-1.5 sm:py-2">
      <div
        className={`flex gap-3 sm:gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Double the items for seamless loop */}
        {[...facts, ...facts].map((fact, i) => (
          <FactCard key={i} fact={fact} index={i} />
        ))}
      </div>
    </div>
  )
}

// Individual fact card
function FactCard({ fact, index }: { fact: Fact; index: number }) {
  const colorStyles = {
    green: {
      border: "border-green-medium/30 hover:border-green-light/50",
      icon: "text-green-light",
      iconBg: "bg-green-dark/30",
      glow: "hover:shadow-[0_0_30px_rgba(122,229,130,0.15)]"
    },
    blue: {
      border: "border-blue-light/30 hover:border-blue-light/50",
      icon: "text-blue-light",
      iconBg: "bg-blue-medium/30",
      glow: "hover:shadow-[0_0_30px_rgba(0,165,207,0.15)]"
    },
    teal: {
      border: "border-green-dark/30 hover:border-green-medium/50",
      icon: "text-green-medium",
      iconBg: "bg-green-dark/30",
      glow: "hover:shadow-[0_0_30px_rgba(37,161,142,0.15)]"
    }
  }

  const styles = colorStyles[fact.color]

  return (
    <div
      className={`group flex-shrink-0 w-[260px] sm:w-80 p-4 sm:p-5 rounded-xl sm:rounded-2xl border ${styles.border} ${styles.glow} bg-background/40 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${styles.iconBg} ${styles.icon} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          {fact.icon}
        </div>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
          {fact.text}
        </p>
      </div>
    </div>
  )
}

// Featured highlight card
function HighlightCard({
  icon,
  title,
  subtitle,
  color
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  color: "green" | "blue"
}) {
  const [isHovered, setIsHovered] = useState(false)

  const colorStyles = {
    green: {
      gradient: "from-green-dark/40 to-green-medium/20",
      border: "border-green-medium/40 hover:border-green-light",
      text: "text-green-light",
      glow: "shadow-[0_0_60px_rgba(122,229,130,0.2)]"
    },
    blue: {
      gradient: "from-blue-medium/40 to-blue-light/20",
      border: "border-blue-light/40 hover:border-blue-light",
      text: "text-blue-light",
      glow: "shadow-[0_0_60px_rgba(0,165,207,0.2)]"
    }
  }

  const styles = colorStyles[color]

  return (
    <div
      className={`group relative rounded-xl sm:rounded-2xl border ${styles.border} bg-gradient-to-br ${styles.gradient} backdrop-blur-xl overflow-hidden transition-all duration-500 ${isHovered ? styles.glow : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 sm:p-6 md:p-8 text-center">
        <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-background/30 ${styles.text} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${styles.text} mb-1 sm:mb-2`}>{title}</h3>
        <p className="text-xs sm:text-sm text-text-muted font-mono">{subtitle}</p>
      </div>

      {/* Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </div>
  )
}

export function FunFactsSection() {
  const facts: Fact[] = [
    {
      text: "Bachelor's in Info Sci (UX + Data Science) from UMich, graduating May 2025",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "blue"
    },
    {
      text: "Grew a content account to 90k followers once (trying to do it again)",
      icon: <Smartphone className="w-5 h-5" />,
      color: "green"
    },
    {
      text: "\"Full-time vibe coder\" - I write code that works AND looks good",
      icon: <Sparkles className="w-5 h-5" />,
      color: "teal"
    },
    {
      text: "I debug LLMs the same way I debug relationships: with data and empathy",
      icon: <Bot className="w-5 h-5" />,
      color: "blue"
    },
    {
      text: "Fluent translator between \"engineer speak\" and \"normal human speak\"",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "green"
    },
    {
      text: "Always trying to start the next thing (it's a problem, honestly)",
      icon: <Rocket className="w-5 h-5" />,
      color: "teal"
    }
  ]

  // Split facts for two rows
  const row1 = facts.slice(0, 3)
  const row2 = facts.slice(3)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="about">
      <TechBackground variant="secondary" />

      <GradualBlur
        position="top"
        height="12rem"
        strength={3}
        divCount={8}
        curve="ease-out"
        animated="scroll"
        duration="0.8s"
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-dark/30">
              <Zap className="w-5 h-5 text-green-light" />
            </div>
            <span className="text-sm font-mono text-green-light uppercase tracking-wider">About</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-green">Quick Facts</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Things worth knowing that may or may not be relevant to your hiring decision
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <HighlightCard
              icon={<GraduationCap className="w-full h-full" />}
              title="UMich '25"
              subtitle="Information Science (UX + Data)"
              color="blue"
            />
            <HighlightCard
              icon={<Coffee className="w-full h-full" />}
              title="Ship Daily"
              subtitle="PRs > PRDs"
              color="green"
            />
          </div>
        </div>

        {/* Marquee Facts */}
        <div className="space-y-3 sm:space-y-4">
          <MarqueeRow facts={row1} speed={35} />
          <MarqueeRow facts={row2} reverse speed={40} />
        </div>
      </div>

      <GradualBlur
        position="bottom"
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        animated="scroll"
        duration="0.8s"
      />
    </section>
  )
}
