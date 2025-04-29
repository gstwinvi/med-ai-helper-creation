
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, AlertTriangle, CheckCircle, Info, Thermometer, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Symptom {
  id: string;
  name: string;
  description: string;
  isUrgent: boolean;
  checked: boolean;
  aiPrompt: string;
}

const Symptoms = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState("");
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: "fever",
      name: "Повышенная температура",
      description: "Температура тела выше 37.5°C",
      isUrgent: true,
      checked: false,
      aiPrompt: "Что делать при высокой температуре у ребенка?"
    },
    {
      id: "cough",
      name: "Кашель",
      description: "Сухой, влажный или приступообразный кашель",
      isUrgent: false,
      checked: false,
      aiPrompt: "Как облегчить кашель у ребенка? Когда обращаться к врачу при кашле?"
    },
    {
      id: "rash",
      name: "Сыпь",
      description: "Высыпания на коже различного характера",
      isUrgent: true,
      checked: false,
      aiPrompt: "Что делать при появлении сыпи у ребенка? Какая сыпь требует срочного обращения к врачу?"
    },
    {
      id: "runny-nose",
      name: "Насморк",
      description: "Выделения из носа, заложенность носа",
      isUrgent: false,
      checked: false,
      aiPrompt: "Как лечить насморк у ребенка? Какие средства можно использовать?"
    },
    {
      id: "sore-throat",
      name: "Боль в горле",
      description: "Боль, першение или дискомфорт в горле",
      isUrgent: false,
      checked: false,
      aiPrompt: "Что делать при боли в горле у ребенка? Как облегчить симптомы?"
    },
    {
      id: "ear-pain",
      name: "Боль в ухе",
      description: "Боль, дискомфорт в ухе, ребенок трогает ухо",
      isUrgent: true,
      checked: false,
      aiPrompt: "Что делать при боли в ухе у ребенка? Когда это требует обращения к врачу?"
    },
    {
      id: "diarrhea",
      name: "Диарея",
      description: "Жидкий стул более 3 раз в день",
      isUrgent: true,
      checked: false,
      aiPrompt: "Что делать при диарее у ребенка? Как предотвратить обезвоживание?"
    },
    {
      id: "vomiting",
      name: "Рвота",
      description: "Рвота 1 или более раз",
      isUrgent: true,
      checked: false,
      aiPrompt: "Что делать при рвоте у ребенка? Когда это опасно?"
    }
  ]);

  const openChat = (question = "") => {
    setInitialQuestion(question);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setInitialQuestion("");
  };

  const toggleSymptom = (id: string) => {
    setSymptoms(symptoms.map(s => 
      s.id === id ? { ...s, checked: !s.checked } : s
    ));
  };

  const hasUrgentSymptoms = symptoms.some(s => s.checked && s.isUrgent);
  const hasAnySymptoms = symptoms.some(s => s.checked);
  const checkedSymptoms = symptoms.filter(s => s.checked);

  const getConsultation = () => {
    if (!hasAnySymptoms) return;
    
    let question = "У ребенка наблюдаются следующие симптомы: ";
    question += checkedSymptoms.map(s => s.name.toLowerCase()).join(", ");
    question += ". Что это может быть и что делать?";
    
    openChat(question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header openChat={openChat} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-medical-sber-green hover:text-medical-sber-darkGreen mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Симптомы</h1>
        </div>

        {/* Чек-лист симптомов */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Отметьте симптомы, которые наблюдаются у ребенка</CardTitle>
            <CardDescription>
              Это поможет получить персонализированную консультацию
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {symptoms.map((symptom) => (
                <div 
                  key={symptom.id} 
                  className={`p-4 border rounded-lg hover:shadow-sm transition-shadow ${
                    symptom.checked ? 'border-medical-sber-green bg-medical-sber-lightGreen bg-opacity-20' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={symptom.id}
                      checked={symptom.checked}
                      onCheckedChange={() => toggleSymptom(symptom.id)}
                      className={symptom.isUrgent ? "text-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white" : ""}
                    />
                    <div>
                      <label 
                        htmlFor={symptom.id} 
                        className="font-medium text-gray-800 flex items-center cursor-pointer"
                      >
                        {symptom.name}
                        {symptom.isUrgent && (
                          <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />
                        )}
                      </label>
                      <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                      {symptom.checked && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-medical-sber-green hover:text-medical-sber-darkGreen mt-1"
                          onClick={() => openChat(symptom.aiPrompt)}
                        >
                          Узнать больше об этом симптоме
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button 
                className="bg-medical-sber-green hover:bg-medical-sber-darkGreen w-full md:w-auto"
                onClick={getConsultation}
                disabled={!hasAnySymptoms}
              >
                Получить консультацию по симптомам
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Уведомление о срочной помощи */}
        {hasUrgentSymptoms && (
          <Card className="border-red-300 bg-red-50 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-700">Внимание! Возможно требуется срочная медицинская помощь</h3>
                  <p className="text-red-600 mt-1">
                    Некоторые из отмеченных симптомов могут требовать консультации врача. Рекомендуем обратиться к педиатру или вызвать скорую помощь.
                  </p>
                  <div className="flex space-x-3 mt-3">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Вызвать скорую помощь
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => openChat("Когда нужно вызывать скорую помощь ребенку?")}
                    >
                      Узнать больше
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Информационные карточки */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Инфекционные заболевания */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Thermometer className="h-5 w-5 mr-2 text-medical-sber-green" />
                Распространенные детские инфекции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-medical-sber-green flex-shrink-0 mt-0.5" />
                  <span>ОРВИ и грипп - насморк, кашель, температура</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-medical-sber-green flex-shrink-0 mt-0.5" />
                  <span>Ветрянка - характерная пузырчатая сыпь</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-medical-sber-green flex-shrink-0 mt-0.5" />
                  <span>Скарлатина - ангина, мелкоточечная сыпь</span>
                </li>
              </ul>
              <Button 
                className="mt-4 w-full bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                onClick={() => openChat("Расскажите о распространенных детских инфекционных заболеваниях и их симптомах")}
              >
                Узнать о других инфекциях
              </Button>
            </CardContent>
          </Card>

          {/* Когда обратиться к врачу */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-medical-sber-green" />
                Когда обратиться к врачу
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Info className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Температура выше 38.5°C, не снижающаяся после жаропонижающего</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Сыпь, которая не бледнеет при надавливании</span>
                </li>
                <li className="flex items-start">
                  <Info className="h-4 w-4 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Отказ от еды и питья более 8 часов</span>
                </li>
              </ul>
              <Button 
                className="mt-4 w-full bg-medical-sber-green hover:bg-medical-sber-darkGreen"
                onClick={() => openChat("В каких случаях нужно срочно обратиться к врачу при болезни ребенка?")}
              >
                Узнать больше
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      
      {/* Чат-бот */}
      <ChatBot isOpen={isChatOpen} onClose={closeChat} initialQuestion={initialQuestion} />
    </div>
  );
};

export default Symptoms;
