import { PrismaClient } from '@prisma/client'
import { env } from '../config/env'

const prismaClientSingleton = () => {
  // return new PrismaClient({ errorFormat: 'pretty' })
  return new PrismaClient()
}

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export default prisma
