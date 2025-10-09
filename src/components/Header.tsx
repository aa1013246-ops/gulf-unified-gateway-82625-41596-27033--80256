import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "الرئيسية", path: "/" },
    { label: "خدماتنا", path: "/services" },
    { label: "تتبع الشحنة", path: "/track" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">Gulf Unified</span>
              <span className="text-xs text-muted-foreground">حلول لوجستية متكاملة</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors relative ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-glow">
              تواصل معنا
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Button variant="default" size="sm" className="w-full bg-primary hover:bg-primary/90 text-white">
                تواصل معنا
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
