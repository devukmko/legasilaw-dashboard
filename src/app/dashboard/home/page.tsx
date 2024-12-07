import { getAllFeedbacks, getCounter } from "./action";

export default async function HomePage() {
    let feedbacks = [];
    let totalPages = 1;
    let counterData = { todayVisitors: 0, totalVisitors: 0, totalWhatsAppClicks: 0 };

    try {
        const feedbackResponse = await getAllFeedbacks(1);
        feedbacks = feedbackResponse.data;
        totalPages = Math.ceil(feedbackResponse.total / 10); // Adjust based on PAGE_SIZE in action.ts
    } catch (error) {
        console.error("Failed to fetch feedbacks:", error);
    }

    try {
        counterData = await getCounter();
    } catch (error) {
        console.error("Failed to fetch counters:", error);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-text-dark">
                <StatCard
                    icon="🌐"
                    title="Total Kunjungan Web"
                    value={counterData.totalVisitors}
                />
                <StatCard
                    icon="📅"
                    title="Kunjungan Web Hari Ini"
                    value={counterData.todayVisitors}
                />
                <StatCard
                    icon="📱"
                    title="Total Klik WhatsApp"
                    value={counterData.totalWhatsAppClicks}
                />
            </div>

            {/* Feedback Table */}
            <div className="bg-white shadow-md rounded-md">
                <FeedbackTable feedbacks={feedbacks} totalPages={totalPages} />
            </div>
        </div>
    );
}

/**
 * Statistics card component.
 */
function StatCard({ icon, title, value }) {
    return (
        <div className="p-4 bg-[#faebd7] rounded-md shadow-md flex items-center">
            <div className="text-2xl font-bold text-[#a67d52]">{icon}</div>
            <div className="ml-4">
                <h2 className="text-sm text-[#a67d52]">{title}</h2>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
}

/**
 * Feedback table component.
 */
function FeedbackTable({ feedbacks, totalPages }) {
    return (
        <>
            <table className="table-auto w-full">
                <thead className="bg-[#c5a07a] text-white">
                    <tr className="bg-gold text-text-light">
                        <th className="px-4 py-2">Tanggal & Waktu</th>
                        <th className="px-4 py-2">Nama</th>
                        <th className="px-4 py-2">No. HP</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Pesan</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.length > 0 ? (
                        feedbacks.map((feedback) => (
                            <tr key={feedback.id} className="bg-light-gray text-text-dark">
                                <td className="px-4 py-2">{feedback.created_at}</td>
                                <td className="px-4 py-2">{feedback.full_name}</td>
                                <td className="px-4 py-2">{feedback.phone_number}</td>
                                <td className="px-4 py-2">{feedback.email || '-'}</td>
                                <td className="px-4 py-2">{feedback.note}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center py-4">
                                Tidak ada data.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                <span>1/{totalPages}</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-md bg-[#c5a07a] text-white hover:bg-[#b38e6a]" disabled>
                        {"<"}
                    </button>
                    <button className="px-3 py-1 rounded-md bg-[#c5a07a] text-white hover:bg-[#b38e6a]">
                        {">"}
                    </button>
                </div>
            </div>
        </>
    );
}
