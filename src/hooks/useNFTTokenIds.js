/* eslint-disable react-hooks/exhaustive-deps */
import { useMoralisDapp } from "MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import {useIPFS} from "hooks/useIPFS";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

export const useNFTTokenIds = (addr) => {
  const { token } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const [NFTTokenIds, setNFTTokenIds] = useState([]);
  const { resolveLink } = useIPFS();
  const [totalNFTs, setTotalNFTs] = useState();
  const [fetchSuccess, setFetchSuccess] = useState(true);
  const {
    fetch: getNFTTokenIds,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(token.getAllTokenIds, {
    chain: chainId,
    address: addr,
    limit: 100,
  });


  useEffect(async () => {
    if (data?.result) {
      const NFTs = data.result;
      setTotalNFTs(data.total);
      setFetchSuccess(true);
      for (let NFT of NFTs) {
        if (NFT.metadata && typeof NFT.metadata=='string') {
          NFT.metadata = JSON.parse(NFT.metadata);
          NFT.image =resolveLink(NFT.metadata?.image);
          NFT._name = NFT.metadata?.name;
          NFT.description = NFT.metadata?.description;
          NFT.rate = NFT.metadata?.rate;
        } else if (NFT?.token_uri) {
          try {
            NFT.image = resolveLink(NFT.token_uri)
            // await fetch(NFT.token_uri)
            //   // .then((response) => response.json())
            //   .then((data) => {
            //     NFT.image = data
            //   });
          } catch (error) {
            setFetchSuccess(false);
          }
        }
      }
      setNFTTokenIds(NFTs);
    }
  }, [data]);

  return {
    getNFTTokenIds,
    NFTTokenIds,
    totalNFTs,
    fetchSuccess,
    error,
    isLoading,
  };
};
