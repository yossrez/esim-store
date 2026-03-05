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
      <footer className="max-md:flex max-md:justify-center">
        <div className="bottom-0 absolute pt-2 pb-3 w-full px-10">
          <div className="flex md:flex-row flex-col justify-between items-center gap-3 lg:gap-7 max-ws">
            <span className="text-gray-800 md:text-base">
              &copy; 2026 eSIM-APP. All Rights Reserved.
            </span>
            <div className="flex gap-7 text-gray-800 md:text-base">
              {/*<Link href="#">*/}
              <span>Privacy</span>
              {/*</Link>*/}
              {/*<Link href="#">*/}
              <span>Terms</span>
              {/*</Link>*/}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
