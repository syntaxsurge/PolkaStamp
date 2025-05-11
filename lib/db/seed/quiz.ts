import { eq } from 'drizzle-orm'

import { db } from '../drizzle'
import { skillQuizzes, skillQuizQuestions } from '../schema/candidate'

const MIN_QUESTIONS = 10

/* -------------------------------------------------------------------------- */
/*                       Q U I Z   M E T A D A T A                            */
/* -------------------------------------------------------------------------- */

const QUIZ_META = [
  {
    title: 'JavaScript Fundamentals',
    description:
      'Assess basic to intermediate JavaScript skills, including syntax, arrays, objects, async patterns, and DOM manipulation.',
  },
  {
    title: 'React Basics',
    description:
      'Evaluate knowledge of React concepts like components, props, state, lifecycle methods, and hooks.',
  },
  {
    title: 'Node.js & Express',
    description:
      'Check familiarity with Node.js runtime and building REST APIs using Express, including middleware and routing.',
  },
  {
    title: 'HTML & CSS',
    description:
      'Covers foundational web design, including semantic HTML and modern, responsive CSS techniques.',
  },
  {
    title: 'TypeScript Introduction',
    description:
      'Evaluate usage of TypeScript features such as interfaces, types, generics, and the compilation pipeline.',
  },
  {
    title: 'SQL & Database Basics',
    description:
      'Test knowledge of relational databases, core SQL queries (SELECT, JOIN), and data-modelling concepts.',
  },
] as const

/* -------------------------------------------------------------------------- */
/*                       Q U I Z   Q U E S T I O N S                          */
/* -------------------------------------------------------------------------- */

const QUESTIONS: Record<string, string[]> = {
  'JavaScript Fundamentals': [
    'What is the difference between var, let, and const?',
    'Explain hoisting and how it affects variable declarations.',
    'How does the JavaScript event loop handle asynchronous callbacks?',
    'Define a closure and provide an example use-case.',
    'What is the difference between == and ===?',
    'Describe prototypal inheritance in JavaScript.',
    'How do promises differ from callbacks and what problem do they solve?',
    'What are arrow functions and how do they affect the this keyword?',
    'What purpose does the "use strict" directive serve?',
    'Describe a technique to debounce a function in JavaScript.',
  ],
  'React Basics': [
    'What is the virtual DOM and why does React use it?',
    'Differentiate between props and state.',
    'Name three common React hooks and describe their purpose.',
    'When does the useEffect hook execute by default?',
    'Compare controlled and uncontrolled components.',
    'Why is the key prop important when rendering lists?',
    'Explain the Context API and give a practical example.',
    'How do you memoize a React component and why would you do so?',
    'Contrast class components with functional components.',
    'Outline React’s reconciliation process.',
  ],
  'Node.js & Express': [
    'Describe Node.js’s event-driven architecture.',
    'Distinguish between process.nextTick() and setImmediate().',
    'Demonstrate how to define a REST endpoint in Express.',
    'What are middleware functions in Express and how are they executed?',
    'How can you implement global error handling in Express?',
    'Explain clustering in Node.js and its benefits.',
    'List common techniques to secure an Express API.',
    'What is a readable stream and where would you use one in Node.js?',
    'Compare CommonJS modules with ES modules in Node.',
    'How do you manage environment variables securely in a Node application?',
  ],
  'HTML & CSS': [
    'Define semantic HTML and explain its advantages for accessibility.',
    'Illustrate the CSS box model with an example.',
    'Compare CSS flexbox and grid layout systems.',
    'Explain CSS specificity and how conflicts are resolved.',
    'List three techniques for creating responsive layouts.',
    'What is ARIA and when should ARIA attributes be used?',
    'Differentiate between display: none and visibility: hidden.',
    'How do position: absolute and position: fixed differ?',
    'Why is the viewport meta tag important for mobile design?',
    'Describe how to implement a dark mode theme using CSS custom properties.',
  ],
  'TypeScript Introduction': [
    'List two advantages TypeScript provides over plain JavaScript.',
    'Contrast interface and type aliases in TypeScript.',
    'Explain generics and provide an example.',
    'What is type inference and how does it work in TypeScript?',
    'Describe enums and const enums and when to use each.',
    'What are declaration (.d.ts) files and why are they necessary?',
    'How does the unknown type differ from any?',
    'Explain union and intersection types with examples.',
    'Define structural typing and how it differs from nominal typing.',
    'Name three useful compiler options in tsconfig.json and their effects.',
  ],
  'SQL & Database Basics': [
    'Differentiate between INNER JOIN and LEFT JOIN operations.',
    'Summarise database normalization and list its first three normal forms.',
    'Define primary keys and foreign keys with examples.',
    'What is an index and how does it improve query performance?',
    'Explain the ACID properties of database transactions.',
    'Contrast WHERE and HAVING clauses in SQL.',
    'Define a subquery and give a real-world example.',
    'List four aggregate functions available in SQL.',
    'Describe the purpose of the GROUP BY clause.',
    'Outline two strategies to mitigate SQL injection attacks.',
  ],
}

/* -------------------------------------------------------------------------- */
/*                               S E E D E R                                  */
/* -------------------------------------------------------------------------- */

export async function seedQuizzes() {
  console.log('Seeding sample skill quizzes…')

  /* ------------------------ Insert quiz headers ------------------------ */
  const existing = await db.select().from(skillQuizzes)
  const existingTitles = new Set(existing.map((q) => q.title))

  const newRows = QUIZ_META.filter((q) => !existingTitles.has(q.title))
  if (newRows.length) {
    await db.insert(skillQuizzes).values(newRows)
    console.log('➕  Added new quizzes:', newRows.map((q) => q.title).join(', '))
  }

  /* ---------------------- Ensure question coverage --------------------- */
  const quizzes = await db.select().from(skillQuizzes)

  for (const quiz of quizzes) {
    const promised = QUESTIONS[quiz.title] ?? []
    if (promised.length === 0) continue // skip unknown titles

    const dbQuestions = await db
      .select({ prompt: skillQuizQuestions.prompt })
      .from(skillQuizQuestions)
      .where(eq(skillQuizQuestions.quizId, quiz.id))

    const present = new Set(dbQuestions.map((q) => q.prompt))
    const missingPrompts = promised.filter((p) => !present.has(p))

    const inserts = missingPrompts.map((prompt) => ({ quizId: quiz.id, prompt }))
    if (inserts.length) {
      await db.insert(skillQuizQuestions).values(inserts)
      console.log(
        `🔧  Inserted ${inserts.length} question${
          inserts.length === 1 ? '' : 's'
        } into "${quiz.title}”`,
      )
    }

    /* Top-up with placeholders if promised < MIN_QUESTIONS */
    const updatedCount = present.size + inserts.length
    if (updatedCount < MIN_QUESTIONS) {
      const placeholders = Array.from({ length: MIN_QUESTIONS - updatedCount }, (_, i) => ({
        quizId: quiz.id,
        prompt: `${quiz.title} – Extra Question ${i + 1}`,
      }))
      await db.insert(skillQuizQuestions).values(placeholders)
      console.log(
        `📄  Added ${placeholders.length} placeholder question${
          placeholders.length === 1 ? '' : 's'
        } to "${quiz.title}”`,
      )
    }
  }

  console.log('✅  Quiz seeding complete.')
}
