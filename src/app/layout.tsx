import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Navigation } from '@/components/layout/navigation'


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
        <Navigation />
        {children}
      </body>
    </html>
  )
}