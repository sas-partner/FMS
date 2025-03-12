'use server'

import { signIn } from '@/auth'

export const authLoginAction = async (formData: FormData) => {
  await signIn('credentials', formData)
}
