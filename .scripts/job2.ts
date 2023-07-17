import process from 'node:process'
import $ from 'dax/mod.ts'
import { mapLimit } from 'promise-utils/map.ts'
const { log } = console

process.env.FORCE_COLOR = 'true'

$.cd(await Deno.makeTempDir())

await mapLimit(
  [
    'http://speedtest.tele2.net/1MB.zip',
    'http://speedtest.tele2.net/100MB_.zip',
    'http://speedtest.tele2.net/10MB.zip',
    'http://speedtest.tele2.net/10MB.zip',
    'http://speedtest.tele2.net/10MB.zip',
  ],
  4,
  async (x, _i) => {
    log('Downloading:', x)

    const result = await $`timeout 1s wget -q ${x}`.noThrow().captureCombined()

    if (result?.code)
      log(`❌ ${x}`, result.combined, result?.code)
    else
      log(`✅ ${x}`, result?.code)
  },
)
