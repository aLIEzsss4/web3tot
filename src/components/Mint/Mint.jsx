import Transfer from "./components/Transfer";
import NativeBalance from "../NativeBalance";
import Address from "../Address/Address";
import Blockie from "../Blockie";
import { Card } from "antd";

const styles = {
  title: {
    fontSize: "30px",
    fontWeight: "600",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    width: "550px",
    fontSize: "16px",
    fontWeight: "500",
  },
};

function Mint() {
  return (
    <Card
      style={styles.card}
      title={
        <div style={styles.header}>
          <Blockie scale={5} avatar currentWallet style />
          <Address copyable />
          <NativeBalance />
          <a target="_blank" href="https://testnet.binance.org/faucet-smart" rel="noreferrer">None BNB？ Get Free BNB</a>
        </div>
      }
    >
      <Transfer />
    </Card>
  );
}

export default Mint;
