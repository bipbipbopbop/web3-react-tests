import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import type { AddEthereumChainParameter } from "@web3-react/types";

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

// list of all compatible chains
const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
} = {
  // Ethereum
  1: {
    urls: [
      process.env.infuraKey
        ? `https://mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      process.env.alchemyKey
        ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}`
        : undefined,
      "https://cloudflare-eth.com",
    ].filter((url) => url !== undefined) as string[],
    name: "Mainnet",
  },
  // Polygon
  137: {
    urls: [
      process.env.infuraKey
        ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}`
        : undefined,
      "https://polygon-rpc.com",
    ].filter((url) => url !== undefined) as string[],
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
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
