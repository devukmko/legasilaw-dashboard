import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if a user is logged in
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If a user is logged in, sign them out
    if (user) {
      await supabase.auth.signOut()
      console.log('Successfully logout user email: '+ user.email)
    }
  } catch (error) {
    console.error('Error during signout:', error)
    return NextResponse.json(
      { error: 'Something went wrong during signout. Please try again later.' },
      { status: 500 }
    )
  }

  // Revalidate the homepage path to ensure the session state is updated
  revalidatePath('/')

  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}