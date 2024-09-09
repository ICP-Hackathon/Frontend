import { fetchSearchAIs } from "@/utils/api/ai";
import React, { useEffect, useState } from "react";

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debouncing: 입력이 멈춘 후 500ms 동안 아무 변화가 없으면 debouncedQuery 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms 대기 시간

    return () => {
      clearTimeout(handler); // 타이머 초기화 (입력이 계속 진행되면 이전 타이머 취소)
    };
  }, [searchQuery]);

  // debouncedQuery가 변경되면 서버에 요청을 보냄
  useEffect(() => {
    if (debouncedQuery) {
      const searchAIs = async () => {
        try {
          const data = await fetchSearchAIs(debouncedQuery);
          setResults(data);
        } catch (error) {
          setError(
            error instanceof Error ? error.message : "An unknown error occurred"
          );
        } finally {
          setIsLoading(false);
        }
      };

      searchAIs();
    }
  }, [debouncedQuery]);

  console.log(results);

  return (
    <div>
      <input
        type="text"
        placeholder="Search your best-fit AI"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="sticky w-full min-h-[60px] max-h-[60px] bg-white">
        {isLoading ? (
          <p className="m-auto text-center py-5">Loading...</p>
        ) : (
          <div>
            {results.ais.map(
              (item: any, index: React.Key | null | undefined) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <h3>{item.name}</h3>
                  <p>Creator: {item.creator}</p>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
