'use client';

import { useState, useRef } from "react";
import QRCode from 'react-qr-code';

// IPv4 regex: Ensures each of the 4 segments is 0-255
const ipv4Regex = /^(25[0-5]|2[0-4]\d|[01]?\d?\d)(\.(25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/;

export default function Add() {
  const [name, setName] = useState('');
  const [isValidIP, setIsValidIP] = useState(true);
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setIsValidIP(ipv4Regex.test(value) || value === ''); // Empty is valid until typed
  };

  const handlePrint = () => {
    if (qrCodeRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
        printWindow.document.write(qrCodeRef.current.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
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
        .add-input.invalid {
          border-color: red;
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
        .filled-button.red {
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
        .width-100 {
          width: 100%;
        }
        .error-message {
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }
      `}</style>

      <div>
        <h1>Create Fridge QR Code</h1>
        <div className="input-container">
          <label>Name - add IP address of your Application</label>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="IPv4 address (e.g., 192.168.0.100)"
            className={`add-input ${!isValidIP ? 'invalid' : ''}`}
          />
          {!isValidIP && (
            <div className="error-message">
              Please enter a valid IPv4 address (e.g., 192.168.0.100).
            </div>
          )}
        </div>

        {/* Only show QR code if user typed a valid IP and the field is not empty */}
        {isValidIP && name && (
          <div ref={qrCodeRef} style={{ marginTop: '24px' }}>
            <a href={`${name}/add`} target="_blank" rel="noopener noreferrer">
              <QRCode value={`https://${name}:3000/add`} />
            </a>
          </div>
        )}

        {/* Print button also only visible if valid IP */}
        {isValidIP && name && (
          <div className="button-group">
            <button className="filled-button" onClick={handlePrint}>
              Print QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
