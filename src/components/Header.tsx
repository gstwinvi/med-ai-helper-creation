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
    { name: "Документация", path: "/documentation" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-white/10">
      <div className="container flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg shealth-gradient flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-lg font-semibold text-shealth-600">SHealth</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-shealth-600 bg-shealth-50"
                  : "text-gray-700 hover:text-shealth-500 hover:bg-shealth-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://sberhealth.ru/doctors"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 bg-shealth-500 text-white rounded-md text-sm font-medium hover:bg-shealth-600 transition-colors"
          >
            Консультации с врачами
          </a>
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
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-b">
          <nav className="flex flex-col space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.path)
                    ? "text-shealth-600 bg-shealth-50"
                    : "text-gray-700 hover:text-shealth-500 hover:bg-shealth-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://sberhealth.ru/doctors"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-shealth-500 text-white rounded-md text-sm font-medium hover:bg-shealth-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Консультации с врачами
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
