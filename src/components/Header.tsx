import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  MessageCircle, 
  FileText, 
  HelpCircle, 
  Menu, 
  X 
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="bg-medical-teal text-white p-2 rounded-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="text-xl font-bold text-gray-800">МедДоктор AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-medical-blue transition-colors">
            <Home size={18} />
            <span>Главная</span>
          </Link>
          <Link to="/chat" className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-medical-blue transition-colors">
            <MessageCircle size={18} />
            <span>Консультация</span>
          </Link>
          <Link to="/articles" className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-medical-blue transition-colors">
            <FileText size={18} />
            <span>Статьи</span>
          </Link>
          <Link to="/faq" className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-medical-blue transition-colors">
            <HelpCircle size={18} />
            <span>FAQ</span>
          </Link>
          <Button className="bg-medical-blue hover:bg-medical-teal ml-4">Начать</Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-medical-light rounded-md">
                <Home size={18} />
                <span>Главная</span>
              </Link>
              <Link to="/chat" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-medical-light rounded-md">
                <MessageCircle size={18} />
                <span>Консультация</span>
              </Link>
              <Link to="/articles" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-medical-light rounded-md">
                <FileText size={18} />
                <span>Статьи</span>
              </Link>
              <Link to="/faq" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-medical-light rounded-md">
                <HelpCircle size={18} />
                <span>FAQ</span>
              </Link>
              <Button className="bg-medical-blue hover:bg-medical-teal w-full mt-2">Начать</Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;