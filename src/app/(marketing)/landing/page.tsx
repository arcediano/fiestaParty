import { HeroSection } from './sections/HeroSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { TemplatesShowcase } from './sections/TemplatesShowcase'
import { HowItWorks } from './sections/HowItWorks'
import { TestimonialsSection } from '@/components/layout/TestimonialsSection'
import { PricingSection } from './sections/PricingSection'
import { CTASection } from '@/components/layout/CTASection'

export default function LandingPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <TemplatesShowcase />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </main>
  )
}