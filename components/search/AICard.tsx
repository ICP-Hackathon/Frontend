import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { AICardProps, CardData } from "@/utils/interface";
import { useState } from "react";
import { fetchAIDetails } from "@/utils/api/ai";
import AIDetailsPopup from "../explore/AIDetailsPopup";

export const AICard = ({ item }: AICardProps) => {
  const router = useRouter();

  const handleChatClick = () => {
    router.push(`/ai/${item.id}/chat`);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center flex-grow cursor-pointer">
            {item.profile_image_url ? (
              <Image
                // 수정 필요
                // src={item.profile_image_url}
                src={""}
                alt={item.name}
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
            ) : (
              <div className="w-[50px] h-[50px] rounded-full bg-primary-900 mr-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.creator}</p>
            </div>
          </div>
        </DialogTrigger>

        {/* Conditionally render AIDetailsPopup when the dialog is opened */}
        <DialogContent className="sm:max-w-[425px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
          <AIDetailsPopup ai_detail={item} />
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
