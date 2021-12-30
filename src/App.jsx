import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
// import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
// import ERC20Balance from "components/ERC20Balance";
// import ERC20Transfers from "components/ERC20Transfers";
// import NFTBalance from "components/NFTBalance2";
// import Wallet from "components/Wallet";
// import Mint from "components/Mint";
import { Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import MenuItems from "./components/MenuItems";
// import Main from "./components/Main"
import AddNetwork from "components/AddBscTest";
// import CreatNFT from "components/NFT/CreatNFT"
// import NFTTokenIds from "components/NFTTokenIds"
// import NFTMarketTransactions from "components/NFTMarketTransactions"
// import './game/PhaserGame'
import { getFaucetByChain, getNativeByChain} from 'helpers/networks'
import GameRef from './GameRef.jsx'


const { Sider } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo, REACT_APP_WORKNET }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, account, chainId } = useMoralis();
  // const { authenticate, isAuthenticated, logout, account, chainId } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const ISTESTNET = REACT_APP_WORKNET === 'TESTNET'


  const [collapsed, setCollapsed] = useState(false);

  
  const faucetUrl= getFaucetByChain(chainId)
  const currencySymbol = getNativeByChain(chainId)
  return (
    // <Router>
    <Layout style={{ height: "0", overflow: "auto" }} className="site-layout">
      <Sider
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          background: '#fff'
        }}
        collapsible collapsed={collapsed}
        onCollapse={(flag) => setCollapsed(flag)}
        collapsedWidth={80}
      >
        <Logo />
        {account && <MenuItems ISTESTNET={ISTESTNET} collapsed={collapsed} />}
        {/* {!account && !collapsed && ISTESTNET && <AddNetwork />} */}
        {!collapsed &&
          (
            <div
              style={{
                display: "grid",
                gridRowGap: "20px",
                fontSize: "17px",
                fontWeight: "500",
                marginTop: 20,
                width: "100%",
                justifyItems: "center",
              }}
            >
              <Chains />  
              <Account />
            <NativeBalance chainId={chainId}/>
              {
              ISTESTNET && <a href={faucetUrl} target="_blank" rel="noreferrer">Get Free {currencySymbol}</a>
              }

            </div>
          )}
      </Sider>
      <GameRef />

    </Layout>
    // </Router>

  );
};

export const Logo = () => (
  <div style={{
    height: '32px',
    margin: '16px',
  }}>
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="60" height="38" viewBox="0 0 959.000000 959.000000"
      preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,959.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
        <path d="M4699 8840 c-112 -7 -220 -22 -304 -40 -22 -5 -67 -14 -100 -20 -112
-21 -474 -118 -511 -138 -10 -5 -50 -20 -89 -32 -38 -13 -124 -49 -190 -81
-66 -33 -126 -59 -133 -59 -6 0 -12 -3 -12 -8 0 -4 -9 -12 -20 -17 -109 -55
-342 -230 -473 -354 -80 -76 -267 -275 -307 -327 -8 -11 -45 -55 -81 -99 -36
-44 -77 -96 -90 -115 -13 -19 -45 -62 -71 -95 -26 -33 -73 -101 -105 -150 -32
-50 -79 -121 -105 -157 -27 -37 -48 -69 -48 -72 0 -3 -37 -67 -82 -143 -44
-76 -123 -226 -175 -333 -121 -249 -124 -256 -168 -375 -20 -55 -40 -107 -45
-116 -13 -25 -99 -337 -111 -404 -6 -33 -15 -80 -20 -105 -43 -212 -49 -735
-10 -913 5 -23 14 -78 21 -122 71 -479 374 -1231 688 -1705 180 -273 328 -447
656 -775 193 -192 289 -279 397 -360 15 -11 60 -45 100 -75 84 -63 94 -70 239
-167 174 -117 210 -139 335 -208 147 -81 292 -151 405 -194 47 -18 94 -37 105
-41 25 -10 162 -46 240 -62 36 -8 124 -12 220 -12 154 1 163 3 245 34 75 28
230 101 284 133 132 79 204 133 283 213 51 51 93 96 93 99 0 3 22 38 48 78 42
63 95 152 159 267 11 19 36 76 57 125 21 50 41 99 46 110 30 66 73 222 99 355
32 169 30 378 -8 585 -32 175 -111 337 -210 429 -42 40 -41 66 2 66 17 0 50 5
72 10 22 5 87 14 145 20 146 16 241 28 270 33 14 3 77 10 140 16 63 7 147 16
185 21 39 5 133 14 210 20 77 6 190 16 250 22 152 17 1036 17 1170 1 188 -23
622 -48 1008 -57 l187 -5 0 89 0 90 -27 0 c-386 5 -1058 42 -1271 70 -96 13
-833 13 -976 0 -61 -5 -167 -14 -236 -20 -116 -10 -256 -24 -505 -50 -55 -6
-167 -20 -250 -30 -308 -39 -412 -50 -490 -50 -81 0 -236 -20 -318 -41 -25 -6
-65 -27 -88 -47 -38 -33 -41 -38 -36 -75 8 -61 36 -82 103 -80 45 2 76 -6 158
-39 174 -70 230 -127 293 -293 31 -82 43 -138 64 -307 30 -233 -46 -565 -197
-867 -176 -351 -315 -500 -609 -649 -196 -100 -274 -118 -435 -101 -392 41
-930 315 -1480 753 -309 247 -790 760 -955 1018 -89 141 -175 290 -238 413
-81 159 -177 361 -177 373 0 5 -6 22 -14 38 -75 152 -215 606 -255 829 -63
343 -68 700 -14 995 8 47 19 108 24 137 12 71 74 282 115 393 61 167 115 289
213 480 41 80 83 163 94 185 11 22 28 51 37 65 10 14 33 53 51 85 18 33 52 89
76 125 24 36 51 76 60 90 85 130 143 213 175 255 21 28 66 86 100 130 34 44
64 82 67 85 3 3 38 43 77 90 120 143 328 347 439 430 33 25 62 48 65 51 29 34
367 220 480 264 293 112 654 200 954 230 233 24 338 17 546 -36 310 -80 803
-381 1091 -666 93 -91 99 -95 140 -95 55 1 78 28 79 91 0 43 -4 48 -82 125
-45 45 -91 88 -104 96 -12 9 -40 31 -61 50 -82 75 -314 239 -440 312 -275 159
-437 230 -618 273 -93 22 -306 47 -372 44 -15 -1 -80 -5 -144 -9z"/>
        <path d="M3965 8029 c-116 -24 -148 -33 -240 -66 -55 -20 -102 -39 -105 -42
-3 -3 -31 -19 -63 -35 -32 -16 -88 -52 -125 -79 -90 -68 -393 -371 -476 -477
-37 -47 -82 -103 -99 -124 -139 -169 -305 -484 -366 -691 -20 -69 -60 -236
-81 -345 -7 -30 -27 -121 -46 -201 -42 -182 -120 -644 -143 -851 -14 -122 -14
-531 -1 -748 10 -158 22 -250 41 -315 5 -16 23 -82 40 -145 41 -152 115 -373
147 -435 41 -84 94 -157 157 -220 33 -33 94 -100 135 -150 125 -152 556 -572
664 -648 111 -79 338 -198 431 -227 242 -75 322 -106 405 -161 79 -52 167 -96
230 -114 14 -4 61 -20 105 -37 99 -37 212 -48 267 -25 71 30 267 193 333 277
22 28 60 75 85 105 168 200 230 336 245 527 l7 98 -30 30 c-24 23 -39 30 -69
30 -67 -1 -96 -43 -108 -155 -14 -139 -84 -279 -200 -399 -16 -17 -36 -44 -44
-59 -20 -37 -164 -178 -233 -227 -67 -47 -94 -50 -181 -16 -34 13 -80 30 -102
36 -73 23 -142 57 -227 113 -70 46 -116 66 -298 127 -118 39 -237 84 -265 99
-65 37 -156 91 -224 133 -73 45 -517 476 -631 613 -51 61 -118 137 -150 170
-73 75 -119 149 -154 245 -15 41 -31 85 -36 97 -18 43 -92 309 -116 413 -22
97 -25 133 -30 470 -8 418 -2 497 65 890 36 216 45 260 77 397 25 103 70 313
84 388 19 101 64 242 107 335 97 213 175 337 331 534 108 136 384 416 481 489
110 82 239 136 427 177 89 20 117 21 279 15 99 -3 232 -8 295 -10 249 -9 456
-96 602 -253 62 -67 240 -299 268 -349 57 -103 187 -73 184 42 -1 31 -12 59
-46 111 -63 98 -234 308 -309 380 -90 86 -235 174 -334 204 -22 6 -62 18 -90
26 -107 31 -273 44 -555 43 -151 -1 -293 -5 -315 -10z"/>
        <path d="M8365 3028 c-121 -41 -202 -112 -307 -272 -62 -95 -73 -139 -40 -169
52 -47 116 -23 172 65 19 29 37 55 40 58 3 3 16 21 28 42 29 47 94 106 127
114 14 3 69 4 123 2 112 -6 162 -25 290 -112 265 -180 319 -247 408 -510 43
-126 43 -158 0 -202 -6 -6 -27 -30 -46 -54 -78 -99 -223 -245 -289 -294 -17
-13 -41 -34 -54 -47 -12 -13 -39 -33 -60 -44 -20 -11 -37 -22 -37 -26 0 -14
-148 -80 -200 -89 -126 -23 -219 -31 -290 -26 -77 7 -171 25 -180 37 -3 3 -25
15 -50 26 -48 21 -143 108 -173 158 -10 17 -31 57 -48 90 -17 33 -38 74 -48
90 -34 59 -90 221 -94 276 -9 94 4 127 73 191 59 57 188 148 207 148 21 0 43
38 43 73 0 40 -28 77 -58 77 -10 0 -23 5 -29 11 -16 16 -51 2 -88 -35 -36 -34
-67 -60 -135 -107 -25 -18 -51 -40 -58 -50 -7 -10 -26 -32 -44 -49 -84 -84
-103 -203 -58 -365 6 -22 15 -49 19 -60 5 -11 18 -47 30 -80 27 -80 134 -278
180 -335 92 -114 208 -198 306 -223 133 -33 159 -37 263 -37 171 0 354 41 452
101 26 16 52 29 59 29 6 0 11 4 11 10 0 5 18 19 40 30 23 12 38 25 35 29 -2 5
3 12 13 15 28 10 61 32 90 59 116 109 254 253 314 325 85 104 120 198 100 269
-50 175 -86 276 -113 323 -5 8 -18 34 -29 56 -28 55 -121 162 -196 223 -34 28
-65 51 -68 51 -4 0 -12 4 -19 10 -54 44 -76 60 -82 60 -3 0 -25 12 -48 28 -70
45 -81 52 -107 62 -14 6 -34 15 -45 20 -77 35 -261 51 -330 28z"/>
      </g>
    </svg>

  </div>
)




export default App;
