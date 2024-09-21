import { useEffect, useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import { fetchAIDetails } from "@/utils/api/ai";
import { AIDetailProps } from "@/utils/interface";
import { useRouter } from "next/router";
import { getDate } from "@/utils/lib/date";
import { txScanURL } from "@/utils/lib/txscan";
interface AIDetailsPropWithName {
  id: string;
  name: string;
}

const AIDetailsPopup: React.FC<AIDetailsPropWithName> = ({ id, name }) => {
  const router = useRouter();
  const [aiDetail, setAIDetail] = useState<AIDetailProps | null>(null);
  const [detailLoading, setDetailLoading] = useState(true);
  console.log(aiDetail);

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

  const handleClick = () => {
    router.push(`/ai/${id}/chat`);
  };

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
          {aiDetail.ai_name}
        </h2>
        <p className="text-gray-500 text-center">Created by {name}</p>
        <p className="text-gray-500 text-center">
          Avarage Token Usage :
          <span className="text-black font-bold ml-1">
            {Math.round(aiDetail.usage / (aiDetail.chat_count || 1))}
          </span>
        </p>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-700 text-sm text-center">
            {aiDetail.introductions}
          </p>
        </div>
        <div className="bg-white border-gray-200 border rounded-2xl p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 border-b">RAG</h3>
          {aiDetail.logs.length > 0
            ? aiDetail.logs.map((log, index) => (
                <div key={index}>
                  <div className="flex place-content-between">
                    <p className="text-sm text-gray-900 font-regular">
                      {log.comments}
                    </p>
                    <p className="bg-primary-50 text-primary-900 font-medium text-[12px] w-[40px] rounded-2xl text-center">
                      {getDate(log.created_at)}
                    </p>
                  </div>
                  <a
                    className="text-gray-500 text-[10px]"
                    href={txScanURL(log.tx_url)}
                  >
                    {txScanURL(log.tx_url).slice(0, 40) + "..."}
                  </a>
                </div>
              ))
            : "No RAG information available."}
        </div>
        {/* <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <h3 className="font-semibold text-gray-700 border-b">Comment</h3>
          <p className="text-sm text-gray-600">
            {aiDetail.logs.length > 1
              ? aiDetail.logs[1].comments
              : "No comments available."}
          </p>
        </div> */}

        <div className="p-4 bg-white border-t">
          <button
            className="w-full py-4 bg-primary-900 text-white font-bold text-[18px] hover:bg-primary-700 rounded-full flex items-center justify-center"
            onClick={handleClick}
          >
            Start Chat!
          </button>
        </div>
      </div>
    </DialogContent>
  );
};

export default AIDetailsPopup;
