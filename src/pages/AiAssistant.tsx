
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Bot, MessageSquare, Sparkles, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState("");
  
  const openChat = (question = "") => {
    setInitialQuestion(question);
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
    <div className="min-h-screen flex flex-col bg-[#F9FAFC]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-gigapurple-600 hover:text-gigapurple-800 mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">AI-ассистент</h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="giga-gradient text-white rounded-2xl p-8 mb-8 shadow-lg">
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 mr-3" />
                <h2 className="text-2xl font-bold">GigaChat</h2>
              </div>
              <p className="text-lg mb-6">
                Медицинский ассистент на базе нейросети GigaChat, отвечающий на вопросы о здоровье детей
              </p>
              <Button 
                onClick={() => openChat()} 
                className="bg-white text-gigapurple-600 hover:bg-gigapurple-50 hover:text-gigapurple-700 transition-all"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Задать вопрос
              </Button>
            </div>
            
            <Card className="shadow-sm border-0 giga-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Bot className="h-5 w-5 mr-2 text-gigapurple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Как это работает</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gigapurple-100 flex items-center justify-center text-gigapurple-600 mr-3 flex-shrink-0">1</div>
                    <p className="text-gray-700">Задайте вопрос о здоровье, развитии или уходе за ребенком</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gigapurple-100 flex items-center justify-center text-gigapurple-600 mr-3 flex-shrink-0">2</div>
                    <p className="text-gray-700">GigaChat проанализирует вопрос и подготовит информативный ответ</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gigapurple-100 flex items-center justify-center text-gigapurple-600 mr-3 flex-shrink-0">3</div>
                    <p className="text-gray-700">Получите профессиональную информацию на основе медицинских знаний</p>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-[#FEF7CD] rounded-lg">
                  <p className="text-sm text-gray-800">
                    <strong>Важно:</strong> Ответы ассистента не заменяют консультацию квалифицированного врача. 
                    При серьезных проблемах со здоровьем всегда обращайтесь к медицинским специалистам.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="border-0 shadow-sm mb-8 giga-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <History className="h-5 w-5 mr-2 text-gigapurple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Популярные вопросы</h3>
                </div>
                <div className="grid gap-3">
                  {sampleQuestions.map((question, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-3 px-4 border-gigapurple-100 text-gray-700 hover:bg-gigapurple-50 hover:text-gigapurple-600 hover:border-gigapurple-300 transition-all"
                      onClick={() => openChat(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm giga-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 mr-2 text-gigapurple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Возможности GigaChat</h3>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-start">
                    <div className="h-9 w-9 rounded-full bg-gigapurple-100 flex items-center justify-center text-gigapurple-600 mr-3 flex-shrink-0">🩺</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Медицинская информация</h4>
                      <p className="text-gray-600 text-sm">Рекомендации по симптомам и общим заболеваниям</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-9 w-9 rounded-full bg-gigapurple-100 flex items-center justify-center text-gigapurple-600 mr-3 flex-shrink-0">📈</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Нормы развития</h4>
                      <p className="text-gray-600 text-sm">Информация о возрастных нормах роста и развития детей</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-9 w-9 rounded-full bg-gigapurple-100 flex items-center justify-center text-gigapurple-600 mr-3 flex-shrink-0">🍎</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Питание и уход</h4>
                      <p className="text-gray-600 text-sm">Советы по правильному питанию и уходу за ребенком</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* AI Chatbot */}
      <ChatBot isOpen={isOpen} onClose={closeChat} initialQuestion={initialQuestion} />
      
      <Footer />
    </div>
  );
};

export default AiAssistant;
