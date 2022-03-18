import React from "react";
import "./MintButton.css";
import { hooks as MetamaskHooks } from "../../connectors/metamask";
import { hooks as WalletConnectHooks } from "../../connectors/walletConnect";
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import abi from "../../data/abi.json";
import { getCustomMerkleTree, getMerkleProof } from "./merkleTree";

const onClick = async (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  provider: Web3Provider
) => {
  const signer = provider.getSigner();
  const account = await signer.getAddress();
  const contract = new ethers.Contract(
    "0x16223A0a11BA905287A734ddA131908E28ccD188", // our NFT test contract, on Polygon
    abi
  ).connect(provider);

  const merkleTree = await getCustomMerkleTree();
  if (merkleTree === undefined) {
    throw "Error while building the merkleTree.";
  }
  if (
    "0x" + merkleTree.getRoot().toString("hex") !==
    (await contract.merkleRoot())
  ) {
    throw "Error: the merkleRoot does not match the contract allow list.";
  }

  const proof = getMerkleProof(merkleTree, account);
  if (!(await contract.onAllowList(account, proof))) {
    throw "Error: the account " + account + " is not on the allowList.";
  }

  await contract.connect(signer).mint(proof);
  alert("Minting completed!");
};

export const MintButton: React.FC = () => {
  const hooks = MetamaskHooks.useIsActive()
    ? MetamaskHooks
    : WalletConnectHooks;
  const provider = hooks.useProvider();
  const isActive = hooks.useIsActive();
  const chainID = hooks.useChainId();

  return (
    <button
      className="MintButton"
      onClick={(e) => onClick(e, provider!)}
      disabled={!isActive || (chainID !== 1337 && chainID !== 137)} // 1337 is the default ganache-cli chainID, 137 is polygon
    >
      {"MINT"}
    </button>
  );
};

export default MintButton;
