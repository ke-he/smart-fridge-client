'use client';

import { useState, useRef, useEffect } from 'react';
import { Button, DatePicker, Input, ItemTypeSelect } from '@components';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

export default function Add() {
  const [inputValue, setInputValue] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState('');
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const detectObjects = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);
      const objectPrediction = predictions[0];
      if (objectPrediction) {
        setInputValue('Object: ' + objectPrediction.class);
      } else {
        setInputValue('No object detected');
      }
      setShowCamera(false);
    }
  };

  const handleCapture = () => {

    detectObjects();
  };

  const handleOpenCamera = (scanMode) => {
    setMode(scanMode);
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  return (
    <div>
      <h1>Add</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter item or scan barcode"
      />
      <Button onClick={() => handleOpenCamera('barcode')}>Scan Barcode</Button>
      <Button onClick={() => handleOpenCamera('manual')}>Add Manual</Button>
      {showCamera && (
        <div>
          {mode === 'barcode' ? (
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(err, result) => {
                if (result) {
                  setInputValue('Barcode: ' + result.text);
                  setShowCamera(false);
                } else {
                  setInputValue('No barcode detected');
                }
              }}
            />
          ) : (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={500}
                height={500}
              />
              <Button onClick={handleCapture}>Capture Image</Button>
            </div>
          )}
          <Button onClick={handleCloseCamera}>Close Camera</Button>
        </div>
      )}
      <div>
        <label>Expiration Date:</label>
        <DatePicker selected={expirationDate} onChange={(date) => setExpirationDate(date)} />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          min="1"
        />
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select type</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat</option>
        </select>
      </div>
    </div>
  );
}