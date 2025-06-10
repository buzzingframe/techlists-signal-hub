
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pin, Calendar } from "lucide-react";
import { CuratedList } from "@/types/product";

interface CuratedListCardProps {
  list: CuratedList;
}

export function CuratedListCard({ list }: CuratedListCardProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      {list.coverImage && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img 
            src={list.coverImage} 
            alt={list.title} 
            className="h-full w-full object-cover"
          />
          {list.isPinned && (
            <div className="absolute top-3 right-3 bg-black/70 rounded-full p-1">
              <Pin className="h-4 w-4 text-yellow-400" />
            </div>
          )}
        </div>
      )}
      
      <CardHeader className="card-padding">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{list.title}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Updated {formatDate(list.updatedAt)}</span>
            </div>
          </div>
          
          {!list.coverImage && list.isPinned && (
            <Pin className="h-4 w-4 text-yellow-400" />
          )}
        </div>
        <CardDescription className="mt-2">{list.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 card-padding pt-0">
        <div className="flex flex-wrap gap-2 mt-2">
          {list.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between card-padding pt-0">
        <div className="text-sm text-muted-foreground">
          {list.productIds.length} products
        </div>
        
        <Button variant="outline" asChild>
          <Link to={`/curated-lists/${list.id}`}>View List</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
