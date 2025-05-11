'use client'

import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { UserAvatar } from '@/components/ui/user-avatar'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, TalentRow } from '@/lib/types/tables'

/* -------------------------------------------------------------------------- */
/*                          R E C R U I T E R – T A L E N T                   */
/* -------------------------------------------------------------------------- */

/**
 * Tabular results for recruiter talent-search.
 * Clicking "View Profile” now opens the public candidate page in a new tab
 * to simplify the recruiter workflow.
 */
export default function TalentTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
}: TableProps<TalentRow>) {
  /* ----------------------- Navigation helpers ------------------------ */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* --------------------------- Columns ------------------------------- */
  const columns = React.useMemo<Column<TalentRow>[]>(() => {
    return [
      {
        key: 'name',
        header: sortableHeader('Name', 'name'),
        sortable: false,
        render: (v, row) => (
          <div className='flex items-center gap-2'>
            <UserAvatar name={row.name} email={row.email} className='size-7' />
            <span className='font-medium'>{v || 'Unnamed'}</span>
          </div>
        ),
      },
      {
        key: 'email',
        header: sortableHeader('Email', 'email'),
        sortable: false,
        render: (v) => v as string,
        className: 'break-all',
      },
      {
        key: 'verified',
        header: sortableHeader('Verified Creds', 'verified'),
        sortable: false,
        render: (v) => ((v as number) > 0 ? v : '—'),
      },
      {
        key: 'topScore',
        header: sortableHeader('Top Score', 'topScore'),
        sortable: false,
        render: (v) => (v === null || v === undefined ? '—' : `${v as number}%`),
      },
      {
        key: 'id',
        header: '',
        enableHiding: false,
        sortable: false,
        render: (_v, row) => (
          <Button asChild variant='link' size='sm' className='text-primary'>
            <Link href={`/candidates/${row.id}`} target='_blank' rel='noopener noreferrer'>
              View Profile
            </Link>
          </Button>
        ),
      },
    ]
  }, [sortableHeader])

  /* ---------------------------- Render ------------------------------- */
  return (
    <DataTable
      columns={columns}
      rows={rows}
      filterKey='name'
      filterValue={search}
      onFilterChange={handleSearchChange}
      pageSize={rows.length}
      pageSizeOptions={[rows.length]}
      hidePagination
    />
  )
}
