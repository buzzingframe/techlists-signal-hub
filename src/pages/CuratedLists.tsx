
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CuratedListHeader } from "@/components/curated-list/CuratedListHeader";
import { CuratedListGrid } from "@/components/curated-list/CuratedListGrid";
import { CuratedListSkeleton } from "@/components/loading/CuratedListSkeleton";
import { useRealCuratedLists } from "@/hooks/useRealCuratedLists";

export default function CuratedLists() {
  const { lists, isLoading, isAdmin, error } = useRealCuratedLists();

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="page-container section-spacing">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-destructive">Failed to load curated lists</h2>
              <p className="mt-2 text-muted-foreground">Please try refreshing the page.</p>
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
        <div className="page-container section-spacing content-spacing">
          <CuratedListHeader isAdmin={isAdmin} />
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-standard">
              {Array.from({ length: 6 }).map((_, index) => (
                <CuratedListSkeleton key={index} />
              ))}
            </div>
          ) : (
            <CuratedListGrid lists={lists} />
          )}

          {!isLoading && lists.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No curated lists found</h3>
              <p className="mt-2 text-muted-foreground">Create your first curated list to get started.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
