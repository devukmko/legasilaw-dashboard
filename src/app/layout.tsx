import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
