import fs from "node:fs/promises"

export async function readEnvExample() {
  const content = await fs.readFile(".env.example", "utf8")

  const names = new Set<string>()

  for (const line of content.split("\n")) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith("#")) {
      continue
    }

    const name = trimmed.split("=")[0].trim()

    if (name) {
      names.add(name)
    }
  }

  return [...names]
}