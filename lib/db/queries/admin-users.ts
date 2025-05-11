import type { AdminUserRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { getPaginatedList } from './query-helpers'
import { users } from '../schema/core'

/* -------------------------------------------------------------------------- */
/*                        A D M I N   U S E R S                               */
/* -------------------------------------------------------------------------- */

export async function getAdminUsersPage(
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'email' | 'role' | 'createdAt' = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<{ users: AdminUserRow[]; hasNext: boolean }> {
  const sortMap = {
    name: users.name,
    email: users.email,
    role: users.role,
    createdAt: users.createdAt,
  } as const

  const baseQuery = db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)

  const { rows, hasNext } = await getPaginatedList<AdminUserRow>(
    baseQuery,
    page,
    pageSize,
    sortBy,
    sortMap,
    order,
    searchTerm,
    [users.name, users.email, users.role],
  )

  return { users: rows, hasNext }
}
