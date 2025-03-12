import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollProgress } from "@/lib/utils/animation";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  const location = useLocation();

  useEffect(() => {
    setIsScrolled(scrollProgress > 0);
  }, [scrollProgress]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        location.pathname != "/dashboard" && isScrolled
          ? "py-2 glass"
          : "py-4 bg-transparent"
      } ${
        location.pathname === "/dashboard"
          ? "bg-white border-b border-b-gray-200"
          : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">
                  CL
                </span>
              </div>
              <span className="font-display font-medium text-lg">
                Celluloid
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How it Works
            </a>
            <Link
              to="/create"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Create Script
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          <Link to="/create">
            <div className="flex items-center gap-4">
              <Button size="sm" className="animate-fade-in">
                Get Started
              </Button>
            </div>
          </Link>
        </div>
      </div>

      {location.pathname !== "/dashboard" && isScrolled && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2">
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
