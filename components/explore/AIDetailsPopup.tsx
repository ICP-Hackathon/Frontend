import { useEffect, useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { fetchAIDetails } from "@/utils/api/ai";
import { AIDetailProps } from "@/utils/interface";

interface AIDetailsPropWithName {
  id: string;
  name: string;
}

const AIDetailsPopup: React.FC<AIDetailsPropWithName> = ({ id, name }) => {
  const [aiDetail, setAIDetail] = useState<AIDetailProps | null>(null);
  const [detailLoading, setDetailLoading] = useState(true);

  useEffect(() => {
    const loadAIModels = async () => {
      try {
        const data = await fetchAIDetails(id);
        setAIDetail(data);
        setDetailLoading(false);
      } catch (error) {
        console.error(error);
        setDetailLoading(false);
      }
    };
    loadAIModels();
  }, [id]);

  if (detailLoading) {
    return (
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
        Loading...
      </DialogContent>
    );
  }

  if (!aiDetail) {
    return (
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
        Failed to load AI details.
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto ">
      <div className="space-y-4">
        <div className="flex justify-center pt-5">
          <div className="inline-block px-3 py-1 bg-primary-50 text-primary-900 rounded-full text-sm">
            {aiDetail.category}
          </div>
        </div>
        <h2 className="text-3xl font-bold text-primary-900 text-center">
          {aiDetail.name}
        </h2>
        <p className="text-gray-500 text-center">Created by {name}</p>
        <p className="text-gray-500 text-center">
          Average # of Tokens:{" "}
          {Math.round(
            (aiDetail.prompt_tokens + aiDetail.completion_tokens) /
              (aiDetail.chat_counts || 1),
          )}
        </p>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 text-sm text-center">{aiDetail.introductions}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 border-b">RAG</h3>
          <p className="text-sm text-gray-600">
            {aiDetail.logs.length > 0
              ? aiDetail.logs[0].comments
              : "No RAG information available."}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 border-b">Comment</h3>
          <p className="text-sm text-gray-600">
            {aiDetail.logs.length > 1
              ? aiDetail.logs[1].comments
              : "No comments available."}
          </p>
        </div>
      </div>
    </DialogContent>
  );
};

export default AIDetailsPopup;
