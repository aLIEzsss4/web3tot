export const useIPFS = () => {
  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs.moralis.io:2053/ipfs/")) return url;
    return url.replace("ipfs.moralis.io:2053/ipfs/", "ipfs.io/ipfs/");
  };

  return { resolveLink };
};
