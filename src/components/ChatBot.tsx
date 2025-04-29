
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, RotateCw, XCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const ChatBot = ({ isOpen, onClose, initialQuestion = "" }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравствуйте! Я - AI-ассистент для родителей. Чем я могу вам помочь?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState(initialQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<number>(0);

  useEffect(() => {
    // Прокрутка вниз при новых сообщениях
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Если есть initialQuestion, отправляем его автоматически
  useEffect(() => {
    if (initialQuestion && isOpen) {
      setInput(initialQuestion);
      setTimeout(() => {
        handleSend();
      }, 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion, isOpen]);

  // Получение токена для ГигаЧата
  const getGigaChatToken = async () => {
    // Проверяем, есть ли действующий токен
    const currentTime = Date.now();
    if (accessToken && tokenExpiry > currentTime) {
      return accessToken;
    }

    try {
      // В реальном приложении эти запросы должны выполняться через backend
      // Это упрощенная имитация для демонстрации
      console.log("Получение нового токена для ГигаЧата...");
      
      // Имитация ответа API
      const mockToken = "mock_token_" + Math.random().toString(36).substring(2);
      // Устанавливаем срок действия токена на 1 час
      const expiryTime = currentTime + 3600000;
      
      setAccessToken(mockToken);
      setTokenExpiry(expiryTime);
      
      return mockToken;
    } catch (error) {
      console.error("Ошибка при получении токена:", error);
      return null;
    }
  };

  // Отправка запроса к ГигаЧату
  const sendToGigaChat = async (userMessage: string) => {
    try {
      const token = await getGigaChatToken();
      if (!token) {
        throw new Error("Не удалось получить токен");
      }

      // В реальном приложении здесь был бы запрос к API ГигаЧата
      console.log(`Отправка запроса к ГигаЧату: ${userMessage}`);
      
      // Имитация задержки ответа
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Имитация ответов от ГигаЧата
      const aiResponses = [
        "Рекомендуемый возраст для первой прививки АКДС - 3 месяца. Следующие дозы вводятся в 4.5 и 6 месяцев.",
        "Нормальная температура тела у детей обычно колеблется от 36.6°C до 37.3°C. Температура выше 38°C считается повышенной.",
        "Для ребенка 2 лет нормальный рост составляет 85-96 см, а вес - 11-15 кг. Показатели могут варьироваться в зависимости от индивидуальных особенностей.",
        "При появлении сыпи у ребенка стоит обратить внимание на ее характер, распространение и сопутствующие симптомы. В случае высокой температуры или плохого самочувствия рекомендуется обратиться к врачу.",
        "Сбалансированное питание для детей должно включать белки, жиры, углеводы, витамины и минералы. Важно обеспечить разнообразный рацион с овощами, фруктами, цельнозерновыми продуктами, молочными продуктами и источниками белка.",
        "У детей в возрасте 3 лет норма сна составляет 10-13 часов в сутки, включая дневной сон. Регулярный режим сна помогает укрепить иммунитет и способствует правильному развитию."
      ];
      
      // Персонализированные ответы на конкретные вопросы
      let response = "";
      if (userMessage.toLowerCase().includes("прививк")) {
        response = "Календарь прививок для детей включает вакцинацию против гепатита B, полиомиелита, коклюша, дифтерии, столбняка, кори, краснухи и паротита. Важно соблюдать рекомендованные сроки вакцинации для формирования надежного иммунитета.";
      } else if (userMessage.toLowerCase().includes("температур")) {
        response = "При высокой температуре у ребенка (выше 38°C) можно дать жаропонижающее средство на основе парацетамола или ибупрофена в возрастной дозировке. Важно обеспечить обильное питье и не кутать ребенка. Если температура держится более 3 дней или сопровождается тревожными симптомами, обратитесь к врачу.";
      } else if (userMessage.toLowerCase().includes("кашл")) {
        response = "При кашле у ребенка стоит обратиться к врачу, если он сопровождается затруднением дыхания, свистящими хрипами, высокой температурой, или если кашель длится более недели. До консультации с врачом обеспечьте влажность в помещении и обильное питье.";
      } else {
        // Случайный ответ для других вопросов
        response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      }
      
      return response;
    } catch (error) {
      console.error("Ошибка при отправке запроса к ГигаЧату:", error);
      return "Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте еще раз.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    
    const userInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // Отправляем запрос к ГигаЧату
      const response = await sendToGigaChat(userInput);
      
      // Добавляем ответ от ГигаЧата
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Ошибка:", error);
      // Добавляем сообщение об ошибке
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar className="bg-medical-sber-green text-white">
                <span className="font-bold">AI</span>
              </Avatar>
              <CardTitle>Медицинский Ассистент</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0 flex flex-col">
          <ScrollArea className="flex-grow p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isUser
                      ? "bg-medical-sber-green text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none max-w-[80%] p-3">
                  <div className="flex items-center">
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    <p className="text-sm">Печатает...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Введите ваш вопрос..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-grow"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-medical-sber-green hover:bg-medical-sber-darkGreen"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ассистент может предоставить общую информацию, но не заменяет консультацию врача
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
