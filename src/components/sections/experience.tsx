"use client"

import { useRef, useState, useEffect } from "react"
import { TechBackground } from "@/components/ui/tech-background"
import { Briefcase, TrendingUp, Zap, Bug, Brain, Rocket } from "lucide-react"

interface Experience {
  title: string
  company: string
  role: string
  period: string
  highlight: string
  achievements: string[]
  stats: { value: string; label: string }[]
  icon: React.ReactNode
  color: "green" | "blue" | "teal"
}

// Animated number component
function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const numValue = parseInt(value.replace(/\D/g, '')) || 0
  const ref = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const duration = 1200
    const steps = 20
    const increment = numValue / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numValue) {
        setCount(numValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [numValue, isVisible])

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

// Experience Card - Featured (large)
function FeaturedCard({ experience, index }: { experience: Experience; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const colorStyles = {
    green: {
      border: "border-green-medium/40 hover:border-green-light/60",
      glow: "hover:shadow-[0_0_40px_rgba(122,229,130,0.15)]",
      accent: "text-green-light",
      bg: "bg-green-dark/20",
      gradient: "from-green-dark/30 via-transparent to-transparent"
    },
    blue: {
      border: "border-blue-light/40 hover:border-blue-light/60",
      glow: "hover:shadow-[0_0_40px_rgba(0,165,207,0.15)]",
      accent: "text-blue-light",
      bg: "bg-blue-medium/20",
      gradient: "from-blue-medium/30 via-transparent to-transparent"
    },
    teal: {
      border: "border-green-dark/40 hover:border-green-medium/60",
      glow: "hover:shadow-[0_0_40px_rgba(37,161,142,0.15)]",
      accent: "text-green-medium",
      bg: "bg-green-dark/20",
      gradient: "from-green-dark/30 via-transparent to-transparent"
    }
  }

  const styles = colorStyles[experience.color]

  return (
    <div
      className={`group relative h-full rounded-2xl border ${styles.border} ${styles.glow} bg-background/40 backdrop-blur-xl overflow-hidden transition-all duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-50`} />

      {/* Content */}
      <div className="relative z-10 h-full p-5 sm:p-6 md:p-8 flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 sm:p-3 rounded-xl ${styles.bg} ${styles.accent} flex-shrink-0`}>
              {experience.icon}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{experience.period}</span>
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary truncate">{experience.company}</h3>
            </div>
          </div>
          <span className={`self-start px-3 py-1 rounded-full text-xs font-mono ${styles.bg} ${styles.accent} whitespace-nowrap`}>
            {experience.role}
          </span>
        </div>

        {/* Title */}
        <h4 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-4 ${styles.accent} leading-tight`}>
          {experience.highlight}
        </h4>

        {/* Achievements */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-1">
          {experience.achievements.map((achievement, i) => (
            <div key={i} className="flex items-start gap-2 sm:gap-3">
              <Zap className={`w-4 h-4 mt-0.5 sm:mt-1 flex-shrink-0 ${styles.accent}`} />
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{achievement}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10">
          {experience.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-lg sm:text-xl md:text-2xl font-bold ${styles.accent}`}>
                <AnimatedNumber value={stat.value} suffix={stat.value.includes('%') ? '%' : stat.value.includes('k') ? 'k' : ''} />
                {!stat.value.includes('%') && !stat.value.includes('k') && stat.value.includes('+') && '+'}
              </div>
              <div className="text-[10px] sm:text-xs text-text-muted mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover shimmer effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000`}
      />
    </div>
  )
}

// Experience Card - Compact
function CompactCard({ experience }: { experience: Experience }) {
  const colorStyles = {
    green: {
      border: "border-green-medium/30 hover:border-green-light/50",
      glow: "hover:shadow-[0_0_30px_rgba(122,229,130,0.1)]",
      accent: "text-green-light",
      bg: "bg-green-dark/20",
    },
    blue: {
      border: "border-blue-light/30 hover:border-blue-light/50",
      glow: "hover:shadow-[0_0_30px_rgba(0,165,207,0.1)]",
      accent: "text-blue-light",
      bg: "bg-blue-medium/20",
    },
    teal: {
      border: "border-green-dark/30 hover:border-green-medium/50",
      glow: "hover:shadow-[0_0_30px_rgba(37,161,142,0.1)]",
      accent: "text-green-medium",
      bg: "bg-green-dark/20",
    }
  }

  const styles = colorStyles[experience.color]

  return (
    <div className={`group relative h-full rounded-2xl border ${styles.border} ${styles.glow} bg-background/40 backdrop-blur-xl overflow-hidden transition-all duration-500`}>
      <div className="p-5 sm:p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className={`p-2 rounded-lg ${styles.bg} ${styles.accent} flex-shrink-0`}>
            {experience.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-medium text-text-primary truncate">{experience.company}</h3>
            <span className="text-xs font-mono text-text-muted">{experience.period}</span>
          </div>
        </div>

        {/* Highlight */}
        <h4 className={`text-base sm:text-lg font-bold mb-2 sm:mb-3 ${styles.accent} leading-tight`}>
          {experience.highlight}
        </h4>

        {/* Single key achievement */}
        <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 flex-1">
          {experience.achievements[0]}
        </p>

        {/* Role badge */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
          <span className={`px-3 py-1.5 rounded-full text-xs font-mono ${styles.bg} ${styles.accent}`}>
            {experience.role}
          </span>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
    </div>
  )
}

export function ExperienceSection() {
  const experiences: Experience[] = [
    {
      title: "shipped feature that made $37k in 2 weeks",
      company: "Sugarwish",
      role: "Full Stack AI Product Builder",
      period: "Sep '25 - Now",
      highlight: "Shipped $37k feature in 2 weeks",
      achievements: [
        "Increased new user activation by 20% through funnel analysis and targeted onboarding optimization",
        "Established customer discovery process from support tickets + user interviews into roadmap priorities",
        "Ship 5+ releases weekly with parallel dev workflow; built QA processes after production incident"
      ],
      stats: [
        { value: "37k", label: "Revenue in 2 wks" },
        { value: "20%", label: "Activation boost" },
        { value: "5+", label: "Weekly releases" }
      ],
      icon: <Brain className="w-5 h-5" />,
      color: "green"
    },
    {
      title: "redesigned agentic chatbot flow",
      company: "Hewlett Packard Enterprise",
      role: "AI PM Intern",
      period: "Summer '25",
      highlight: "32% LLM accuracy improvement",
      achievements: [
        "Wrote Python scripts analyzing 1,000+ Salesforce tickets → identified root causes → 5 features adopted into H2 roadmap",
        "Conducted 20 customer interviews; redesigned prompt strategy improving CSAT by 10%, reducing unhelpful responses by 40%",
        "Designed agentic chatbot troubleshoot flow through iterative A/B testing → 32% accuracy increase"
      ],
      stats: [
        { value: "32%", label: "Accuracy boost" },
        { value: "40%", label: "Less bad responses" },
        { value: "1000+", label: "Tickets analyzed" }
      ],
      icon: <Bug className="w-5 h-5" />,
      color: "blue"
    },
    {
      title: "data-driven product strategy at AI startup",
      company: "Devv AI",
      role: "Product Ops Intern",
      period: "Aug - Nov '24",
      highlight: "8% MRR growth through user analysis",
      achievements: [
        "Developed data-driven product strategies through user behavior analysis → 8% MRR growth",
        "Analyzed how power users structured multi-step agent tasks vs churned users → workflow templates increased signups 10%"
      ],
      stats: [
        { value: "8%", label: "MRR Growth" },
        { value: "10%", label: "More signups" },
        { value: "3", label: "Months" }
      ],
      icon: <Rocket className="w-5 h-5" />,
      color: "teal"
    }
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="work">
      <TechBackground variant="minimal" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-blue-medium/30">
              <Briefcase className="w-5 h-5 text-blue-light" />
            </div>
            <span className="text-sm font-mono text-blue-light uppercase tracking-wider">Experience</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-green">Impact-Driven Work</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            AI products and features I've shipped with measurable business outcomes.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Featured card - HPE - Takes full width on mobile, 2 cols on large screens */}
          <div className="lg:col-span-2 lg:row-span-2">
            <FeaturedCard experience={experiences[0]} index={0} />
          </div>

          {/* Compact cards - Stack on mobile, side by side on tablet, column on large */}
          <div className="lg:col-span-2">
            <CompactCard experience={experiences[1]} />
          </div>
          <div className="lg:col-span-2">
            <CompactCard experience={experiences[2]} />
          </div>
        </div>
      </div>
    </section>
  )
}
