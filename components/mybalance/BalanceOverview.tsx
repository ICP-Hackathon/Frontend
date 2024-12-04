// components/BalanceOverview.tsx
import { useUserStore } from "@/store/userStore";
import { requsetFaucet } from "@/utils/api/user";
import { useAptosCall } from "@/utils/hooks/useAptos";
import { Plus } from "lucide-react";
import { decimalconverter } from "@/utils/lib/decimalconverter";

interface BalanceOverviewProps {
  totalBalance: number;
  totalEarnings: number;
  trial: number;
  getView: () => void;
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({
  totalBalance,
  totalEarnings,
  trial,
  getView,
}) => {
  const { user } = useUserStore();
  const { executeTransaction } = useAptosCall();
  const handleRequest = async () => {
    if (user?.user_address) {
      const result = await executeTransaction("request_faucet", []);
      console.log(result);
    }
  };

  const handleCharge = async () => {
    if (user?.user_address) {
      const result = await executeTransaction("recharge_consumer_balance", [
        1000000,
      ]);
      console.log(result);
    }
    getView();
  };

  return (
    <div className="bg-primary-900 bg-opacity-[80%] rounded-xl p-4 mb-6 text-center">
      <div className="flex justify-between mb-4">
        <div className="flex-1 pr-2">
          <p className="text-[#B9F0DE] text-sm mb-1">My Balance</p>
          <p className="text-white text-2xl font-bold">
            {decimalconverter(totalBalance)} mAPT
          </p>
        </div>
        <div className="w-px bg-[#B9F0DE] self-stretch mx-2"></div>
        <div className="flex-1 pl-2">
          <p className="text-[#B9F0DE] text-sm mb-1">Earnings</p>
          <p className="text-white text-2xl font-bold">
            {decimalconverter(totalEarnings)} mAPT
          </p>
        </div>
      </div>
      {trial == 0 ? (
        <div className="flex place-content-between gap-x-3">
          <button
            className="w-1/2 p-2  rounded-full flex items-center justify-center bg-[#2A2D36] hover:bg-primary-700"
            onClick={handleRequest}
          >
            Requst Faucet
          </button>
          <button
            className="w-1/2 p-2 rounded-full flex items-center justify-center bg-[#2A2D36] hover:bg-primary-700"
            onClick={handleCharge}
          >
            Charge APT
          </button>
        </div>
      ) : (
        <p>Free Trial : {trial} Left</p>
      )}
      <p className="text-[12px] text-end mt-3 tracking-wide">
        1 mAPT = 0.01 APT
      </p>
    </div>
  );
};

export default BalanceOverview;
