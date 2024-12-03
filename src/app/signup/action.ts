'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function signup(formData:FormData) {
    const supabase = await createClient()

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm: formData.get("confirm") as string
    }

    if (data.password != data.confirm) {
      redirect('/error')
    }

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })
    if (error) {
      redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
    
}