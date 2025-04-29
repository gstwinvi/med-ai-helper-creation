
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeft, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface Vaccination {
  id: number;
  name: string;
  date: Date;
  status: "completed" | "upcoming" | "missed";
  description: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const vaccinations: Vaccination[] = [
    {
      id: 1,
      name: "ОРВИ",
      date: new Date(2025, 4, 5), // 5 мая 2025
      status: "upcoming",
      description: "Ежегодная прививка от гриппа и ОРВИ"
    },
    {
      id: 2,
      name: "Корь, паротит, краснуха (КПК)",
      date: new Date(2025, 5, 15), // 15 июня 2025
      status: "upcoming",
      description: "Плановая ревакцинация"
    },
    {
      id: 3,
      name: "Гепатит B",
      date: new Date(2025, 2, 10), // 10 марта 2025 (уже прошло)
      status: "completed",
      description: "Третья доза вакцины"
    },
    {
      id: 4,
      name: "Полиомиелит",
      date: new Date(2024, 11, 20), // 20 декабря 2024 (уже прошло)
      status: "completed",
      description: "Третья доза инактивированной вакцины"
    }
  ];

  // Сортировка прививок: сначала предстоящие, затем прошедшие
  const sortedVaccinations = [...vaccinations].sort((a, b) => {
    // Предстоящие прививки вверху
    if (a.status === "upcoming" && b.status !== "upcoming") return -1;
    if (a.status !== "upcoming" && b.status === "upcoming") return 1;
    
    // Сортировка по дате
    return a.date.getTime() - b.date.getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500";
      case "upcoming": return "text-blue-500";
      case "missed": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "upcoming": return <CalendarIcon className="h-5 w-5 text-blue-500" />;
      case "missed": return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-medical-teal hover:text-medical-blue mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Календарь прививок</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Календарь */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Выберите дату</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Список прививок */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Запланированные прививки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedVaccinations.map((vaccination) => (
                  <div 
                    key={vaccination.id}
                    className="p-4 border rounded-lg flex items-start space-x-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      {getStatusIcon(vaccination.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-800">{vaccination.name}</h3>
                        <span className={`text-sm ${getStatusColor(vaccination.status)}`}>
                          {vaccination.status === "completed" ? "Завершено" : 
                           vaccination.status === "upcoming" ? "Предстоит" : "Пропущено"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{vaccination.description}</p>
                      <p className="text-sm font-medium mt-2">
                        {vaccination.date.toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      {vaccination.status === "upcoming" && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 text-medical-teal hover:text-medical-blue hover:bg-gray-100"
                        >
                          Установить напоминание
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Информационный блок */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Почему важны прививки?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Вакцинация защищает детей от серьезных болезней и возможных осложнений. 
              Соблюдение календаря прививок помогает сформировать иммунитет вашего ребенка 
              и защитить его от опасных инфекций.
            </p>
            <Button className="mt-4 bg-medical-teal hover:bg-medical-blue">
              Проконсультироваться с врачом
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Calendar;
