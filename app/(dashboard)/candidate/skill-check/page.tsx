import { inArray } from 'drizzle-orm'
import { Bot } from 'lucide-react'

import RequireDidGate from '@/components/dashboard/require-did-gate'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PageCard from '@/components/ui/page-card'
import { db } from '@/lib/db/drizzle'
import { skillQuizzes, skillQuizQuestions } from '@/lib/db/schema/candidate'

import StartQuizForm from './start-quiz-form'

export const revalidate = 0

export default async function SkillCheckPage() {
  /* Quizzes + questions */
  const quizzes = await db.select().from(skillQuizzes)
  const ids = quizzes.map((q) => q.id)
  const questionsRows =
    ids.length === 0
      ? []
      : await db.select().from(skillQuizQuestions).where(inArray(skillQuizQuestions.quizId, ids))

  const questionsByQuiz = new Map<number, { id: number; prompt: string }[]>()
  for (const q of questionsRows) {
    if (!questionsByQuiz.has(q.quizId)) questionsByQuiz.set(q.quizId, [])
    questionsByQuiz.get(q.quizId)!.push({ id: q.id, prompt: q.prompt })
  }

  /* View */
  return (
    <RequireDidGate>
      <PageCard
        icon={Bot}
        title='AI Skill Check'
        description='Pass a quiz to instantly earn a verifiable Skill Pass credential.'
      >
        {quizzes.length === 0 ? (
          <p className='text-muted-foreground'>No quizzes found. Seed the database first.</p>
        ) : (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className='group relative overflow-hidden transition-shadow hover:shadow-xl'
              >
                <CardHeader>
                  <CardTitle className='line-clamp-2 min-h-[3rem]'>{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-4'>
                  <p className='text-muted-foreground line-clamp-3 flex-1 text-sm'>
                    {quiz.description}
                  </p>
                  <StartQuizForm
                    quiz={{
                      id: quiz.id,
                      title: quiz.title,
                      description: quiz.description,
                      questions: questionsByQuiz.get(quiz.id) ?? [],
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PageCard>
    </RequireDidGate>
  )
}
