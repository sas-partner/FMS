import z from 'zod'
import chalk from 'chalk'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  // PASSPORT_SECRET: z.string().min(1),
  // RESEND_API_KEY: z.string().min(1),
  // RESTRICTED_API_KEY: z.string().min(1),
  // CLIENT_URL: z.string().url().min(1),
  // JWT_SECRET: z.string().min(1),
  // NGENIUS_API_TOKEN: z.string().min(1),
  // NGENIUS_MERCHANT_ID: z.string().min(1),
  // NGENIUS_OUTLET_REFERENCE: z.string().min(1),
  // REDIS_URL: z.string().min(1),
  // WEBHOOK_API_KEY: z.string().min(1),
  AWS_S3_ACCESS_KEY: z.string().min(1),
  AWS_S3_SECRET_KEY: z.string().min(1),
  AWS_S3_BUCKET: z.enum(['fms', 'fms--dev']),
  FTA_PASS_ENCRYPTION_KEY: z.string().min(1),
})
const getEnv = () => {
  const parsedEnv = envSchema.safeParse(process.env)
  if (!parsedEnv.success) {
    const errors = parsedEnv.error.errors
      .map((error) => error.path.join('.'))
      .join(', ')
    throw new Error(`Invalid environment variables: ${chalk.yellow(errors)}`)
  }
  return parsedEnv.data
}

export const env = getEnv()
