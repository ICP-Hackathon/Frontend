import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { AICardProps } from "@/utils/interface";
import { useState } from "react";
import { fetchAIDetails } from "@/utils/api/ai";
import AIDetailsPopup from "../explore/AIDetailsPopup";

export const AICard = ({
  id,
  name,
  creator,
  category,
  introductions,
  imageSrc,
}: AICardProps) => {
  const router = useRouter();

  const handleChatClick = () => {
    router.push(`/ai/${id}/chat`);
  };

  const [aiDetail, setAIDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleOpenChange = async (open: boolean) => {
    if (open && !aiDetail) {
      setDetailLoading(true);
      try {
        const data = await fetchAIDetails(id);
        setAIDetail(data);
        setDetailLoading(false);
      } catch (error) {
        console.error("Error fetching AI details:", error);
        setDetailLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <Dialog onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div className="flex items-center flex-grow cursor-pointer">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={name}
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
            ) : (
              <div className="w-[50px] h-[50px] rounded-full bg-primary-900 mr-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{creator}</p>
            </div>
          </div>
        </DialogTrigger>

        {/* Conditionally render AIDetailsPopup when the dialog is opened */}
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
          {detailLoading ? (
            <div>Loading...</div>
          ) : aiDetail ? (
            <AIDetailsPopup id={id} name={creator} />
          ) : (
            <div>No details available</div>
          )}
        </DialogContent>
      </Dialog>

      <button
        className="px-4 py-2 bg-primary-50 text-primary-900 rounded-full hover:bg-primary-700 transition-colors flex items-center ml-4"
        onClick={handleChatClick}
      >
        Chat
        <ChevronRight className="ml-1" size={18} />
      </button>
    </div>
  );
};
