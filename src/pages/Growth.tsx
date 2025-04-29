
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, LineChart, Calendar, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MeasurementData {
  date: string;
  height: number;
  weight: number;
  note?: string;
}

const Growth = () => {
  const [tab, setTab] = useState("charts");
  const [showAddForm, setShowAddForm] = useState(false);
  
  const measurements: MeasurementData[] = [
    { date: "28 апреля 2025", height: 78, weight: 10.5 },
    { date: "20 марта 2025", height: 77, weight: 10.2 },
    { date: "15 февраля 2025", height: 76, weight: 9.8 },
    { date: "10 января 2025", height: 75, weight: 9.5 },
    { date: "5 декабря 2024", height: 74, weight: 9.2 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" className="text-medical-sber-green hover:text-medical-sber-darkGreen mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Рост и вес</h1>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Добавить измерение
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl">Новое измерение</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата</Label>
                    <Input type="date" id="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Рост (см)</Label>
                    <Input type="number" id="height" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input type="number" id="weight" step="0.1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note">Заметка</Label>
                  <Input id="note" placeholder="Дополнительная информация" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Отмена
                  </Button>
                  <Button className="bg-medical-sber-green hover:bg-medical-sber-darkGreen">
                    Сохранить
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="charts" className="flex-1">
              <LineChart className="h-4 w-4 mr-2" />
              Графики
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              История
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Рост (см)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-medical-sber-green">78 см</p>
                      <p className="text-gray-500 mt-2">Соответствует норме для возраста</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-medical-sber-lime bg-opacity-20 rounded-md">
                    <p className="text-sm text-gray-700">
                      Текущий рост вашего ребенка находится в пределах 75-го процентиля для его возраста, что является нормой.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Вес (кг)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-medical-sber-green">10,5 кг</p>
                      <p className="text-gray-500 mt-2">Соответствует норме для возраста</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-medical-sber-lime bg-opacity-20 rounded-md">
                    <p className="text-sm text-gray-700">
                      Вес вашего ребенка находится в пределах 60-го процентиля для его возраста и роста, что является нормой.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">История измерений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Дата</th>
                        <th className="text-left py-3 px-4">Рост (см)</th>
                        <th className="text-left py-3 px-4">Вес (кг)</th>
                        <th className="text-left py-3 px-4">Заметка</th>
                      </tr>
                    </thead>
                    <tbody>
                      {measurements.map((measurement, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{measurement.date}</td>
                          <td className="py-3 px-4">{measurement.height}</td>
                          <td className="py-3 px-4">{measurement.weight}</td>
                          <td className="py-3 px-4">{measurement.note || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Рекомендации по росту и развитию</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Для здорового развития ребенка важно правильное питание, физическая активность и регулярный контроль показателей роста и веса.
              Рекомендуем консультироваться с педиатром по вопросам развития вашего ребенка.
            </p>
            <Button className="mt-4 bg-medical-sber-green hover:bg-medical-sber-darkGreen">
              Получить персональные рекомендации
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Growth;
