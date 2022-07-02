import React, { useEffect, useRef, useState } from 'react';

import glassesImg from './../deal-with-it.png'
import textImg from './../text.png'

const Generator = (props) => {

  const canvasRef = useRef(null)

  const ape = new Image();
  const glasses = new Image();
  const dealwithit = new Image();

  const images = [glassesImg, textImg];

  let count = images.length;

  useEffect(() => {
    setupImages()
  })

  const setupImages = async () => {
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

    // Files come back from upload, blobs come back from blockchain
    if (props.selectedFile instanceof File) {
      reader.readAsDataURL(props.selectedFile);
    } else {
      // Get the url of the image
      let response = await fetch(props.selectedFile)
      
      // format the response to a blob
      let data = await response.blob()
      let metadata = {
        type: 'image/png'
      };

      // pass the blob into a new File object
      let file = new File([data], "test.png", metadata);
      
      // pass the newly created object to:
      reader.readAsDataURL(file);
    }
  }

  const counter = () => {
    count--;
    if (count === 0) createImage()
  }

  const saveImg = () => {
    const canvas = canvasRef.current

    var dataURL = canvas.toDataURL("image/png");
    var newTab = window.open('about:blank', `DEAL WITH IT ${new Date()}`);
    newTab.document.write("<img src='" + dataURL + "' alt='DEAL WITH IT BAYC'/>");

    props.setDidGenerate(true)
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

  return(
    <div>
      <div className="image">
        <canvas width="500" height="500" ref={canvasRef}></canvas>
      </div>

      <div className="save">
        <p>Oh shit, that's 🔥!</p>
        <button onClick={() => saveImg()}>🔥 GET IMAGE 🔥</button>
      </div>

      { props.didGenerate &&
        <button onClick={() => props.resetEditor()}>Make another?</button>
      }
    </div>
  )
}

export default Generator