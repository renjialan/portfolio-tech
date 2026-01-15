"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus("success")
      setFormState({ name: "", email: "", message: "" })
      onSuccess?.()

      // Reset after showing success
      setTimeout(() => setStatus("idle"), 3000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const inputClasses = (field: string) => cn(
    "w-full px-4 py-3 rounded-xl bg-background/60 border transition-all duration-300",
    "text-text-primary placeholder:text-text-muted",
    "focus:outline-none",
    focusedField === field
      ? "border-green-medium/60 shadow-[0_0_20px_rgba(122,229,130,0.15)]"
      : "border-border hover:border-border-secondary"
  )

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-mono text-text-muted mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formState.name}
            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            placeholder="Your name"
            required
            className={inputClasses("name")}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-mono text-text-muted mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="your@email.com"
            required
            className={inputClasses("email")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono text-text-muted mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={formState.message}
          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
          placeholder="Tell me about your project or opportunity..."
          required
          rows={4}
          className={cn(inputClasses("message"), "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
          status === "success"
            ? "bg-green-dark/40 border border-green-medium/50 text-green-light"
            : "bg-gradient-to-r from-green-dark to-green-medium text-white hover:from-green-medium hover:to-green-light",
          "disabled:opacity-70 disabled:cursor-not-allowed"
        )}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Message Sent!
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400 text-center">
          Something went wrong. Please try again or email directly.
        </p>
      )}
    </form>
  )
}
