import { NextRequest, NextResponse } from 'next/server'

import { and, asc, ilike, eq } from 'drizzle-orm'

import { db } from '@/lib/db/drizzle'
import { issuers, IssuerStatus } from '@/lib/db/schema/issuer'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const q = (searchParams.get('q') ?? '').trim()
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'))
  const size = Math.min(Math.max(1, Number(searchParams.get('size') ?? '20')), 50)

  const where = and(
    eq(issuers.status, IssuerStatus.ACTIVE),
    q ? ilike(issuers.name, `%${q}%`) : undefined,
  )

  const rows = await db
    .select({
      id: issuers.id,
      name: issuers.name,
      category: issuers.category,
      industry: issuers.industry,
    })
    .from(issuers)
    .where(where)
    .orderBy(asc(issuers.name))
    .limit(size)
    .offset((page - 1) * size)

  return NextResponse.json({ results: rows })
}
