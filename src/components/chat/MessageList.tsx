import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { RotateCw } from "lucide-react";
import { Message } from "@/types/chat";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-grow p-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-6 ${
            message.isUser ? "justify-end" : "justify-start"
          }`}
        >
          {!message.isUser && (
            <Avatar className="h-8 w-8 mr-3 flex-shrink-0 giga-gradient">
              <div className="h-full w-full flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
            </Avatar>
          )}
          <div
            className={`max-w-[85%] rounded-2xl p-4 ${
              message.isUser
                ? "bg-primary text-white"
                : "bg-white text-gray-800 shadow-sm"
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
            <Avatar className="h-8 w-8 ml-3 bg-primary-100 flex-shrink-0">
              <span className="text-primary font-bold text-sm">Я</span>
            </Avatar>
          )}
        </div>
      ))}
      {isLoading && <LoadingMessage />}
      <div ref={bottomRef} />
    </ScrollArea>
  );
};

const LoadingMessage = () => (
  <div className="flex justify-start mb-6">
    <Avatar className="h-8 w-8 mr-3 flex-shrink-0 giga-gradient">
      <div className="h-full w-full flex items-center justify-center text-white font-bold text-sm">
        S
      </div>
    </Avatar>
    <div className="bg-white text-gray-800 rounded-2xl p-4 max-w-[85%] shadow-sm">
      <div className="flex items-center">
        <RotateCw className="h-4 w-4 mr-2 animate-spin text-primary" />
        <p className="text-sm">SHealth обрабатывает ваш запрос...</p>
      </div>
    </div>
  </div>
);

export default MessageList;
