export type EnvVar = 'STAGE' | 'JSONPlaceholder_BASE_URL'

export const getEnv = (key: EnvVar): string => {
  const value = process.env[key.toString()]

  if (value == null) {
    throw new Error(`Missing environment varibale: ${key}`)
  }

  return value
}
