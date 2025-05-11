'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { Briefcase } from 'lucide-react'

import { applyToJobAction } from '@/app/(tools)/jobs/actions'
import { ActionButton } from '@/components/ui/action-button'
import { DataTable, type Column } from '@/components/ui/tables/data-table'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useTableNavigation } from '@/lib/hooks/use-table-navigation'
import type { TableProps, JobRow } from '@/lib/types/tables'
import { formatDateTime } from '@/lib/utils/time'

/* -------------------------------------------------------------------------- */
/*                              T Y P E S                                     */
/* -------------------------------------------------------------------------- */

interface JobsTableProps extends TableProps<JobRow> {
  /** True when the viewing user has the "candidate" role */
  isCandidate: boolean
}

/* -------------------------------------------------------------------------- */
/*                              J O B S   T A B L E                           */
/* -------------------------------------------------------------------------- */

export default function JobsTable({
  rows,
  sort,
  order,
  basePath,
  initialParams,
  searchQuery,
  isCandidate,
}: JobsTableProps) {
  const router = useRouter()

  /* Centralised table-navigation helpers */
  const { search, handleSearchChange, sortableHeader } = useTableNavigation({
    basePath,
    initialParams,
    sort,
    order,
    searchQuery,
  })

  /* Column configuration */
  const columns = React.useMemo<Column<JobRow>[]>(() => {
    return [
      {
        key: 'name',
        header: sortableHeader('Job Title', 'name'),
        sortable: false,
        render: (v) => <span className='font-medium'>{v as string}</span>,
      },
      {
        key: 'recruiter',
        header: sortableHeader('Recruiter', 'recruiter'),
        sortable: false,
        render: (v) => (v ? (v as string) : '—'),
      },
      {
        key: 'createdAt',
        header: sortableHeader('Posted', 'createdAt'),
        sortable: false,
        render: (v) => formatDateTime(new Date(v as string)),
      },
      {
        key: 'description',
        header: 'Description',
        enableHiding: true,
        sortable: false,
        render: (v) => <span className='text-muted-foreground'>{v as string}</span>,
      },
      {
        key: 'id',
        header: '',
        enableHiding: false,
        sortable: false,
        render: (_v, row) => (
          <ApplyButton
            pipelineId={row.id}
            applied={row.applied}
            isCandidate={isCandidate}
            onDone={() => router.refresh()}
          />
        ),
      },
    ]
  }, [sortableHeader, router, isCandidate])

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

/* -------------------------------------------------------------------------- */
/*                                 A P P L Y                                  */
/* -------------------------------------------------------------------------- */

function ApplyButton({
  pipelineId,
  applied,
  isCandidate,
  onDone,
}: {
  pipelineId: number
  applied: boolean
  isCandidate: boolean
  onDone: () => void
}) {
  const [isApplied, setApplied] = React.useState(applied)
  const [pending, setPending] = React.useState(false)

  /* Disabled when already applied or viewer is not a candidate */
  const disabled = isApplied || !isCandidate

  /* Specific reason for tooltip */
  const disabledReason = isApplied
    ? 'You have already applied to this job.'
    : !isCandidate
      ? 'Only candidates may apply to job openings.'
      : ''

  if (disabled) {
    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Wrapper span keeps element interactive so the tooltip works */}
            <span className='inline-block'>
              <ActionButton
                onAction={async () => ({})}
                disabled
                variant='outline'
                size='sm'
                className='cursor-not-allowed opacity-60'
                aria-disabled='true'
                tabIndex={-1}
              >
                {isApplied ? 'Applied' : 'Apply'}
              </ActionButton>
            </span>
          </TooltipTrigger>
          <TooltipContent className='font-semibold'>{disabledReason}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  async function handleApply() {
    setPending(true)
    const fd = new FormData()
    fd.append('pipelineId', String(pipelineId))
    const res = await applyToJobAction({}, fd)
    setPending(false)
    if (res?.success) {
      setApplied(true)
      onDone()
    }
    return res
  }

  return (
    <ActionButton
      onAction={handleApply}
      pendingLabel='Applying…'
      disabled={pending}
      size='sm'
      className='rounded-full'
    >
      <Briefcase className='mr-2 h-4 w-4' strokeWidth={1.5} />
      Apply
    </ActionButton>
  )
}
