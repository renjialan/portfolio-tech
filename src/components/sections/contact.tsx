"use client"

import { useState } from "react"
import { TechBackground } from "@/components/ui/tech-background"
import GradualBlur from "@/components/GradualBlur"
import { Mail, Phone, MapPin, Send, Copy, Check, ExternalLink } from "lucide-react"

// Copy to clipboard button
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-2 text-text-muted hover:text-green-light transition-colors min-h-[44px] min-w-[44px] px-2 -mr-2 rounded-lg hover:bg-white/5"
      title={`Copy ${label}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-light" />
          <span className="text-xs font-mono text-green-light">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">Copy</span>
        </>
      )}
    </button>
  )
}

// Social link with hover effect
function SocialLink({
  href,
  icon,
  label,
  username
}: {
  href: string
  icon: React.ReactNode
  label: string
  username: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-green-medium/30 bg-background/40 backdrop-blur-sm hover:border-green-light/50 hover:bg-green-dark/10 transition-all duration-300 min-h-[60px]"
    >
      <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-green-dark/30 text-green-light group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-text-primary group-hover:text-green-light transition-colors">
          {label}
        </div>
        <div className="text-xs font-mono text-text-muted truncate">{username}</div>
      </div>
      <ExternalLink className="w-4 h-4 text-text-muted sm:opacity-0 group-hover:opacity-100 group-hover:text-green-light transition-all flex-shrink-0" />
    </a>
  )
}

export function ContactSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden" id="contact">
      <TechBackground variant="primary" />

      <GradualBlur
        position="top"
        height="12rem"
        strength={3}
        divCount={8}
        curve="ease-out"
        animated="scroll"
        duration="0.8s"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main card */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-green-medium/40 bg-background/60 backdrop-blur-2xl overflow-hidden">
          {/* Gradient glow behind */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-dark/30 via-green-medium/20 to-blue-medium/30 blur-2xl opacity-50" />

          <div className="relative p-5 sm:p-8 md:p-12 lg:p-16">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-medium/30 bg-green-dark/20">
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-light" />
                <span className="text-xs sm:text-sm font-mono text-green-light">Get In Touch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                <span className="text-gradient-green">Let's Build</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-text-secondary max-w-xl mx-auto px-2">
                I'm always down to chat about AI products, terrible LLM outputs, or why your chatbot is broken.
              </p>
            </div>

            {/* Contact info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {/* Email */}
              <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-blue-light/30 bg-background/40 backdrop-blur-sm hover:border-blue-light/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-blue-medium/30 text-blue-light group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <CopyButton text="oliveren@umich.edu" label="email" />
                </div>
                <div className="text-xs sm:text-sm font-mono text-text-muted mb-1">Email</div>
                <a
                  href="mailto:oliveren@umich.edu"
                  className="text-base sm:text-lg text-text-primary hover:text-blue-light transition-colors break-all sm:break-normal"
                >
                  oliveren@umich.edu
                </a>
              </div>

              {/* Phone */}
              <div className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-green-medium/30 bg-background/40 backdrop-blur-sm hover:border-green-light/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-green-dark/30 text-green-light group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <CopyButton text="7314443702" label="phone" />
                </div>
                <div className="text-xs sm:text-sm font-mono text-text-muted mb-1">Phone</div>
                <a
                  href="tel:7314443702"
                  className="text-base sm:text-lg text-text-primary hover:text-green-light transition-colors"
                >
                  (731) 444-3702
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
              <SocialLink
                href="https://linkedin.com/in/yourprofile"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                }
                label="LinkedIn"
                username="@jialanren"
              />
              <SocialLink
                href="https://github.com/yourprofile"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                }
                label="GitHub"
                username="@jialanren"
              />
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-mono">Ann Arbor, MI / Open to Remote</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center px-4">
          <p className="text-xs sm:text-sm text-text-muted font-mono">
            Built with Claude Code, coffee, and questionable life choices
          </p>
          <p className="text-[10px] sm:text-xs text-text-muted/60 mt-2">
            &copy; 2025 Jialan Ren
          </p>
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
