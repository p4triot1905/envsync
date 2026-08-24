import { scanFiles } from "./scanner.js"
import { readEnvExample } from "./env-example.js"
import { compareEnv } from "./compare.js"

async function main() {
  const envs = await scanFiles()
  const exampleEnvs = await readEnvExample()

  const result = compareEnv(envs, exampleEnvs)

  if (result.missing.length > 0) {
    console.log("Missing from .env.example:")

    for (const env of result.missing) {
      console.log(`  ${env}`)
    }
  }

  if (result.unused.length > 0) {
    console.log("Unused in .env.example:")

    for (const env of result.unused) {
      console.log(`  ${env}`)
    }
  }

  if (result.missing.length === 0 && result.unused.length === 0) {
    console.log("Everything looks good.")
  }

  if (result.missing.length > 0 || result.unused.length > 0) {
    process.exitCode = 1
  }
}

main()