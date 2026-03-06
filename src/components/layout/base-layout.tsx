import { ReactNode } from "react";
import SEO from "../meta/seo";
// import Link from "next/link";

interface BaseLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function BaseLayout({
  title,
  description,
  children,
}: BaseLayoutProps) {
  return (
    <>
      <SEO title={title} description={description} />
      {children}
    </>
  );
}
