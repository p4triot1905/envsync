import { scanFiles } from "./scanner.js"
import { readEnvExample } from "./env-example.js"
import { compareEnv } from "./compare.js"

async function main() {
  console.log("envsync çalışıyor")

  const envs = await scanFiles()
  const exampleEnvs = await readEnvExample()

  const result = compareEnv(envs, exampleEnvs)

  console.log("Eksik:", result.missing)
  console.log("Kullanılmayan:", result.unused)
}

main()