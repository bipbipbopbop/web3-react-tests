import React from "react";
import "./MetamaskButton.css";
import { hooks, metaMask } from "../../connectors/metamask";

const onClickConnect: React.MouseEventHandler<HTMLButtonElement> = async () => {
  await metaMask.activate();
};

const onClickDisconnect: React.MouseEventHandler<
  HTMLButtonElement
> = async () => {
  await metaMask.deactivate();
};

export const MetamaskButton: React.FC = () => {
  const account = hooks.useAccount();
  const isActive = hooks.useIsActive();
  const error = hooks.useError();

  if (error !== undefined) {
    console.log(error);
  }

  return (
    <button
      className="MetamaskButton"
      onClick={isActive ? onClickDisconnect : onClickConnect}
    >
      {error?.message ?? isActive ? account! : "Click to connect to metamask."}
    </button>
  );
};
