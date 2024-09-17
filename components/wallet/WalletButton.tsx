import { useEffect } from "react";
import { BaseError, useWallet } from "@suiet/wallet-kit";
import { ConnectButton, ErrorCode } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { walletAtom } from "@/lib/states";
import { useSetAtom } from "jotai";
import { fetchUser } from "@/utils/api/user";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";

function WalletButton() {
  const wallet = useWallet();
  const setWallet = useSetAtom(walletAtom);
  const router = useRouter();
  const { setUser, setUserWallet } = useUserStore();

  useEffect(() => {
    if (wallet.connected) {
      console.log("wallet connected");
      console.log("current wallet: ", wallet);
      setWallet(wallet);
      setUserWallet(wallet);

      if (wallet.address) {
        const checkUser = async (address: string) => {
          console.log(address);
          try {
            const checkUser = await fetchUser(address);
            if (checkUser) {
              setUser(checkUser);
              router.push("/explore");
            } else {
              router.push("/setprofile");
            }
          } catch (error) {
            console.error(error);
          }
        };
        checkUser(wallet.address);
      }
    } else {
      console.log("wallet disconnected");
    }
  }, [wallet]);

  return (
    <ConnectButton
      style={{ width: "100%", marginBottom: 10 }}
      onConnectError={(error: BaseError) => {
        if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
          console.warn(
            "user rejected the connection to " + error.details?.wallet,
          );
        } else {
          console.warn("unknown connect error: ", error);
        }
      }}
      onConnectSuccess={(walletName: string) => {
        console.log("[Connection Success]: ", walletName);
      }}
    >
      Connect Your Wallet
    </ConnectButton>
  );
}

export default WalletButton;
