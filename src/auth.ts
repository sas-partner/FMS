import NextAuth from 'next-auth' // auth.js
import Credentials from 'next-auth/providers/credentials'
import prisma from './lib/prisma'
import bcrypt from 'bcryptjs'
import { User, UserRole } from '@prisma/client'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })
          if (!user) {
            throw new Error('invalid credentials')
          }
          const passwordMatch = await bcrypt.compare(password, user.password)
          if (!passwordMatch) {
            throw new Error('invalid credentials')
          }
          return user
        } catch (error) {
          console.log('credentials error: ', error)
          throw new Error('invalid credentials')
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub as string
      session.user.role = (token.user as User).role as UserRole
      return session
    },
    jwt({ token, user, trigger, session }) {
      if (!!user) token.user = user
      if (trigger === 'update') {
        console.log('trigger update: ', session)
        token.user = session.user
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
})
