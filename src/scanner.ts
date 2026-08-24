import fg from "fast-glob"
import fs from "node:fs/promises"

export async function scanFiles() {
  const files = await fg([
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx"
  ], {
    ignore: [
      "node_modules/**",
      "dist/**",
      ".git/**"
    ]
  })

  const found = new Set<string>()

  for (const file of files) {
    const code = await fs.readFile(file, "utf8")

    const regex = /process\.env\.([A-Z0-9_]+)/g

    for (const match of code.matchAll(regex)) {
      found.add(match[1])
    }
  }

  return [...found]
}