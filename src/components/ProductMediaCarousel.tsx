
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface Media {
  type: "image" | "video";
  url: string;
  caption: string;
}

interface ProductMediaCarouselProps {
  media: Media[];
}

export function ProductMediaCarousel({ media }: ProductMediaCarouselProps) {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {media.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                {item.type === "image" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative overflow-hidden rounded-lg border cursor-pointer group">
                        <img 
                          src={item.url} 
                          alt={item.caption}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white">
                          <Badge variant="secondary" className="bg-black/70 text-white border-0">
                            {item.caption}
                          </Badge>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-auto"
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="relative overflow-hidden rounded-lg border h-48">
                    <iframe
                      src={item.url}
                      title={item.caption}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50 text-white">
                      <Badge variant="secondary" className="bg-black/70 text-white border-0">
                        {item.caption}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-0" />
        <CarouselNext className="hidden md:flex right-0" />
      </Carousel>
    </div>
  );
}
