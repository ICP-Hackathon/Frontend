import { useEffect } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { ConnectButton, ErrorCode } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { walletAtom } from "@/lib/states";
import { useSetAtom } from "jotai";
import { fetchUser } from "@/utils/api/user";
import { useRouter } from "next/router";

function WalletButton() {
  const wallet = useWallet();
  const setWallet = useSetAtom(walletAtom);
  const router = useRouter();
  useEffect(() => {
    if (wallet.connected) {
      console.log("wallet connected");
      console.log("current wallet: ", wallet);
      setWallet(wallet);

      if (wallet.address) {
        const checkUser = async (address: string) => {
          console.log(address);
          try {
            const checkUser = await fetchUser(address);
            if (checkUser) {
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
      // The BaseError instance has properties like {code, message, details}
      // for developers to further customize their error handling.
      onConnectError={(err: { code: any; details: { wallet: string } }) => {
        if (err.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
          console.warn(
            "user rejected the connection to " + err.details?.wallet
          );
        } else {
          console.warn("unknown connect error: ", err);
        }
      }}
      onConnectSuccess={(walletName: any) => {
        console.log("[Connection Success]: ", walletName);
      }}
    >
      Connect Your Wallet
    </ConnectButton>
  );
}

export default WalletButton;
