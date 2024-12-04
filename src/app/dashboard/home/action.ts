'use server'

import { createClient } from "@/utils/supabase/server"

interface Feedback {
    id: number;
    full_name: string;
    phone_number: string;
    email?: string;
    note: string;
    created_at: string;
  }

export async function getAllFeedbacks(page: number): Promise<{ data: Feedback[]; total: number }> {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Maaf, anda tidak memiliki akses ke halaman ini.')
    }

    console.log('email', user.email)

    const pageSize = 10
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await supabase.from('feedbacks')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

    if (error) {
        throw new Error('Terjadi kesalahan saat mengambil data, coba beberapa saat lagi')
    }

    return { data: data || [], total: count || 0}
}