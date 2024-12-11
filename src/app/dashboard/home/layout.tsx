import type { Metadata } from "next";
import Header from "@/components/organisme/header";
import { logout } from "./action";

export const metadata: Metadata = {
  title: "Legasi LawFirm | Dashboard",
  description: "Dashboard for the Legal Firm",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header logout={logout} />
      {children}
    </>
  );
}
