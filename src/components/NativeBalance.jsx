import { useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);

  return <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>{balance.balance ? balance.balance / 10 ** 18 +'BNB':null}</div>;
}

export default NativeBalance;
