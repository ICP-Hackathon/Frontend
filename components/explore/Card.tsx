import { Heart } from "lucide-react";

interface CardProps {
  name: string;
  creator: string;
}

const Card: React.FC<CardProps> = ({ name, creator }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md relative h-[160px] flex flex-col">
      <div className="bg-primary-900 rounded-md size-14 mb-4"></div>
      <div className="flex-grow flex flex-col justify-between">
        <h3 className="text-sm font-semibold min-h-[20px]">{name}</h3>
        <p className="text-xs text-gray-500 min-h-[16px]">{creator}</p>
      </div>
      <button className="absolute top-2 right-2 text-gray-700">
        <Heart size={16} />
      </button>
    </div>
  );
};

export default Card;
