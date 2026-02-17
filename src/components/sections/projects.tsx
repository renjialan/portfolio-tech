"use client"

import { useState, useRef, useEffect } from "react"
import { TechBackground } from "@/components/ui/tech-background"
import { Code2, Users, ArrowUpRight, GitBranch, Cpu, Network, Layers } from "lucide-react"

interface Project {
  title: string
  organization: string
  role: string
  description: string
  achievements: string[]
  tech: string[]
  icon: React.ReactNode
  gradient: string
  link?: string
}

// 3D tilt effect hook
function useTilt(active: boolean = true) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!active || !ref.current) return

    const element = ref.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setTilt({
        x: (y - 0.5) * 10,
        y: (x - 0.5) * -10
      })
    }

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [active])

  return { ref, tilt }
}

// Project Card with 3D effect (disabled on mobile for performance)
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { ref, tilt } = useTilt(!isMobile)

  // Detect mobile to disable 3D tilt
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const Wrapper = project.link ? 'a' : 'div'
  const wrapperProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Wrapper
      {...wrapperProps}
      ref={ref as React.Ref<HTMLDivElement & HTMLAnchorElement>}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered && !isMobile
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.2s ease-out'
      }}
    >
      {/* Glow effect behind card */}
      <div
        className={`absolute -inset-1 rounded-2xl ${project.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
      />

      {/* Card */}
      <div className="relative rounded-2xl border border-green-medium/30 bg-background/60 backdrop-blur-xl overflow-hidden group-hover:border-green-light/50 transition-all duration-500">
        {/* Header with gradient */}
        <div className={`relative h-24 sm:h-32 ${project.gradient} overflow-hidden`}>
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Floating icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-background/20 backdrop-blur-sm border border-white/20">
              <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                {project.icon}
              </div>
            </div>
          </div>

          {/* Role badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-background/40 backdrop-blur-sm text-white border border-white/20">
              {project.role}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Title */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base sm:text-xl font-bold text-text-primary group-hover:text-green-light transition-colors leading-tight">
              {project.title}
            </h3>
            {project.link && (
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-text-muted group-hover:text-green-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            )}
          </div>

          <p className="text-xs sm:text-sm font-mono text-green-medium mb-3 sm:mb-4">{project.organization}</p>

          <p className="text-xs sm:text-sm text-text-secondary mb-4 sm:mb-6 leading-relaxed">{project.description}</p>

          {/* Achievements */}
          <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
            {project.achievements.map((achievement, i) => (
              <div key={i} className="flex items-start gap-2">
                <GitBranch className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-medium mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-text-secondary">{achievement}</span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono bg-green-dark/20 text-green-light border border-green-medium/30 hover:bg-green-dark/40 hover:border-green-light/50 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "RAG Code Search Engine → YC Top 10%",
      organization: "Ross Impact Studio Accelerator",
      role: "Founder",
      description: "Observed pain point in searching large codebases. Built end-to-end RAG chatbot with dynamic document chunking strategies.",
      achievements: [
        "42% faster query resolution via optimized context window utilization",
        "Advanced to Y Combinator's top 10% of applicants",
        "Paused to gain industry experience before revisiting startup path"
      ],
      tech: ["RAG", "LangChain", "LangGraph", "Python", "Vector DB"],
      icon: <Cpu className="w-8 h-8 text-white" />,
      gradient: "bg-gradient-to-br from-green-dark via-green-medium/50 to-blue-medium"
    },
    {
      title: "VP Product at 100-person Dev Org",
      organization: "VOID Tech",
      role: "VP of Product Management",
      description: "Redefined product culture within student dev organization. Served as connective layer between clients, designers, and engineers.",
      achievements: [
        "100% on-time delivery across 4 concurrent projects",
        "45% velocity improvement with 4-week sprint cycles",
        "Ran weekly syncs and demos coordinating cross-functional teams"
      ],
      tech: ["Agile", "Jira", "Cross-functional Leadership", "Roadmapping"],
      icon: <Network className="w-8 h-8 text-white" />,
      gradient: "bg-gradient-to-br from-blue-medium via-blue-light/50 to-green-dark"
    },
    {
      title: "Ledgi — AI-Native Personal Finance",
      organization: "Side Project",
      role: "Solo Builder",
      description: "Full-stack finance app that connects bank accounts via Teller, enriches transactions with Gemini Flash, and exposes data as an MCP server for any AI client.",
      achievements: [
        "Multi-stage AI enrichment pipeline: merchant resolution, categorization, anomaly detection",
        "Agentic chat with Claude tool use for natural language financial queries",
        "MCP server so users can query their finances from Claude Desktop, Cursor, or any client"
      ],
      tech: ["Next.js", "FastAPI", "PostgreSQL", "Claude", "Gemini", "MCP", "Teller API"],
      icon: <Code2 className="w-8 h-8 text-white" />,
      gradient: "bg-gradient-to-br from-emerald-600 via-cyan-500/50 to-green-dark",
      link: "https://frontend-alpha-silk-14.vercel.app/landing"
    }
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="projects">
      <TechBackground variant="accent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-dark/30">
              <Layers className="w-5 h-5 text-green-light" />
            </div>
            <span className="text-sm font-mono text-green-light uppercase tracking-wider">Projects</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-green">Projects & Leadership</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Startup ventures and leadership roles where I drove product strategy and execution.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* More projects hint */}
        <div className="mt-8 sm:mt-12 text-center">
          <a
            href="https://github.com/jialanren"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-text-muted font-mono hover:text-green-light hover:bg-green-dark/10 transition-all min-h-[44px]"
          >
            More projects on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
