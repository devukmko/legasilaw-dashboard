'use server'

import { redirect, RedirectType } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { LoginFormInputs } from './schema'

export async function login(formData: LoginFormInputs) {
  const supabase = await createClient()

  const email = formData.email as string
  const password = formData.password as string

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error('Error during signInWithPassword:', error.message)
      // throw new Error('Failed signInWithPassword')
      return {
        error
      }
    }
    console.log(`Successfully logged in for email: ${email}`)
    redirect('/', RedirectType.push)
  } catch (error) {
    console.error('Unexpected error during login:', error)
    try {
      redirect(`/?error=${encodeURIComponent('Unexpected error occurred')}`, RedirectType.replace)
    } catch (error) {
      console.error('Unexpected error during redirect:', error)
    }
  }
}
