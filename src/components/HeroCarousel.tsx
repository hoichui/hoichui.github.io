import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, Plus } from "lucide-react";
import { Content } from "@shared/schema";
import { truncateText } from "@/lib/utils";

interface HeroCarouselProps {
  featuredContent: Content[];
  onWatchNow: (content: Content) => void;
  onAddToList: (content: Content) => void;
}

const HeroCarousel = ({ featuredContent, onWatchNow, onAddToList }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto rotate carousel
  useEffect(() => {
    if (featuredContent.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [featuredContent.length]);
  
  if (!featuredContent.length) return null;
  
  const currentContent = featuredContent[currentIndex];
  
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img 
          src={currentContent.banner || currentContent.thumbnail}
          alt={currentContent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
        <div className="container mx-auto">
          <div className="max-w-xl">
            {currentContent.isOriginal && (
              <span className="inline-block bg-primary text-white text-xs font-semibold px-2 py-1 rounded mb-4">
                HOICHOI ORIGINAL
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{currentContent.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              {currentContent.releaseYear && (
                <span className="text-muted-foreground">{currentContent.releaseYear}</span>
              )}
              {currentContent.ageRating && (
                <span className="text-white px-2 py-1 text-xs border border-white rounded">
                  {currentContent.ageRating}
                </span>
              )}
              {currentContent.duration && (
                <span className="text-muted-foreground">{currentContent.duration}</span>
              )}
              <span className="text-muted-foreground">
                {currentContent.genres?.join(', ')}
              </span>
            </div>
            
            <p className="text-white mb-6 line-clamp-3">
              {truncateText(currentContent.description, 150)}
            </p>
            
            <div className="flex space-x-4">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2"
                onClick={() => onWatchNow(currentContent)}
              >
                <PlayCircle className="h-5 w-5" /> Watch Now
              </Button>
              <Button 
                variant="outline"
                className="bg-secondary hover:bg-secondary/90 text-white border-muted px-6 py-3 rounded-md font-semibold flex items-center gap-2"
                onClick={() => onAddToList(currentContent)}
              >
                <Plus className="h-5 w-5" /> My List
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel indicators */}
      {featuredContent.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {featuredContent.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
