"use client"

import { useState } from "react"
import Link from "next/link"
import { TechBackground } from "@/components/ui/tech-background"
import {
  ArrowLeft,
  Zap,
  GitCommit,
  GitPullRequest,
  Code2,
  DollarSign,
  Brain,
  Shield,
  Bug,
  Bot,
  X,
  BarChart3,
  Users,
  Sparkles,
  Gift,
  FileText,
  Tag,
  Palette,
  Database,
  ArrowUpRight,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "388", label: "Commits Shipped", icon: <GitCommit className="w-5 h-5" /> },
  { value: "100+", label: "PRs Merged", icon: <GitPullRequest className="w-5 h-5" /> },
  { value: "132K", label: "Lines Added", icon: <Code2 className="w-5 h-5" /> },
  { value: "$93.7K", label: "Upsell Revenue", icon: <DollarSign className="w-5 h-5" /> },
]

const headlineFeatures = [
  {
    title: "New User Proposal Preview Flow",
    description:
      "Built an entirely new progressive preview experience for first-time users — multi-step preview with product selection, corporate account support, guest access via swap tokens, and mobile-responsive design.",
    metrics: [
      { label: "Same-day purchase rate", before: "0.1%", after: "15%", note: "150x increase" },
      { label: "Overall conversion", before: "23.3%", after: "29.7%", note: "+27% relative" },
    ],
    detail: "PR #1019 alone added 18,560 lines. Before the preview flow, new users essentially never purchased same-day (0.1%). After launch, 15-25% of first-time users completed a purchase the same day.",
  },
  {
    title: "Size Upsell System",
    description:
      "Revenue optimization feature encouraging buyers to upgrade gift sizes at checkout. Wine upsell quiz with upgrade modal, configurable upsell pairs in system settings, global toggle, and click tracking via metadata.",
    metrics: [
      { label: "Total revenue", before: "", after: "$93,688", note: "Dec 10 – Feb 19" },
      { label: "Conversion rate", before: "", after: "55.4%", note: "362 of 653 proposals" },
    ],
    detail: "Peak week (Dec 15-21) saw $49,020 in total revenue from upselled proposals. Most common path: Small → Medium ($11/recipient uplift). Paid for development cost within the first week.",
  },
]

const majorFeatures = [
  {
    title: "Proposal Management",
    icon: <FileText className="w-5 h-5" />,
    description: "Full redesign of the core revenue workflow — admin UI, advanced search, edit history tracking, admin notes, proposal duplication, quantity editor, and optimized filters.",
  },
  {
    title: "Recipient Manager",
    icon: <Users className="w-5 h-5" />,
    description: "Batch atomic operations, inline entry, CSV upload with phone number support, multi-size budget estimation, duplicate detection, sticky toolbar, and remove-all endpoint.",
  },
  {
    title: "Gift Genie / AI Quiz",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Logo upload with live preview, guest completion flow, session deduplication, email pre-fill from marketing links, cart-partial endpoint, and admin quick order.",
  },
  {
    title: "Survey Systems",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "CSAT surveys with tiered coupon discounts, January client survey, race condition prevention with atomic locking, EcardChooserModal integration, and occasion-based templates.",
  },
  {
    title: "Promo Code Engine",
    icon: <Tag className="w-5 h-5" />,
    description: "Tiered discounts with auto-regeneration, MINI25 corporate promo, cross-flow deduplication between survey and quiz, bidirectional audit tracking, and expiration handling.",
  },
  {
    title: "Price, Infra & eCards",
    icon: <Database className="w-5 h-5" />,
    description: "January price increase across the platform, eCard campaign swap tokens with guest access, database migrations (generated columns, JSON extraction elimination), and pool separation.",
  },
]

const screenshots = [
  { src: "/sugarwish/proposals-list.png", caption: "Proposals Admin — search, filters, and status tracking" },
  { src: "/sugarwish/proposal-detail.png", caption: "Proposal Detail — edit history, notes, recipient management" },
  { src: "/sugarwish/recipient-manager.png", caption: "Recipient Manager — batch ops, CSV upload, inline entry" },
  { src: "/sugarwish/gift-genie.png", caption: "Gift Genie — AI-powered quiz with live eCard preview" },
  { src: "/sugarwish/dashboard.png", caption: "Dashboard — operational overview and metrics" },
  { src: "/sugarwish/ecard-designs.png", caption: "eCard Designs — template management and campaign tools" },
]

const aiFeatures = [
  { title: "MCP Server", detail: "50+ tools via JSON-RPC 2.0 over HTTP for agentic development workflows" },
  { title: "Gift Genie AI", detail: "Conversational gift quiz powered by OpenAI function calling" },
  { title: "Vector Search & RAG", detail: "Qdrant with 4 collections + OpenAI embeddings for semantic product matching" },
  { title: "SWIM Workflow Engine", detail: "Declarative JSON workflows for multi-step agentic processes" },
  { title: "Chat & Email Automation", detail: "Agentic automation for customer communication flows" },
  { title: "Image Analysis", detail: "Google Generative AI vision for logo and product image processing" },
]

const securityFixes = [
  "AI prompt injection prevention — secured LLM prompts previously exposed to frontend",
  "Removed email-based user lookup that could reveal account existence",
  "Scoped S3 access to Sugarwish buckets only",
  "Rate limiting on logo upload, product check, and wine preview endpoints",
  "Missing auth middleware on product lookup, card swap, and CSAT endpoints",
  "Proposal ownership checks — users can only access their own proposals",
  "Separated database read/write pools",
  "URL validation across multiple endpoints to prevent injection",
]

const bugFixes = [
  "Proposal data corruption from cart merge logic",
  "Race conditions causing duplicate proposals from double-clicks / multiple tabs",
  "Recipient data corruption from batch endpoint destructuring bug",
  "product_configuration_id overwrite resetting gift selections",
  "Infinite useEffect loop firing hundreds of API calls per second",
  "Plus-sign emails breaking Klaviyo marketing URL authentication",
  "DST timezone handling for proposal dates and note timestamps",
  "Unicode stripping on phone numbers preventing SMS delivery",
]

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-5xl rounded-2xl border border-green-medium/30 bg-background/95 backdrop-blur-2xl overflow-hidden animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-background/60 border border-white/10 text-text-muted hover:text-white hover:bg-white/10 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={caption} className="w-full" />
        <div className="p-4 sm:p-6">
          <p className="text-sm text-text-secondary">{caption}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SugarwishPage() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null)

  return (
    <main className="min-h-screen bg-background text-text-primary antialiased selection:bg-green-medium/30 selection:text-green-light">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <TechBackground variant="subtle" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-green-light transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-green-dark/20 text-green-light">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-sm font-mono text-green-light uppercase tracking-wider">Sugarwish · WishDesk</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-gradient-green">Full Stack AI Product Builder</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-2">
            Sep 2025 — Feb 2026
          </p>
          <p className="text-sm text-text-muted max-w-3xl mx-auto">
            React · Express.js · TypeScript · MySQL · Drizzle ORM · Qdrant · OpenAI · Tailwind · Radix UI · TanStack Query
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative py-12 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-glow-green rounded-2xl bg-background/40 backdrop-blur-xl p-5 text-center"
              >
                <div className="flex justify-center mb-2 text-green-light">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-green-light">{stat.value}</div>
                <div className="text-xs font-mono text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Headline Features ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <TechBackground variant="minimal" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-gradient-green">Headline Impact</span>
          </h2>

          <div className="space-y-8">
            {headlineFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-green-medium/30 bg-background/40 backdrop-blur-xl overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-green-light mb-3">{feature.title}</h3>
                  <p className="text-sm text-text-secondary mb-6">{feature.description}</p>

                  {/* Metrics */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {feature.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl bg-green-dark/20 border border-green-medium/20 p-4">
                        <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{m.label}</div>
                        <div className="flex items-baseline gap-2">
                          {m.before && (
                            <>
                              <span className="text-lg text-text-muted line-through">{m.before}</span>
                              <span className="text-text-muted">→</span>
                            </>
                          )}
                          <span className="text-2xl font-bold text-green-light">{m.after}</span>
                        </div>
                        <div className="text-xs text-green-medium mt-1">{m.note}</div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed">{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Major Features Grid ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-gradient-green">Major Systems</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {majorFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-green-medium/20 hover:border-green-light/40 bg-background/40 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,229,130,0.08)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-dark/20 text-green-light">{feature.icon}</div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-green-light transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshots Gallery ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <TechBackground variant="minimal" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            <span className="text-gradient-green">Screenshots</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {screenshots.map((shot) => (
              <button
                key={shot.src}
                onClick={() => setLightbox(shot)}
                className="group relative text-left rounded-2xl border border-green-medium/20 hover:border-green-light/40 bg-background/40 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(122,229,130,0.08)]"
              >
                <div className="relative aspect-video bg-background/60 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    alt={shot.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <p className="text-xs sm:text-sm text-text-secondary">{shot.caption}</p>
                </div>
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI & MCP ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-blue-medium/30">
              <Bot className="w-5 h-5 text-blue-light" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-gradient-teal">AI & Agentic Work</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-blue-light/20 bg-background/40 backdrop-blur-xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-blue-light" />
                  <h3 className="text-sm font-medium text-blue-light">{feature.title}</h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{feature.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security & Bug Fixes ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <TechBackground variant="minimal" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Security */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-dark/20">
                  <Shield className="w-5 h-5 text-green-light" />
                </div>
                <h2 className="text-2xl font-bold text-gradient-green">Security Hardening</h2>
              </div>
              <div className="space-y-3">
                {securityFixes.map((fix, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 mt-1 text-green-medium flex-shrink-0" />
                    <p className="text-xs text-text-secondary leading-relaxed">{fix}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bug Fixes */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-dark/20">
                  <Bug className="w-5 h-5 text-green-light" />
                </div>
                <h2 className="text-2xl font-bold text-gradient-green">Critical Bug Fixes</h2>
              </div>
              <div className="space-y-3">
                {bugFixes.map((fix, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 mt-1 text-green-medium flex-shrink-0" />
                    <p className="text-xs text-text-secondary leading-relaxed">{fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Back Link ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-green-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
    </main>
  )
}
