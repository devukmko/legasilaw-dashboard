import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  try {
    // Fetch the visitor count for today
    const { data: counter, error } = await supabase
      .from("counters")
      .select("visitor")
      .eq("date", today)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching visitor counter:", error);
      throw error;
    }

    if (!counter) {
      // Insert a new visitor count for today
      console.log("Insert new visitor counter for today");

      const { error: insertError } = await supabase
        .from("counters")
        .insert({
          date: today,
          visitor: 1,
        });
      if (insertError) {
        console.error("Error inserting visitor count:", insertError);
        throw insertError;
      }
    } else {
      // Update the existing visitor counter for today
      console.log("Update existing visitor counter for today");
      const visitorIncrement = counter.visitor + 1;

      const { error: updateError } = await supabase
        .from("counters")
        .update({ visitor: visitorIncrement })
        .eq("date", today);
      if (updateError) {
        console.error("Error updating visitor count:", updateError);
        throw updateError;
      }
    }

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Visitor count incremented" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Failed to increment visitor count:", err);

    // Return an error response
    return new Response(
      JSON.stringify({ error: "Failed to increment visitor count" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
