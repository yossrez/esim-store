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
      id="content-container"
      className={`${geistSans.className} ${geistMono.className}`}
    >
      {children}
    </div>
  );
}
