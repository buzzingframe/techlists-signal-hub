
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CuratedListHero } from "@/components/curated-list/CuratedListHero";
import { CuratedListAdminControls } from "@/components/curated-list/CuratedListAdminControls";
import { CuratedListProductGrid } from "@/components/curated-list/CuratedListProductGrid";
import { Badge } from "@/components/ui/badge";
import { useRealCuratedListDetail } from "@/hooks/useRealCuratedLists";

export default function CuratedListDetail() {
  const { id } = useParams<{ id: string }>();
  const { list, products, isLoading, isAdmin } = useRealCuratedListDetail(id || '');
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Loading...</h2>
            <p className="mt-2 text-muted-foreground">Please wait while we load the curated list.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">List not found</h2>
            <p className="mt-2 text-muted-foreground">The requested curated list could not be found.</p>
            <Button className="mt-4" asChild>
              <Link to="/curated-lists">Back to Lists</Link>
            </Button>
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
        {/* Hero section */}
        <CuratedListHero list={list} formatDate={formatDate} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Description */}
          <div className="mb-8">
            <p className="text-lg md:text-xl">{list.description}</p>
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <span>Curated by {list.createdBy}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {list.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          {/* Admin Controls */}
          <CuratedListAdminControls list={list} isAdmin={isAdmin} />
          
          {/* Products Section */}
          <CuratedListProductGrid products={products} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
