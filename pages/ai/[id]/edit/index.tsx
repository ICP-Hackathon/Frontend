import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Camera, Plus } from "lucide-react";
import { useWallet } from "@suiet/wallet-kit";
import { fetchAIDetails, updateAI } from "@/utils/api/ai";

type CategoryKey =
  | "education"
  | "health & fitness"
  | "entertainment"
  | "social networking"
  | "business"
  | "developer tools"
  | "graphics & design"
  | "others";

const EditAIPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const wallet = useWallet();

  const [aiData, setAIData] = useState({
    name: "",
    category: "others" as CategoryKey,
    introductions: "",
    contents: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AI 데이터 로드 함수
  useEffect(() => {
    const loadAIData = async () => {
      if (id && typeof id === "string") {
        try {
          setLoading(true);
          const fetchedAIData = await fetchAIDetails(id);
          setAIData({
            name: fetchedAIData.name,
            category: fetchedAIData.category as CategoryKey,
            introductions: fetchedAIData.introductions,
            contents: fetchedAIData.contents,
            image_url: fetchedAIData.image_url,
          });
        } catch (error) {
          console.error("Error fetching AI data:", error);
          setError("Failed to load AI data. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    // id가 정의되어 있을 때만 데이터를 로드
    if (id) {
      loadAIData();
    }
  }, [id]);

  // 입력값 처리 함수
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setAIData((prevData) => ({
      ...prevData,
      [name]: name === "name" ? value.replace(/\s+/g, "_") : value,
    }));
  };

  const handleCategoryChange = (category: CategoryKey) => {
    setAIData((prevData) => ({ ...prevData, category }));
  };

  // AI 업데이트 함수
  const handleUpdate = async () => {
    setUpdateLoading(true);

    if (!id || typeof id !== "string" || !wallet.address) {
      console.error("Missing AI ID or wallet address");
      setUpdateLoading(false);
      return;
    }

    const updatedAIData = {
      ai_id: id,
      user_address: wallet.address,
      ...aiData,
      comments: "UpdatedAI",
    };

    try {
      const res = await updateAI(updatedAIData);
      console.log("AI Updated successfully", res);
      router.push("/mypage");
    } catch (error) {
      console.error("Error updating AI:", error);
      setError("Failed to update AI. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const categories: string[] = [
    "Education",
    "Health & Fitness",
    "Entertainment",
    "Social networking",
    "Business",
    "Developer tools",
    "Graphics & Design",
    "Others",
  ];

  if (loading) {
    return <div>Loading AI data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-2 max-w-md mx-auto">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative size-20 bg-primary-900 rounded-full overflow-hidden">
            {aiData.image_url ? (
              <img
                src={aiData.image_url}
                alt="AI"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <input
                  type="file"
                  id="ai-image"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    // Handle image upload
                  }}
                />
                <label
                  htmlFor="ai-image"
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <Plus size={32} className="text-white" />
                </label>
              </>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            AI Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={aiData.name}
            className="w-full p-2 border-b border-gray-300 focus:border-primary-900 focus:outline-none"
            placeholder="Name your AI"
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const categoryKey = category
                .toLowerCase()
                .replace(/ & /g, " ")
                .replace(/ /g, "-") as CategoryKey;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(categoryKey)}
                  className={`px-4 py-2 rounded-full ${
                    aiData.category === categoryKey
                      ? "bg-primary-900 text-white"
                      : "bg-white text-primary-900 border border-primary-900"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg border py-2 px-4">
            <h3 className="font-semibold mb-2 pb-2 border-b">Introduction</h3>
            <textarea
              name="introductions"
              value={aiData.introductions}
              placeholder="Add a short description"
              className="w-full text-gray-600 bg-transparent resize-none focus:outline-none"
              rows={2}
              onChange={handleInputChange}
            />
          </div>

          <div className="bg-white rounded-lg border py-2 px-4">
            <h3 className="font-semibold mb-2">Data</h3>
            <div className="space-y-2">
              <textarea
                name="contents"
                value={aiData.contents}
                placeholder="Provide things to learn"
                className="w-full text-gray-600 bg-transparent border-b border-gray-200 focus:outline-none focus:border-primary-900"
                rows={3}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button
          className="w-full py-4 bg-primary-50 text-primary-900 hover:bg-primary-700 rounded-full flex items-center justify-center"
          onClick={handleUpdate}
          disabled={updateLoading}
        >
          {updateLoading ? "Updating..." : "Update AI"}
        </button>
      </div>
    </div>
  );
};

export default EditAIPage;

export async function getServerSideProps() {
  return {
    props: {
      title: "Edit AI",
    },
  };
}
