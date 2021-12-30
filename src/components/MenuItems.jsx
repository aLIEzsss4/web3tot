import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../game/hooks'
import { setOpen as openMarket } from 'stores/NFTMarketStore'
import { openCreatNft } from 'stores/CreatNFTStore'
import { setOpen as openNFTBalance } from 'stores/NFTBalanceStore'
import { setOpen as setOpenBalance } from 'stores/BanlanceStore'
import { setOpen as setOpenNFTTrans } from 'stores/NFTTransStore'
import { setOpen as setOpenMintCom } from 'stores/MintStore'


function MenuItems({ collapsed, ISTESTNET }) {
  const dispatch = useAppDispatch()

  return (
    <Menu
      theme="light"
      mode="inline"
    >
      
      {/* {
        ISTESTNET&&(
          <Menu.Item key="/mint" onClick={() => dispatch(setOpenMintCom(true))}>
            <span>💵 Mint</span>
          </Menu.Item>
        )
      }
     
      <Menu.Item key="/erc20balance">
        <span onClick={() => dispatch(setOpenBalance(true))}>💰 Balances</span>
      </Menu.Item> */}
      <Menu.Item key="/NFTMarketPlace" onClick={() => dispatch(openMarket(true))}>
        <span >{'🏦 NFT MarketPlace'}</span>

        {/* <NavLink to="/NFTMarketPlace">{collapsed ? 'Market' : '🏦 NFT MarketPlace'}</NavLink> */}
      </Menu.Item>
      <Menu.Item key="/NftTransactions" onClick={() => dispatch(setOpenNFTTrans(true))}>
        {/* <NavLink to="/NftTransactions">💵 NftTransactions</NavLink> */}
        <span > 🏷 NFT Transactions</span>

      </Menu.Item>
      <Menu.Item key="/nftBalance" onClick={() => dispatch(openNFTBalance(true))}>
        {/* <NavLink to="/nftBalance">💸 NFT Balance</NavLink> */}
        <span >💸 NFT Balance</span>
      </Menu.Item>
      {/* <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">🖼 NFTs</NavLink>
      </Menu.Item> */}
      <Menu.Item key="/nftCreat" onClick={() => dispatch(openCreatNft(true))}>
        {/* <NavLink to="/nftCreat">🖼 Creat NFT</NavLink> */}
        <span >🖼 Creat NFT</span>

      </Menu.Item>

    </Menu>
  );
}

export default MenuItems;
