import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChatHeader from "./chat/ChatHeader";
import MessageList from "./chat/MessageList";
import MessageInput from "./chat/MessageInput";
import { useChat } from "@/hooks/useChat";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const ChatBot = ({ isOpen, onClose, initialQuestion = "" }: ChatBotProps) => {
  const { messages, isLoading, sendMessage, resetConversation } = useChat(initialQuestion);

  useEffect(() => {
    if (initialQuestion && isOpen) {
      sendMessage(initialQuestion);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <Card className="w-full max-w-2xl h-[80vh] max-h-[700px] flex flex-col shadow-xl border-0">
        <ChatHeader 
          onReset={resetConversation}
          onClose={onClose}
        />
        <CardContent className="flex-grow overflow-hidden p-0 flex flex-col bg-[#f5f6fb]">
          <MessageList 
            messages={messages}
            isLoading={isLoading}
          />
          <MessageInput 
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
