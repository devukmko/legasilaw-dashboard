import { createClient } from "@/utils/supabase/server";

export async function GET() {
    try {
        const supabase = await createClient();
        const {data: counter, error } = await supabase
        .from("counters")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);

        if (error) {
            console.error("Error fetching last counter: ", error);
            throw error;
        }
        
        console.log("successfully get last counter")

        return new Response(
            JSON.stringify({ message: "Fetching last counter", data: counter }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
    }catch (err) {
        console.error("Failed to get first feedback data:", err);

        return new Response(
        JSON.stringify({ error: "Failed to get first feedback data" }),
        {
            status: 500,
            headers: { "Content-Type": "application/json" },
        }
        );
    }
}