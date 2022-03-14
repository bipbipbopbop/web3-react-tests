import React from "react";
import "./MetamaskButton.css";
import { hooks, metaMask } from "../../web3/connectors";

const onClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
  await metaMask.activate(1);
};

export const MetamaskButton: React.FC = () => {
  const account = hooks.useAccount();
  const isActive = hooks.useIsActive();

  return (
    <button className="MetamaskButton" onClick={onClick}>
      {isActive ? account! : "Click to connect to metamask."}
    </button>
  );
};
