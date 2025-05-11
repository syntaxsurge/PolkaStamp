import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { SESSION_COOKIE } from '@/lib/constants/auth'

export async function POST() {
  ;(await cookies()).delete(SESSION_COOKIE)
  return NextResponse.json({ success: true })
}

export async function GET() {
  ;(await cookies()).delete(SESSION_COOKIE)
  return NextResponse.json({ success: true })
}
