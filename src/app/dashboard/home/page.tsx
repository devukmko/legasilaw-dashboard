import { getAllFeedbacks } from "./action"

export default async function HomePage() {
    try {
        const { data, total } = await getAllFeedbacks(1);
        // TODO parse data to the table
    } catch (error) {
        console.error("Failed to fetch feedbacks:", error);   
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