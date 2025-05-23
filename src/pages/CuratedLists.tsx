
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CuratedListHeader } from "@/components/curated-list/CuratedListHeader";
import { CuratedListGrid } from "@/components/curated-list/CuratedListGrid";
import { useRealCuratedLists } from "@/hooks/useRealCuratedLists";

export default function CuratedLists() {
  const { lists, isLoading, isAdmin } = useRealCuratedLists();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold">Loading curated lists...</h2>
              <p className="mt-2 text-muted-foreground">Please wait while we load the lists.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
