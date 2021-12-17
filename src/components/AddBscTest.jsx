

import { Button } from "antd";
import { useMoralis } from "react-moralis";

const chainId = 97;
const chainName = "Smart Chain - Testnet";
const currencyName = "BNB";
const currencySymbol = "BNB";
const rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const blockExplorerUrl = "https://testnet.bscscan.com/";

function AddNetwork() {
  const { Moralis } = useMoralis();

  const addNetworkFn = async () => {
    await Moralis.addNetwork(
      chainId,
      chainName,
      currencyName,
      currencySymbol,
      rpcUrl,
      blockExplorerUrl
      );
  }

  return (
    <Button style={{ display: 'inline-block' }} onClick={addNetworkFn} >add bsc-test-network to wallet</Button>
  );
}

export default AddNetwork;
