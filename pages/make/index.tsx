import { useState } from "react";
import { useRouter } from "next/router";
import { createAI } from "@/utils/api/ai";
import { UserState, useUserStore } from "@/store/userStore";

const categories: string[] = [
  "Education",
  "Health & Fitness",
  "Entertainment",
  "Social networking",
  "Business",
  "Developer tools",
  "Graphics & Design",
];

export default function MakeCustomAIPage() {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [introduction, setIntroduction] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const user = useUserStore((state: UserState) => state.user);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!user) {
      setError("User not logged in");
      setIsLoading(false);
      return;
    }

    const payload = {
      name,
      creator: user.userid,
      category: selectedCategory,
      introductions: introduction,
      contents: content,
      logs: comments,
    };

    try {
      const data = await createAI(payload);
      window.alert("AI created successfully!");
      router.push("/home");
    } catch (err) {
      console.error("Error creating AI:", err);
      setError("AI 생성 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 mx-auto max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full"
      >
        {/* AI Name */}
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center text-white">
              <span className="text-2xl">+</span>
            </div>
          </div>
          <label htmlFor="name" className="block text-lg font-bold mb-2">
            AI Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
            placeholder="Name your AI"
            required
          />
        </div>

        {/* Categories */}
        <div className="mb-6 text-center">
          <label className="block text-lg font-bold mb-4">Categories</label>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-green-400 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-6">
          <label
            htmlFor="introduction"
            className="block text-lg font-bold mb-2"
          >
            Introduction
          </label>
          <textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
            rows={2}
            placeholder="Add a short description"
            required
          />
        </div>

        {/* RAG (Content) */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-bold mb-2">
            RAG
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
            rows={3}
            placeholder="Things to learn"
          />
        </div>

        {/* Comments */}
        <div className="mb-6">
          <label htmlFor="comments" className="block text-lg font-bold mb-2">
            Comments
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-400"
            rows={1}
            placeholder="Update Comments"
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-6">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-green-400 text-white rounded-full font-semibold hover:bg-green-500 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Make Custom AI",
    },
  };
}
