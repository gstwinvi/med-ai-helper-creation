
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, LineChart, ArrowUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Growth = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState("");
  const [selectedAge, setSelectedAge] = useState("12");
  
  const openChat = (question = "") => {
    setInitialQuestion(question);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setInitialQuestion("");
  };

  // Данные роста и веса для разных возрастов
  const growthData = {
    "6": { 
      height: { min: 64, max: 70, current: 67 },
      weight: { min: 7.1, max: 8.8, current: 7.8 }
    },
    "12": { 
      height: { min: 71, max: 80, current: 78 },
      weight: { min: 8.9, max: 10.9, current: 10.5 }
    },
    "18": { 
      height: { min: 79, max: 86, current: 82 },
      weight: { min: 10.2, max: 12.3, current: 11.5 }
    },
    "24": { 
      height: { min: 84, max: 93, current: 88 },
      weight: { min: 11.5, max: 14.2, current: 12.8 }
    }
  };

  const currentData = growthData[selectedAge as keyof typeof growthData];

  // Функция для отображения статуса (норма, выше нормы, ниже нормы)
  const getStatus = (current: number, min: number, max: number) => {
    if (current < min) return "ниже нормы";
    if (current > max) return "выше нормы";
    return "норма";
  };

  // Функция для определения процента прогресса для визуализации
  const getPercentage = (current: number, min: number, max: number) => {
    const range = max - min;
    const position = current - min;
    return Math.min(Math.max((position / range) * 100, 0), 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header openChat={openChat} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-medical-sber-green hover:text-medical-sber-darkGreen mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Рост и вес</h1>
        </div>

        <div className="mb-6">
          <label htmlFor="age-select" className="block text-sm font-medium text-gray-700 mb-2">
            Выберите возраст ребенка (в месяцах)
          </label>
          <Select value={selectedAge} onValueChange={setSelectedAge}>
            <SelectTrigger className="w-full md:w-1/3" id="age-select">
              <SelectValue placeholder="Выберите возраст" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 месяцев</SelectItem>
              <SelectItem value="12">12 месяцев (1 год)</SelectItem>
              <SelectItem value="18">18 месяцев (1.5 года)</SelectItem>
              <SelectItem value="24">24 месяца (2 года)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Карточка роста */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowUp className="h-5 w-5 mr-2 text-medical-sber-green" />
                Рост
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Текущий рост</span>
                  <span className="font-semibold text-lg">{currentData.height.current} см</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-medical-sber-green h-2.5 rounded-full" 
                    style={{ width: `${getPercentage(currentData.height.current, currentData.height.min, currentData.height.max)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Мин. {currentData.height.min} см</span>
                  <span>Макс. {currentData.height.max} см</span>
                </div>
                <p className="mt-3 text-gray-700">
                  Статус: <span className="font-medium text-medical-sber-green">
                    {getStatus(currentData.height.current, currentData.height.min, currentData.height.max)}
                  </span>
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="text-medical-sber-green border-medical-sber-green hover:bg-medical-sber-lightGreen hover:text-medical-sber-darkGreen w-full mt-2"
                onClick={() => openChat(`Какой нормальный рост ребенка в ${selectedAge} месяцев?`)}
              >
                Узнать подробнее об этом показателе
              </Button>
            </CardContent>
          </Card>

          {/* Карточка веса */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-medical-sber-green" />
                Вес
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Текущий вес</span>
                  <span className="font-semibold text-lg">{currentData.weight.current} кг</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-medical-sber-green h-2.5 rounded-full" 
                    style={{ width: `${getPercentage(currentData.weight.current, currentData.weight.min, currentData.weight.max)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Мин. {currentData.weight.min} кг</span>
                  <span>Макс. {currentData.weight.max} кг</span>
                </div>
                <p className="mt-3 text-gray-700">
                  Статус: <span className="font-medium text-medical-sber-green">
                    {getStatus(currentData.weight.current, currentData.weight.min, currentData.weight.max)}
                  </span>
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="text-medical-sber-green border-medical-sber-green hover:bg-medical-sber-lightGreen hover:text-medical-sber-darkGreen w-full mt-2"
                onClick={() => openChat(`Какой нормальный вес ребенка в ${selectedAge} месяцев?`)}
              >
                Узнать подробнее об этом показателе
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* График развития */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>График развития</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center p-4">
              <LineChart className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500 text-center">
                История измерений роста и веса вашего ребенка будет отображаться здесь
              </p>
              <Button 
                className="mt-4 bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                onClick={() => openChat("Как правильно отслеживать рост и вес ребенка?")}
              >
                Получить консультацию
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Полезные советы */}
        <Card className="mt-6 bg-gradient-to-r from-medical-sber-green to-medical-sber-lime text-white">
          <CardHeader>
            <CardTitle className="text-white">Советы для правильного развития</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>Регулярно отслеживайте рост и вес ребенка для контроля его развития</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>Обеспечьте сбалансированное питание с достаточным количеством белков, жиров, углеводов и витаминов</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>Поощряйте физическую активность соответственно возрасту ребенка</p>
              </li>
            </ul>
            <Button 
              className="mt-4 bg-white text-medical-sber-green hover:bg-gray-100"
              onClick={() => openChat("Какое питание способствует правильному росту и развитию ребенка?")}
            >
              Узнать больше
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
      
      {/* Чат-бот */}
      <ChatBot isOpen={isChatOpen} onClose={closeChat} initialQuestion={initialQuestion} />
    </div>
  );
};

export default Growth;
