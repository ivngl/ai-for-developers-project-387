import { execSync } from 'child_process'
import path from 'path'
import { cleanDb, disconnectDb } from './helpers'

export default async function globalSetup() {
  const serverDir = path.resolve(__dirname, '../server')

  execSync('npx prisma db push --skip-generate', {
    cwd: serverDir,
    env: {
      ...process.env,
      DATABASE_URL: 'file:./dev.db',
    },
    stdio: 'pipe',
  })

  await cleanDb()
  await disconnectDb()
}
