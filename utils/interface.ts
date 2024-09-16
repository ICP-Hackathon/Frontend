import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  title: string;
}

export interface HeaderBarProps {
  title: string;
  userProfileUrl?: string;
  onMenuClick?: () => void;
}

// AI related inteface
export interface AICardProps {
  id: string;
  name: string;
  creator: string;
  category: string;
  introductions: string;
  imageSrc?: string;
}

export interface LogProps {
  rag_id: number;
  ai_id: string;
  created_at: string;
  comments: string;
  tx_url: string;
  faiss_id: string;
}

export interface AIDetailProps {
  ai_id: string;
  creator_address: string;
  created_at: string;
  name: string;
  image_url: string;
  category: string;
  introductions: string;
  chat_counts: number;
  prompt_tokens: number;
  completion_tokens: number;
  weekly_users: number;
  logs: LogProps[];
}

export interface AIData {
  id: string;
  name: string;
  category: string;
  introductions: string;
  contents: string;
  logs: string;
}

export interface AIModel {
  id: string;
  name: string;
  creator: string;
  image: string;
  category: string;
  introductions: string;
  usage: number;
  total_usage: number;
  ratio: number;
  collect: number;
}

// Chat related Interface

export interface ChatCardProps {
  chatid?: string;
  aiid: string;
  title: string;
  category: string;
  imageSrc?: string;
}

export interface ChatModel {
  chatid: string;
  aiid: string;
  userid: string;
}

export interface ChatWithDetails extends ChatModel {
  aiDetails: AIDetailProps | null;
}

export interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  chatcontentsid: string;
  chatid: string;
  created_at: string;
  senderid: string;
  message: string;
}

export interface CardData {
  id: number | null | undefined;
  ai_id: string;
  name: string;
  creator_address: string;
  category: string;
  image_url: string;
  introductions: string;
}
