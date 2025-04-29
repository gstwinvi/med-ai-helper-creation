import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { sendMessage, clearConversation } from "@/services/gigaChatService";

export const useChat = (initialQuestion = "") => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравствуйте! Я — виртуальный ассистент SHealth. Чем я могу вам помочь?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(`session_${Date.now()}`);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(text, sessionId);
      
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

  return {
    messages,
    isLoading,
    sendMessage: handleSendMessage,
    resetConversation
  };
};
