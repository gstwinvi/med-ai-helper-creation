
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, LineChart, Stethoscope, Heart, ChevronRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  <span className="text-medical-sber-green">Ассистент</span> для родителей
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Здравствуйте!
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Следите за здоровьем ребёнка с помощью ассистента
                </p>
                <Button className="bg-medical-sber-green hover:bg-medical-sber-darkGreen text-white px-6 py-3 rounded-lg">
                  Начать консультацию
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="rounded-full bg-medical-sber-lightGreen p-4 w-64 h-64 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1588066080712-b602f98a0f73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Счастливый ребенок" 
                      className="rounded-full w-56 h-56 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Календарь прививок */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-medical-sber-lightGreen">
                    <Calendar className="h-8 w-8 text-medical-sber-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">Календарь прививок</h3>
                    <p className="text-gray-600 mt-1">Следующая прививка: ОРВИ</p>
                    <p className="text-gray-600">5 мая</p>
                    <Link to="/calendar" className="inline-flex items-center mt-3 text-medical-sber-green hover:text-medical-sber-darkGreen">
                      Подробнее <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Рост и вес */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-medical-sber-lightGreen">
                    <LineChart className="h-8 w-8 text-medical-sber-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">Рост и вес</h3>
                    <p className="text-gray-600 mt-1">Рост: 78 см (норма)</p>
                    <p className="text-gray-600">Вес: 10,5 кг (норма)</p>
                    <Link to="/growth" className="inline-flex items-center mt-3 text-medical-sber-green hover:text-medical-sber-darkGreen">
                      Подробнее <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Симптомы */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-medical-sber-lightGreen">
                    <Stethoscope className="h-8 w-8 text-medical-sber-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">Симптомы</h3>
                    <p className="text-gray-600 mt-1">Чек-лист симптомов</p>
                    <p className="text-gray-600">Получите предварительные рекомендации</p>
                    <Link to="/symptoms" className="inline-flex items-center mt-3 text-medical-sber-green hover:text-medical-sber-darkGreen">
                      Подробнее <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Рекомендации */}
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-medical-sber-lightGreen">
                    <Heart className="h-8 w-8 text-medical-sber-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">Рекомендации</h3>
                    <p className="text-gray-600 mt-1">Советы по питанию, сну</p>
                    <p className="text-gray-600">и развитию</p>
                    <Link to="/recommendations" className="inline-flex items-center mt-3 text-medical-sber-green hover:text-medical-sber-darkGreen">
                      Подробнее <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="bg-gradient-to-r from-medical-sber-green to-medical-sber-lime py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">AI-помощник для заботы о здоровье вашего ребенка</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Получите быстрые ответы на свои вопросы, полезные рекомендации и персонализированную информацию о здоровье вашего ребенка
            </p>
            <Button className="bg-white text-medical-sber-green hover:bg-gray-100 px-6 py-3 rounded-lg">
              Спросить ассистента
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
