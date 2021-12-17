import { Card, Timeline, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {
 
  let history = useHistory();

  function handleClick() {
    history.push("/mint");
  }
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>To-Do List</Text>
          </>
        }
      >
        <Timeline mode="left" style={styles.timeline}>
          <Timeline.Item dot="🍺" >
            <Text delete style={styles.text}>
              <a href="https://testnet.bscscan.com/address/0xf87afc3eac88615e0202b7197875debdda0fdb68" target="_blank" rel="noreferrer">Creat TOT</a>
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="💵" >
            <Text delete style={styles.text} onClick={handleClick} >
             Airdrop TOT
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="📃">
            <Text style={styles.text}>
              NFT Contract
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="🗾">
            <Text style={styles.text}>
              NFT  Buy/Sell
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="👾">
            <Text style={styles.text}>
              Game
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🎉">
            <Text style={styles.text}>
              Build
            </Text>
          </Timeline.Item>
        </Timeline>
      </Card>

    </div>
  );
}
