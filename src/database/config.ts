import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definida')
}

export const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
})