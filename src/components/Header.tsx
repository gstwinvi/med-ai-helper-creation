import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Главная", path: "/" },
    { name: "Календарь", path: "/calendar" },
    { name: "Рост", path: "/growth" },
    { name: "Симптомы", path: "/symptoms" },
    { name: "Рекомендации", path: "/recommendations" },
    { name: "AI-ассистент", path: "/ai-assistant" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg giga-gradient flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <span className="text-lg font-semibold text-gigapurple-700">GigaHelp</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-gigapurple-600 bg-gigapurple-50"
                  : "text-gray-700 hover:text-gigapurple-500 hover:bg-gigapurple-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <nav className="flex flex-col space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? "text-gigapurple-600 bg-gigapurple-50"
                    : "text-gray-700 hover:text-gigapurple-500 hover:bg-gigapurple-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
