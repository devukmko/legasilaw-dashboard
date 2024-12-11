import { formatToWIB } from "@/utils/date";
import { getAllFeedbacks, getCounter } from "./action";
import type { Feedback } from "./action";

export default async function HomePage() {
  const { feedbacks, totalPages } = await fetchFeedbackData();
  const counterData = await fetchCounterData();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Statistics counterData={counterData} />
      <FeedbackSection feedbacks={feedbacks} totalPages={totalPages} />
    </div>
  );
}

/**
 * Fetch feedback data with error handling.
 */
async function fetchFeedbackData() {
  try {
    const feedbackResponse = await getAllFeedbacks(1);
    const feedbacks = feedbackResponse.data;
    const totalPages = Math.ceil(feedbackResponse.total / 10); // Adjust based on PAGE_SIZE in action.ts
    return { feedbacks, totalPages };
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    return { feedbacks: [], totalPages: 1 };
  }
}

/**
 * Fetch counter data with error handling.
 */
async function fetchCounterData() {
  try {
    return await getCounter();
  } catch (error) {
    console.error("Failed to fetch counters:", error);
    return { todayVisitors: 0, totalVisitors: 0, totalWhatsAppClicks: 0 };
  }
}

/**
 * Render statistics section.
 */
function Statistics({ counterData }: { counterData: Record<string, number> }) {
  return (
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
  );
}

/**
 * Render feedback section.
 */
function FeedbackSection({
  feedbacks,
  totalPages,
}: {
  feedbacks: Feedback[];
  totalPages: number;
}) {
  return (
    <div className="bg-white shadow-md rounded-md">
      <FeedbackTable feedbacks={feedbacks} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}

/**
 * Statistics card component.
 */
function StatCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: number;
}) {
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
function FeedbackTable({ feedbacks }: { feedbacks: Feedback[] }) {
  return (
    <table className="table-auto w-full">
      <thead className="bg-[#c5a07a] text-white">
        <tr>
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
              <td
                className="px-4 py-2"
                dangerouslySetInnerHTML={{
                  __html: formatToWIB(feedback.created_at),
                }}
              />
              <td className="px-4 py-2">{feedback.full_name}</td>
              <td className="px-4 py-2">{feedback.phone_number}</td>
              <td className="px-4 py-2">{feedback.email || "-"}</td>
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
  );
}

/**
 * Pagination component.
 */
function Pagination({ totalPages }: { totalPages: number }) {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-100 text-text-dark">
      <span>1/{totalPages}</span>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 rounded-md bg-[#c5a07a] text-white hover:bg-[#b38e6a]"
          disabled
        >
          {"<"}
        </button>
        <button className="px-3 py-1 rounded-md bg-[#c5a07a] text-white hover:bg-[#b38e6a]">
          {">"}
        </button>
      </div>
    </div>
  );
}
