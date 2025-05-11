'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart } from '@/components/ui/charts/bar-chart'
import { type ChartConfig } from '@/components/ui/charts/chart'
import { PieChart } from '@/components/ui/charts/pie-chart'
import type { RecruiterChartsProps } from '@/lib/types/components'

export default function RecruiterCharts({ stageData, uniqueCandidates }: RecruiterChartsProps) {
  /* --------------------- bar-chart config --------------------- */
  const barConfig = {
    count: { label: 'Candidates', color: 'var(--color-primary)' },
  } satisfies ChartConfig

  /* --------------------- pie-chart prep ----------------------- */
  const pieData = [
    { category: 'unique', value: uniqueCandidates },
    { category: 'total', value: stageData.reduce((sum, d) => sum + d.count, 0) },
  ]

  const pieConfig = {
    value: { label: 'Entries' },
    unique: { label: 'Unique Candidates', color: 'var(--color-chart-1)' },
    total: { label: 'Total Entries', color: 'var(--color-chart-2)' },
  } satisfies ChartConfig

  /* --------------------------- view --------------------------- */
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      {/* Bar chart - stage distribution */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Candidates per Stage</CardTitle>
        </CardHeader>
        <CardContent className='h-72'>
          {stageData.length === 0 ? (
            <p className='text-muted-foreground text-sm'>No candidates in pipelines yet.</p>
          ) : (
            <BarChart data={stageData} xKey='stage' yKey='count' config={barConfig} />
          )}
        </CardContent>
      </Card>

      {/* Pie chart - unique vs total */}
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Unique vs Total Entries</CardTitle>
        </CardHeader>
        <CardContent className='h-72'>
          {uniqueCandidates === 0 ? (
            <p className='text-muted-foreground text-sm'>No data to display.</p>
          ) : (
            <PieChart data={pieData} dataKey='value' nameKey='category' config={pieConfig} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
