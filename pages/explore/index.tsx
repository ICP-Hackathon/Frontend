import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"; // Import dialog components
import {
  fetchAIDetails,
  fetchTodayAIs,
  fetchTrendingAIs,
} from "@/utils/api/ai";
import { CardData } from "@/utils/interface";

type CategoryKey =
  | "all"
  | "education"
  | "health & fitness"
  | "entertainment"
  | "social networking"
  | "business"
  | "developer tools"
  | "graphics & design";

interface CardProps {
  name: string;
  creator: string;
}

interface AIDetailsProp {
  id: string;
  name: string;
}

// Card component that shows individual AI info and is clickable to open a dialog
const Card: React.FC<CardProps> = ({ name, creator }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md relative">
      <div className="bg-primary-900 rounded-md size-14 mb-4"></div>
      <h3 className="text-sm font-semibold">{name}</h3>
      <p className="text-xs text-gray-500">{creator}</p>
      <button className="absolute top-2 right-2 text-gray-700">
        <Heart size={16} />
      </button>
    </div>
  );
};

// Details Popup for the AI card
const AIDetailsPopup = ({ id, name }: AIDetailsProp) => {
  const [aiDetail, setAIDetail] = useState<any>();
  const [detailLoading, setDetailLoading] = useState(true);
  useEffect(() => {
    const loadAIModels = async () => {
      try {
        const data = await fetchAIDetails(id);
        console.log(data);
        setAIDetail(data);
        setDetailLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadAIModels();
  }, []);
  return (
    <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto ">
      {detailLoading ? (
        <div></div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="inline-block px-3 py-1 bg-primary-50 text-primary-900 rounded-full text-sm">
              {aiDetail.category}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary-900 text-center">
            {aiDetail.name}
          </h2>
          <p className="text-gray-500 text-center">Created by {name}</p>
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-700 text-sm">{aiDetail.introductions}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-gray-700 border-b">RAG</h3>
            <p className="text-sm text-gray-600">
              RAG information here...RAG information here...RAG information
              here...RAG information here...RAG information here...RAG
              information here...RAG information here...RAG information here...
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-gray-700 border-b">Comment</h3>
            <p className="text-sm text-gray-600">Comments here...</p>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedAI, setSelectedAI] = useState<CardData | null>(null); // Track selected AI for dialog
  const [todayCards, setTodayCards] = useState<CardData[] | null>(null);
  const [trendCards, setTrendCards] = useState<CardData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadAIModels = async () => {
      try {
        const Todaydata = await fetchTodayAIs();
        setTodayCards(Todaydata.ais);
        const Trenddata = await fetchTrendingAIs(selectedCategory, 0, 10);
        setTrendCards(Trenddata.ais);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadAIModels();
  }, []);

  useEffect(() => {
    const loadAIModels = async () => {
      try {
        const Trenddata = await fetchTrendingAIs(selectedCategory, 0, 10);
        setTrendCards(Trenddata.ais);
      } catch (error) {
        console.error(error);
      }
    };
    loadAIModels();
  }, [selectedCategory]);

  const categories: string[] = [
    "All",
    "Education",
    "Health & Fitness",
    "Entertainment",
    "Social networking",
    "Business",
    "Developer tools",
    "Graphics & Design",
  ];

  const renderTodaySection = () => {
    return (
      <section className="mb-6 scrollbar-hide">
        <h2 className="text-lg font-bold mb-4">Today</h2>
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <div></div>
          ) : (
            todayCards?.map((item: CardData) => (
              <Dialog
                key={item.id}
                onOpenChange={(open) =>
                  open ? setSelectedAI(item) : setSelectedAI(null)
                }
              >
                <DialogTrigger asChild>
                  <div>
                    <Card name={item.name} creator={item.creator} />
                  </div>
                </DialogTrigger>
                {selectedAI && (
                  <AIDetailsPopup id={item.ai_id} name={item.creator} />
                )}
              </Dialog>
            ))
          )}
        </div>
      </section>
    );
  };

  const renderRecentSection = () => {
    return (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-4">Recent</h2>
        <div className="grid grid-cols-2 gap-4">
          {trendCards?.map((item: CardData) => (
            <Dialog
              key={item.id}
              onOpenChange={(open) =>
                open ? setSelectedAI(item) : setSelectedAI(null)
              }
            >
              <DialogTrigger asChild>
                <div>
                  <Card name={item.name} creator={item.creator} />
                </div>
              </DialogTrigger>
              {selectedAI && (
                <AIDetailsPopup id={item.ai_id} name={item.creator} />
              )}
            </Dialog>
          ))}
        </div>
      </section>
    );
  };

  const renderCards = () => {
    if (selectedCategory === "all") {
      return (
        <>
          {renderTodaySection()}
          {renderRecentSection()}
        </>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4">
        {trendCards?.map((item: CardData) => (
          <Dialog
            key={item.id}
            onOpenChange={(open) =>
              open ? setSelectedAI(item) : setSelectedAI(null)
            }
          >
            <DialogTrigger asChild>
              <div>
                <Card name={item.name} creator={item.creator} />
              </div>
            </DialogTrigger>
            {selectedAI && (
              <AIDetailsPopup id={item.ai_id} name={item.creator} />
            )}
          </Dialog>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 pb-16 ">
      <div className="flex space-x-2 overflow-x-auto mb-6 whitespace-nowrap scrollbar-hide">
        {categories.map((category) => {
          const categoryKey = category
            .toLowerCase()
            .replace(/ & /g, " ")
            .replace(/ /g, "-") as CategoryKey;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(categoryKey)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === categoryKey
                  ? "bg-primary-900 text-white"
                  : "bg-white text-primary-900 border border-primary-900"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {renderCards()}
    </div>
  );
}
export async function getStaticProps() {
  return {
    props: {
      title: "Explore",
    },
  };
}
