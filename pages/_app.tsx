import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { WalletProvider, SuiDevnetChain } from "@suiet/wallet-kit";

type PageComponentProps = {
  title: string;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const PageComponent = Component as React.ComponentType<PageComponentProps>;

  const suiTestnetChain = {
		id: "sui:testnet",
		name: "Sui Testnet",
		rpcUrl: "https://sui-testnet.nodeinfra.com",
	};

  // Check if the current route is the landing page
  const isLandingPage = router.pathname === "/landing";
  const isSetProfilePage = router.pathname === "/setprofile";

  if (isLandingPage || isSetProfilePage) {
    return (
      <WalletProvider
        chains={[
          SuiDevnetChain,
          suiTestnetChain,
        ]}
      >
        <PageComponent {...pageProps} />
      </WalletProvider>
    );
  }

  return (
    <WalletProvider
      chains={[
        SuiDevnetChain,
        suiTestnetChain,
      ]}
    >
      <Layout title={pageProps.title || "Near and Dear"}>
          <PageComponent {...pageProps} />
      </Layout>
    </WalletProvider>
  );
}

export default MyApp;
