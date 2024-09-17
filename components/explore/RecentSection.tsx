import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Card from "./Card";
import AIDetailsPopup from "./AIDetailsPopup";
import { CardData } from "@/utils/interface";
import { sliceAddress } from "@/utils/lib/address";
import { useState } from "react";

interface RecentSectionProps {
  title: string;
  trendCards: CardData[] | null;
  setSelectedAI: (ai: CardData | null) => void;
}

const RecentSection: React.FC<RecentSectionProps> = ({
  title,
  trendCards,
  setSelectedAI,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Manage Dialog open state

  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {trendCards?.map((item: CardData) => (
          <Dialog
            key={item.id}
            onOpenChange={(open) => {
              setIsOpen(open); // Track whether the Dialog is open or not
              setSelectedAI(open ? item : null); // Only set selected AI if open
            }}
          >
            <DialogTrigger asChild>
              <div>
                <Card
                  name={item.name}
                  creator={sliceAddress(item.creator_address)}
                />
              </div>
            </DialogTrigger>

            {isOpen && (
              <DialogContent>
                {/* AIDetailsPopup will only render when Dialog is open */}
                <AIDetailsPopup
                  id={item.ai_id}
                  name={sliceAddress(item.creator_address)}
                />
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
    </section>
  );
};

export default RecentSection;
