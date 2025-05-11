'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig } from '@/components/ui/charts/chart'
import { LineChart } from '@/components/ui/charts/line-chart'
import { PieChart } from '@/components/ui/charts/pie-chart'
import type { CandidateChartsProps } from '@/lib/types/components'

export default function CandidateCharts({ scoreData, statusData }: CandidateChartsProps) {
  /* Pie-chart prep */
  const pieData = statusData.map((d) => ({
    status: d.name.toLowerCase(),
    count: d.value,
  }))

  const pieConfig = {
    count: { label: 'Credentials' },
    verified: { label: 'Verified', color: 'var(--success)' },
    pending: { label: 'Pending', color: 'var(--warning)' },
    unverified: { label: 'Unverified', color: 'var(--color-muted-foreground)' },
    rejected: { label: 'Rejected', color: 'var(--color-destructive)' },
  } satisfies ChartConfig

  /* Line-chart config */
  const lineConfig = {
    score: { label: 'Score', color: 'var(--chart-1)' },
  } satisfies ChartConfig

  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Line chart - quiz scores */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Quiz Scores (last 10)</CardTitle>
        </CardHeader>
        <CardContent className='h-72'>
          {scoreData.length === 0 ? (
            <p className='text-muted-foreground text-sm'>No quiz attempts yet.</p>
          ) : (
            <LineChart
              data={scoreData}
              xKey='date'
              yKey='score'
              yDomain={[0, 100]}
              config={lineConfig}
              xTickFormatter={(v) => String(v).slice(5)}
            />
          )}
        </CardContent>
      </Card>

      {/* Pie chart - credential status */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Credential Status Mix</CardTitle>
        </CardHeader>
        <CardContent className='h-72'>
          {pieData.length === 0 ? (
            <p className='text-muted-foreground text-sm'>No credentials added yet.</p>
          ) : (
            <PieChart data={pieData} dataKey='count' nameKey='status' config={pieConfig} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
