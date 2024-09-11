import Image from "next/image";
import { useRouter } from "next/router";
import avatarImage from "@/assets/avatar.png";
import { AIModel } from "@/utils/interface";

export const MyAIs: React.FC<AIModel & { onDelete: () => void }> = ({
  id,
  name,
  category,
  introductions,
  image,
  total_usage,
  collect,
  onDelete,
}) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/ai/${id}/edit`);
  };

  const handleCollectEarnings = () => {
    window.alert(`Collecting earnings for AI: ${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex mb-2 space-x-2">
        <button
          onClick={handleEditClick}
          className="bg-gray-100 text-gray-800 px-4 py-2 w-full rounded-lg hover:bg-gray-200 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            src={/^https?:\/\//.test(image) ? image : avatarImage}
            alt={name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{introductions}</p>
      <div className="border-t pt-4">
        <h4 className="font-semibold text-lg mb-2">Earnings</h4>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Tokens</p>
            <p className="text-xl font-bold">{total_usage}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estimated Value</p>
            <p className="text-xl font-bold">${collect}</p>
          </div>
          <button
            onClick={handleCollectEarnings}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
};
