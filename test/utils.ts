import { resolve } from 'path'
import fs from 'fs-extra'
import execa from 'execa'

export const cacheDir = resolve(__dirname, '.cache')
export const cli = resolve(__dirname, '../packages/cli/src/cli.ts')

export async function runCli(files: Record<string, string>) {
  const testDir = resolve(cacheDir, Date.now().toString())

  await Promise.all(
    Object.entries(files).map(([path, content]) =>
      fs.outputFile(resolve(testDir, path), content, 'utf8'),
    ),
  )

  const { exitCode, stdout, stderr } = await execa('npx', ['esno', cli, 'views/**/*'], {
    cwd: testDir,
    // stdio: 'inherit',
  })

  const logs = stdout + stderr
  if (exitCode !== 0)
    throw new Error(logs)

  const output = await fs.readFile(resolve(testDir, 'uno.css'), 'utf8')

  return {
    output,
    logs,
  }
}
