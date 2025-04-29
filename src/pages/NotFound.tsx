
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="bg-medical-sber-green text-white p-3 rounded-full inline-flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Страница не найдена</h1>
        <p className="text-gray-600 mb-8">
          Извините, но страница, которую вы ищете, не существует или была перемещена.
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <Button 
            variant="outline" 
            className="border-medical-sber-green text-medical-sber-green hover:bg-medical-sber-lightGreen hover:text-medical-sber-green"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться назад
          </Button>
          <Button 
            className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              На главную
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
