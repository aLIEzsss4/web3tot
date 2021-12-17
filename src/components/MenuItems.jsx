import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/" >
        <NavLink to="/">🚀 Main</NavLink>
      </Menu.Item>
      {/* <Menu.Item key="/wallet">
        <NavLink to="/wallet">👛 Wallet</NavLink>
      </Menu.Item> */}
      <Menu.Item key="/mint">
        <NavLink to="/mint" style={{ color: 'red' }}>💵  Mint(new)</NavLink>
      </Menu.Item>

      <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">💰 Balances</NavLink>
      </Menu.Item>
      <Menu.Item key="/NFTMarketPlace">
        <NavLink to="/NFTMarketPlace">🏦 NFT MarketPlace</NavLink>
      </Menu.Item>
      <Menu.Item key="/NftTransactions">
        <NavLink to="/NftTransactions">💵 NftTransactions</NavLink>
      </Menu.Item>
      <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">💸 NFT Balance</NavLink>
      </Menu.Item>
      {/* <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">🖼 NFTs</NavLink>
      </Menu.Item> */}
      <Menu.Item key="/nftCreat">
        <NavLink to="/nftCreat">🖼Creat NFT</NavLink>
      </Menu.Item>

    </Menu>
  );
}

export default MenuItems;
