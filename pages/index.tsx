import Link from "next/link";
import Logo from "@/assets/logo_chatplay.svg";
import { WalletSelector } from "@/components/wallet/WalletSelector";
import { useUserStore } from "@/store/userStore";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";

export default function Landing() {
  const { clearUser } = useUserStore();
  const { disconnect } = useWallet();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      // Clear user data and disconnect wallet only on initial render
      clearUser();
      disconnect();
      localStorage.clear();

      setIsInitialized(true);
    }
  }, [clearUser, disconnect, isInitialized]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[600px] w-full mx-auto px-6">
        <Logo className="mx-auto" />
        <div className="w-full flex flex-col items-center mb-12">
          <div className="font-semibold text-4xl pb-3">Welcome to</div>
          <div className="font-semibold text-4xl pb-4 text-primary-900">
            Chat & Play 👋
          </div>
          <div className="text-primary-900 text-center">
            Share, Socialize, Satisfy your needs
          </div>
        </div>
        <Link
          href="https://blockblock.gitbook.io/icp"
          target="_blank"
          className="w-full mb-6 bg-primary-900 text-white font-semibold py-4 rounded-full shadow-md hover:bg-primary-100 transition duration-300 ease-in-out flex items-center justify-center"
        >
          About Us
        </Link>
        <div>
          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-4 text-gray-300">Log in/Sign up</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <WalletSelector />
        </div>
      </div>
    </div>
  );
}
