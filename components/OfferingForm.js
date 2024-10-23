// src/components/OfferingForm.js
import React, { useState } from 'react';

function OfferingForm({ onSubmit }) {
  const [capacity, setCapacity] = useState('');
  const [pricePerGBPerDay, setPricePerGBPerDay] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        capacity: parseFloat(capacity),
        pricePerGBPerDay: parseFloat(pricePerGBPerDay),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Capacity (GB):</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Price per GB per Day (ETH):</label>
        <input
          type="number"
          step="0.0001"
          value={pricePerGBPerDay}
          onChange={(e) => setPricePerGBPerDay(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Offering</button>
    </form>
  );
}

export default OfferingForm;
