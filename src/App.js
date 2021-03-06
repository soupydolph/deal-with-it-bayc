import { ethers } from "ethers";
import { useState } from 'react';

import ImageSelect from "./screens/ImageSelect";
import Generator from "./screens/Generator";

import './App.css';

const apiKey = '6niM8j1h84S2doBvZHgyrkUBe7oDck86'

function App() {

  const [selectedFile, setSelectedFile] = useState('')

  const [didConnectWallet, setDidConnectWallet] = useState(false)
  const [nfts, setNfts] = useState('')
  const [currentScreen, setCurrentScreen] = useState('imageSelect')
  const [didGenerate, setDidGenerate] = useState(false)

  const connectToWeb3 = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    if (!window.ethereum) {
      alert("Unsupported browser: Please use a browser compatible with MetaMask to connect your wallet - if you're on mobile, try MetaMask's browser, if you're on desktop, install the MetaMask extension")
      return;
    }

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    // const balance = await provider.getBalance("ethers.eth")

    const url = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`

    let ownerAddr = ''; 

    signer.getAddress().then((address) => {
      ownerAddr = address

      const fetchURL = `${url}?owner=${ownerAddr}`;

      // Make the request and print the formatted response:
      fetch(fetchURL, requestOptions)
        .then(response => response.json())
        .then(response => JSON.stringify(response, null, 2))
        .then(result => {
          const nfts = JSON.parse(result).ownedNfts
          setNfts(nfts)
          setDidConnectWallet(true)
        })
        .catch(error => console.log('error', error));

      setDidConnectWallet(true)
    });
  }

  const resetEditor = () => {
    setDidGenerate(false)
    setSelectedFile("")
    setCurrentScreen("imageSelect")
  }

  const renderScreen = (selectedScreen) => {
    switch (selectedScreen) {
      case 'imageSelect':
        return <ImageSelect 
          setSelectedFile={setSelectedFile}
          setCurrentScreen={setCurrentScreen}
          nfts={nfts}
          connectToWeb3={connectToWeb3}
          didConnectWallet={didConnectWallet}
        />
      
      case 'generator':
        return <Generator
          resetEditor={resetEditor}
          selectedFile={selectedFile}
          setDidGenerate={setDidGenerate}
          didGenerate={didGenerate}
          nfts={nfts}
        />

      default:
        <p>Something went wrong</p>
    }
  }

  return (
    <div className="App">

      { renderScreen(currentScreen) }

      <div>
        <iframe
          title="penises"
          style={{ 'marginTop': '3rem' }}
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1295847877&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        >
        </iframe>
      </div>
    </div>
  );
}

export default App;
