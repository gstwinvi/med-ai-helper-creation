
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, Heart, Utensils, Moon, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: "nutrition" | "sleep" | "development";
  icon: React.ReactNode;
}

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };
  
  const recommendations: Recommendation[] = [
    {
      id: "rec1",
      title: "Оптимальный рацион для детей 1-3 лет",
      description: "Сбалансированное питание для малышей должно включать разнообразные продукты из всех групп. Предлагайте ребенку овощи, фрукты, злаки, молочные продукты и источники белка в течение дня.",
      category: "nutrition",
      icon: <Utensils className="h-5 w-5 text-medical-sber-green" />
    },
    {
      id: "rec2",
      title: "Здоровый сон для дошкольников",
      description: "Дети 3-5 лет должны спать 10-13 часов в сутки, включая дневной сон. Регулярный режим сна помогает улучшить поведение, память и эмоциональное состояние ребенка.",
      category: "sleep",
      icon: <Moon className="h-5 w-5 text-medical-sber-green" />
    },
    {
      id: "rec3",
      title: "Игры для развития мелкой моторики",
      description: "Лепка из пластилина, рисование, нанизывание бусин и другие активности развивают мелкую моторику, что положительно влияет на речевое и интеллектуальное развитие ребенка.",
      category: "development",
      icon: <Brain className="h-5 w-5 text-medical-sber-green" />
    },
    {
      id: "rec4",
      title: "Правильный завтрак для дошкольника",
      description: "Полноценный завтрак должен содержать сложные углеводы, белок и здоровые жиры. Это может быть каша с фруктами и орехами, яйца, творог или йогурт с ягодами.",
      category: "nutrition",
      icon: <Utensils className="h-5 w-5 text-medical-sber-green" />
    },
    {
      id: "rec5",
      title: "Создание комфортной среды для сна",
      description: "Тихая, прохладная и темная комната способствует качественному сну. Ограничьте использование электронных устройств за час до сна и введите успокаивающие ритуалы.",
      category: "sleep",
      icon: <Moon className="h-5 w-5 text-medical-sber-green" />
    },
    {
      id: "rec6",
      title: "Социальное развитие через игры",
      description: "Игры с другими детьми помогают развивать социальные навыки, учат делиться, сотрудничать и решать конфликты. Организуйте регулярные встречи с другими детьми.",
      category: "development",
      icon: <Brain className="h-5 w-5 text-medical-sber-green" />
    }
  ];

  const filteredRecommendations = activeTab === "all" 
    ? recommendations 
    : recommendations.filter(rec => rec.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header openChat={openChat} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-medical-sber-green hover:text-medical-sber-darkGreen mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Рекомендации</h1>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Советы по питанию, сну и развитию</CardTitle>
            <CardDescription>
              Персонализированные рекомендации для здорового развития вашего ребенка
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="nutrition">Питание</TabsTrigger>
                <TabsTrigger value="sleep">Сон</TabsTrigger>
                <TabsTrigger value="development">Развитие</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredRecommendations.map((rec) => (
                    <Card key={rec.id} className="hover:shadow-md transition-shadow overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                          {rec.icon}
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{rec.description}</p>
                        <Button 
                          variant="ghost" 
                          className="mt-3 p-0 h-auto text-medical-sber-green hover:text-medical-sber-darkGreen hover:bg-transparent"
                          onClick={openChat}
                        >
                          Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Персонализированные рекомендации */}
        <Card className="bg-gradient-to-r from-medical-sber-green to-medical-sber-lime bg-opacity-90 text-white">
          <CardHeader>
            <CardTitle className="text-xl text-white">Персонализированные рекомендации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="md:max-w-xl">
                <p className="text-white mb-4">
                  Получите индивидуальный план питания, режима сна и развивающих активностей, 
                  разработанный специально для вашего ребенка на основе его возраста, потребностей и особенностей.
                </p>
                <Button 
                  className="bg-white text-medical-sber-green hover:bg-gray-100"
                  onClick={openChat}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Получить персональный план
                </Button>
              </div>
              <div className="mt-6 md:mt-0">
                <img 
                  src="https://images.unsplash.com/photo-1604251405903-b8c372067366?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Счастливые дети"
                  className="rounded-lg max-w-xs mx-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Консультация со специалистом */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Консультация со специалистом</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Наши эксперты по детскому здоровью и развитию готовы ответить на ваши вопросы и 
              предоставить персональные рекомендации.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                onClick={openChat}
              >
                Педиатр
              </Button>
              <Button 
                className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                onClick={openChat}
              >
                Детский психолог
              </Button>
              <Button 
                className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                onClick={openChat}
              >
                Детский диетолог
              </Button>
              <Button 
                className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                onClick={openChat}
              >
                Детский невролог
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
      
      {/* Чат-бот */}
      <ChatBot isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
};

export default Recommendations;
