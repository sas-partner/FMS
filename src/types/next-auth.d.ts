import { DefaultSession } from 'next-auth'
import { UserRole } from '@prisma/client'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
      role: UserRole
    }
  }

  interface User extends DefaultUser {
    id: string
    role: UserRole
  }
}
