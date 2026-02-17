import { HeroPortfolio } from "@/components/sections/hero-portfolio"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { ShowcaseSection } from "@/components/sections/showcase"
import { FunFactsSection } from "@/components/sections/fun-facts"
import { SkillsSection } from "@/components/sections/skills"
import { ContactSection } from "@/components/sections/contact"
import { TestimonialsSection } from "@/components/sections/testimonials"

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-background text-text-primary antialiased selection:bg-green-medium/30 selection:text-green-light"
    >
      {/* Hero - Full viewport terminal intro */}
      <HeroPortfolio />

      {/* Content sections - seamless flow */}
      <div className="relative">
        {/* Experience - Bento grid */}
        <ExperienceSection />

        {/* Projects - 3D hover cards */}
        <ProjectsSection />

        {/* Showcase - Visual proof of work */}
        <ShowcaseSection />

        {/* Testimonials - Social proof carousel */}
        <TestimonialsSection />

        {/* Fun Facts - Marquee + highlights */}
        <FunFactsSection />

        {/* Skills - Orbital visualization */}
        <SkillsSection />

        {/* Contact - Modern card with form */}
        <ContactSection />
      </div>
    </main>
  )
}
