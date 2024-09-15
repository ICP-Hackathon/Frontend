import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Card from './Card';
import AIDetailsPopup from './AIDetailsPopup';
import { CardData } from "@/utils/interface";

interface TodaySectionProps {
  isLoading: boolean;
  todayCards: CardData[] | null;
  setSelectedAI: (ai: CardData | null) => void;
}

const TodaySection: React.FC<TodaySectionProps> = ({ isLoading, todayCards, setSelectedAI }) => {
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
              onOpenChange={(open) => open ? setSelectedAI(item) : setSelectedAI(null)}
            >
              <DialogTrigger asChild>
                <div>
                  <Card name={item.name} creator={item.creator} />
                </div>
              </DialogTrigger>
              <AIDetailsPopup id={item.ai_id} name={item.creator} />
            </Dialog>
          ))
        )}
      </div>
    </section>
  );
};

export default TodaySection;