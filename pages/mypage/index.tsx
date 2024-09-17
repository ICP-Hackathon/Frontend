import React from "react";
import Image from "next/image";
import { Pencil, ChevronRight } from "lucide-react";
import { AICardProps } from "@/utils/interface";
import Link from "next/link";

// AICard Component
const AICard: React.FC<AICardProps> = ({
  name,
  creator,
  category,
  imageSrc,
}) => {
  return (
    <div className="bg-gray-50 border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
          ) : (
            <div className="size-[60px] rounded-full bg-emerald-100 mr-4 flex items-center justify-center">
              <span className="text-emerald-500 font-bold text-lg">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <span className="text-sm rounded-full bg-primary-50 text-primary-900 px-3 py-1">
              {category}
            </span>
          </div>
        </div>
        <button className="text-primary-900 font-medium text-lg flex items-center">
          Edit AI
        </button>
      </div>
    </div>
  );
};

// MyPage Component
const MyPage: React.FC = () => {
  const user = {
    user_address: "0x1234567890123456789012345678901234567890",
    nickname: "SuieTail",
    image_url: "https://suietail.s3.ap-southeast-2.amazonaws.com/3.png",
    gender: "other",
    country: "US",
    phone: "+1234567890",
    email: "crypto@example.com",
    created_at: "2023-09-16T12:00:00Z",
    updated_at: "2023-09-16T12:00:00Z",
    preferences: {
      newsletter: true,
      theme: "dark",
      language: "en",
    },
    stats: {
      followers: 150,
      following: 75,
      posts: 30,
    },
  };

  const aiList: AICardProps[] = [
    {
      id: "1",
      name: "Dating Advice AI",
      creator: "LoveBot Inc.",
      category: "relationship",
      introductions:
        "Get personalized dating tips and relationship advice from our AI-powered assistant.",
    },
    {
      id: "2",
      name: "NearGuide",
      creator: "LocalAI Systems",
      category: "travel",
      introductions:
        "Discover the best local spots and hidden gems in any city with our AI tour guide.",
    },
    {
      id: "3",
      name: "FitnessPal AI",
      creator: "HealthTech Solutions",
      category: "health",
      introductions:
        "Your personal AI trainer for customized workout plans and nutrition advice.",
    },
    {
      id: "4",
      name: "CodeBuddy",
      creator: "DevAI Labs",
      category: "programming",
      introductions:
        "AI-powered coding assistant to help you write better code and solve programming challenges.",
    },
    {
      id: "5",
      name: "CulinaryGenius",
      creator: "FoodTech Innovations",
      category: "cooking",
      introductions:
        "Elevate your cooking skills with personalized recipes and culinary tips from our AI chef.",
    },
  ];

  return (
    <div className="flex flex-col px-2">
      <div className="flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center">
          <div className="size-20 bg-gray-200 rounded-full mr-4 mx-auto flex items-center justify-center overflow-hidden">
            <img
              src={user.image_url}
              alt={user.nickname}
              className="w-full h-full object-cover transform scale-150 translate-y-[-10%]"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.nickname}</h2>
            <p className="text-gray-600">Gender: {user.gender}</p>
            <p className="text-gray-600">Country: {user.country}</p>
          </div>
        </div>
        <Link href="/editprofile" className="font-medium text-lg text-primary-900">
          Edit <Pencil className="inline-block ml-1" size={18} />
        </Link>
      </div>

      <h3 className="text-xl font-semibold py-2">My AI</h3>
      <div>
        {aiList.map((ai) => (
          <AICard
            key={ai.id}
            id={ai.id}
            name={ai.name}
            creator={ai.creator}
            category={ai.category}
            introductions={ai.introductions}
            imageSrc={ai.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPage;

export async function getStaticProps() {
  return {
    props: {
      title: "My Page",
    },
  };
}
