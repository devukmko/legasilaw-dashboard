'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error('Error during signInWithPassword:', error.message)
      throw new Error('Failed signInWithPassword')
    }

  } catch (error) {
    console.error('Unexpected error during login:', error)
    revalidatePath('/dashboard/home', 'layout')
    redirect(`/?error=${encodeURIComponent('Unexpected error occurred')}`)
  }

  console.log(`Successfully logged in for email: ${email}`)
    revalidatePath('/dashboard/home', 'layout')
    redirect('/dashboard/home')
}
