'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig } from '@/components/ui/charts/chart'
import { PieChart } from '@/components/ui/charts/pie-chart'
import type { IssuerChartsProps } from '@/lib/types/components'

export default function IssuerCharts({ pending, verified }: IssuerChartsProps) {
  const data = [
    { status: 'pending', count: pending },
    { status: 'verified', count: verified },
  ]

  const chartConfig = {
    count: { label: 'Requests' },
    pending: { label: 'Pending', color: 'var(--warning)' },
    verified: { label: 'Verified', color: 'var(--success)' },
  } satisfies ChartConfig

  return (
    <Card className='md:col-span-2'>
      <CardHeader>
        <CardTitle className='text-lg font-medium'>Request Status Overview</CardTitle>
      </CardHeader>
      <CardContent className='h-72'>
        {pending + verified === 0 ? (
          <p className='text-muted-foreground text-sm'>No requests yet.</p>
        ) : (
          <PieChart data={data} dataKey='count' nameKey='status' config={chartConfig} />
        )}
      </CardContent>
    </Card>
  )
}
