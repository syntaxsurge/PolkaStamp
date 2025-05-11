import CTASection from '@/components/landing/cta-section'
import DeepDiveSection from '@/components/landing/deep-dive-section'
import DemoSection from '@/components/landing/demo-section'
import FeaturesSection from '@/components/landing/features-section'
import HeroSection from '@/components/landing/hero-section'
import OverviewSection from '@/components/landing/overview-section'
import PricingSection from '@/components/landing/pricing-section'
import WorkflowSection from '@/components/landing/workflow-section'

/**
 * Public landing page — assembled from modular sections.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OverviewSection />
      <DemoSection />
      <FeaturesSection />
      <DeepDiveSection />
      <WorkflowSection />
      <PricingSection />
      <CTASection />
    </>
  )
}
