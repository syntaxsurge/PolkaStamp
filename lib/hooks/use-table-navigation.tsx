'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { ArrowUpDown } from 'lucide-react'

import type { TableNavigationOptions } from '@/lib/types/ui'
import { buildLink } from '@/lib/utils'

/**
 * Centralised navigation helpers for server-side paged tables.
 * Returns a debounced `handleSearchChange` and a `sortableHeader` builder.
 */
export function useTableNavigation({
  basePath,
  initialParams,
  sort,
  order,
  searchQuery,
  paramKeys,
  debounce = 400,
}: TableNavigationOptions) {
  const router = useRouter()
  const [search, setSearch] = React.useState(searchQuery)

  const sortKey = paramKeys?.sort ?? 'sort'
  const orderKey = paramKeys?.order ?? 'order'
  const searchKey = paramKeys?.search ?? 'q'
  const pageKey = paramKeys?.page ?? 'page'

  const debounceRef = React.useRef<NodeJS.Timeout | null>(null)

  /* ------------------------ Search input handler ------------------------ */
  const handleSearchChange = React.useCallback(
    (value: string) => {
      setSearch(value)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        router.push(
          buildLink(basePath, initialParams, {
            [searchKey]: value,
            [pageKey]: 1,
          }),
          { scroll: false },
        )
      }, debounce)
    },
    [basePath, initialParams, router, searchKey, pageKey, debounce],
  )

  /* ---------------------- Sortable header builder ----------------------- */
  const sortableHeader = React.useCallback(
    (label: React.ReactNode, key: string) => {
      const nextOrder = sort === key && order === 'asc' ? 'desc' : 'asc'
      const href = buildLink(basePath, initialParams, {
        [sortKey]: key,
        [orderKey]: nextOrder,
        [pageKey]: 1,
        [searchKey]: search,
      })
      return (
        <Link href={href} scroll={false} className='flex items-center gap-1'>
          {label}
          <ArrowUpDown className='h-4 w-4' />
        </Link>
      )
    },
    [basePath, initialParams, sort, order, sortKey, orderKey, pageKey, searchKey, search],
  )

  return { search, handleSearchChange, sortableHeader }
}
