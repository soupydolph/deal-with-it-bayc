import monkeh from './monkeh.png'
import glassesImg from './deal-with-it.png'
import textImg from './text.png'

import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [selectedFile, setSelectedFile] = useState("")

  const images = [monkeh, glassesImg, textImg];
  let count = images.length;
  const ape = new Image();
  const glasses = new Image();
  const dealwithit = new Image();

  const canvasRef = useRef(null)

  useEffect(() => {
    if (selectedFile) {
      setupCanvas();
    }
  })

  const setupCanvas = () => {
    var reader = new FileReader();

    reader.onload = function(event) {
      ape.src = event.target.result;
      glasses.src = glassesImg
      dealwithit.src = textImg
  
      ape.onload = counter
      glasses.onload = counter
      dealwithit.onload = counter
    };

    reader.readAsDataURL(selectedFile);
  }

  const counter = () => {
    count--;
    if (count === 0) createImage()
  }

  const createImage = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.drawImage(
      ape, 0, 0, 
      ape.width,
      ape.height,     
      // source rectangle
      0, 0, canvas.width, canvas.height
    )

    context.drawImage(
      glasses, 50, 160
    )

    context.drawImage(
      dealwithit, 0, 450,
      canvas.width, 50
    )
  }

  const saveImg = () => {
    const canvas = canvasRef.current

    var dataURL = canvas.toDataURL("image/png");
    var newTab = window.open('about:blank','image from canvas');
    newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
  }

  return (
    <div className="App">
      <input type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      ></input>
      <canvas width="500" height="500" ref={canvasRef}></canvas>
      <button onClick={ () => saveImg() }>Save</button>
    </div>
  );
}

export default App;
