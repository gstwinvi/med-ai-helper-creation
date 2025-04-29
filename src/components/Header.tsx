
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, MessageCircle } from "lucide-react";

interface HeaderProps {
  openChat?: (question?: string) => void;
}

const Header = ({ openChat }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenChat = () => {
    if (openChat) {
      openChat();
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="bg-medical-sber-green text-white p-1.5 rounded-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="font-bold text-xl text-gray-800">Ассистент для родителей</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-medical-sber-green">
              Главная
            </Link>
            <Link to="/calendar" className="text-gray-600 hover:text-medical-sber-green">
              Календарь прививок
            </Link>
            <Link to="/growth" className="text-gray-600 hover:text-medical-sber-green">
              Рост и вес
            </Link>
            <Link to="/symptoms" className="text-gray-600 hover:text-medical-sber-green">
              Симптомы
            </Link>
            <Link to="/recommendations" className="text-gray-600 hover:text-medical-sber-green">
              Рекомендации
            </Link>
          </nav>

          {/* User Profile, AI chat button and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {openChat && (
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex items-center text-medical-sber-green border-medical-sber-green hover:bg-medical-sber-lightGreen hover:text-medical-sber-darkGreen"
                onClick={handleOpenChat}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Спросить ассистента
              </Button>
            )}
            <Button variant="ghost" size="icon" className="rounded-full text-medical-sber-green">
              <User className="h-5 w-5" />
            </Button>
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-medical-sber-green px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                to="/calendar"
                className="text-gray-600 hover:text-medical-sber-green px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Календарь прививок
              </Link>
              <Link
                to="/growth"
                className="text-gray-600 hover:text-medical-sber-green px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Рост и вес
              </Link>
              <Link
                to="/symptoms"
                className="text-gray-600 hover:text-medical-sber-green px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Симптомы
              </Link>
              <Link
                to="/recommendations"
                className="text-gray-600 hover:text-medical-sber-green px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Рекомендации
              </Link>
              {openChat && (
                <button
                  className="flex items-center text-medical-sber-green hover:text-medical-sber-darkGreen px-2 py-1"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleOpenChat();
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Спросить ассистента
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
