import { cpSync, existsSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDirectory = path.dirname(fileURLToPath(import.meta.url))
const clientDirectory = path.join(serverDirectory, '..', 'client')
const outputDirectory = path.join(serverDirectory, 'dist')
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const npmOptions = { cwd: clientDirectory, stdio: 'inherit', shell: process.platform === 'win32' }

execFileSync(npmCommand, ['install', '--no-package-lock'], npmOptions)
execFileSync(npmCommand, ['run', 'build'], npmOptions)

if (existsSync(outputDirectory)) rmSync(outputDirectory, { recursive: true, force: true })
cpSync(path.join(clientDirectory, 'dist'), outputDirectory, { recursive: true })
