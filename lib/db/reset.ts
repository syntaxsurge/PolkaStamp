import 'dotenv/config'

import { execSync } from 'node:child_process'

import postgres from 'postgres'

/**
 * Completely wipes the current Postgres schema, then runs migrations
 * and seed scripts to restore a fresh development database.
 *
 * Usage:  npm run db:reset
 */
async function main() {
  const url = process.env.POSTGRES_URL
  if (!url) {
    console.error('❌  POSTGRES_URL is not set in the environment.')
    process.exit(1)
  }

  /* -------------------------------- Drop schema ------------------------------- */
  const sql = postgres(url, { max: 1 })
  try {
    console.log('⏳  Dropping existing schema…')
    await sql.unsafe('DROP SCHEMA IF EXISTS public CASCADE')
    await sql.unsafe('CREATE SCHEMA public')
    console.log('✅  Schema dropped and recreated.')
  } finally {
    await sql.end()
  }

  /* ------------------------------- Migrations --------------------------------- */
  console.log('⏳  Regenerating migrations & pushing schema…')
  execSync('npm run --silent db:push', { stdio: 'inherit' })
  console.log('✅  Migrations applied.')

  /* --------------------------------- Seeding ---------------------------------- */
  console.log('⏳  Seeding database…')
  execSync('npm run --silent db:seed', { stdio: 'inherit' })
  console.log('🎉  Database reset and seeded successfully.')
}

main().catch((err) => {
  console.error('❌  Database reset failed:', err)
  process.exit(1)
})
