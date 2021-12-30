

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
    try{
      await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
      );
    }catch(e){
      console.log(e)
    }
   
  }

  return (
    <Button style={{ display: 'flex',margin:'0 auto' }} type="primary" onClick={addNetworkFn} >Add BSC Testnet</Button>
  );
}

export default AddNetwork;
