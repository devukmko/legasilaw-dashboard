'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

export interface Feedback {
    id: number;
    full_name: string;
    phone_number: string;
    email?: string;
    note: string;
    created_at: string;
}
const PAGE_SIZE = 10;

/**
 * Fetch all feedbacks with pagination.
 */
export async function getAllFeedbacks(page: number): Promise<{ data: Feedback[]; total: number }> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        // redirect('/login');
        // throw new Error('Unauthorized access. Please log in to view this page.');
        return { data: [], total: 0 };
    }
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
        .from('feedbacks')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('Error fetching feedbacks:', error);
        return { data: [], total: 0 };
    }

    return { data: data || [], total: count || 0 };
}

/**
 * Fetch visitor counts for today.
 */
async function getTodayCounter(): Promise<number> {
    const supabase = await createClient();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('counters')
        .select('visitor')
        .eq('date', today)
        .single();

    if (error) {
        console.warn('Error fetching today counter:', error);
        return 0;
    }

    return data?.visitor || 0;
}

/**
 * Fetch lifetime counters (total visitors and WhatsApp clicks).
 */
async function getLifetimeCounter(): Promise<{ totalVisitors: number; totalWhatsAppClicks: number }> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('counters')
        .select('visitor, whatsapp_click');

    if (error) {
        console.warn('Error fetching lifetime counters:', error);
        return { totalVisitors: 0, totalWhatsAppClicks: 0 };
    }

    const totalVisitors = data.reduce((sum, row) => sum + (row.visitor || 0), 0);
    const totalWhatsAppClicks = data.reduce((sum, row) => sum + (row.whatsapp_click || 0), 0);

    return { totalVisitors, totalWhatsAppClicks };
}

/**
 * Fetch all counter data (today and lifetime).
 */
export async function getCounter() {
    const [todayVisitors, lifetimeCounter] = await Promise.all([
        getTodayCounter(),
        getLifetimeCounter(),
    ]);

    console.log(
        `Counters | Today Visitors: ${todayVisitors}, Total Visitors: ${lifetimeCounter.totalVisitors}, WhatsApp Clicks: ${lifetimeCounter.totalWhatsAppClicks}`
    );

    return {
        todayVisitors,
        ...lifetimeCounter,
    };
}

export async function logout() {
    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect('/login')
}
