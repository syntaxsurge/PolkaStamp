'use client'

import { useFilterNavigation } from '@/lib/hooks/use-filter-navigation'
import type { IssuerFiltersProps } from '@/lib/types/components'

export default function IssuerFilters({
  basePath,
  initialParams,
  categories,
  industries,
  selectedCategory,
  selectedIndustry,
}: IssuerFiltersProps) {
  const handleChange = useFilterNavigation(basePath, initialParams)

  return (
    <div className='flex flex-wrap items-center gap-4'>
      {/* Category */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='category' className='text-muted-foreground text-xs font-medium uppercase'>
          Category
        </label>
        <select
          id='category'
          value={selectedCategory}
          onChange={(e) => handleChange('category', e.target.value)}
          className='h-10 rounded-md border px-3 text-sm capitalize'
        >
          <option value=''>All categories</option>
          {categories.map((c) => (
            <option key={c} value={c} className='capitalize'>
              {c.replaceAll('_', ' ').toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Industry */}
      <div className='flex flex-col gap-1'>
        <label htmlFor='industry' className='text-muted-foreground text-xs font-medium uppercase'>
          Industry
        </label>
        <select
          id='industry'
          value={selectedIndustry}
          onChange={(e) => handleChange('industry', e.target.value)}
          className='h-10 rounded-md border px-3 text-sm capitalize'
        >
          <option value=''>All industries</option>
          {industries.map((i) => (
            <option key={i} value={i} className='capitalize'>
              {i.toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
