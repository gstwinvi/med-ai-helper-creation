
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="bg-medical-teal text-white p-1.5 rounded-md">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-gray-800">Ассистент для родителей</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Медицинский AI-помощник, который помогает родителям заботиться о здоровье своих детей
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-medical-teal">Главная</Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-600 hover:text-medical-teal">Календарь прививок</Link>
              </li>
              <li>
                <Link to="/growth" className="text-gray-600 hover:text-medical-teal">Рост и вес</Link>
              </li>
              <li>
                <Link to="/symptoms" className="text-gray-600 hover:text-medical-teal">Симптомы</Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-gray-600 hover:text-medical-teal">Рекомендации</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                support@med-assistant.ru
              </li>
              <li className="text-gray-600">
                +7 (800) 123-45-67
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-600 text-sm">
          <p>© {currentYear} Ассистент для родителей. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
