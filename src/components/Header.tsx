import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Bell, User } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [location, navigate] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle scroll effect on header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background shadow-md" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-primary font-bold text-2xl">
            hoichoi
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-primary transition">
              Home
            </Link>
            <Link href="/categories" className="text-white hover:text-primary transition">
              Categories
            </Link>
            <Link href="/categories?type=movies" className="text-white hover:text-primary transition">
              Movies
            </Link>
            <Link href="/categories?type=series" className="text-white hover:text-primary transition">
              Web Series
            </Link>
          </nav>
          
          {/* Search, Notifications, Profile */}
          <div className="hidden md:flex items-center space-x-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-40 lg:w-60 bg-secondary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
                type="submit"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Watchlist</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
                type="submit"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-primary transition py-2">
                Home
              </Link>
              <Link href="/categories" className="text-white hover:text-primary transition py-2">
                Categories
              </Link>
              <Link href="/categories?type=movies" className="text-white hover:text-primary transition py-2">
                Movies
              </Link>
              <Link href="/categories?type=series" className="text-white hover:text-primary transition py-2">
                Web Series
              </Link>
              <Link href="#" className="text-white hover:text-primary transition py-2">
                My Profile
              </Link>
              <Link href="#" className="text-white hover:text-primary transition py-2">
                Watchlist
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
