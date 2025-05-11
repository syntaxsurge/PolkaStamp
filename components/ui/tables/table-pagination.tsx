'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { TablePaginationProps } from '@/lib/types/tables'
import { buildLink } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/*                               Helpers                                      */
/* -------------------------------------------------------------------------- */

function getPages(current: number, hasNext: boolean): number[] {
  const pages: number[] = [1]
  if (current - 1 > 1) pages.push(current - 1)
  if (current !== 1) pages.push(current)
  if (hasNext) pages.push(current + 1)
  if (hasNext && current > 3) pages.push(-1)
  return [...new Set(pages)].sort((a, b) => a - b)
}

/* -------------------------------------------------------------------------- */
/*                                   View                                     */
/* -------------------------------------------------------------------------- */

export function TablePagination({
  page,
  hasNext,
  basePath,
  initialParams,
  pageSize,
  pageSizeOptions = [10, 20, 50],
}: TablePaginationProps) {
  const router = useRouter()

  if (page === 1 && !hasNext && pageSizeOptions.length === 0) return null
  const pages = React.useMemo(() => getPages(page, hasNext), [page, hasNext])
  const link = (p: number, extra: Record<string, any> = {}) =>
    buildLink(basePath, initialParams, { page: p, ...extra })

  function jumpToPage() {
    const input = prompt('Go to page:')
    if (!input) return
    const num = Number(input)
    if (Number.isNaN(num) || num < 1) return
    router.push(link(num), { scroll: false })
  }

  /* Determine disabled states once to keep JSX readable */
  const prevDisabled = page <= 1
  const nextDisabled = !hasNext

  return (
    <div className='flex w-full flex-col gap-3 py-4 sm:flex-row sm:items-center'>
      {/* Left — current page label */}
      <span className='text-muted-foreground text-sm'>Page {page}</span>

      {/* Right — controls */}
      <div className='flex items-center gap-2 sm:ml-auto'>
        {/* Page-size selector */}
        <select
          value={pageSize}
          onChange={(e) =>
            router.push(
              buildLink(basePath, initialParams, {
                size: Number(e.target.value),
                page: 1,
              }),
              { scroll: false },
            )
          }
          className='h-8 rounded-md border px-2 text-sm'
        >
          {pageSizeOptions.map((sz) => (
            <option key={sz} value={sz}>
              {sz} / page
            </option>
          ))}
        </select>

        {/* Previous */}
        {prevDisabled ? (
          <Button variant='outline' size='sm' disabled>
            Previous
          </Button>
        ) : (
          <Button asChild variant='outline' size='sm'>
            <Link href={link(page - 1)} scroll={false}>
              Previous
            </Link>
          </Button>
        )}

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === -1 ? (
            <Button
              key={`ellipsis-${idx}`}
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={jumpToPage}
            >
              …
            </Button>
          ) : (
            <Button
              key={p}
              asChild={!prevDisabled && !nextDisabled}
              variant={p === page ? 'default' : 'outline'}
              size='sm'
              className='h-8 w-8 p-0'
            >
              <Link href={link(p)} scroll={false}>
                {p}
              </Link>
            </Button>
          ),
        )}

        {/* Next */}
        {nextDisabled ? (
          <Button variant='outline' size='sm' disabled>
            Next
          </Button>
        ) : (
          <Button asChild variant='outline' size='sm'>
            <Link href={link(page + 1)} scroll={false}>
              Next
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
