
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, Bot, Brain, Info, MessageSquareText, CloudCog } from "lucide-react";
import { Button } from "@/components/ui/button";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openChat = () => {
    setIsOpen(true);
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };

  // Примеры вопросов для родителей
  const sampleQuestions = [
    "Какие прививки нужны ребенку в 1 год?",
    "Нормальный рост и вес для ребенка 2 лет?",
    "Что делать при высокой температуре у ребенка?",
    "Сколько должен спать ребенок в 3 года?",
    "Какие продукты могут вызвать аллергию у детей?",
    "Когда нужно обращаться к врачу при кашле?"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-medical-sber-green hover:text-medical-sber-darkGreen mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">AI-ассистент</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-medical-sber-green" />
                  Медицинский AI-ассистент
                </CardTitle>
                <CardDescription>
                  Получите быстрые ответы на вопросы о здоровье вашего ребенка
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-gray-600 mb-4">
                    Наш AI-ассистент использует передовые технологии искусственного интеллекта, 
                    чтобы предоставить вам информацию о здоровье, развитии и уходе за детьми.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Info className="h-5 w-5 mr-2 text-medical-sber-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Получите рекомендации по симптомам</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-5 w-5 mr-2 text-medical-sber-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Узнайте о нормах развития ребенка</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-5 w-5 mr-2 text-medical-sber-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">Задавайте вопросы о питании и уходе</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={openChat} 
                  className="w-full bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                >
                  <MessageSquareText className="h-4 w-4 mr-2" />
                  Начать общение с ассистентом
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-medical-sber-green" />
                  Примеры вопросов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {sampleQuestions.map((question, index) => (
                    <li key={index}>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left h-auto py-3 border-medical-sber-lightGreen text-gray-700 hover:bg-medical-sber-lightGreen hover:text-medical-sber-darkGreen"
                        onClick={() => {
                          openChat();
                          // В реальном приложении здесь можно предзаполнить запрос
                        }}
                      >
                        {question}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <CloudCog className="h-5 w-5 mr-2 text-medical-sber-green" />
                  Как это работает
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Наш ассистент использует технологии OpenAI для обработки ваших вопросов и предоставления 
                  информации на основе современных медицинских знаний.
                </p>
                <div className="bg-medical-sber-lightGreen bg-opacity-50 p-4 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Важно:</strong> AI-ассистент предоставляет только общую информацию 
                    и не заменяет консультацию квалифицированного врача. При серьезных проблемах со здоровьем 
                    всегда обращайтесь к медицинским специалистам.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* AI Chatbot */}
      <ChatBot isOpen={isOpen} onClose={closeChat} />
      
      <Footer />
    </div>
  );
};

export default AiAssistant;
