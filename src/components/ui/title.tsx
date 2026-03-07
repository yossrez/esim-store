import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <div className="text-sm md:text-base lg:text-lg font-semibold mb-3">
      {children}
    </div>
  );
}
