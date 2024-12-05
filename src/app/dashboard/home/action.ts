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

async function getTodayCounter() {
    const supabase = await createClient()
    
    const today = new Date().toISOString().split('T')[0]

    const {data, error} = await supabase.from('counters')
        .select('visitor')
        .eq('date', today)
        .single()
    if (error) {
        console.log('Error fetching today counter', error)
        return { todayVisitors: 0 }
    }
    
    return {todayVisitors: data?.visitor || 0}
}

async function getLifeTimeCounter() {
    const supabase = await createClient()

    const {data, error} = await supabase.from('counters')
        .select('visitor, whatsapp_click')
    if (error) {
        console.log('Error fetching lifetime counter', error)
        return { totalVisitors: 0 , totalWhatsAppClicks: 0}
    }

    const totalVisitors = data.reduce((sum, row) => 
        sum + (row.visitor || 0), 0)
    const totalWhatsAppClicks = data.reduce((sum, row) => 
        sum + (row.whatsapp_click || 0), 0)

    return { totalVisitors , totalWhatsAppClicks}
}

export async function getCounter() {
    const { todayVisitors } = await getTodayCounter()
    const { totalVisitors, totalWhatsAppClicks } = await getLifeTimeCounter()

    console.log('debug counter todayVisitors: ' + todayVisitors +
        ' | totalVisitors: '+ totalVisitors + ' | totalWhatsAppClicks: ' + totalWhatsAppClicks)

    return { todayVisitors, totalVisitors, totalWhatsAppClicks }
}