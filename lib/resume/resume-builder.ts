import * as fs from 'fs/promises'
import * as path from 'path'

import { eq } from 'drizzle-orm'
import { PDFDocument, StandardFonts, rgb, type PDFFont } from 'pdf-lib'

import { db } from '@/lib/db/drizzle'
import {
  candidates,
  candidateCredentials,
  CredentialStatus,
  CredentialCategory,
} from '@/lib/db/schema/candidate'
import { users } from '@/lib/db/schema/core'
import { issuers } from '@/lib/db/schema/issuer'
import type { ResumeData } from '@/lib/types/resume'

/* -------------------------------------------------------------------------- */
/*                         R É S U M É   B U I L D E R                        */
/* -------------------------------------------------------------------------- */

export async function buildResumeData(candidateId: number): Promise<ResumeData | null> {
  /* Basic profile */
  const [profile] = await db
    .select({
      name: users.name,
      email: users.email,
      bio: candidates.bio,
    })
    .from(candidates)
    .innerJoin(users, eq(users.id, candidates.userId))
    .where(eq(candidates.id, candidateId))
    .limit(1)

  if (!profile) return null

  /* All credentials, regardless of status */
  const creds = await db
    .select({
      title: candidateCredentials.title,
      issuer: issuers.name,
      category: candidateCredentials.category,
      status: candidateCredentials.status,
      fileUrl: candidateCredentials.fileUrl,
    })
    .from(candidateCredentials)
    .leftJoin(issuers, eq(issuers.id, candidateCredentials.issuerId))
    .where(eq(candidateCredentials.candidateId, candidateId))

  const experiences = creds
    .filter((c) => c.category === CredentialCategory.EXPERIENCE)
    .map((c) => ({ title: c.title, company: c.issuer }))

  const projects = creds
    .filter((c) => c.category === CredentialCategory.PROJECT)
    .map((c) => ({ title: c.title, link: c.fileUrl }))

  return {
    name: profile.name ?? 'Unnamed',
    email: profile.email,
    bio: profile.bio,
    credentials: creds.map((c) => ({
      title: c.title,
      issuer: c.issuer,
      status: c.status as CredentialStatus,
    })),
    experiences,
    projects,
  }
}

/* -------------------------------------------------------------------------- */
/*                      M O D E R N   P D F   G E N E R A T O R               */
/* -------------------------------------------------------------------------- */

export async function generateResumePdf(data: ResumeData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  let page = pdf.addPage()
  const { width, height } = page.getSize()

  /* ---------------------------------------------------------------------- */
  /*                          S T Y L E   C O N S T                         */
  /* ---------------------------------------------------------------------- */
  const MARGIN_X = 60
  const MARGIN_Y = 60
  const HEAD_FONT_SIZE = 28
  const SUBHEAD_FONT_SIZE = 12
  const BODY_FONT_SIZE = 10
  const SMALL_FONT_SIZE = 8
  const LINE_HEIGHT = BODY_FONT_SIZE + 4
  const GAP_AFTER_DIVIDER = 12
  const SECTION_TOP_GAP = 20

  /* Brand primary indigo (#4F46E5) */
  const ACCENT = rgb(79 / 255, 70 / 255, 229 / 255)

  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)

  /* Brand logo (optional) */
  let logoImage
  try {
    const logoBytes = await fs.readFile(
      path.join(process.cwd(), 'public', 'images', 'polkastamp-logo.png'),
    )
    logoImage = await pdf.embedPng(logoBytes)
  } catch {
    logoImage = undefined
  }

  /* ---------------------------------------------------------------------- */
  /*                                BANNER                                  */
  /* ---------------------------------------------------------------------- */
  const bannerH = 90
  page.drawRectangle({
    x: 0,
    y: height - bannerH,
    width,
    height: bannerH,
    color: ACCENT,
  })

  const nameY = height - bannerH + (bannerH + HEAD_FONT_SIZE) / 2 - HEAD_FONT_SIZE
  const emailY = nameY - SUBHEAD_FONT_SIZE - 6

  page.drawText(data.name, {
    x: MARGIN_X,
    y: nameY,
    size: HEAD_FONT_SIZE,
    font: fontBold,
    color: rgb(1, 1, 1),
  })

  page.drawText(data.email, {
    x: MARGIN_X,
    y: emailY,
    size: SUBHEAD_FONT_SIZE,
    font: fontRegular,
    color: rgb(1, 1, 1),
  })

  if (logoImage) {
    const logoH = 24
    const scale = logoH / logoImage.height
    page.drawImage(logoImage, {
      x: width - MARGIN_X - logoImage.width * scale,
      y: height - bannerH + (bannerH - logoH) / 2,
      width: logoImage.width * scale,
      height: logoH,
    })
  }

  /* Cursor below banner */
  let y = height - bannerH - MARGIN_Y

  /* ---------------------------------------------------------------------- */
  /*                        H E L P E R   F U N C T I O N S                  */
  /* ---------------------------------------------------------------------- */

  function drawSectionTitle(title: string) {
    y -= SECTION_TOP_GAP
    ensureSpace()

    page.drawText(title.toUpperCase(), {
      x: MARGIN_X,
      y,
      size: SUBHEAD_FONT_SIZE,
      font: fontBold,
      color: ACCENT,
    })
    y -= SUBHEAD_FONT_SIZE + 2
    page.drawLine({
      start: { x: MARGIN_X, y },
      end: { x: width - MARGIN_X, y },
      thickness: 1,
      color: ACCENT,
    })
    y -= GAP_AFTER_DIVIDER
  }

  function ensureSpace(linesNeeded = 1) {
    if (y - linesNeeded * LINE_HEIGHT < MARGIN_Y) {
      page = pdf.addPage()
      y = page.getSize().height - MARGIN_Y
    }
  }

  function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
    const words = text.split(/\s+/)
    const lines: string[] = []
    let current = ''

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word
      const width = font.widthOfTextAtSize(next, fontSize)
      if (width <= maxWidth) {
        current = next
      } else {
        if (current) lines.push(current)
        current = word
      }
    })

    if (current) lines.push(current)
    return lines
  }

  function drawWrapped(text: string, font: PDFFont, size: number) {
    const maxWidth = width - MARGIN_X * 2
    const lines = wrapText(text, font, size, maxWidth)
    lines.forEach((ln) => {
      ensureSpace()
      page.drawText(ln, { x: MARGIN_X, y, size, font })
      y -= LINE_HEIGHT
    })
    y -= 8
  }

  function bulletLine(text: string) {
    ensureSpace()
    const bullet = '• '
    const bulletWidth = fontRegular.widthOfTextAtSize(bullet, BODY_FONT_SIZE)
    page.drawText(bullet, {
      x: MARGIN_X,
      y,
      size: BODY_FONT_SIZE,
      font: fontRegular,
    })
    const contentMax = width - MARGIN_X * 2 - bulletWidth
    const wrapped = wrapText(text, fontRegular, BODY_FONT_SIZE, contentMax)
    let localY = y
    wrapped.forEach((ln, idx) => {
      page.drawText(ln, {
        x: MARGIN_X + bulletWidth,
        y: localY,
        size: BODY_FONT_SIZE,
        font: fontRegular,
      })
      if (idx < wrapped.length - 1) {
        localY -= LINE_HEIGHT
        ensureSpace()
      }
    })
    y = localY - LINE_HEIGHT
  }

  /* ---------------------------------------------------------------------- */
  /*                                 BODY                                   */
  /* ---------------------------------------------------------------------- */

  if (data.bio) {
    drawSectionTitle('About Me')
    drawWrapped(data.bio, fontRegular, BODY_FONT_SIZE)
  }

  if (data.experiences.length > 0) {
    drawSectionTitle('Experience')
    data.experiences.forEach((exp) =>
      bulletLine(`${exp.title}${exp.company ? ` — ${exp.company}` : ''}`),
    )
  }

  if (data.projects.length > 0) {
    drawSectionTitle('Projects')
    data.projects.forEach((proj) => bulletLine(proj.title))
  }

  if (data.credentials.length > 0) {
    drawSectionTitle('Credentials')
    data.credentials.forEach((c) => {
      const issuer = c.issuer ? ` — ${c.issuer}` : ''
      const status = c.status.charAt(0).toUpperCase() + c.status.slice(1).toLowerCase()
      bulletLine(`${c.title}${issuer} (${status})`)
    })
  }

  /* ---------------------------------------------------------------------- */
  /*                              FOOTER                                    */
  /* ---------------------------------------------------------------------- */
  const footerText = 'Generated with PolkaStamp • polkastamp.com'
  const footerW = fontRegular.widthOfTextAtSize(footerText, SMALL_FONT_SIZE)

  pdf.getPages().forEach((p, idx) => {
    const { width: pw } = p.getSize()
    p.drawText(footerText, {
      x: pw / 2 - footerW / 2,
      y: MARGIN_Y / 2,
      size: SMALL_FONT_SIZE,
      font: fontRegular,
      color: rgb(0.55, 0.55, 0.55),
    })
    const num = `${idx + 1}/${pdf.getPageCount()}`
    const numW = fontRegular.widthOfTextAtSize(num, SMALL_FONT_SIZE)
    p.drawText(num, {
      x: pw - MARGIN_X - numW,
      y: MARGIN_Y / 2,
      size: SMALL_FONT_SIZE,
      font: fontRegular,
      color: rgb(0.55, 0.55, 0.55),
    })
  })

  return await pdf.save()
}
