'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { Copy, ExternalLink, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { buildExplorerLink, copyToClipboard } from '@/lib/utils'
import type { QuizMeta } from '@/lib/types/components'

import { startQuizAction } from './actions'

/* -------------------------------------------------------------------------- */
/*                       Deterministic seed-based shuffle                     */
/* -------------------------------------------------------------------------- */

function mulberry32(a: number) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(arr: T[], seedHex: string): T[] {
  const out = [...arr]
  const seedInt = Number.parseInt(seedHex.slice(2, 10), 16) || 1
  const rand = mulberry32(seedInt)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/* -------------------------------------------------------------------------- */
/*                           Random 32-byte seed helper                       */
/* -------------------------------------------------------------------------- */

function randomSeed(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  return (
    '0x' +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  )
}

/* -------------------------------------------------------------------------- */
/*                               Main component                               */
/* -------------------------------------------------------------------------- */

interface StartQuizFormProps {
  quiz: QuizMeta
}

export default function StartQuizForm({ quiz }: StartQuizFormProps) {
  const [open, setOpen] = useState(false)
  const [seed, setSeed] = useState('')
  const [question, setQuestion] = useState<QuizMeta['questions'][number] | null>(null)

  const [score, setScore] = useState<number | null>(null)
  const [message, setMessage] = useState<string>('')
  const [txHash, setTxHash] = useState<string>('')
  const [vcJson, setVcJson] = useState<string>('')

  const [isPending, startTransition] = useTransition()

  /* Regenerate seed & question each time the modal opens */
  useEffect(() => {
    if (!open) return

    const s = randomSeed()
    setSeed(s)
    setScore(null)
    setMessage('')
    setTxHash('')
    setVcJson('')

    const shuffled = shuffle(quiz.questions, s)
    setQuestion(shuffled[0] ?? null)
  }, [open, quiz.questions])

  /* ------------------------------ Submit handler ------------------------- */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const toastId = toast.loading('Submitting your answer…')

    startTransition(async () => {
      try {
        type ServerRes = {
          score: number
          message: string
          passed?: boolean
          txHash?: string
          vcJson?: string
        }

        const res = (await startQuizAction(fd)) as ServerRes
        if (!res) throw new Error('No response from server')

        setScore(res.score)
        setMessage(res.message)
        toast.success(res.message, { id: toastId })

        if (res.passed && res.txHash) {
          setTxHash(res.txHash)

          toast.loading(`Tx sent: ${res.txHash.slice(0, 10)}…`, {
            id: toastId,
            action: {
              label: 'View',
              onClick: () => window.open(buildExplorerLink(res.txHash!), '_blank'),
            },
          })

          /* Persist attempt ---------------------------------------------- */
          await fetch('/api/skill-pass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quizId: quiz.id,
              score: res.score,
              seed,
              txHash: res.txHash,
              vcJson: res.vcJson ?? '',
            }),
          })

          if (res.vcJson) setVcJson(res.vcJson)
        }
      } catch (err: any) {
        toast.error(err?.message ?? 'Something went wrong.', { id: toastId })
      }
    })
  }

  /* ------------------------------ UI ------------------------------------ */
  return (
    <>
      <button className='w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/90' onClick={() => setOpen(true)}>
        Take Quiz
      </button>

      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='relative w-full max-w-lg rounded-lg bg-background p-6 shadow-lg'>
            {/* Close button */}
            <button
              type='button'
              className='absolute right-4 top-4 text-xl font-bold'
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {/* Header */}
            <h2 className='text-xl font-bold'>{quiz.title}</h2>
            {quiz.description && (
              <p className='mt-1 text-sm text-muted-foreground'>{quiz.description}</p>
            )}

            {score === null ? (
              /* ---------------------- Quiz form --------------------------- */
              <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
                <input type='hidden' name='quizId' value={quiz.id} />
                <input type='hidden' name='seed' value={seed} />
                {question && <input type='hidden' name='questionId' value={question.id} />}

                {question ? (
                  <p className='font-medium'>{question.prompt}</p>
                ) : (
                  <p className='text-muted-foreground'>Loading question…</p>
                )}

                <div>
                  <label
                    htmlFor={`answer-${quiz.id}`}
                    className='mb-1 block text-sm font-medium'
                  >
                    Your Answer
                  </label>
                  <textarea
                    id={`answer-${quiz.id}`}
                    name='answer'
                    rows={6}
                    required
                    className='border-border focus-visible:ring-primary w-full rounded-md border p-2 text-sm focus-visible:ring-2'
                    placeholder='Type your answer here…'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isPending || !seed || !question}
                  className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-background transition-colors disabled:opacity-50'
                >
                  {isPending ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin inline' /> Submitting…
                    </>
                  ) : (
                    'Submit Answer'
                  )}
                </button>
              </form>
            ) : (
              /* --------------------- Result panel ------------------------- */
              <div className='flex flex-col items-center gap-4 py-6'>
                <p className='text-primary text-4xl font-extrabold'>{score}</p>
                <p className='text-center'>{message}</p>

                {txHash && (
                  <a
                    href={buildExplorerLink(txHash)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary inline-flex items-center gap-1 underline'
                  >
                    View Transaction <ExternalLink className='h-4 w-4' />
                  </a>
                )}

                {vcJson && (
                  <button
                    type='button'
                    className='inline-flex items-center gap-2 text-sm underline'
                    onClick={() => copyToClipboard(vcJson)}
                  >
                    <Copy className='h-4 w-4' /> Copy VC JSON
                  </button>
                )}

                <button
                  type='button'
                  className='rounded-md border px-3 py-1.5 text-sm transition-colors hover:bg-muted'
                  onClick={() => setScore(null)}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}