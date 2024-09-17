import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const Header: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false); // 클라이언트에서만 렌더링되도록

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setIsMounted(true); // 클라이언트 사이드에서만 동작
  }, []);

  return (
    <header className="bg-white py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900">Title</h1>
      <Link href="/mypage" passHref>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer">
          {isMounted && user && user.image_url ? (
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
