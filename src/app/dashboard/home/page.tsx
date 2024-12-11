import { formatToWIB } from "@/utils/date";
import { getAllFeedbacks, getCounter } from "./action";
import type { Feedback } from "./action";
import Container from "@/components/core/container";
import React from "react";
import Typography from "@/components/core/typography";

const Logo1 = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_43_244"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="40"
      height="40"
    >
      <rect width="40" height="40" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_43_244)">
      <path
        d="M20.0004 36.6666C17.7226 36.6666 15.5699 36.2291 13.5421 35.3541C11.5143 34.4791 9.74346 33.2846 8.22957 31.7708C6.71568 30.2569 5.52124 28.486 4.64624 26.4583C3.77124 24.4305 3.33374 22.2777 3.33374 19.9999C3.33374 17.6944 3.77124 15.5346 4.64624 13.5208C5.52124 11.5069 6.71568 9.74297 8.22957 8.22908C9.74346 6.7152 11.5143 5.52075 13.5421 4.64575C15.5699 3.77075 17.7226 3.33325 20.0004 3.33325C22.306 3.33325 24.4657 3.77075 26.4796 4.64575C28.4935 5.52075 30.2574 6.7152 31.7712 8.22908C33.2851 9.74297 34.4796 11.5069 35.3546 13.5208C36.2296 15.5346 36.6671 17.6944 36.6671 19.9999C36.6671 22.2777 36.2296 24.4305 35.3546 26.4583C34.4796 28.486 33.2851 30.2569 31.7712 31.7708C30.2574 33.2846 28.4935 34.4791 26.4796 35.3541C24.4657 36.2291 22.306 36.6666 20.0004 36.6666ZM20.0004 33.2499C20.7226 32.2499 21.3476 31.2083 21.8754 30.1249C22.4032 29.0416 22.8337 27.8888 23.1671 26.6666H16.8337C17.1671 27.8888 17.5976 29.0416 18.1254 30.1249C18.6532 31.2083 19.2782 32.2499 20.0004 33.2499ZM15.6671 32.5833C15.1671 31.6666 14.7296 30.7152 14.3546 29.7291C13.9796 28.743 13.6671 27.7221 13.4171 26.6666H8.50041C9.30596 28.0555 10.3129 29.2638 11.5212 30.2916C12.7296 31.3194 14.1115 32.0833 15.6671 32.5833ZM24.3337 32.5833C25.8893 32.0833 27.2712 31.3194 28.4796 30.2916C29.6879 29.2638 30.6949 28.0555 31.5004 26.6666H26.5837C26.3337 27.7221 26.0212 28.743 25.6462 29.7291C25.2712 30.7152 24.8337 31.6666 24.3337 32.5833ZM7.08374 23.3333H12.7504C12.6671 22.7777 12.6046 22.2291 12.5629 21.6874C12.5212 21.1458 12.5004 20.5833 12.5004 19.9999C12.5004 19.4166 12.5212 18.8541 12.5629 18.3124C12.6046 17.7708 12.6671 17.2221 12.7504 16.6666H7.08374C6.94485 17.2221 6.84068 17.7708 6.77124 18.3124C6.7018 18.8541 6.66707 19.4166 6.66707 19.9999C6.66707 20.5833 6.7018 21.1458 6.77124 21.6874C6.84068 22.2291 6.94485 22.7777 7.08374 23.3333ZM16.0837 23.3333H23.9171C24.0004 22.7777 24.0629 22.2291 24.1046 21.6874C24.1462 21.1458 24.1671 20.5833 24.1671 19.9999C24.1671 19.4166 24.1462 18.8541 24.1046 18.3124C24.0629 17.7708 24.0004 17.2221 23.9171 16.6666H16.0837C16.0004 17.2221 15.9379 17.7708 15.8962 18.3124C15.8546 18.8541 15.8337 19.4166 15.8337 19.9999C15.8337 20.5833 15.8546 21.1458 15.8962 21.6874C15.9379 22.2291 16.0004 22.7777 16.0837 23.3333ZM27.2504 23.3333H32.9171C33.056 22.7777 33.1601 22.2291 33.2296 21.6874C33.299 21.1458 33.3337 20.5833 33.3337 19.9999C33.3337 19.4166 33.299 18.8541 33.2296 18.3124C33.1601 17.7708 33.056 17.2221 32.9171 16.6666H27.2504C27.3337 17.2221 27.3962 17.7708 27.4379 18.3124C27.4796 18.8541 27.5004 19.4166 27.5004 19.9999C27.5004 20.5833 27.4796 21.1458 27.4379 21.6874C27.3962 22.2291 27.3337 22.7777 27.2504 23.3333ZM26.5837 13.3333H31.5004C30.6949 11.9444 29.6879 10.736 28.4796 9.70825C27.2712 8.68047 25.8893 7.91659 24.3337 7.41659C24.8337 8.33325 25.2712 9.28464 25.6462 10.2708C26.0212 11.2569 26.3337 12.2777 26.5837 13.3333ZM16.8337 13.3333H23.1671C22.8337 12.111 22.4032 10.9583 21.8754 9.87492C21.3476 8.79158 20.7226 7.74992 20.0004 6.74992C19.2782 7.74992 18.6532 8.79158 18.1254 9.87492C17.5976 10.9583 17.1671 12.111 16.8337 13.3333ZM8.50041 13.3333H13.4171C13.6671 12.2777 13.9796 11.2569 14.3546 10.2708C14.7296 9.28464 15.1671 8.33325 15.6671 7.41659C14.1115 7.91659 12.7296 8.68047 11.5212 9.70825C10.3129 10.736 9.30596 11.9444 8.50041 13.3333Z"
        fill="#BF936A"
      />
    </g>
  </svg>
);

const Logo2 = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_43_251"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="40"
      height="40"
    >
      <rect width="40" height="40" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_43_251)">
      <path
        d="M24.1667 29.9999C23 29.9999 22.0139 29.5971 21.2083 28.7916C20.4028 27.986 20 26.9999 20 25.8333C20 24.6666 20.4028 23.6805 21.2083 22.8749C22.0139 22.0694 23 21.6666 24.1667 21.6666C25.3333 21.6666 26.3194 22.0694 27.125 22.8749C27.9306 23.6805 28.3333 24.6666 28.3333 25.8333C28.3333 26.9999 27.9306 27.986 27.125 28.7916C26.3194 29.5971 25.3333 29.9999 24.1667 29.9999ZM8.33333 36.6666C7.41667 36.6666 6.63194 36.3402 5.97917 35.6874C5.32639 35.0346 5 34.2499 5 33.3333V9.99992C5 9.08325 5.32639 8.29853 5.97917 7.64575C6.63194 6.99297 7.41667 6.66659 8.33333 6.66659H10V4.99992C10 4.5277 10.1597 4.13186 10.4792 3.81242C10.7986 3.49297 11.1944 3.33325 11.6667 3.33325C12.1389 3.33325 12.5347 3.49297 12.8542 3.81242C13.1736 4.13186 13.3333 4.5277 13.3333 4.99992V6.66659H26.6667V4.99992C26.6667 4.5277 26.8264 4.13186 27.1458 3.81242C27.4653 3.49297 27.8611 3.33325 28.3333 3.33325C28.8056 3.33325 29.2014 3.49297 29.5208 3.81242C29.8403 4.13186 30 4.5277 30 4.99992V6.66659H31.6667C32.5833 6.66659 33.3681 6.99297 34.0208 7.64575C34.6736 8.29853 35 9.08325 35 9.99992V33.3333C35 34.2499 34.6736 35.0346 34.0208 35.6874C33.3681 36.3402 32.5833 36.6666 31.6667 36.6666H8.33333ZM8.33333 33.3333H31.6667V16.6666H8.33333V33.3333Z"
        fill="#BF936A"
      />
    </g>
  </svg>
);

const Logo3 = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 36L6.24933 27.7827C4.86133 25.3773 4.132 22.6507 4.13333 19.8547C4.13733 11.1133 11.2507 4 19.9907 4C24.232 4.00133 28.2133 5.65333 31.208 8.65067C34.2013 11.648 35.8493 15.632 35.848 19.8693C35.844 28.612 28.7307 35.7253 19.9907 35.7253C17.3373 35.724 14.7227 35.0587 12.4067 33.7947L4 36ZM12.796 30.924C15.0307 32.2507 17.164 33.0453 19.9853 33.0467C27.2493 33.0467 33.1667 27.1347 33.1707 19.8667C33.1733 12.584 27.284 6.68 19.996 6.67733C12.7267 6.67733 6.81333 12.5893 6.81067 19.856C6.80933 22.8227 7.67867 25.044 9.13867 27.368L7.80667 32.232L12.796 30.924ZM27.9787 23.6387C27.88 23.4733 27.616 23.3747 27.2187 23.176C26.8227 22.9773 24.8747 22.0187 24.5107 21.8867C24.148 21.7547 23.884 21.688 23.6187 22.0853C23.3547 22.4813 22.5947 23.3747 22.364 23.6387C22.1333 23.9027 21.9013 23.936 21.5053 23.7373C21.1093 23.5387 19.832 23.1213 18.3187 21.7707C17.1413 20.72 16.3453 19.4227 16.1147 19.0253C15.884 18.6293 16.0907 18.4147 16.288 18.2173C16.4667 18.04 16.684 17.7547 16.8827 17.5227C17.084 17.2933 17.1493 17.128 17.2827 16.8627C17.4147 16.5987 17.3493 16.3667 17.2493 16.168C17.1493 15.9707 16.3573 14.02 16.028 13.2267C15.7053 12.4547 15.3787 12.5587 15.136 12.5467L14.376 12.5333C14.112 12.5333 13.6827 12.632 13.32 13.0293C12.9573 13.4267 11.9333 14.384 11.9333 16.3347C11.9333 18.2853 13.3533 20.1693 13.5507 20.4333C13.7493 20.6973 16.344 24.7 20.3187 26.416C21.264 26.824 22.0027 27.068 22.5773 27.2507C23.5267 27.552 24.3907 27.5093 25.0733 27.408C25.8347 27.2947 27.4173 26.4493 27.748 25.524C28.0787 24.5973 28.0787 23.804 27.9787 23.6387Z"
      fill="#BF936A"
      stroke="#BF936A"
      stroke-width="0.5"
    />
  </svg>
);

export default async function HomePage() {
  const { feedbacks, totalPages } = await fetchFeedbackData();
  const counterData = await fetchCounterData();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Container>
        <Statistics counterData={counterData} />
        <FeedbackSection feedbacks={feedbacks} totalPages={totalPages} />
      </Container>
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
        Icon={Logo1}
        title="Total Kunjungan Web"
        value={counterData.totalVisitors}
      />
      <StatCard
        Icon={Logo2}
        title="Kunjungan Web Hari Ini"
        value={counterData.todayVisitors}
      />
      <StatCard
        Icon={Logo3}
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
    <div className="bg-white shadow-md rounded-2xl">
      <Typography variant="h3" className="p-4" fontWeight="semibold" >
        Pesan
      </Typography>
      <FeedbackTable feedbacks={feedbacks} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}

/**
 * Statistics card component.
 */
function StatCard({
  Icon,
  title,
  value,
}: {
  Icon: React.ComponentType;
  title: string;
  value: number;
}) {
  return (
    <div className="p-4 bg-[#faebd7] rounded-md flex items-center outline-2 outline outline-secondary">
      <div className="text-2xl font-bold text-[#a67d52]">
        <Icon />
      </div>
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
          <th className="px-4 py-2 text-left" >Tanggal & Waktu</th>
          <th className="px-4 py-2 text-left">Nama</th>
          <th className="px-4 py-2 text-left">No. HP</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Pesan</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <tr key={feedback.id} className={`bg-light-gray text-text-dark ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } border-b border-gray-200`}>
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
