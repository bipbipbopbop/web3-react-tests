import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
// import type { AddEthereumChainParameter } from "@web3-react/types";

interface BasicChainInformation {
  urls: string[];
  name: string;
}

// interface ExtendedChainInformation extends BasicChainInformation {
//   nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
//   blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
// }

// list of all compatible chains
const CHAINS: {
  [chainId: number]: BasicChainInformation; // | ExtendedChainInformation;
} = {
  1: {
    urls: ["https://cloudflare-eth.com"],
    name: "Mainnet",
  },
};

// list of all RPC url to chains
const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{
  [chainId: number]: string[];
}>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: URLS,
    }),
  Object.keys(URLS).map((chainId) => Number(chainId))
);
