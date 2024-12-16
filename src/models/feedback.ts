'use client'
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
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
export async function getAllFeedbacks(
  page: number,
  context: { supabase: SupabaseClient; signal?: AbortSignal }
): Promise<{ data: Feedback[]; total: number }> {
  const supabase = context.supabase;
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
    .from("feedbacks")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)
    .abortSignal(context.signal || new AbortController().signal);


  if (error) {
    console.error("Error fetching feedbacks:", error);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count || 0 };
}

/**
 * Fetch visitor counts for today.
 */
async function getTodayCounter(context: { supabase: SupabaseClient; signal?: AbortSignal }): Promise<number> {
  const supabase = context.supabase;
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("counters")
    .select("visitor")
    .eq("date", today)
    .single()

  if (error) {
    console.warn("Error fetching today counter:", error);
    return 0;
  }

  return data?.visitor || 0;
}

/**
 * Fetch lifetime counters (total visitors and WhatsApp clicks).
 */
async function getLifetimeCounter(context: { supabase: SupabaseClient; signal?: AbortSignal }): Promise<{
  totalVisitors: number;
  totalWhatsAppClicks: number;
}> {
    const supabase = context.supabase;

  const { data, error } = await supabase
    .from("counters")
    .select("visitor, whatsapp_click");

  if (error) {
    console.warn("Error fetching lifetime counters:", error);
    return { totalVisitors: 0, totalWhatsAppClicks: 0 };
  }

  const totalVisitors = data.reduce((sum, row) => sum + (row.visitor || 0), 0);
  const totalWhatsAppClicks = data.reduce(
    (sum, row) => sum + (row.whatsapp_click || 0),
    0
  );

  return { totalVisitors, totalWhatsAppClicks };
}

/**
 * Fetch all counter data (today and lifetime).
 */
export async function getCounter(context: { supabase: SupabaseClient; signal?: AbortSignal }) {
  const [todayVisitors, lifetimeCounter] = await Promise.all([
    getTodayCounter(context),
    getLifetimeCounter(context),
  ]);

  console.log(
    `Counters | Today Visitors: ${todayVisitors}, Total Visitors: ${lifetimeCounter.totalVisitors}, WhatsApp Clicks: ${lifetimeCounter.totalWhatsAppClicks}`
  );

  return {
    todayVisitors,
    ...lifetimeCounter,
  };
}

