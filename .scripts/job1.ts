import process from 'node:process'
import $ from 'dax/mod.ts'
import { colors } from 'dax/src/deps.ts'
import { mapLimit } from 'promise-utils/map.ts'
import chalk from 'npm:chalk@5'
import * as mod from "std/uuid/mod.ts";
const { log } = console

process.env.FORCE_COLOR = 'true'


log(mod.v1.generate())

// run a command
await $`echo 5`
await $`echo ---------`

await $`git rev-parse --show-toplevel`
const branch = await $`git rev-parse --abbrev-ref HEAD`.text()
console.log(branch)

await $`echo ---------`
await mapLimit(
  [
    '11',
    '22',
    '33',
    '44',
  ],
  2,
  async (x, i) => {
    log(i, x)
    await $`sleep 1`
  },
)

const bar = chalk.reset.inverse(' ')
console.log(bar)

console.log(chalk.bgBlue.red('hello world'))
console.log(colors.red(colors.bgBlue('hello world')))
