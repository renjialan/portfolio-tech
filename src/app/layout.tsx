import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Navigation } from '@/components/layout/navigation'
import { BackToTop } from '@/components/layout/back-to-top'
import { PageLoader } from '@/components/ui/page-loader'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { SkipNav } from '@/components/ui/skip-nav'
import { NoiseOverlay } from '@/components/ui/noise-overlay'
import { CursorTrail } from '@/components/ui/cursor-trail'
import { KonamiEasterEgg } from '@/components/ui/konami-easter-egg'
import { ToastProvider } from '@/components/ui/toast'
import { ReducedMotionProvider } from '@/components/ui/reduced-motion-toggle'

export const metadata: Metadata = {
  title: 'Jialan Ren - Portfolio',
  description: 'AI Product Builder & Full-Stack Developer - I ship AI products that people actually use',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ReducedMotionProvider>
          <ToastProvider>
            {/* Page loader - shows during initial load */}
            <PageLoader />

            {/* Accessibility: Skip to main content link */}
            <SkipNav mainId="main-content" />

            {/* Scroll progress indicator */}
            <ScrollProgress />

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            {children}

            {/* Back to top button */}
            <BackToTop />

            {/* Visual enhancements */}
            <NoiseOverlay opacity={0.015} />
            <CursorTrail />

            {/* Easter eggs */}
            <KonamiEasterEgg />
          </ToastProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  )
}