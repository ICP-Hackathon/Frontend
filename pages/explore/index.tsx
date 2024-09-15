import { useState } from "react";
import { Heart } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"; // Import dialog components

interface CardData {
  id: number;
  name: string;
  creator: string;
}

type CategoryKey =
  | "all"
  | "education"
  | "health & fitness"
  | "entertainment"
  | "social networking"
  | "business"
  | "developer tools"
  | "graphics & design";

// Mock data for the Explore page
const mockData: Record<CategoryKey, CardData[]> = {
  all: [
    { id: 1, name: "Math Tutor", creator: "Creator Name" },
    { id: 2, name: "Science Helper", creator: "Creator Name" },
    { id: 3, name: "Workout Planner", creator: "Creator Name" },
    { id: 4, name: "Diet Assistant", creator: "Creator Name" },
    { id: 5, name: "Movie Recommender", creator: "Creator Name" },
    { id: 6, name: "Music Finder", creator: "Creator Name" },
    { id: 7, name: "Friend Finder", creator: "Creator Name" },
    { id: 8, name: "Group Connector", creator: "Creator Name" },
    { id: 9, name: "Business Plan Creator", creator: "Creator Name" },
    { id: 10, name: "Marketing AI", creator: "Creator Name" },
  ],
  education: [
    { id: 1, name: "Math Tutor", creator: "Creator Name" },
    { id: 2, name: "Science Helper", creator: "Creator Name" },
  ],
  "health & fitness": [
    { id: 3, name: "Workout Planner", creator: "Creator Name" },
    { id: 4, name: "Diet Assistant", creator: "Creator Name" },
  ],
  entertainment: [
    { id: 5, name: "Movie Recommender", creator: "Creator Name" },
    { id: 6, name: "Music Finder", creator: "Creator Name" },
  ],
  "social networking": [
    { id: 7, name: "Friend Finder", creator: "Creator Name" },
    { id: 8, name: "Group Connector", creator: "Creator Name" },
  ],
  business: [
    { id: 9, name: "Business Plan Creator", creator: "Creator Name" },
    { id: 10, name: "Marketing AI", creator: "Creator Name" },
  ],
  "developer tools": [
    { id: 11, name: "Code Assistant", creator: "Creator Name" },
    { id: 12, name: "Debug Helper", creator: "Creator Name" },
  ],
  "graphics & design": [
    { id: 13, name: "Logo Designer", creator: "Creator Name" },
    { id: 14, name: "UI Mockup Creator", creator: "Creator Name" },
  ],
};

interface CardProps {
  name: string;
  creator: string;
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
const AIDetailsPopup = ({ ai }: { ai: CardData }) => {
  return (
    <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-primary-900 text-center">
          {ai.name}
        </h2>
        <p className="text-gray-500 text-center">Created by {ai.creator}</p>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 text-sm">
            Details about {ai.name} will go here...
          </p>
        </div>
      </div>
    </DialogContent>
  );
};

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedAI, setSelectedAI] = useState<CardData | null>(null); // Track selected AI for dialog

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
    const todayCards = mockData.all.slice(0, 4); // Show the first 4 cards in "Today"
    return (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-4">Today</h2>
        <div className="grid grid-cols-2 gap-4">
          {todayCards.map((item: CardData) => (
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
              {selectedAI && <AIDetailsPopup ai={selectedAI} />}
            </Dialog>
          ))}
        </div>
      </section>
    );
  };

  const renderRecentSection = () => {
    const recentCards = mockData.all.slice(4, 10); // Show up to 6 cards in "Recent"
    return (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-4">Recent</h2>
        <div className="grid grid-cols-2 gap-4">
          {recentCards.map((item: CardData) => (
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
              {selectedAI && <AIDetailsPopup ai={selectedAI} />}
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

    const cards = mockData[selectedCategory] || [];

    return (
      <div className="grid grid-cols-2 gap-4">
        {cards.map((item: CardData) => (
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
            {selectedAI && <AIDetailsPopup ai={selectedAI} />}
          </Dialog>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 pb-16">
      <div className="flex space-x-2 overflow-x-auto mb-6 whitespace-nowrap">
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

      {/* Render Cards */}
      {renderCards()}
    </div>
  );
}
