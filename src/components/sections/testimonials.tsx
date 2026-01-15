"use client"

import { useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { TechBackground } from "@/components/ui/tech-background"
import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Jialan has an exceptional ability to bridge the gap between technical implementation and product vision. Their AI products consistently deliver real user value.",
    author: "Engineering Manager",
    role: "Tech Lead",
    company: "Sugarwish"
  },
  {
    quote: "One of the most driven product minds I've worked with. They shipped features that directly impacted our MRR growth and user engagement metrics.",
    author: "Product Director",
    role: "Director of Product",
    company: "Devv AI"
  },
  {
    quote: "Rare to find someone who can code, design, and manage products at this level. Their RAG system was instrumental in our YC application success.",
    author: "Co-founder",
    role: "Technical Co-founder",
    company: "YC Startup"
  }
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, 8000)
    return () => clearInterval(interval)
  }, [])

  const testimonial = testimonials[current]

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" id="testimonials">
      <TechBackground variant="subtle" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-green-medium/30 bg-green-dark/20">
            <Quote className="w-3.5 h-3.5 text-green-light" />
            <span className="text-xs font-mono text-green-light">What People Say</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-gradient-green">Testimonials</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="relative rounded-2xl border border-green-medium/30 bg-background/60 backdrop-blur-xl p-8 sm:p-12">
            {/* Quote icon */}
            <div className="absolute -top-4 left-8 p-3 rounded-xl bg-green-dark/40 border border-green-medium/30">
              <Quote className="w-6 h-6 text-green-light" />
            </div>

            {/* Quote text */}
            <div
              className={cn(
                "transition-all duration-500",
                isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              )}
            >
              <blockquote className="text-lg sm:text-xl text-text-primary leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-dark to-blue-medium flex items-center justify-center text-lg font-bold text-green-light">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-text-primary">{testimonial.author}</div>
                  <div className="text-sm text-text-muted">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="p-2 rounded-lg border border-border hover:border-green-medium/50 hover:bg-green-dark/20 transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-text-muted" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrent(i)
                      setTimeout(() => setIsAnimating(false), 500)
                    }
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === current
                      ? "bg-green-light w-6"
                      : "bg-text-muted/30 hover:bg-text-muted"
                  )}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-lg border border-border hover:border-green-medium/50 hover:bg-green-dark/20 transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-text-muted" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
