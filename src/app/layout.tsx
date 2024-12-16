import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from '../components/shared-provider/react-query-provider'
import NextTopLoader from 'nextjs-toploader';

import { bellefair, gabarito } from '@/themes/fonts'

export const metadata: Metadata = {
  title: "Legasi Law Firm | Dashboard",
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
        <NextTopLoader />
        <ReactQueryProvider>
          <Toaster />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
