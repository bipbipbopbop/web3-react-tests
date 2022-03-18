import React from "react";
import "./App.css";
import { MetamaskButton } from "../MetamaskButton";
import { WalletConnectButton } from "../WalletConnectButton";
import MintButton from "../MintButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Web3 Component Tests</p>
        <MetamaskButton />
        <div style={{ margin: "1rem" }} />
        <WalletConnectButton />
        <hr style={{ margin: "2rem", width: "244px" }} />
        <MintButton />
      </header>
    </div>
  );
}

export default App;
