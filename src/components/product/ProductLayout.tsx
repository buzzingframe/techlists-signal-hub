
import { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ProductLayoutProps {
  children: ReactNode;
}

export function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="page-container section-spacing content-spacing">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
