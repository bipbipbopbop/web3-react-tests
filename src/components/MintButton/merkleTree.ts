import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";

export const initMerkleTree = (addresses: string[]) => {
  // Create the merkleTree for the whitelist
  // Note: from the Open Zeppelin 'MerkleProof.sol' library:
  // The hashing algorithm should be keccak256 and pair sorting should be enabled.
  const leafNodes = addresses.map((address) => keccak256(address));
  const merkleTree = new MerkleTree(leafNodes, keccak256, {
    sortPairs: true,
  });

  return merkleTree;
};

export const getMerkleProof = (merkleTree: MerkleTree, address: string) => {
  return merkleTree.getHexProof(keccak256(address));
};

// custom MerkleTree for the NFT test contract
export const getCustomMerkleTree = async () => {
  // prepare 8 addresses for the custom merkleTree
  const mnemonic =
    "heavy choose speed away pitch twice receive dove moral squeeze tag above";

  const paths = [
    "m/44'/60'/0'/0/1",
    "m/44'/60'/0'/0/2",
    "m/44'/60'/0'/0/3",
    "m/44'/60'/0'/0/4",
    "m/44'/60'/0'/0/5",
    "m/44'/60'/0'/0/6",
    "m/44'/60'/0'/0/7",
    "m/44'/60'/0'/0/8",
  ];

  const addresses = paths.map((path) => {
    return ethers.Wallet.fromMnemonic(mnemonic, path);
  });

  const accounts = await Promise.all(
    addresses.map((address) => address.getAddress())
  );
  if (accounts.length !== 8) {
    console.log("ERROR: The whitelist array must contains 8 addresses.");
    console.log("whitelist size is " + accounts.length);
    return;
  }
  return initMerkleTree(accounts);
};
