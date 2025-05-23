
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CuratedListHeader } from "@/components/curated-list/CuratedListHeader";
import { CuratedListGrid } from "@/components/curated-list/CuratedListGrid";
import { useCuratedLists } from "@/hooks/useCuratedLists";

export default function CuratedLists() {
  const { lists, isAdmin } = useCuratedLists();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <CuratedListHeader isAdmin={isAdmin} />
          <CuratedListGrid lists={lists} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
