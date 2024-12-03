import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
    const supabase = await createClient()

    const feedbackSchema = z.object({
        fullname: z.string().trim(),
        phoneNumber: z.string().trim(),
        email: z.string().trim().email().optional(),
        message: z.string().trim(),
    })

    const body = await req.json()

    const validate = feedbackSchema.safeParse(body)
    if (!validate.success) {
        return new Response('Invalid request', {
            status: 400,
        })
    }

    const { fullname, phoneNumber,email, message } = body

    const { error } = await supabase.from('feedbacks').insert({
        full_name: fullname,
        phone_number: phoneNumber,
        email: email,
        note: message,
        created_at: new Date()
    })

    if (error) {
        return new Response('Failed to insert feedback', {
            status: 500,
        })
    }

    return new Response('Successfully insert feedback', {
        status: 200,
    })
}