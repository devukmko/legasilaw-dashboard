import { getAllFeedbacks, getCounter } from "./action"

export default async function HomePage() {
    try {
        const { data, total } = await getAllFeedbacks(1);
        // TODO parse data to the table
        
    } catch (error) {
        console.error("Failed to fetch feedbacks:", error);   
    }

    try {
        const { todayVisitors, totalVisitors, totalWhatsAppClicks } = await getCounter();
        // TODO parse data to the table
    } catch (error) {
        console.error("Failed to fetch counters:", error);   
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Tanggal & Waktu</th>
                    <th>Nama</th>
                    <th>No. HP</th>
                    <th>Email</th>
                    <th>Pesan</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    )
}