import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ContentCard from "./ContentCard";
import { Content } from "@shared/schema";
import { useResponsive } from "@/hooks/useResponsive";

interface ContentRowProps {
  title: string;
  contents: Content[];
  viewAllLink?: string;
  onPlayClick: (content: Content) => void;
  onAddToListClick: (content: Content) => void;
}

const ContentRow = ({
  title,
  contents,
  viewAllLink,
  onPlayClick,
  onAddToListClick
}: ContentRowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();
  
  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    
    const scrollAmount = isMobile ? 300 : 500;
    const scrollPosition = direction === "left" 
      ? sliderRef.current.scrollLeft - scrollAmount 
      : sliderRef.current.scrollLeft + scrollAmount;
    
    sliderRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });
  };
  
  if (!contents.length) return null;
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        
        {viewAllLink && (
          <Link href={viewAllLink} className="text-muted-foreground hover:text-white text-sm font-medium">
            View All
          </Link>
        )}
      </div>
      
      <div className="relative group">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {contents.map(content => (
            <div 
              key={content.id} 
              className="flex-none w-[200px] md:w-[240px]"
            >
              <ContentCard 
                content={content}
                onPlayClick={onPlayClick}
                onAddToListClick={onAddToListClick}
              />
            </div>
          ))}
        </div>
        
        {contents.length > 4 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentRow;
