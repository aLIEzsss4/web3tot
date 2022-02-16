import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { BSCLogo, PolygonLogo, ETHLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";


const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
};

const chainMap = {
  'MAINNET': [
    {
      key: "0x38",
      value: "Smart Chain",
      icon: <BSCLogo />,
    },
    {
      key: "0x89",
      value: "Polygon",
      icon: <PolygonLogo />,
    },
  ],
  'TESTNET': [
    {
      key: "0x4",
      value: "Rinkeby Testnet",
      icon: <ETHLogo />,
    },
    // {
    //   key: "0x61",
    //   value: "Smart Chain Testnet",
    //   icon: <BSCLogo />,
    // },
    {
      key: "0x13881",
      value: "Mumbai",
      icon: <PolygonLogo />,
    },]
}[process.env.REACT_APP_WORKNET]

const menuItems = chainMap

function Chains() {

  const { switchNetwork, chainId, } = useChain();
  const [selected, setSelected] = useState({});
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account, Moralis } = useMoralis();


  // console.log("chain", chain)

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const handleMenuClick = (e) => {
    console.log("switch to: ", e.key);

    if (isAuthenticated || isWeb3Enabled) {
      console.log(isAuthenticated, isWeb3Enabled)

      switchNetwork(e.key);
    } else {
      console.log(isAuthenticated, isWeb3Enabled)

    }


  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomCenter">
        <Button key={selected?.key} icon={selected?.icon} style={{ ...styles.button, ...styles.item }}>
          <span style={{ marginLeft: "5px", color: '#1890ff' }}>{selected?.value || 'Select Network'}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Chains;
