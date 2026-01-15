"use client"

import { useState } from "react"
import { Download, FileText, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResumeDownloadProps {
  resumeUrl?: string
  className?: string
}

export function ResumeDownload({
  resumeUrl = "/resume.pdf",
  className
}: ResumeDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownload = async () => {
    if (isDownloading || downloaded) return

    setIsDownloading(true)
    setProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 20 + 10
      })
    }, 100)

    // Simulate download completion
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setIsDownloading(false)
      setDownloaded(true)

      // Trigger actual download
      const link = document.createElement("a")
      link.href = resumeUrl
      link.download = "Jialan_Ren_Resume.pdf"
      link.click()

      // Reset after a few seconds
      setTimeout(() => {
        setDownloaded(false)
        setProgress(0)
      }, 3000)
    }, 1000)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={cn(
        "group relative flex items-center gap-3 px-5 py-3 rounded-xl overflow-hidden",
        "border transition-all duration-300",
        downloaded
          ? "bg-green-dark/30 border-green-medium/50"
          : "bg-background/60 border-border hover:border-green-medium/50 hover:bg-green-dark/10",
        className
      )}
    >
      {/* Progress bar background */}
      {isDownloading && (
        <div
          className="absolute inset-0 bg-green-dark/30 transition-all duration-200"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      )}

      {/* Icon */}
      <div className={cn(
        "relative z-10 p-2 rounded-lg transition-all duration-300",
        downloaded
          ? "bg-green-medium/30 text-green-light"
          : "bg-background-secondary text-text-muted group-hover:text-green-light group-hover:bg-green-dark/30"
      )}>
        {downloaded ? (
          <Check className="w-4 h-4" />
        ) : isDownloading ? (
          <FileText className="w-4 h-4 animate-pulse" />
        ) : (
          <Download className="w-4 h-4 group-hover:animate-bounce" />
        )}
      </div>

      {/* Text */}
      <div className="relative z-10 text-left">
        <div className={cn(
          "text-sm font-medium transition-colors duration-300",
          downloaded ? "text-green-light" : "text-text-primary"
        )}>
          {downloaded ? "Downloaded!" : isDownloading ? "Downloading..." : "Download Resume"}
        </div>
        <div className="text-xs text-text-muted">
          {isDownloading ? `${Math.round(Math.min(progress, 100))}%` : "PDF • 1 page"}
        </div>
      </div>
    </button>
  )
}
