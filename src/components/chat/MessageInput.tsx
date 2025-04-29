import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Info } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex space-x-2">
        <Input
          placeholder="Введите ваш вопрос..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-grow rounded-full border-primary-100 focus:border-primary focus:ring-primary"
        />
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="giga-gradient rounded-full h-10 w-10 hover:opacity-90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <DisclaimerNote />
    </div>
  );
};

const DisclaimerNote = () => (
  <div className="mt-3 flex items-start">
    <Info className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
    <p className="text-xs text-gray-500">
      Ассистент предоставляет общую информацию, но не заменяет консультацию врача. 
      Ваша переписка сохраняется только в рамках текущей сессии.
    </p>
  </div>
);

export default MessageInput;
