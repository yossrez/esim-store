import { ReactNode } from "react";
import SEO from "../meta/seo";

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
