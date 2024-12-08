import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  try {
    // Fetch the WhatsApp click counter for today
    const { data: counter, error } = await supabase
      .from("counters")
      .select("whatsapp_click")
      .eq("date", today)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching WhatsApp counter:", error);
      throw error;
    }

    if (!counter) {
      // Insert a new WhatsApp click counter for today
      console.log("Insert new WhatsApp counter for today");

      const { error: insertError } = await supabase.from("counters").insert({
        date: today,
        whatsapp_click: 1,
      });

      if (insertError) {
        console.error("Error inserting WhatsApp count:", insertError);
        throw insertError;
      }
    } else {
      // Update the existing WhatsApp click counter for today
      console.log("Update existing WhatsApp counter for today");

      const whatsappIncrement = counter.whatsapp_click + 1;
      const { error: updateError } = await supabase
        .from("counters")
        .update({
          whatsapp_click: whatsappIncrement,
        })
        .eq("date", today);

      if (updateError) {
        console.error("Error updating WhatsApp count:", updateError);
        throw updateError;
      }
    }

    // Return a success response
    return new Response(
      JSON.stringify({ message: "WhatsApp count incremented" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Failed to increment WhatsApp count:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: "Failed to increment WhatsApp count" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
