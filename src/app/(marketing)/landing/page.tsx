import { HeroSection } from './sections/HeroSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { TemplatesShowcase } from './sections/TemplatesShowcase'
import { HowItWorks } from './sections/HowItWorks'
import { Testimonials } from './sections/Testimonials'
import { PricingSection } from './sections/PricingSection'
import { CTASection } from './sections/CTASection'

export default function LandingPage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <TemplatesShowcase />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <CTASection />
    </main>
  )
}