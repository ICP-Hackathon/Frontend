import React, { useState, useEffect } from "react";
import AICard from "@/components/AICard";
import Link from "next/link";
import { fetchTopAIs } from "@/utils/api/ai";
import { AIModel } from "@/utils/interface";
import Search from "@/components/Search";
import ItemsCarousel from "react-items-carousel";

export default function HomePage() {
  const [aiCards, setAiCards] = useState<AIModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const carouselInterval = 5000; // 5초마다 자동으로 넘김

  useEffect(() => {
    const loadAiCards = async () => {
      try {
        const data = await fetchTopAIs();
        setAiCards(data.ais);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAiCards();
  }, []);

  // 자동으로 Carousel 넘기기 위한 useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex((prevIndex) => {
        // 마지막 카드에 도달하면 멈춤
        if (prevIndex === aiCards.length - 1) {
          clearInterval(interval); // Interval 클리어하여 자동 진행 멈춤
          return prevIndex; // 현재 인덱스 유지 (더 이상 증가하지 않음)
        } else {
          return prevIndex + 1; // 다음 인덱스로 이동
        }
      });
    }, carouselInterval);

    return () => {
      clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    };
  }, [aiCards.length]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="py-6">
          <Search />
        </div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Trending AIs</h3>
          <Link
            href="/ai"
            className="bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition"
          >
            Explore
          </Link>
        </div>

        <div>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : aiCards.length > 0 ? (
            <div>
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={1} // 보여줄 카드 개수
                gutter={30}
                infiniteLoop={true}
              >
                {aiCards.map((item) => (
                  <AICard
                    key={item.id} // 고유 key 설정
                    id={item.id}
                    name={item.name}
                    creator={item.creator}
                    category={item.category}
                    introductions={item.introductions}
                  />
                ))}
              </ItemsCarousel>
            </div>
          ) : (
            <p>No AI cards available</p>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-y-10 mb-20">
        <h2 className="text-3xl font-bold text-center">
          Looking for <br /> anything else?
        </h2>
        <Link
          href="/make"
          className="w-full max-w-md bg-gray-800 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-600 transition flex items-center justify-center"
        >
          Make your Custom AI!
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  };
}
