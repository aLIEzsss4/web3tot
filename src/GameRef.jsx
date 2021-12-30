import './game/PhaserGame.ts'
import GameAPP from './game/App'
import NFTMarketDialog from 'components/NftMarketDialog'
import CreatNFTDialog from 'components/CreatNFTDialog'
import {
  useAppSelector,
  useAppDispatch
} from './game/hooks'
import muiTheme from './game/MuiTheme'
import {
  ThemeProvider
} from '@mui/material/styles'

import Dialog from 'components/Dialog'
import NFTBalance from 'components/NFTBalance2'
import ERC20Balance from 'components/ERC20Balance'
import NFTMarketTransactions from 'components/NFTMarketTransactions'
import Mint from 'components/Mint';

import { setOpen as setOpenNFTBalance } from 'stores/NFTBalanceStore'
import { setOpen as setOpenBalance } from 'stores/BanlanceStore'
import { setOpen as setOpenNFTTrans } from 'stores/NFTTransStore'
import { setOpen as setOpenMintCom } from 'stores/MintStore'


const GameRef = () => {
  const dispatch = useAppDispatch()
  const openMarket = useAppSelector((state) => state.nftMarket.open)
  const openCreatNFT = useAppSelector((state) => state.creatNft.open)
  const openNFTBalance = useAppSelector((state) => state.nftBalance.open)
  const openBalance = useAppSelector((state) => state.balance.open)
  const openNFTTrans = useAppSelector((state) => state.nftTrans.open)
  const openMintCom = useAppSelector((state) => state.mintCom.open)

  const closeNFTbalance = () => {
    dispatch(setOpenNFTBalance(false))
  }

  const closeBalance = () => {
    dispatch(setOpenBalance(false))
  }
  const closeNFTTrans = () => {
    dispatch(setOpenNFTTrans(false))
  }
  const closeMintCom = () => {
    dispatch(setOpenMintCom(false))
  }


  return (
    <ThemeProvider theme={muiTheme} >
      {/* <ModalRef /> */}
      <GameAPP />
      {openBalance && (
        <Dialog modal title={'Balance'} close={closeBalance}>
          <ERC20Balance />
        </Dialog>
      )}
      {openNFTTrans && (
        <Dialog modal title={'NFTMarketTransactions'} close={closeNFTTrans}>
          <NFTMarketTransactions />
        </Dialog>
      )}
      {openMintCom && (
        <Dialog modal title={'mint'} close={closeMintCom}>
          <Mint />
        </Dialog>
      )}
      {openMarket && <NFTMarketDialog />}
      {openCreatNFT && <CreatNFTDialog />}
      {openNFTBalance && (
        <Dialog  title={'NFT Balance'} close={closeNFTbalance}>
          <NFTBalance />
        </Dialog>
      )}
    </ThemeProvider>
  )
}

export default GameRef