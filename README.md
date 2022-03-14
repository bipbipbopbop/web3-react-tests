## How to use web3-react V8

- Initialize a connector with `initializeConnector()` (see [connector.ts](./src/web3/connectors.ts)).
- `import { hooks, connector }` from your connector.
- Activate the connection with either `connector.eagerConnect()` (fail silently) or `connector.activate()` (throw on error).
- You can use the Hooks to quickly access wallet or network data, or initialize a provider with your favorite library through either `connector.provider` or `hooks.useProvider()`.
