import React from "react";
import { HeaderBarProps } from "@/utils/interface";

const Header: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <header className="bg-white py-4 px-6 flex items-center justify-center">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
    </header>
  );
};

export default Header;
