
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, RotateCw, RefreshCw, MessageSquareText, Info } from "lucide-react";
import { sendMessage, clearConversation } from "@/services/gigaChatService";

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
      text: "Здравствуйте! Я - медицинский ассистент на базе GigaChat. Чем я могу вам помочь?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState(initialQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(`session_${Date.now()}`);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialQuestion && isOpen) {
      setInput(initialQuestion);
      setTimeout(() => {
        handleSend();
      }, 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

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
      const response = await sendMessage(userInput, sessionId);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Ошибка:", error);
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

  const resetConversation = async () => {
    await clearConversation(sessionId);
    const newSessionId = `session_${Date.now()}`;
    setSessionId(newSessionId);
    setMessages([
      {
        id: Date.now().toString(),
        text: "Начат новый разговор. Чем я могу вам помочь?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-2xl h-[80vh] max-h-[700px] flex flex-col shadow-xl border-0">
        <CardHeader className="border-b bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-t-lg p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar className="bg-white h-10 w-10">
                <span className="text-[#6750A4] font-bold">G</span>
              </Avatar>
              <div>
                <h2 className="font-bold text-white text-lg">GigaChat</h2>
                <p className="text-white text-opacity-90 text-sm">Медицинский ассистент</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white hover:bg-opacity-20" 
                onClick={resetConversation}>
                <RefreshCw className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white hover:bg-opacity-20" 
                onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0 flex flex-col">
          <ScrollArea className="flex-grow p-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-6 ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isUser && (
                  <Avatar className="h-8 w-8 mr-3 bg-[#E6E0FA] flex-shrink-0">
                    <span className="text-[#6750A4] font-bold text-sm">G</span>
                  </Avatar>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.isUser
                      ? "bg-[#6750A4] text-white"
                      : "bg-[#F5EFFE] text-[#1A1F2C]"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: "2-digit", 
                      minute: "2-digit" 
                    })}
                  </p>
                </div>
                {message.isUser && (
                  <Avatar className="h-8 w-8 ml-3 bg-[#F2FCE2] flex-shrink-0">
                    <span className="text-[#6750A4] font-bold text-sm">Я</span>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-6">
                <Avatar className="h-8 w-8 mr-3 bg-[#E6E0FA] flex-shrink-0">
                  <span className="text-[#6750A4] font-bold text-sm">G</span>
                </Avatar>
                <div className="bg-[#F5EFFE] text-[#1A1F2C] rounded-2xl p-4 max-w-[85%]">
                  <div className="flex items-center">
                    <RotateCw className="h-4 w-4 mr-2 animate-spin text-[#6750A4]" />
                    <p className="text-sm">GigaChat обрабатывает ваш запрос...</p>
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
                className="flex-grow rounded-full border-[#D6BCFA] focus:border-[#6750A4] focus:ring-[#6750A4]"
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-[#6750A4] hover:bg-[#4F378B] rounded-full h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex items-start">
              <Info className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500">
                Ассистент предоставляет общую информацию, но не заменяет консультацию врача. 
                Ваша переписка не сохраняется после завершения сессии.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
