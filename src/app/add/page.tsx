'use client';

import { useState } from 'react';
import { addItem } from '@/service/item';

export default function Add() {
  const [name, setName] = useState('');
  const [itemTypeId, setItemTypeId] = useState(1); // Standardwert für `item_type_id`
  const [expirationDate, setExpirationDate] = useState(''); // YYYY-MM-DD
  const [createdBy, setCreatedBy] = useState(1); // Beispiel: Benutzer-ID (fix)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !expirationDate.trim() || !createdBy) {
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

  return (
    <div>
      <h1>Item hinzufügen</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name des Items"
        />
      </div>
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
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          placeholder="Ablaufdatum (YYYY-MM-DD)"
        />
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
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Wird hinzugefügt...' : 'Hinzufügen'}
      </button>
    </div>
  );
}
