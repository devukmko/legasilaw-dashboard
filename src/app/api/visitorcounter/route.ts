import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request, res: Response) {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    try {
        const { data: counter, error } = await supabase
          .from('counters')
          .select('visitor')
          .eq('date', today)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching visitor count:', error);
          throw error
        }

        if (!counter?.visitor) {
          console.log('insert new counter for today')

          const { error: insertError } = await supabase
            .from('counters')
            .insert({
            date: today,
            visitor: 1,
          });
          if (insertError) {
            console.error('Error insert visitor count:', error);
            throw insertError
          }
        }else {
          console.log('update existing counter for today')
          let visitorIncrement = counter.visitor + 1

          const { error: updateError } = await supabase.from('counters')
            .update({ visitor: visitorIncrement})
            .eq('date', today);
          if (updateError) {
            console.error('Error update visitor count:', updateError);
            throw updateError
          }
        }
    
        // res.status(200).json({ message: 'Visitor count incremented', data });
        return new Response('Visitor count incremented', {
          status: 200,
        })
      } catch (err) {
        console.error(err);
        // res.status(500).json({ error: 'Failed to increment visitor count' });
        return new Response('Failed to increment visitor count', {
          status: 500,
      })
      }
}