import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

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
  const { error } = await supabase.from("feedbacks").insert({
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
