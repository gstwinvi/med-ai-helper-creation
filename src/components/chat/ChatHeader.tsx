import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RefreshCw, X } from "lucide-react";

interface ChatHeaderProps {
  onReset: () => void;
  onClose: () => void;
}

const ChatHeader = ({ onReset, onClose }: ChatHeaderProps) => {
  return (
    <div className="border-b giga-gradient rounded-t-lg p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-white bg-opacity-20">
            <div className="h-full w-full flex items-center justify-center text-white font-bold">
              S
            </div>
          </Avatar>
          <div>
            <h2 className="font-bold text-white text-lg">SHealth</h2>
            <p className="text-white text-opacity-90 text-sm">Медицинский ассистент</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white hover:bg-opacity-20" 
            onClick={onReset}
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white hover:bg-opacity-20" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
