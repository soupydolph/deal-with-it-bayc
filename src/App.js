import monkeh from './monkeh.png'
import glassesImg from './deal-with-it.png'
import textImg from './text.png'

import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [selectedFile, setSelectedFile] = useState("")
  const [didGenerate, setDidGenerate] = useState(false)

  const images = [monkeh, glassesImg, textImg];
  let count = images.length;

  const ape = new Image();
  const glasses = new Image();
  const dealwithit = new Image();

  const canvasRef = useRef(null)

  useEffect(() => {
    if (selectedFile) {
      setupImages();
    }
  })

  const setupImages = () => {
    var reader = new FileReader();

    reader.onload = function(event) {
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

    { !selectedFile &&
      <div className="upload">
        <p>🔜 Upload a picture of your ape to generate an incredible 'Deal with it' version 🔜</p>
        <input type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        ></input>
      </div>
    }

    { selectedFile &&
      <div>
        <div className="image">
          <canvas width="500" height="500" ref={canvasRef}></canvas>
        </div>
    
        <div className="save">
          <p>Oh shit, that's! 🔥</p>
          <button onClick={ () => saveImg() }>🔥 GENERATE 🔥</button>
        </div>
      </div>
    }

    { didGenerate &&
      <button onClick={() => resetEditor() }>Make another?</button>
    }
    </div>
  );
}

export default App;
