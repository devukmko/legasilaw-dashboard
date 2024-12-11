import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ReactQueryProvider from '../components/shared-provider/react-query-provider'

import { bellefair, gabarito } from '@/themes/fonts'

export const metadata: Metadata = {
  title: "Legasi LawFirm | Dashboard",
  description: "Dashboard for the Legal Firm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bellefair.variable} ${gabarito.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Toaster />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
