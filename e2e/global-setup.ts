import { execSync } from 'child_process'
import path from 'path'

export default async function globalSetup() {
  const serverDir = path.resolve(__dirname, '../server')

  execSync('npx prisma db push --skip-generate', {
    cwd: serverDir,
    env: {
      ...process.env,
      DATABASE_URL: 'file:./test.db',
    },
    stdio: 'pipe',
  })
}
