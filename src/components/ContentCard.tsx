import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import { Link } from "wouter";
import { Content } from "@shared/schema";
import { getContentUrl } from "@/lib/utils";

interface ContentCardProps {
  content: Content;
  onPlayClick: (content: Content) => void;
  onAddToListClick: (content: Content) => void;
}

const ContentCard = ({ content, onPlayClick, onAddToListClick }: ContentCardProps) => {
  return (
    <Link href={getContentUrl(content)}>
      <div className="content-card relative rounded-md overflow-hidden group cursor-pointer">
        <img 
          src={content.thumbnail} 
          alt={content.title}
          className="w-full aspect-video object-cover transition duration-300"
        />
        
        <div className="content-overlay absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Button 
              size="icon" 
              className="bg-primary rounded-full w-8 h-8 p-0 flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPlayClick(content);
              }}
            >
              <Play className="h-4 w-4 text-white" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              className="rounded-full w-8 h-8 p-0 flex items-center justify-center text-white hover:bg-white/20"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToListClick(content);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <h3 className="text-white font-medium">{content.title}</h3>
          
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span>{content.releaseYear}</span>
            {content.duration && (
              <>
                <span className="mx-1">•</span>
                <span>{content.duration}</span>
              </>
            )}
            {content.ageRating && (
              <>
                <span className="mx-1">•</span>
                <span>{content.ageRating}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
