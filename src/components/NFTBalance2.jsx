import React, { useState, useEffect,useMemo } from "react";
import { useMoralis } from "react-moralis";
import { Card, Image, Tooltip, Modal, Input, Alert, Spin, Button, Rate, Badge} from "antd";
import { useNFTBalance } from "hooks/useNFTBalance";
import { FileSearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useMoralisDapp } from "MoralisDappProvider/MoralisDappProvider";
import { getExplorer, getNativeByChain, getNftViewByChain } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
import {
  LoadingOutlined,
} from '@ant-design/icons'
import { getCollectionsByChain,  } from "helpers/collections";
import { OpenseaLogo } from './Chains/Logos';

const { Meta } = Card;

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1180px",
    gap: "20px",
  },
  buy: {
    position: 'absolute',
    right: '-34px',
    top: '-30px'
  }
};

function NFTBalance() {
  const { NFTBalance, fetchSuccess, getNFTBalance, isLoading } = useNFTBalance();
  const { chainId, marketAddress, contractABI } = useMoralisDapp();
  const { Moralis } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const [nftToSend, setNftToSend] = useState(null);
  const [canBuy,setCanBuy]=useState(false)
  const [price, setPrice] = useState(1);
  const [loading, setLoading] = useState(isLoading);
  const contractProcessor = useWeb3ExecuteFunction();
  const contractABIJson = JSON.parse(contractABI);
  const listItemFunction = "createMarketItem";

  const collections = getCollectionsByChain(chainId)
  const { ItemImagesList='' } = collections?.[0] || { ItemImagesList: ''}
  const ItemImage = Moralis.Object.extend(ItemImagesList);

  useEffect(() => {
    getNFTBalance()
  }, []);

  async function list(nft, listPrice) {
    setLoading(true);
    const p = listPrice * ("1e" + 18);
    const ops = {
      contractAddress: marketAddress,
      functionName: listItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nft.token_address,
        tokenId: nft.token_id,
        price: String(p),
      },
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        addItemImage();
        succList();
      },
      onError: (error) => {
        setLoading(false);
        failList();
      },
    });
  }
  useEffect(() => {
    if (nftToSend && visible){
      // getApprovedFn(nftToSend)
      isApprovedForAllFn(nftToSend)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftToSend, visible]);

  async function isApprovedForAllFn(nft){
    const ops = {
      contractAddress: nft.token_address,
      functionName: "isApprovedForAll",
      abi: [{
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }],
      params: {
        owner: nft.owner_of,
        operator:marketAddress
      },
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: (res) => {
        if (res) {
          setCanBuy(true)
        }
        console.log("res", res);
      },
      onError: (error) => {
        setCanBuy(false)
      },
    });
  }

  async function getApprovedFn(nft) {
    const ops = {
      contractAddress: nft.token_address,
      functionName: "getApproved",
      abi: [{
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }],
      params: {
        tokenId: nft.token_id
      },
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: (res) => {
        if (res ==='0x0000000000000000000000000000000000000000'){
          setCanBuy(true)
        }
        console.log("res", res);
        // setLoading(false);
        // setVisibility(false);
        // succApprove();
      },
      onError: (error) => {
        setCanBuy(false)

        // console.log(error)
        // setLoading(false);
        // failApprove();
      },
    });
  }


  async function approveAll(nft) {
    setLoading(true);
    const ops = {
      contractAddress: nft.token_address,
      functionName: "setApprovalForAll",
      abi: [{ "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
      params: {
        operator: marketAddress,
        approved: true
      },
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("Approval Received");
        setLoading(false);
        setVisibility(false);
        succApprove();
      },
      onError: (error) => {
        setLoading(false);
        failApprove();
      },
    });
  }

  const handleSellClick = (nft) => {
    setNftToSend(nft);
    setVisibility(true);
  };

  function succList() {
    getNFTBalance()
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `Your NFT was listed on the marketplace`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function succApprove() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `Approval is now set, you may list your NFT`,
    });

    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failList() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem listing your NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failApprove() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem with setting approval`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function addItemImage() {
    const itemImage = new ItemImage();

    itemImage.set("image", nftToSend.image);
    itemImage.set("nftContract", nftToSend.token_address);
    itemImage.set("tokenId", nftToSend.token_id);
    itemImage.set("name", nftToSend.name);

    itemImage.save();
  }

  const canSeeOpensea = useMemo(() => {
    return getNftViewByChain(chainId) !== ''
  }, [chainId])
  return (
    <>
    <div>
        {contractABIJson.noContractDeployed && (
          <>
            <Alert
              message="No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file"
              type="error"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )}
        {/* {!fetchSuccess && (
          <>
            <Alert
              message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
              type="warning"
            />
            <div style={{ marginBottom: "10px" }}></div>
          </>
        )} */}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
            <LoadingOutlined style={{ fontSize: '40px', color: '#08c' }} />
          </div>
        )}
        
        <div style={styles.NFTs}>

          {NFTBalance?NFTBalance &&
          NFTBalance.map((nft, index) => (

            <Card
              hoverable
              // actions={[
              //   <Tooltip title="View On Blockexplorer">
              //     <FileSearchOutlined
              //       onClick={() =>
              //         window.open(
              //           `${getExplorer(chainId)}address/${nft.token_address}`,
              //           "_blank"
              //         )
              //       }
              //     />
              //   </Tooltip>,
              //   <Tooltip title="List NFT For Sale">
              //     <ShoppingCartOutlined onClick={() => handleSellClick(nft)} />
              //   </Tooltip>,
              // ]}
              style={{ width: 280, paddingTop: 20, border: "2px solid #eee", position: 'relative', borderRadius: 15 }}
              cover={
                <Image
                  preview={false}
                  src={nft?.image || "error"}
                  fallback="data:image/png;base64,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"
                  alt=""
                  onClick={() => handleSellClick(nft)}
                  style={{ height: "240px", objectFit: 'contain', }}
                />
              }
              key={index}
            >
              {/* <div onClick={() => handleSellClick(nft)}>
                <Badge.Ribbon style={styles.buy} text="Sale Now" color="green"></Badge.Ribbon>
              </div> */}
              < Meta title={
                <>
                  <p style={{ color: '#666', display: 'flex', alignItems: 'center' }}>{`#${nft.token_id}`}
                    <Tooltip title="View On Blockexplorer">
                      <FileSearchOutlined
                        style={{ marginLeft: 5 }}
                        onClick={() =>
                          window.open(
                            `${getExplorer(chainId)}address/${nft.token_address}`,
                            "_blank"
                          )
                        }
                      />
                    </Tooltip>
                    {canSeeOpensea && (
                      <Tooltip title="View On OpenSea">
                        <span style={{ marginLeft: 5, display: 'inline-flex' }}
                          onClick={() =>
                            window.open(
                              `${getNftViewByChain(chainId)}${nft.token_address}/${nft.token_id}`,
                              "_blank"
                            )
                          }>
                          <OpenseaLogo />
                        </span>
                      </Tooltip>
                    )}
                  </p>
                  <p>{nft._name}</p>
                  <Rate disabled value={nft.rate} allowHalf />
                </>
                }
                description={
                  nft.description
                }
              />
            </Card>
          ))
            : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <Alert
                  message="No found your NFTs, you can create NFT!"
                  type="warning"
                />
              </div>
            )
        }
        </div>
        {/* {fetchSuccess && NFTBalance && NFTBalance?.length === 0 && !isLoading && } */}
      </div>

      <Modal
        title={`List ${nftToSend?.name} #${nftToSend?.token_id} For Sale`}
        visible={visible}
        onCancel={() => setVisibility(false)}
        onOk={() => list(nftToSend, price)}
        okText="List"
        footer={[
          <Button key="cancel" onClick={() => setVisibility(false)}>
            Cancel
          </Button>,
          (canBuy?
            (
              <Button key="sale" onClick={() => list(nftToSend, price)} type="primary">
                Sale
              </Button>
            ) : <Button key="approve"  onClick={() => approveAll(nftToSend)} type="primary">
              Approve
            </Button>)
          
        ]}
      >
        <Spin spinning={loading || isLoading}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            src={`${nftToSend?.image}`}
            style={{
              width: "250px",
              margin: "auto",
              borderRadius: "10px",
              marginBottom: "15px",
            }}
          />
          {canBuy && <Input
            autoFocus
            placeholder={`Listing Price in ${getNativeByChain(chainId)}`}
            onChange={(e) => setPrice(e.target.value)}
          />}
          
        </Spin>
      </Modal>
    </>
  );
}

export default NFTBalance;
