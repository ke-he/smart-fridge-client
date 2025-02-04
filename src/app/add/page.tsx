'use client';

import { useRef, useEffect, useState } from 'react';
import { addItem } from '@/service/item';
import { DatePicker } from '@components';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import CustomButton from '@/components/custom/misc/button/custom-button';
import { ObjectDetection } from '@tensorflow-models/coco-ssd';
import axios from 'axios'; // Import axios for API calls

export default function Add() {
  const [name, setName] = useState('');
  const [itemTypeId, setItemTypeId] = useState(1);
  const [expirationDate, setExpirationDate] = useState<Date | null>(new Date());
  const [createdBy] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false); // New state for API loading spinner
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState<'barcode' | 'manual' | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null); // State to store the product image URL
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [model, setModel] = useState<ObjectDetection | null>(null);

  useEffect(() => {
    setMode('barcode');
  }, []);

  useEffect(() => {
    if (mode === 'manual' && !model) {
      cocoSsd
        .load()
        .then(setModel)
        .catch((error) => {
          console.error('Error loading model:', error);
        });
    }
  }, [mode]);

  const handleSubmit = async () => {
    if (!name.trim() || !expirationDate || !createdBy) {
      alert('Please fill out all fields!');
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
      alert('Item added successfully!');
      setName('');
      setItemTypeId(1);
      setExpirationDate(null);
      setProductImage(null); // Clear image after submission
    } catch (error) {
      console.error('Error while adding item:', error);
      alert('An error occurred, please try again');
    } finally {
      setLoading(false);
    }
  };

  const detectObjects = async () => {
    if (!model || !videoRef.current) return;

    const predictions = await model.detect(videoRef.current);
    if (predictions.length > 0) {
      setName(predictions[0].class);
    } else {
      setName('No object detected');
    }
    handleCloseCamera();
  };

  const handleCapture = () => {
    detectObjects();
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
      .catch((err) => {
        console.error('Error accessing camera:', err);
        alert('Camera access denied or unavailable.');
      });
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleBarcodeDetected = async (barcode: string) => {
    setLoadingProduct(true);
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const data = response.data;
      if (data.status === 1) {
        setName(data.product.product_name_en);
        const imageUrl =
          data.product.selected_images?.front?.display?.de ||
          data.product.image_front_url;
        setProductImage(imageUrl);
      } else {
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      alert('Error fetching product data');
    } finally {
      setLoadingProduct(false);
    }
  };

  return (
    <div
      style={{
        padding: '24px',
        maxWidth: '600px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <style>{`
        .input-container {
          margin-top: 24px;
        }
        .input-container label {
          display: block;
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: bold;
        }
        .add-input {
          border: 1.5px solid #1E2B19;
          padding: 8px 8px 8px 16px;
          width: 100%;
          border-radius: 12px;
        }
        .button-group {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .bordered-button {
          border: 1.5px solid #1E2B19;
          background-color: transparent;
          color: #1E2B19;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: bolder;
          width: 50%;
          border-radius: 12px;
        }
        .filled-button {
          background-color: #1E2B19;
          color: white;
          padding: 8px 16px;
          border: none;
          width: 50%;
          font-size: 12px;
          font-weight: bolder;
          border-radius: 12px;
        }
        .filled-button.red{
            background: #670D0D;
        }
        .date-picker {
          border: 1.5px solid #1E2B19;
          padding: 8px 16px;
          width: 100%;
          border-radius: 12px;
          font-size: 14px;
          font-weight: bold;
          color: #1E2B19;
          background: white;
          outline: none;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .date-picker:hover {
          border-color: #14200F;
        }
        .date-picker:focus {
          border-color: #1E2B19;
          box-shadow: 0 0 4px rgba(30, 43, 25, 0.3);
        }
        .width-100{
          width: 100%;
        }
        /* Simple CSS spinner */
        .spinner {
          margin: 0 auto;
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #1E2B19;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <h1>Add Item</h1>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item Name"
          className="add-input"
        />
      </div>
      <div className="button-group">
        <CustomButton
          className="bordered-button"
          onClick={() => handleOpenCamera('barcode')}
        >
          Scan Barcode
        </CustomButton>
        <CustomButton
          className="filled-button"
          onClick={() => handleOpenCamera('manual')}
        >
          Add Manual
        </CustomButton>
      </div>

      {showCamera && (
        <div>
          {mode === 'barcode' ? (
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(err, result) => {
                if (result?.getText()) {
                  handleBarcodeDetected(result.getText());
                  handleCloseCamera();
                }
              }}
            />
          ) : (
            <div>
              <video
                ref={videoRef}
                width={500}
                height={500}
                autoPlay
                muted
                playsInline
              />
              <div className="button-group">
                <CustomButton className="filled-button" onClick={handleCapture}>
                  Capture Image
                </CustomButton>
                <CustomButton
                  className="filled-button red"
                  onClick={handleCloseCamera}
                >
                  Close Camera
                </CustomButton>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <label>Expiration Date</label>
        <DatePicker
          name="Expiration Date"
          date={expirationDate}
          onChange={setExpirationDate}
          className="date-picker"
        />
      </div>
      <CustomButton filled onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </CustomButton>

      {/* Display a loading spinner while the product API is loading */}
      {loadingProduct && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <div className="spinner"></div>
        </div>
      )}

      {/* Display the product image extracted from the API call */}
      {!loadingProduct && productImage && (
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <img
            src={productImage}
            alt="Product"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
}
