import { useEffect, useState } from "react"

const ImageSelect = (props) => {

  const [showWallet, setShowWallet] = useState(false) 

  useEffect(()=>{
    if(!props.didConnectWallet) {
      showWalletNfts()
    }
  }, [props.didConnectWallet])

  const handleUpload = (e) => {
    props.setCurrentScreen('generator')
    props.setSelectedFile(e.target.files[0])
  }

  const handleConnect = () => {
    props.connectToWeb3()
  }

  const showWalletNfts = () => {
    setShowWallet(true)
  }

  const selectNfts = (nftIndex) => {
    props.setCurrentScreen('generator')
    props.setSelectedFile(props.nfts[nftIndex].media[0].gateway)
    setShowWallet(false)
  }

  const renderNftItems = () => {
    return props.nfts.map((nft, index) => <img 
              key={`${index}-wallet-item`}
              width="100" 
              height="100"
              src={nft.media[0].gateway} 
              onClick={() => selectNfts(index)} 
              alt="deal-with-it"
            />
    )
  }

  return(
    <div className="upload">
      <p>🔜 Upload a picture of your ape to generate an incredible 'Deal with it' version 🔜</p>

      {/* <button onClick={() => showWalletNfts() }>Connect wallet</button> */}
      <button onClick={() => handleConnect() }>Connect wallet</button>

      { showWallet && props.nfts &&
        <div>
          <h2>Select an image</h2>
          { renderNftItems() }
        </div>
      }

      <p>OR</p>

      <input type="file"
        onChange={(e) => handleUpload(e)}
      ></input>
    </div>
  )
}

export default ImageSelect