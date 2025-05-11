import { PricingGrid } from '@/components/pricing/pricing-grid'
import { fetchPlanMeta } from '@/lib/payments/pricing'

export default async function PricingSection() {
  const planMeta = await fetchPlanMeta()

  return (
    <section id='pricing' className='bg-muted/40 py-24'>
      <div className='mx-auto max-w-6xl px-4 text-center'>
        <h2 className='text-3xl font-extrabold tracking-tight sm:text-4xl'>
          Simple, Transparent Pricing
        </h2>
        <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
          Start free — upgrade when your team needs more power.
        </p>

        <div className='mt-16'>
          <PricingGrid planMeta={planMeta} />
        </div>
      </div>
    </section>
  )
}
