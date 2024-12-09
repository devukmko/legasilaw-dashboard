import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Change the dynamic behavior of a layout or page to fully static or fully dynamic. https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'auto'
// Set the default revalidation time for a layout or page. https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 0
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#fetchcache
export const fetchCache = 'auto'

const origin = process.env.ORIGIN as string;

export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}


export async function POST(req: Request) {
  const supabase = await createClient();

  const feedbackSchema = z.object({
    fullname: z.string().trim(),
    phoneNumber: z.string().trim(),
    email: z.string().trim().email().optional(),
    message: z.string().trim(),
  });

  const body = await req.json();

  // Validate the request body
  const validate = feedbackSchema.safeParse(body);
  if (!validate.success) {
    console.log('invalid schema body. Error: ' + validate.error.message)
    return new Response(
      JSON.stringify({ error: "Invalid request", details: validate.error }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { fullname, phoneNumber, email, message } = validate.data;

  // Insert feedback into the database
  const { data, error } = await supabase.from("feedbacks").insert({
    full_name: fullname,
    phone_number: phoneNumber,
    email: email || null,
    note: message,
    created_at: new Date(),
  });

  if (error) {
    console.error("Fail to insert feedback:", error);
    return new Response(
      JSON.stringify({ error: "Failed to insert feedback" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Successfully inserted feedback" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
