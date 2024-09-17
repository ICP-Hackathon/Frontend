import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Card from "./Card";
import AIDetailsPopup from "./AIDetailsPopup";
import { CardData } from "@/utils/interface";
import { sliceAddress } from "@/utils/lib/address";
import { useState } from "react";

interface TodaySectionProps {
  isLoading: boolean;
  todayCards: CardData[] | null;
  setSelectedAI: (ai: CardData | null) => void;
}

const TodaySection: React.FC<TodaySectionProps> = ({
  isLoading,
  todayCards,
  setSelectedAI,
}) => {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null); // Track open dialog by card ID

  return (
    <section className="mb-6 scrollbar-hide">
      <h2 className="text-lg font-bold mb-4">Today</h2>
      <div className="grid grid-cols-2 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          todayCards?.map((item: CardData) => (
            <Dialog
              key={item.id}
              onOpenChange={(open) => {
                setOpenDialogId(open ? item.id : null); // Track open state by card ID
                setSelectedAI(open ? item : null);
              }}
            >
              <DialogTrigger asChild>
                <div>
                  <Card
                    ai_id={item.ai_id}
                    name={item.name}
                    creator={sliceAddress(item.creator_address)}
                  />
                </div>
              </DialogTrigger>

              {openDialogId === item.id && (
                <DialogContent>
                  {/* AIDetailsPopup will only render when the corresponding Dialog is open */}
                  <AIDetailsPopup
                    id={item.ai_id}
                    name={sliceAddress(item.creator_address)}
                  />
                </DialogContent>
              )}
            </Dialog>
          ))
        )}
      </div>
    </section>
  );
};

export default TodaySection;
