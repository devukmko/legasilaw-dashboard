import { createClient } from "@/utils/supabase/server";

export async function POST(req:Request, res: Response) {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    try {
        const {data: counter, error} = await supabase
        .from('counters')
        .select('whatsapp_click')
        .eq('date', today)
        .single()

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching whatsapp counter:', error);
            throw error
        }

        if (!counter) {
            console.log('insert new WhatsApp counter for today')

            const { error: insertError } = await supabase.from('counters')
                .insert({
                    date: today,
                    whatsapp_click: 1,
                })
            if (insertError) {
                console.error('Error insert WhatsApp count:', error);
                throw insertError
            }
        } else {
            console.log('update existing WhatsApp counter for today')

            let whatsappIncrement = counter.whatsapp_click + 1
            const {error: updateError} = await supabase.from('counters')
                .update({
                    whatsapp_click: whatsappIncrement,
                })
                .eq('date', today)
            if (updateError) {
                console.error('Error update whatsapp count:', updateError);
                throw updateError
            }
        }

        // res.status(200).json({ message: 'Visitor count incremented', data });
        return new Response('Whatsapp count incremented', {
            status: 200,
          })
    } catch (error) {
        return new Response('Failed to increment visitor count', {
            status: 500,
        })
    }
}