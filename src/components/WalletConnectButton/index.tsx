import React from "react";
import "./WalletConnectButton.css";
import { hooks, walletConnect } from "../../connectors/walletConnect";

/**
 * pls see the implementation reference:
 * https://github.com/NoahZinsmeister/web3-react/blob/main/packages/example-next/components/connectors/CoinbaseWalletCard.tsx
 * https://github.com/NoahZinsmeister/web3-react/blob/main/packages/example-next/components/ConnectWithSelect.tsx
 */

const onClickConnect: React.MouseEventHandler<HTMLButtonElement> = async () => {
  await walletConnect.activate(1);
};

const onClickDisconnect: React.MouseEventHandler<
  HTMLButtonElement
> = async () => {
  await walletConnect.deactivate();
};

/**
 * @note Buffer is not defined https://github.com/NoahZinsmeister/web3-react/issues/423
 * @returns
 */
export const WalletConnectButton: React.FC = () => {
  const account = hooks.useAccount();
  const isActive = hooks.useIsActive();
  const error = hooks.useError();

  if (error !== undefined) {
    console.log(error);
  }

  return (
    <button
      className="WalletConnectButton"
      onClick={isActive ? onClickDisconnect : onClickConnect}
    >
      {error ?? isActive ? account! : "Click to connect to WalletConnect."}
    </button>
  );
};

export default WalletConnectButton;
