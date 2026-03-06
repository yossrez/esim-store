import localFont from "next/font/local";
import { ReactNode } from "react";

interface ContentLayoutProps {
  children: ReactNode;
}

const geistSans = localFont({
  src: "../../pages/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../pages/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div
      className={`container mx-auto px-5 pb-5 ${geistSans.variable} ${geistMono.variable} mb-20 font-(family-name:--font-geist-mono)`}
    >
      {children}
    </div>
  );
}
