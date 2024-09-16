import { useEffect, useState } from "react";
import { fetchTodayAIs, fetchTrendingAIs } from "@/utils/api/ai";
import { CardData } from "@/utils/interface";
import CategorySelector, { CategoryKey } from "@/components/explore/CategorySelector";
import TodaySection from "@/components/explore/TodaySection";
import RecentSection from "@/components/explore/RecentSection";

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

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedAI, setSelectedAI] = useState<CardData | null>(null);
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
        setIsLoading(false);
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

  return (
    <div className="p-4 pb-16">
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory === "all" ? (
        <>
          <TodaySection
            isLoading={isLoading}
            todayCards={todayCards}
            setSelectedAI={setSelectedAI}
          />
          <RecentSection
            title = {"Recent"}
            trendCards={trendCards}
            setSelectedAI={setSelectedAI}
          />
        </>
      ) : (
        <RecentSection title={selectedCategory} trendCards={trendCards} setSelectedAI={setSelectedAI} />
      )}
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
