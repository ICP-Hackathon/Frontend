import Image from "next/image";
import Link from "next/link";
import { User, Menu } from "lucide-react";
import { HeaderBarProps } from "@/utils/interface";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/router";

const Header: React.FC<HeaderBarProps> = ({ title, onMenuClick }) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  // /ai/[id]/chat
  const isAIChat =
    /^\/ai\/[^/]+\/chat/.test(router.asPath) || router.asPath === "/test";

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between">
      <div className="w-10">
        {/* {isAIChat && (
          <button
            onClick={onMenuClick}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
        )} */}
      </div>
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <Link href="/mypage" passHref>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer">
          {user && user.image_url ? (
            <Image
              src={user.image_url}
              alt="User profile"
              width={40}
              height={40}
              className="w-full h-full object-cover transform scale-150 translate-y-[-10%]"
            />
          ) : (
            <User className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </Link>
    </header>
  );
};

export default Header;
