
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, Search, ThermometerSnowflake, Pill, Activity, Stethoscope, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Symptom {
  id: string;
  name: string;
  description: string;
  isChecked: boolean;
}

const Symptoms = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: "fever", name: "Повышенная температура", description: "Температура выше 37.5°C", isChecked: false },
    { id: "cough", name: "Кашель", description: "Сухой или влажный кашель", isChecked: false },
    { id: "runny-nose", name: "Насморк", description: "Выделения из носа", isChecked: false },
    { id: "sore-throat", name: "Боль в горле", description: "Дискомфорт при глотании", isChecked: false },
    { id: "headache", name: "Головная боль", description: "Боль или дискомфорт в области головы", isChecked: false },
    { id: "rash", name: "Сыпь на коже", description: "Изменения на коже в виде пятен или пузырьков", isChecked: false },
    { id: "stomach-ache", name: "Боль в животе", description: "Дискомфорт в области живота", isChecked: false },
    { id: "diarrhea", name: "Диарея", description: "Частый жидкий стул", isChecked: false },
    { id: "vomiting", name: "Рвота", description: "Непроизвольное извержение содержимого желудка", isChecked: false },
    { id: "fatigue", name: "Усталость", description: "Необычная утомляемость, слабость", isChecked: false },
  ]);

  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    symptom.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSymptomChange = (symptomId: string, isChecked: boolean) => {
    setSymptoms(prevSymptoms => 
      prevSymptoms.map(symptom => 
        symptom.id === symptomId ? { ...symptom, isChecked } : symptom
      )
    );
  };

  const selectedSymptoms = symptoms.filter(symptom => symptom.isChecked);
  const hasSelectedSymptoms = selectedSymptoms.length > 0;

  const resetChecklist = () => {
    setSymptoms(prevSymptoms => 
      prevSymptoms.map(symptom => ({ ...symptom, isChecked: false }))
    );
  };

  const commonConditions = [
    {
      name: "Простуда (ОРВИ)",
      symptoms: ["Насморк", "Кашель", "Боль в горле", "Повышенная температура"],
      icon: <ThermometerSnowflake className="h-5 w-5 text-blue-500" />
    },
    {
      name: "Аллергическая реакция",
      symptoms: ["Сыпь на коже", "Насморк", "Кашель"],
      icon: <Pill className="h-5 w-5 text-purple-500" />
    },
    {
      name: "Гастроэнтерит",
      symptoms: ["Боль в животе", "Диарея", "Рвота"],
      icon: <Activity className="h-5 w-5 text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-medical-sber-green hover:text-medical-sber-darkGreen mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Симптомы</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Чек-лист симптомов */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Чек-лист симптомов</CardTitle>
                <CardDescription>
                  Отметьте симптомы, которые наблюдаются у вашего ребенка
                </CardDescription>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск симптомов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSymptoms.map((symptom) => (
                    <div key={symptom.id} className="flex items-start space-x-3 border-b pb-3">
                      <Checkbox
                        id={symptom.id}
                        checked={symptom.isChecked}
                        onCheckedChange={(checked) => 
                          handleSymptomChange(symptom.id, checked as boolean)
                        }
                      />
                      <div>
                        <Label htmlFor={symptom.id} className="font-medium text-gray-800">
                          {symptom.name}
                        </Label>
                        <p className="text-sm text-gray-600">{symptom.description}</p>
                      </div>
                    </div>
                  ))}

                  {filteredSymptoms.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      Симптомы не найдены. Попробуйте изменить запрос.
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={resetChecklist}
                    disabled={!hasSelectedSymptoms}
                  >
                    Сбросить
                  </Button>
                  <Button 
                    className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                    disabled={!hasSelectedSymptoms}
                  >
                    Проанализировать <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {hasSelectedSymptoms && (
              <Card className="mt-6 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-xl">Предварительный анализ</CardTitle>
                  <CardDescription>
                    На основе выбранных симптомов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Важное замечание</h4>
                        <p className="text-sm text-amber-700">
                          Это предварительная информация, которая не заменяет консультацию врача. 
                          При серьезных симптомах обратитесь к врачу немедленно.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-3">Возможные состояния:</h3>
                  <div className="space-y-4">
                    {commonConditions.map((condition, index) => {
                      const matchedSymptoms = condition.symptoms.filter(
                        symptomName => selectedSymptoms.some(s => s.name === symptomName)
                      );
                      const matchPercentage = Math.round(
                        (matchedSymptoms.length / condition.symptoms.length) * 100
                      );
                      
                      // Показываем только если есть хотя бы одно совпадение
                      if (matchedSymptoms.length === 0) {
                        return null;
                      }
                      
                      return (
                        <div key={index} className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              {condition.icon}
                              <h4 className="font-medium">{condition.name}</h4>
                            </div>
                            <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded-full">
                              {matchPercentage}% совпадение
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            <p>Совпадающие симптомы: {matchedSymptoms.join(", ")}</p>
                          </div>
                        </div>
                      );
                    })}
                    
                    <Button className="w-full mt-4 bg-medical-sber-green hover:bg-medical-sber-darkGreen">
                      Получить подробные рекомендации
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Информация и часто задаваемые вопросы */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2 text-medical-sber-green" />
                  Спросите AI-ассистента
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Наш AI-ассистент поможет оценить симптомы и предложит рекомендации по уходу за ребенком.
                </p>
                <Button className="w-full bg-medical-sber-green hover:bg-medical-sber-darkGreen">
                  Начать чат с ассистентом
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">
                      Когда нужно срочно обратиться к врачу?
                    </AccordionTrigger>
                    <AccordionContent>
                      Немедленно обратитесь к врачу, если у ребенка: высокая температура (выше 38.5°C), 
                      которая не снижается после приема жаропонижающих; затрудненное дыхание; сильная боль; 
                      сыпь, которая не бледнеет при надавливании; судороги; потеря сознания.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      Как правильно измерять температуру?
                    </AccordionTrigger>
                    <AccordionContent>
                      Для младенцев рекомендуется измерять температуру ректально (наиболее точный метод). 
                      Для детей постарше можно использовать подмышечный, оральный или ушной метод, в зависимости 
                      от типа термометра. Следуйте инструкциям к термометру для получения точных результатов.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">
                      Можно ли давать лекарства без назначения врача?
                    </AccordionTrigger>
                    <AccordionContent>
                      Не рекомендуется давать детям лекарства без консультации с врачом. Многие лекарства имеют 
                      возрастные ограничения и противопоказания. При высокой температуре можно дать парацетамол 
                      или ибупрофен в возрастной дозировке, но лучше предварительно проконсультироваться с врачом.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Symptoms;
