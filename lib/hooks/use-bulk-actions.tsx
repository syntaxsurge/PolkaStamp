'use client'

import * as React from 'react'

import type { BulkAction, BulkActionConfig } from '@/lib/types/components'

/* -------------------------------------------------------------------------- */
/*                                   Hook                                     */
/* -------------------------------------------------------------------------- */

/**
 * Converts an array of {@link BulkActionConfig}s into DataTable-compatible
 * {@link BulkAction}s with a shared pending state and automatic disabling.
 *
 * ```ts
 * const bulkActions = useBulkActions<RowType>([
 *   {
 *     label: 'Delete',
 *     icon: Trash2,
 *     variant: 'destructive',
 *     handler: async rows => {
 *       await Promise.all(rows.map(r => deleteFn(r.id)))
 *       router.refresh()
 *     },
 *   },
 *   // more actions…
 * ])
 * ```
 */
export function useBulkActions<Row extends Record<string, any>>(
  configs: BulkActionConfig<Row>[],
): BulkAction<Row>[] {
  const [isPending, startTransition] = React.useTransition()

  /* Memoise the mapped actions to avoid recreating objects on each render. */
  return React.useMemo<BulkAction<Row>[]>(() => {
    return configs.map((cfg) => ({
      label: cfg.label,
      icon: cfg.icon,
      variant: cfg.variant,
      isAvailable: cfg.isAvailable,
      /* Wrap the caller-supplied handler inside a transition. */
      onClick: (rows) => startTransition(async () => cfg.handler(rows)),
      /* Disable while pending or when the caller predicate returns true. */
      isDisabled: (rows) => isPending || (cfg.isDisabled ? cfg.isDisabled(rows) : false),
    }))
  }, [JSON.stringify(configs), isPending])
}
