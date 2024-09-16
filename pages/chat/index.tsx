import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Heart, Clock, ArrowRight } from "lucide-react"; // named import 확인
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { fetchUserChats } from "@/utils/api/chat"; // 올바른 경로와 내보내기 확인

interface AICardProps {
  name: string;
  creator: string;
  imageSrc?: string;
  icon: React.FC<any>;
}

interface DropdownMenuProps {
  title: string;
  icon: React.FC<any>;
  items: AICardProps[];
  isOpen: boolean;
  setOpenDropdown: (title: string) => void;
}

const mockData = {
  saved: [
    { name: "GPT-4", creator: "OpenAI", icon: Heart },
    { name: "Claude", creator: "Anthropic", icon: Heart },
    { name: "DALL-E", creator: "OpenAI", icon: Heart },
    { name: "Midjourney", creator: "Midjourney", icon: Heart },
  ],
  history: [
    { name: "DALL-E", creator: "OpenAI", icon: Clock },
    { name: "Midjourney", creator: "Midjourney", icon: Clock },
  ],
};

const AICard: React.FC<AICardProps> = ({
  name,
  creator,
  imageSrc,
  icon: Icon,
}) => {
  const router = useRouter();

  return (
    <div
      className="p-4 bg-white rounded-lg flex items-center border hover:bg-gray-100 cursor-pointer transition-all duration-200"
      onClick={() => router.push(`/chat/${encodeURIComponent(name)}`)} // Navigate on click
    >
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
      <div className="flex-1 text-left">
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs text-gray-500">{creator}</p>
      </div>
      <Icon className="text-primary-900" size={20} />
    </div>
  );
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  icon: Icon,
  items,
  isOpen,
  setOpenDropdown,
}) => {
  return (
    <div className="relative mb-4">
      <button
        className="w-full flex items-center justify-between p-4 bg-primary-50 text-primary-900 rounded-xl transition-all duration-200"
        onClick={() => setOpenDropdown(isOpen ? "" : title)}
      >
        <div className="flex-1 text-center">
          <span className="text-lg">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="ml-4 text-primary-500" size={20} />
        ) : (
          <ChevronDown className="ml-4 text-primary-500" size={20} />
        )}
      </button>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-10 max-h-[252px] overflow-y-auto">
          {items.map((item, index) => (
            <AICard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

const ChatPage: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string>("");
  const [chats, setChats] = useState<AICardProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const creator =
    "0xf5532566bc1021868c009fd142a6a9d868248c4eb9cdf17018e848dfa4956c31";

  useEffect(() => {
    const loadAIModels = async () => {
      try {
        const Todaydata = await fetchUserChats(creator); // API 호출 경로와 내보내기 확인
        setChats(Todaydata.chats);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadAIModels();
  }, []);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-white flex flex-col justify-center items-center">
      <div className="w-full max-w-md p-6 text-center">
        <h2 className="text-xl text-gray-500 mb-6">Select one from below:</h2>
        <DropdownMenu
          title="Choose from Saved AI"
          icon={Heart}
          items={mockData.saved}
          isOpen={openDropdown === "Choose from Saved AI"}
          setOpenDropdown={setOpenDropdown}
        />
        <DropdownMenu
          title="See AI History"
          icon={Clock}
          items={mockData.history}
          isOpen={openDropdown === "See AI History"}
          setOpenDropdown={setOpenDropdown}
        />
        <Link href="/explore" passHref>
          <div className="w-full flex items-center justify-between p-4 bg-primary-50 text-primary-900 rounded-xl transition-all duration-200 hover:bg-gray-100">
            <div className="flex-1 text-center">
              <span className="text-lg">Go Explore More</span>
            </div>
            <ArrowRight className="ml-4 text-primary-500" size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatPage;

export async function getStaticProps() {
  return {
    props: {
      title: "SuieTail Chat",
    },
  };
}
