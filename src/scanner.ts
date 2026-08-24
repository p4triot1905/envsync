import fg from "fast-glob"
import fs from "node:fs/promises"

export async function scanFiles() {
  const files = await fg([
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/*.py"
  ], {
    ignore: [
      "node_modules/**",
      "dist/**",
      ".git/**",
      "coverage/**"
    ]
  })

  const found = new Set<string>()

  for (const file of files) {
    const code = await fs.readFile(file, "utf8")

    const regex = /process\.env\.([A-Z0-9_]+)/g
    const pythonRegex = /os\.getenv\(["']([A-Z0-9_]+)["']\)/g
    const pythonEnvRegex = /os\.environ\[["']([A-Z0-9_]+)["']\]/g

    if (file.endsWith(".py")) {
      for (const match of code.matchAll(pythonRegex)) {
        found.add(match[1])
      }

      for (const match of code.matchAll(pythonEnvRegex)) {
        found.add(match[1])
      }
    } else {
      for (const match of code.matchAll(regex)) {
        found.add(match[1])
      }
    }
  }

  return [...found]
}