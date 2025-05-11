import { NextResponse } from 'next/server'

import { buildResumeData, generateResumePdf } from '@/lib/resume/resume-builder'

/**
 * GET /api/candidates/[candidateId]/resume
 *
 * Generates a résumé PDF for the specified candidate.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ candidateId: string }> }) {
  /* Await dynamic segment */
  const { candidateId: idStr } = await params
  const candidateId = Number(idStr)
  if (Number.isNaN(candidateId)) {
    return NextResponse.json({ error: 'Invalid candidate id.' }, { status: 400 })
  }

  /* Build résumé data */
  const data = await buildResumeData(candidateId)
  if (!data) {
    return NextResponse.json({ error: 'Candidate not found.' }, { status: 404 })
  }

  /* Generate PDF */
  const pdfBytes = await generateResumePdf(data)
  const fileName = `${(data.name || 'resume').replace(/\s+/g, '_').toLowerCase()}.pdf`

  return new NextResponse(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  })
}
