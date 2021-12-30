const local = process.env.REACT_APP_LOCALTEST === 'TRUE';
console.log('process.env',
  process.env, local)

export const networkCollections = {
  "0x61": [
    //Smart Chain - Testnet
    {
      image: "https://lh3.googleusercontent.com/BWCni9INm--eqCK800BbRkL10zGyflxfPwTHt4XphMSWG3XZvPx1JyGdfU9vSor8K046DJg-Q8Y4ioUlWHiCZqgR_L00w4vcbA-w=s0",
      name: "NFTOT",
      nftAddrs: local ? "0x975404f84305aFF41C29B60f71ae29066Ccfc592" : "0x90dEE6E7C740376bB0320c026F006F8701ECDE13",
      markAddrs: local ? "0x458a45D0b526a7B70704e1064F4CDa2d525B87f8" : "0x0Fe264929a9A2010A987856fE254a2628054dA0f",
      ItemImagesList: 'ItemImages',
      MarketItemsList: 'MarketItems'
    },
  ],
  "0x38": [
    //Smart Chain
    {
      image: "https://lh3.googleusercontent.com/BWCni9INm--eqCK800BbRkL10zGyflxfPwTHt4XphMSWG3XZvPx1JyGdfU9vSor8K046DJg-Q8Y4ioUlWHiCZqgR_L00w4vcbA-w=s0",
      name: "NFTOT",
      nftAddrs: "0xd0267Ad5425F5A99Fd6614a789AA4EC98a771811",
      markAddrs: "0x804389f405A254eCC180CC183C6c98701195A0bC",
      ItemImagesList: 'ItemImages',
      MarketItemsList: 'MarketItems'
    },
  ],
  "0x13881": [
    //mumbai
    {
      image:
        "https://lh3.googleusercontent.com/BWCni9INm--eqCK800BbRkL10zGyflxfPwTHt4XphMSWG3XZvPx1JyGdfU9vSor8K046DJg-Q8Y4ioUlWHiCZqgR_L00w4vcbA-w=s0",
      name: "NFTOT",
      nftAddrs: '0x9c0348d6df8f63429f192f810e19e4c3a7b9ee8c',
      markAddrs: '0x094Db927d895f448a478d753898618534A0cD787',
      ItemImagesList: 'MumbaiItemImages',
      MarketItemsList: 'MumbaiMarketItems'
    },
  ],
  "0x4": [
    //rinkeby
    {
      image: "https://lh3.googleusercontent.com/BWCni9INm--eqCK800BbRkL10zGyflxfPwTHt4XphMSWG3XZvPx1JyGdfU9vSor8K046DJg-Q8Y4ioUlWHiCZqgR_L00w4vcbA-w=s0",
      name: "NFTOT",
      nftAddrs: '0x61480dDa3d997837812F3c600E851BE99485A6C5',
      markAddrs: '0x1b8abD1b770FAB93e0851DD3cC77c829c5274077',
      ItemImagesList: 'RinkebyItemImages',
      MarketItemsList: 'RinkebyMarketItems'
    },
  ],

  "0x1": [
    {
      image:
        "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s130",
      name: "Bored Ape Yacht Club",
      addrs: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    },
    {
      image:
        "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s130",
      name: "Crypto Punks",
      addrs: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    },
    {
      image:
        "https://lh3.googleusercontent.com/l1wZXP2hHFUQ3turU5VQ9PpgVVasyQ79-ChvCgjoU5xKkBA50OGoJqKZeMOR-qLrzqwIfd1HpYmiv23JWm0EZ14owiPYaufqzmj1=s0",
      name: "Bored Ape Kennel Club",
      addrs: "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623",
    },
    {
      image:
        "https://lh3.googleusercontent.com/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ=s0",
      name: "Doodles",
      addrs: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
    },
    {
      image:
        "https://lh3.googleusercontent.com/7gOej3SUvqALR-qkqL_ApAt97SpUKQOZQe88p8jPjeiDDcqITesbAdsLcWlsIg8oh7SRrTpUPfPlm12lb4xDahgP2h32pQQYCsuOM_s=s0",
      name: "0N1 Force",
      addrs: "0x3bf2922f4520a8BA0c2eFC3D2a1539678DaD5e9D",
    },
    {
      image:
        "https://lh3.googleusercontent.com/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI=s0",
      name: "Mutant Ape Yacht Club",
      addrs: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
    },
    {
      image:
        "https://lh3.googleusercontent.com/LIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4=s0",
      name: "CyberKongz",
      addrs: "0x57a204AA1042f6E66DD7730813f4024114d74f37",
    },
    {
      image:
        "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s0",
      name: "Cool Cats NFT",
      addrs: "0x1A92f7381B9F03921564a437210bB9396471050C",
    },
  ],
};

export const getCollectionsByChain = (chain) => networkCollections[chain];


