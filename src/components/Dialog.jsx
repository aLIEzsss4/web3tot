import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
// import CreatNftCom from './NFT/CreatNFT'

// import { useAppDispatch } from '../game/hooks'
// import { openCreatNft } from 'stores/CreatNFTStore'



const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 16px 180px 16px 16px;
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #222639;
  border-radius: 16px;
  padding: 16px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`

const VideoGrid = styled.div`
  flex: 1;
  min-height: 0;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  overflow:auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));


  .video-container {
    position: relative;
    background: black;
    border-radius: 8px;
    overflow: hidden;
    /* overflow:auto; */


    .player-name {
      position: absolute;
      bottom: 16px;
      left: 16px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 0 1px 2px rgb(0 0 0 / 60%), 0 0 2px rgb(0 0 0 / 30%);
      white-space: nowrap;
    }
  }
`


export default function Dialog({ children, close, title, modal }) {
  console.log(children, 'children')

  const style = modal ? {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }:{}

// const dispatch = useAppDispatch()

return (
  <Backdrop>
    <Wrapper>
      <IconButton
        aria-label="close dialog"
        className="close"
        onClick={() => close()}
      >
        <CloseIcon />
      </IconButton>

      <div className="toolbar">
        <Button
          variant="contained"
          color="secondary"
        >
          {title}
        </Button>
      </div>

      <VideoGrid style={style}>
        {children}
      </VideoGrid>
    </Wrapper>
  </Backdrop>
)
}
