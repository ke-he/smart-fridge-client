'use client';

import {useRef, useEffect, useState} from 'react';
import {addItem} from '@/service/item';
import {DatePicker} from '@components';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import CustomButton from '@/components/custom/misc/button/custom-button';
import {ObjectDetection} from '@tensorflow-models/coco-ssd';

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
        } catch (error) {
            console.error('Error whiles adding item:', error);
            alert('An error occurred, please try again');
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
            .getUserMedia({video: {facingMode: 'environment'}})
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

        <div style={{padding: '24px', maxWidth: '600px', width: '100%', margin: '0 auto'}}>
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

      `}</style>

            <h1>Add Item</h1>
            <div className={"input-container"}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Item Name"
                        className={"add-input"}
                    />
                </div>
            </div>
            <div className="button-group">
                <CustomButton className="bordered-button" onClick={() => handleOpenCamera('barcode')}>
                    Scan Barcode
                </CustomButton>
                <CustomButton className="filled-button" onClick={() => handleOpenCamera('manual')}>
                    Add Manual
                </CustomButton>
            </div>

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
                            <div className="button-group">
                                <CustomButton className="filled-button" onClick={handleCapture}>
                                    Capture Image
                                </CustomButton>
                                <CustomButton className="filled-button red" onClick={handleCloseCamera}>
                                    Close Camera
                                </CustomButton>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className={"input-container"}>
                <label>Expiration Date</label>
                <DatePicker
                    name={'Expiration Date'}
                    date={expirationDate}
                    onChange={(date) => setExpirationDate(date)}
                    className="date-picker"
                />
            </div>
            <div className={"input-container"}>
                <CustomButton onClick={handleSubmit} disabled={loading} className="filled-button width-100">
                    {loading ? 'adding...' : 'Add'}
                </CustomButton>
            </div>
        </div>
    );
}
