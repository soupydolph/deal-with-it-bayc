import monkeh from './monkeh.png'
import glassesImg from './deal-with-it.png'
import textImg from './text.png'

import './App.css';
import { useEffect, useRef, useState } from 'react';

import { ethers } from "ethers";

const apiKey = '6niM8j1h84S2doBvZHgyrkUBe7oDck86'

function App() {

  const [selectedFile, setSelectedFile] = useState("")
  const [didGenerate, setDidGenerate] = useState(false)
  const [didConnectWallet, setDidConnectWallet] = useState(false)
  const [testImageUrl, setTestImageUrl] = useState('')
  const [nfts, setNfts] = useState('')

  const images = [monkeh, glassesImg, textImg];
  let count = images.length;

  const ape = new Image();
  const glasses = new Image();
  const dealwithit = new Image();

  const canvasRef = useRef(null)

  useEffect(() => {
    connectToWeb3()
  }, [])

  useEffect(() => {
    if (selectedFile) {
      setupImages();
    }
  })

  const connectToWeb3 = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    const balance = await provider.getBalance("ethers.eth")

    console.log(`balance: ${balance}}`)

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
          setTestImageUrl(nfts[1].media[0].gateway)
          setDidConnectWallet(true)
        })
        .catch(error => console.log('error', error));
    });
  }

  const setupImages = () => {
    var reader = new FileReader();

    reader.onload = function (event) {
      // uploaded image
      ape.src = event.target.result;
      glasses.src = glassesImg
      dealwithit.src = textImg

      ape.onload = counter
      glasses.onload = counter
      dealwithit.onload = counter
    };

    reader.readAsDataURL(selectedFile);
  }

  // When count reaches 0, we're ready to render
  const counter = () => {
    count--;
    if (count === 0) createImage()
  }

  const createImage = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.drawImage(
      ape, 0, 0,
      canvas.width,
      canvas.height
    )

    context.drawImage(
      glasses, 70, 170
    )

    context.drawImage(
      dealwithit, 0, 450,
      canvas.width, 50
    )
  }

  const saveImg = () => {
    const canvas = canvasRef.current

    var dataURL = canvas.toDataURL("image/png");
    var newTab = window.open('about:blank', `DEAL WITH IT ${new Date()}`);
    newTab.document.write("<img src='" + dataURL + "' alt='DEAL WITH IT BAYC'/>");

    setDidGenerate(true)
  }

  const resetEditor = () => {
    setDidGenerate(false)
    setSelectedFile("")
  }

  return (
    <div className="App">

      {!selectedFile &&
        <div className="upload">
          <p>🔜 Upload a picture of your ape to generate an incredible 'Deal with it' version 🔜</p>
          <input type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          ></input>
        </div>
      }

      {selectedFile &&
        <div>
          <div className="image">
            <canvas width="500" height="500" ref={canvasRef}></canvas>
          </div>

          <div className="save">
            <p>Oh shit, that's 🔥!</p>
            <button onClick={() => saveImg()}>🔥 GET IMAGE 🔥</button>
          </div>
        </div>
      }

      { didGenerate &&
        <button onClick={() => resetEditor()}>Make another?</button>
      }

      { didConnectWallet &&
        <img src={testImageUrl} />
      }

      <div>
        <iframe
          title="penises"
          style={{ 'margin-top': '3rem' }}
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1295847877&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        >
        </iframe>
      </div>

    </div>
  );
}

export default App;
