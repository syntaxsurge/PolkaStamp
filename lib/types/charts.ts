import type { ChartConfig } from '@/components/ui/charts/chart'

/* -------------------------------------------------------------------------- */
/*                               Chart Prop Types                             */
/* -------------------------------------------------------------------------- */

export interface LineChartProps<D extends Record<string, any> = any> {
  /** Source array */
  data: D[]
  /** X-axis key */
  xKey: keyof D
  /** Y-axis key */
  yKey: keyof D
  /** Optional fixed Y-domain */
  yDomain?: [number, number]
  /** Colour / label configuration */
  config: ChartConfig
  /** Optional X-tick formatter (default: first 3 chars) */
  xTickFormatter?: (value: any) => string
}

export interface BarChartProps<D extends Record<string, any> = any> {
  /** Source data array */
  data: D[]
  /** Categorical X-axis key */
  xKey: keyof D
  /** Numeric Y-axis key */
  yKey: keyof D
  /** Colour / label configuration */
  config: ChartConfig
  /** Optional X-tick formatter (default: full label) */
  xTickFormatter?: (value: any) => string
}

export interface PieChartProps<D extends Record<string, any> = any> {
  /** Dataset */
  data: D[]
  /** Numeric value accessor */
  dataKey: keyof D
  /** Slice name accessor */
  nameKey: keyof D
  /** Colour / label configuration */
  config: ChartConfig
  /** Extra class names */
  className?: string
}
