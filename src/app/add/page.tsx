'use client';

import { useRef, useEffect, useState } from 'react';
import { addItem } from '@/service/item';
import { DatePicker } from '@components';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import CustomButton from '@/components/custom/misc/button/custom-button';
import { ObjectDetection } from '@tensorflow-models/coco-ssd';

export default function Add() {
  const [name, setName] = useState('');
  const [itemTypeId, setItemTypeId] = useState(1);
  const [expirationDate, setExpirationDate] = useState<Date | null>(new Date());
  const [createdBy] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState<'barcode' | 'manual' | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [model, setModel] = useState<ObjectDetection | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      }
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
        expiration_date: expirationDate.toISOString(),
        created_by: createdBy,
      });

      alert('Item erfolgreich hinzugefügt!');
      setName('');
      setItemTypeId(1);
      setExpirationDate(null);
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Items:', error);
      alert(
        'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      );
    } finally {
      setLoading(false);
    }
  };

  const detectObjects = async (video: HTMLVideoElement) => {
    if (!model) return;

    const predictions = await model.detect(video);

    if (predictions.length > 0) {
      setName('Object: ' + predictions[0].class);
    } else {
      setName('No object detected');
    }
    setShowCamera(false);
  };

  const handleCapture = async () => {
    if (videoRef.current) {
      await detectObjects(videoRef.current);
    }
  };

  const handleOpenCamera = (scanMode: 'barcode' | 'manual') => {
    setMode(scanMode);
    setShowCamera(true);

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => console.error('Error accessing camera:', err));
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
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
      <CustomButton onClick={() => handleOpenCamera('barcode')}>
        Scan Barcode
      </CustomButton>
      <CustomButton onClick={() => handleOpenCamera('manual')}>
        Add Manual
      </CustomButton>
      {showCamera && (
        <div>
          {mode === 'barcode' ? (
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(_err, result) => {
                if (result) {
                  setName(result.getText());
                  setShowCamera(false);
                } else {
                  setName('No barcode detected');
                }
              }}
            />
          ) : (
            <div>
              <video ref={videoRef} width={500} height={500} />
              <CustomButton onClick={handleCapture}>Capture Image</CustomButton>
            </div>
          )}
          <CustomButton onClick={handleCloseCamera}>Close Camera</CustomButton>
        </div>
      )}
      <DatePicker
        name={'Expiration Date'}
        date={expirationDate}
        onChange={(date) => setExpirationDate(date)}
      />
      <CustomButton onClick={handleSubmit} disabled={loading}>
        {loading ? 'Wird hinzugefügt...' : 'Hinzufügen'}
      </CustomButton>
    </div>
  );
}
