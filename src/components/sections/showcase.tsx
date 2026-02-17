"use client"

import { useState } from "react"
import { TechBackground } from "@/components/ui/tech-background"
import { Eye, X, ImageIcon } from "lucide-react"

type ShowcaseCategory = "all" | "sugarwish" | "hpe" | "devv" | "projects"

interface ShowcaseItem {
  id: string
  title: string
  description: string
  category: Exclude<ShowcaseCategory, "all">
  companyLabel: string
  image?: string
  placeholder?: boolean
}

const categories: { key: ShowcaseCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sugarwish", label: "Sugarwish" },
  { key: "hpe", label: "HPE" },
  { key: "devv", label: "Devv AI" },
  { key: "projects", label: "Projects" },
]

const showcaseItems: ShowcaseItem[] = [
  {
    id: "sw-1",
    title: "AI-Powered Upsell Flow",
    description: "Upsell feature that generated $37K revenue in its first two weeks through A/B tested rapid prototyping.",
    category: "sugarwish",
    companyLabel: "Sugarwish",
    placeholder: true,
  },
  {
    id: "sw-2",
    title: "Quiz Editor & Onboarding Redesign",
    description: "Configurable quiz editor powering the onboarding redesign — 35% conversion lift.",
    category: "sugarwish",
    companyLabel: "Sugarwish",
    placeholder: true,
  },
  {
    id: "hpe-1",
    title: "LLM Support Agent Dashboard",
    description: "Redesigned RAG pipeline audit view — 25% effectiveness increase, 24% reduction in unhelpful responses.",
    category: "hpe",
    companyLabel: "HPE",
    placeholder: true,
  },
  {
    id: "devv-1",
    title: "Hybrid Retrieval Pipeline",
    description: "Human-in-the-loop evaluation pipeline — 35% query relevance improvement.",
    category: "devv",
    companyLabel: "Devv AI",
    placeholder: true,
  },
  {
    id: "proj-1",
    title: "RAG Code Search Engine",
    description: "YC Top 10% — built during Ross Impact Studio.",
    category: "projects",
    companyLabel: "Projects",
    placeholder: true,
  },
  {
    id: "proj-2",
    title: "Personal Website",
    description: "This site — built with Next.js, Tailwind CSS, and Claude Code.",
    category: "projects",
    companyLabel: "Projects",
    placeholder: true,
  },
]

const categoryColors: Record<Exclude<ShowcaseCategory, "all">, { bg: string; text: string; border: string }> = {
  sugarwish: { bg: "bg-green-dark/30", text: "text-green-light", border: "border-green-medium/40" },
  hpe: { bg: "bg-blue-medium/30", text: "text-blue-light", border: "border-blue-light/40" },
  devv: { bg: "bg-green-dark/30", text: "text-green-medium", border: "border-green-dark/40" },
  projects: { bg: "bg-blue-medium/20", text: "text-blue-light", border: "border-blue-light/30" },
}

function ShowcaseCard({ item, onClick }: { item: ShowcaseItem; onClick: () => void }) {
  const colors = categoryColors[item.category]

  return (
    <button
      onClick={onClick}
      className={`group relative text-left w-full rounded-2xl border ${colors.border} hover:border-opacity-80 bg-background/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(122,229,130,0.08)]`}
    >
      {/* Image area / placeholder */}
      <div className="relative aspect-video bg-background/60 flex items-center justify-center overflow-hidden">
        {item.placeholder ? (
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <ImageIcon className="w-8 h-8 opacity-40" />
            <span className="text-xs font-mono opacity-60">Coming soon</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm sm:text-base font-medium text-text-primary group-hover:text-green-light transition-colors truncate">
            {item.title}
          </h3>
          <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono ${colors.bg} ${colors.text}`}>
            {item.companyLabel}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Hover shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
    </button>
  )
}

function ShowcaseLightbox({ item, onClose }: { item: ShowcaseItem; onClose: () => void }) {
  const colors = categoryColors[item.category]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-3xl rounded-2xl border border-green-medium/30 bg-background/95 backdrop-blur-2xl overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-background/60 border border-white/10 text-text-muted hover:text-white hover:bg-white/10 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image area */}
        <div className="relative aspect-video bg-background/60 flex items-center justify-center">
          {item.placeholder ? (
            <div className="flex flex-col items-center gap-3 text-text-muted">
              <ImageIcon className="w-12 h-12 opacity-40" />
              <span className="text-sm font-mono opacity-60">Screenshot coming soon</span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
          )}
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono ${colors.bg} ${colors.text}`}>
              {item.companyLabel}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">{item.title}</h3>
          <p className="text-sm sm:text-base text-text-secondary">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export function ShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState<ShowcaseCategory>("all")
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null)

  const filtered = activeFilter === "all"
    ? showcaseItems
    : showcaseItems.filter((item) => item.category === activeFilter)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="showcase">
      <TechBackground variant="minimal" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green-dark/30">
              <Eye className="w-5 h-5 text-green-light" />
            </div>
            <span className="text-sm font-mono text-green-light uppercase tracking-wider">Showcase</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient-green">Visual Proof of Work</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Screenshots and visuals from products and features I've built.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-mono transition-all duration-300 min-h-[40px] ${
                activeFilter === key
                  ? "bg-green-dark/40 text-green-light border border-green-medium/50"
                  : "bg-background/40 text-text-muted border border-white/10 hover:border-green-medium/30 hover:text-text-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((item) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <ShowcaseLightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  )
}
