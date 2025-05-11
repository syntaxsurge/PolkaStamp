import { eq } from 'drizzle-orm'

import type { AdminIssuerRow } from '@/lib/types/tables'

import { db } from '../drizzle'
import { getPaginatedList } from './query-helpers'
import { users } from '../schema/core'
import { issuers } from '../schema/issuer'

/* -------------------------------------------------------------------------- */
/*                         A D M I N   I S S U E R S                          */
/* -------------------------------------------------------------------------- */

export interface AdminIssuerRowWithWallet extends AdminIssuerRow {
  /** Wallet address of the issuer owner (H160 or SS58, lower-case 0x preferred) */
  ownerWalletAddress: string | null
  /** On-chain transaction hash granting issuer role (if any) */
  grantTxHash: string | null
}

export async function getAdminIssuersPage(
  page: number,
  pageSize = 10,
  sortBy: 'name' | 'domain' | 'owner' | 'category' | 'industry' | 'status' | 'id' = 'id',
  order: 'asc' | 'desc' = 'desc',
  searchTerm = '',
): Promise<{ issuers: AdminIssuerRowWithWallet[]; hasNext: boolean }> {
  const sortMap = {
    name: issuers.name,
    domain: issuers.domain,
    owner: users.email,
    category: issuers.category,
    industry: issuers.industry,
    status: issuers.status,
    id: issuers.id,
  } as const

  const baseQuery = db
    .select({
      id: issuers.id,
      name: issuers.name,
      domain: issuers.domain,
      owner: users.email,
      ownerWalletAddress: users.walletAddress,
      category: issuers.category,
      industry: issuers.industry,
      status: issuers.status,
      grantTxHash: issuers.grantTxHash,
    })
    .from(issuers)
    .leftJoin(users, eq(issuers.ownerUserId, users.id))

  const { rows, hasNext } = await getPaginatedList<AdminIssuerRowWithWallet>(
    baseQuery,
    page,
    pageSize,
    sortBy,
    sortMap,
    order,
    searchTerm,
    [issuers.name, issuers.domain, users.email],
  )

  return { issuers: rows, hasNext }
}
