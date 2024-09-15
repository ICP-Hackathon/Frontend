import Search from "@/components/Search";
import { AICard } from "@/components/search/AICard";
import { AICardProps } from "@/utils/interface";
import CreateCustomAISheet from "@/components/MakeAI";
import { useEffect, useState } from "react";
import { CardData } from "@/utils/interface";
import { fetchTodayAIs } from "@/utils/api/ai";

export default function SearchPage() {
  const [todayCards, setTodayCards] = useState<CardData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAIModels = async () => {
      try {
        const Todaydata = await fetchTodayAIs();
        setTodayCards(Todaydata.ais);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Ensure loading state is updated on error
      }
    };
    loadAIModels();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="mt-2 mb-4">
        <Search />
      </div>
      <div className="flex-grow overflow-y-auto mb-16">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          todayCards &&
          todayCards.map((item) => (
            <AICard
              key={item.ai_id}
              id={item.ai_id}
              name={item.name}
              creator={item.creator}
              category={item.category}
              introductions={item.introductions}
            />
          ))
        )}
      </div>
      <div className="fixed bottom-16 left-0 right-0 px-4 mb-4 max-w-[600px] mx-auto">
        <CreateCustomAISheet />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Search",
    },
  };
}
