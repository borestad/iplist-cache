#!/usr/bin/env -S deno run -A

import { mapLimit } from 'promise-utils/map.ts'
const { log } = console
import $ from 'dax/mod.ts'
const lists = await $`cat firehol-all.txt`.lines()
log(lists)

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


for (const list of lists) {
  console.log(list)
}

// await mapLimit(
//   [
//     'http://speedtest.tele2.net/1MB.zip',
//     'http://speedtest.tele2.net/100MB_.zip',
//     'http://speedtest.tele2.net/10MB.zip',
//     'http://speedtest.tele2.net/10MB.zip',
//     'http://speedtest.tele2.net/10MB.zip',
//   ],
//   4,
//   async (x, _i) => {
//     log('Downloading:', x)

//     const result = await $`timeout 1s wget -q ${x}`.noThrow().captureCombined()

//     if (result?.code)
//       log(`❌ ${x}`, result.combined, result?.code)
//     else
//       log(`✅ ${x}`, result?.code)
//   },
// )
