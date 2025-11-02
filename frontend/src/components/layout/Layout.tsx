import type { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const Layout = ({ children, maxWidth = "xl" }: LayoutProps) => {
  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-7xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main
        className={`${maxWidthStyles[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 py-8`}
      >
        {children}
      </main>
    </div>
  );
};
