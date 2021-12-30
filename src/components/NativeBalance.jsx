import { useNativeBalance } from "react-moralis";
import { Tooltip } from 'antd'
import {
  DollarTwoTone,
} from '@ant-design/icons';
import { getNativeByChain } from 'helpers/networks';
import { useMemo } from 'react';

function NativeBalance(props) {
  const { data: balance, getBalances, isLoading, isFetching } = useNativeBalance(props);
  const currencySymbol = getNativeByChain(props.chainId);


  const balanceNum = useMemo(() => {
    return balance.balance ? (balance.balance / 10 ** 18).toFixed(4) + ` ${currencySymbol}` : null
  }, [balance.balance])

  return (
    <Tooltip title="Refresh Balance">
      <div onClick={() => getBalances()} style={{ textAlign: "center", whiteSpace: "nowrap", cursor: 'pointer' }}>
        {balanceNum}
        <DollarTwoTone style={{ marginLeft: 10 }} spin={isLoading || isFetching} />
      </div>
    </Tooltip>
  );
}

export default NativeBalance;
