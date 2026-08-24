export function compareEnv(codeEnvs: string[], exampleEnvs: string[]) {
  const codeSet = new Set(codeEnvs)
  const exampleSet = new Set(exampleEnvs)

  const missing = codeEnvs.filter((env) => !exampleSet.has(env))
  const unused = exampleEnvs.filter((env) => !codeSet.has(env))

  return {
    missing,
    unused
  }
}