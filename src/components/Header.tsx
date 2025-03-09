
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useScrollProgress } from '@/lib/utils/animation';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollProgress = useScrollProgress();
  
  useEffect(() => {
    setIsScrolled(scrollProgress > 0);
  }, [scrollProgress]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 glass' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">CS</span>
            </div>
            <span className="font-display font-medium text-lg">CinematicScribe</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How it Works
            </a>
            <a href="#create" className="text-sm font-medium hover:text-primary transition-colors">
              Create Script
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button size="sm" className="animate-fade-in">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {isScrolled && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-in-out" 
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
