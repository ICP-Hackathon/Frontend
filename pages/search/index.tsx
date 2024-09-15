import Search from "@/components/Search";
import { AICard } from "@/components/search/AICard";
import { AICardProps } from "@/utils/interface";
import { Plus } from "lucide-react";

// Mock data
const mockAIs: AICardProps[] = [
  {
    id: "1",
    name: "AI Assistant 1",
    creator: "Creator 1",
    category: "General",
    introductions: "A helpful AI assistant",
    imageSrc: "/api/placeholder/50/50",
  },
  {
    id: "2",
    name: "AI Helper 2",
    creator: "Creator 2",
    category: "Productivity",
    introductions: "An AI to boost your productivity",
    imageSrc: "/api/placeholder/50/50",
  },
  {
    id: "3",
    name: "AI Buddy 3",
    creator: "Creator 3",
    category: "Entertainment",
    introductions: "Your AI companion for fun",
    imageSrc: "/api/placeholder/50/50",
  },
];

export default function SearchPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Search />
      </div>
      <div className="flex-grow overflow-y-auto mb-16">
        {mockAIs.map((item) => (
          <AICard
            key={item.id}
            id={item.id}
            name={item.name}
            creator={item.creator}
            category={item.category}
            introductions={item.introductions}
          />
        ))}
      </div>
      <div className="fixed bottom-16 left-0 right-0 px-4 mb-4 max-w-[600px] mx-auto">
        <button className="w-full py-4 bg-primary-50 text-primary-900 hover:bg-primary-700 rounded-full hover:bg-primary flex items-center justify-center">
          <Plus className="mr-4" size={24} />
          Create Custom AI
        </button>
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
