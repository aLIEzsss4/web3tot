export const useIPFS = () => {
  const resolveLink = (url) => {
    if (!url) {
      return url;
    }
    if (url.includes("https://ipfs.io/ipfs/")) {
      return url.replace("https://ipfs.io/ipfs/", "https://ipfs.moralis.io:2053/ipfs/");
    }
    if (url.includes("ipfs://")) {
      return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    }
    // if (url.includes("ipfs.moralis.io:2053/ipfs/")) {
    //   return url.replace("ipfs.moralis.io:2053/ipfs/", "ipfs.io/ipfs/");
    // }
    return url
  };

  return {
    resolveLink
  };
};