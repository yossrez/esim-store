"use client";

import localFont from "next/font/local";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BottomDockPortalProps {
  children: ReactNode;
  mobileOnly?: boolean;
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

export default function BottomDockPortal({
  children,
  mobileOnly = true,
}: BottomDockPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      style={styles.container}
      className={`${mobileOnly ? "md:hidden" : ""} ${geistSans.variable} ${geistMono.variable} font-(family-name:--font-geist-mono)`}
    >
      {children}
    </div>,
    document.body,
  );
}

const styles: { container: CSSProperties } = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 10,
  },
};
