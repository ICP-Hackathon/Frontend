import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { Bookmark, Clock, MessageSquare } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const user = useUserStore((state) => state.user);

  // mock data
  const savedAIs = ["AI 1", "AI 2", "AI 3"];
  const aiHistory = ["History 1", "History 2", "History 3"];
  const chatHistory = ["Chat 1", "Chat 2", "Chat 3"];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>AI Chat Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <h3 className="mb-2 font-semibold">Saved AIs</h3>
          {savedAIs.map((ai, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start">
              <Bookmark className="mr-2 h-4 w-4" />
              {ai}
            </Button>
          ))}
        </div>
        <div className="py-4">
          <h3 className="mb-2 font-semibold">AI History</h3>
          {aiHistory.map((history, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              {history}
            </Button>
          ))}
        </div>
        <div className="py-4">
          <h3 className="mb-2 font-semibold">Chat History</h3>
          {chatHistory.map((chat, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              {chat}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;