import { useEffect } from "react";
import { BaseError, useWallet } from "@suiet/wallet-kit";
import { ConnectButton, ErrorCode } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { walletAtom } from "@/lib/states";
import { useSetAtom } from "jotai";
import { fetchUserExists, fetchUser } from "@/utils/api/user";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/userStore";
import { User } from "@/utils/interface";

function WalletButton() {
  const wallet = useWallet();
  const setWallet = useSetAtom(walletAtom);
  const router = useRouter();
  const { setUser, setUserWallet } = useUserStore();

  useEffect(() => {
    if (wallet.connected) {
      console.log("Wallet connected");
      console.log("Current wallet: ", wallet);
      setWallet(wallet);
      setUserWallet(wallet);

      if (wallet.address) {
        const checkAndSetUser = async (address: string) => {
          try {
            const userExists = await fetchUserExists(address);

            if (userExists) {
              const userInfo = await fetchUser(address);
              const requiredProps: (keyof User)[] = [
                "user_address",
                "nickname",
                "image_url",
                "gender",
                "country",
                "phone",
              ];
              const missingProps = requiredProps.filter(
                (prop) => !(prop in userInfo),
              );

              if (missingProps.length > 0) {
                console.warn(
                  `Missing user properties: ${missingProps.join(", ")}`,
                );
              }

              setUser(userInfo as User);
              router.push("/explore");
            } else {
              router.push("/setprofile");
            }
          } catch (error) {
            console.error("Error checking user or fetching user info:", error);
          }
        };
        checkAndSetUser(wallet.address);
      }
    } else {
      console.log("Wallet disconnected");
    }
  }, [wallet, setWallet, setUserWallet, setUser, router]);

  return (
    <ConnectButton
      style={{ width: "100%", marginBottom: 10 }}
      onConnectError={(error: BaseError) => {
        if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
          console.warn(
            "User rejected the connection to " + error.details?.wallet,
          );
        } else {
          console.warn("Unknown connect error: ", error);
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
