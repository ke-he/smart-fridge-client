'use client';

import { useEffect, useRef, useState } from "react";
import { addItem } from '@/service/item';
import { Button, DatePicker, Input, ItemTypeSelect, NumberPicker } from '@components';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';


export default function Add() {
  const [name, setName] = useState('');
  const [itemTypeId, setItemTypeId] = useState(1); // Standardwert für `item_type_id`
  const [expirationDate, setExpirationDate] = useState(new Date()); // YYYY-MM-DD
  const [createdBy, setCreatedBy] = useState(1); // Beispiel: Benutzer-ID (fix)
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState('');
  const [amount, setAmount] = useState(1);
  const [type, setType] = useState('');
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !expirationDate || !createdBy) {
      alert('Bitte alle Felder ausfüllen!');
      return;
    }

    setLoading(true);

    try {
      await addItem({
        name,
        item_type_id: itemTypeId,
        expiration_date: expirationDate,
        created_by: createdBy,
      });

      alert('Item erfolgreich hinzugefügt!');
      setName('');
      setItemTypeId(1);
      setExpirationDate('');
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Items:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  const detectObjects = async (video) => {
    const predictions = await model.detect(video);
    const objectPrediction = predictions[0];
    if (objectPrediction) {
      setName('Object: ' + objectPrediction.class);
    } else {
      setName('No object detected');
    }
    setShowCamera(false);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      detectObjects(videoRef.current);
    }
  };

  const handleOpenCamera = (scanMode) => {
    setMode(scanMode);
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(err => console.error('Error accessing camera: ', err));
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  return (
    <div>
      <h1>Add Item</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name des Items"
        />
      </div>
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
                  setName(result.text);
                  setShowCamera(false);
                } else {
                  setName('No barcode detected');
                }
              }}
            />
          ) : (
            <div>
              <video ref={videoRef} width={500} height={500} />
              <Button onClick={handleCapture}>Capture Image</Button>
            </div>
          )}
          <Button onClick={handleCloseCamera}>Close Camera</Button>
        </div>
      )}
      <div>
        <label>Item-Typ-ID:</label>
        <input
          type="number"
          value={itemTypeId}
          onChange={(e) => setItemTypeId(Number(e.target.value))}
          placeholder="Item-Typ-ID (z.B. 1)"
        />
      </div>
      <div>
        <label>Ablaufdatum:</label>
        <DatePicker selected={expirationDate} onChange={(date) => setExpirationDate(date.target.value)}/>

      </div>
      <div>
        <label>Erstellt von (User-ID):</label>
        <input
          type="number"
          value={createdBy}
          onChange={(e) => setCreatedBy(Number(e.target.value))}
          placeholder="Erstellt von (z.B. 1)"
        />
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Wird hinzugefügt...' : 'Hinzufügen'}
      </Button>
    </div>
  );
}
