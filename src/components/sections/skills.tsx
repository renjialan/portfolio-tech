"use client"

import { useState, useRef, useEffect } from "react"
import { TechBackground } from "@/components/ui/tech-background"
import { Code2, Brain, BarChart3, Database, Terminal, Wrench } from "lucide-react"

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
  color: "green" | "blue"
}

// Animated skill pill that glows on hover
function SkillPill({ skill, color, delay }: { skill: string; color: "green" | "blue"; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const colorClasses = color === "green"
    ? "bg-green-dark/20 text-green-light border-green-medium/40 hover:bg-green-dark/40 hover:border-green-light/60 hover:shadow-[0_0_20px_rgba(122,229,130,0.2)]"
    : "bg-blue-medium/20 text-blue-light border-blue-light/40 hover:bg-blue-medium/40 hover:border-blue-light/60 hover:shadow-[0_0_20px_rgba(0,165,207,0.2)]"

  return (
    <span
      ref={ref}
      className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono border backdrop-blur-sm transition-all duration-300 ${colorClasses} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {skill}
    </span>
  )
}

// Category card with skills grid
function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const colorStyles = {
    green: {
      icon: "text-green-light",
      iconBg: "bg-green-dark/30",
      border: "border-green-medium/30 hover:border-green-light/50",
      glow: "group-hover:shadow-[0_0_40px_rgba(122,229,130,0.1)]"
    },
    blue: {
      icon: "text-blue-light",
      iconBg: "bg-blue-medium/30",
      border: "border-blue-light/30 hover:border-blue-light/50",
      glow: "group-hover:shadow-[0_0_40px_rgba(0,165,207,0.1)]"
    }
  }

  const styles = colorStyles[category.color]

  return (
    <div
      className={`group relative rounded-xl sm:rounded-2xl border ${styles.border} ${styles.glow} bg-background/40 backdrop-blur-xl overflow-hidden transition-all duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${styles.iconBg} ${styles.icon} transition-transform duration-300 group-hover:scale-110 flex-shrink-0`}>
            {category.icon}
          </div>
          <h3 className="text-base sm:text-lg font-medium text-text-primary">{category.title}</h3>
        </div>
      </div>

      {/* Skills cloud */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {category.skills.map((skill, i) => (
            <SkillPill
              key={skill}
              skill={skill}
              color={category.color}
              delay={index * 100 + i * 50}
            />
          ))}
        </div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </div>
  )
}

// Central skill hub visualization - Mobile simplified version
function MobileSkillHub() {
  const coreSkills = ["AI/ML", "Full-Stack", "Product", "Data-Driven"]

  return (
    <div className="flex flex-wrap justify-center gap-2 py-6">
      {/* Center badge */}
      <div className="w-full flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-dark via-green-medium to-blue-light p-[2px]">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <div className="text-center">
              <Terminal className="w-5 h-5 text-green-light mx-auto mb-1" />
              <span className="text-[10px] font-mono text-text-muted">AI + PM</span>
            </div>
          </div>
        </div>
      </div>
      {/* Core skills as badges */}
      <div className="flex flex-wrap justify-center gap-2">
        {coreSkills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-green-medium/40 text-xs font-mono text-green-light"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

// Central skill hub visualization - Desktop version with orbits
function SkillHub() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  const coreSkills = ["AI/ML", "Full-Stack", "Product", "Data-Driven"]

  return (
    <div className="relative flex items-center justify-center py-12">
      {/* Orbital rings */}
      <div className="absolute w-64 h-64 rounded-full border border-green-medium/20 animate-spin-slow" style={{ animationDuration: '30s' }} />
      <div className="absolute w-80 h-80 rounded-full border border-blue-light/10 animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
      <div className="absolute w-96 h-96 rounded-full border border-green-dark/10 animate-spin-slow" style={{ animationDuration: '60s' }} />

      {/* Center node */}
      <div className="relative z-10">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-dark via-green-medium to-blue-light p-[2px]">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <div className="text-center">
              <Terminal className="w-8 h-8 text-green-light mx-auto mb-2" />
              <span className="text-xs font-mono text-text-muted">AI + PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating skill orbs */}
      {coreSkills.map((skill, i) => {
        const angle = (i * 90 - 45) * (Math.PI / 180)
        const radius = 120
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <div
            key={skill}
            className="absolute"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-green-medium/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-green-medium/40 hover:border-green-light transition-all">
                <span className="text-xs font-mono text-green-light whitespace-nowrap">{skill}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: "I ship products with",
      icon: <Code2 className="w-5 h-5" />,
      skills: ["Python", "React", "Next.js", "TypeScript", "SQL", "AWS", "Docker", "GCP", "Vercel"],
      color: "green"
    },
    {
      title: "I build AI with",
      icon: <Brain className="w-5 h-5" />,
      skills: ["LangChain", "LangGraph", "RAG Systems", "Claude Code", "Streamlit", "Replit"],
      color: "blue"
    },
    {
      title: "I manage products with",
      icon: <BarChart3 className="w-5 h-5" />,
      skills: ["Jira", "Confluence", "Figma", "Mixpanel", "Google Analytics", "Salesforce", "Lark"],
      color: "green"
    },
    {
      title: "Data infra I've worked with",
      icon: <Database className="w-5 h-5" />,
      skills: ["Airflow", "Kafka", "GitHub", "Google Workspace"],
      color: "blue"
    }
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="skills">
      <TechBackground variant="subtle" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-dark/30">
              <Wrench className="w-5 h-5 text-green-light" />
            </div>
            <span className="text-sm font-mono text-green-light uppercase tracking-wider">Skills</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-green">Technical Skills</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Full-stack development, AI/ML engineering, and product management tools I use daily.
          </p>
        </div>

        {/* Visual Hub - Mobile */}
        <div className="md:hidden mb-8">
          <MobileSkillHub />
        </div>

        {/* Visual Hub - Desktop */}
        <div className="hidden md:block mb-16">
          <SkillHub />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
