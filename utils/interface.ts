import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  title: string;
}

export interface HeaderBarProps {
  title: string;
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

export interface AIDetails {
  id: string;
  name: string;
  category: string;
  introductions: string;
}

export interface Log {
  id: number;
  aiid: string;
  createdat: string;
  log: string;
  txurl: string;
  faissid: string;
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
  aiDetails: AIDetails | null;
}

export interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  chatcontentsid: string;
  chatid: string;
  createdat: string;
  senderid: string;
  message: string;
}

export interface CardData {
  id: number | null | undefined;
  ai_id: string;
  name: string;
  creator: string;
  category: string;
  image_url: string;
  introductions: string;
}
