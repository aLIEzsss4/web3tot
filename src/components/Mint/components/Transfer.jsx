import { CreditCardOutlined } from "@ant-design/icons";
import { Button, Input, notification, InputNumber, Alert,Typography } from "antd";
import Text from "antd/lib/typography/Text";
import { useWeb3Contract } from "hooks/useWeb3Contract";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import abi from "contracts/TOT.json";

// const { abi } = MintABI;
const contractAddress = '0xf87Afc3eAC88615e0202b7197875DeBDdA0fdb68';
const { Paragraph } = Typography;

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textverflow: "ellipsis",
    appearance: "textfield",
    color: "#041836",
    fontWeight: "700",
    border: "none",
    backgroundColor: "transparent",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  textWrapper: { maxWidth: "80px", width: "100%" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "row",
  },
};

function Transfer() {
  const {  account } = useMoralis();
  const [receiver, setReceiver] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState(100);



  const {
    runContractFunction,
    contractResponse,
    isLoading,
    isRunning,
  } = useWeb3Contract({
    abi,
    functionName: "hightLevelMint",
    contractAddress: contractAddress,
    params: {
      playerAddress: receiver,
      amount: amount * 10
    },
  });

  useEffect(() => {
    amount && receiver ? setTx({ amount, receiver }) : setTx();
  }, [amount, receiver]);



  useEffect(() => {
    setReceiver(account);
  }, [account,]);

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "topRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  async function mint() {
    runContractFunction()
  }

  useEffect(() => {
    console.log(contractResponse, 'contractResponse')
    console.log(isLoading, 'isLoading')
    console.log(isRunning, 'isRunning')
    if (!isLoading && !isRunning && contractResponse) {
      openNotification({
        message: "🔊 New Transaction",
        description: (
          <a target="_blank" href={`https://testnet.bscscan.com/tx/${contractResponse.transactionHash}`} rel="noreferrer"  >{contractResponse.transactionHash}</a>
        ),
      });
    }
  }, [contractResponse, isLoading, isRunning]);


  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>
            <span style={{ marginRight: 10 }}>Airdrop</span>
            <a href="https://testnet.bscscan.com/address/0xf87afc3eac88615e0202b7197875debdda0fdb68" target="_blank" rel="noreferrer" >TOT</a>
          </h3>
        </div>
        {contractResponse && (
          <Alert
            description={<a target="_blank" href="https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-add-unlisted-tokens-custom-tokens-in-MetaMask" rel="noreferrer">How to add TOT token</a>}
            type="success"
            showIcon
            message={<Paragraph copyable>0xf87afc3eac88615e0202b7197875debdda0fdb68</Paragraph>}
            closable
          />
        )}
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Address:</Text>
          </div>
          <Input value={receiver} disabled={isRunning || isLoading} onChange={setReceiver} />
        </div>
        <div style={styles.select}>
          <div style={styles.textWrapper}>
            <Text strong>Amount:</Text>
          </div>
          <InputNumber
            addonBefore={<CreditCardOutlined />}
            size="large"
            min={1} max={10000}
            value={amount}
            onChange={setAmount}
            disabled={isRunning || isLoading}
            prefix={<CreditCardOutlined />} />
        </div>
        <Button
          type="primary"
          size="large"
          loading={isRunning || isLoading}
          style={{ width: "100%", marginTop: "25px" }}
          onClick={() => mint()}
          disabled={!tx}
        >
          Give me TOT🎁
        </Button>
      </div>
    </div>
  );
}

export default Transfer;
