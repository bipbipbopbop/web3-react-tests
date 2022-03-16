import React from "react";
import "./WalletConnectButton.css";
import { hooks, walletConnect } from "../../connectors/walletConnect";

/**
 * Incomplete. pls see the implementation reference:
 * https://github.com/NoahZinsmeister/web3-react/blob/main/packages/example-next/components/connectors/CoinbaseWalletCard.tsx
 * https://github.com/NoahZinsmeister/web3-react/blob/main/packages/example-next/components/ConnectWithSelect.tsx
 */

const onClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
  await walletConnect.activate(1);
};

export const WalletConnectButton: React.FC = () => {
  const account = hooks.useAccount();
  const isActive = hooks.useIsActive();

  return (
    <button className="WalletConnectButton" onClick={onClick}>
      {isActive ? account! : "Click to connect to WalletConnect."}
    </button>
  );
};
