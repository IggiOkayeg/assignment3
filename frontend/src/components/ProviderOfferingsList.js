// src/components/OfferingList.js
import React, { useState } from 'react';

function OfferingList({ offerings, onUpdate, onDelete }) {
  const [editingOfferingId, setEditingOfferingId] = useState(null);
  const [updatedCapacity, setUpdatedCapacity] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  const handleEditClick = (offering) => {
    setEditingOfferingId(offering.offeringId);
    setUpdatedCapacity(offering.capacity);
    setUpdatedPrice(offering.pricePerGBPerDay);
  };

  const handleUpdateSubmit = (offeringId) => {
    onUpdate(offeringId, {
      capacity: parseFloat(updatedCapacity),
      pricePerGBPerDay: parseFloat(updatedPrice),
    });
    setEditingOfferingId(null);
  };

  return (
    <ul>
      {offerings.map((offering) => (
        <li key={offering.offeringId}>
          {editingOfferingId === offering.offeringId ? (
            <div>
              <input
                type="number"
                value={updatedCapacity}
                onChange={(e) => setUpdatedCapacity(e.target.value)}
              />
              <input
                type="number"
                step="0.0001"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
              <button
                onClick={() => handleUpdateSubmit(offering.offeringId)}
              >
                Save
              </button>
              <button onClick={() => setEditingOfferingId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>
                Offering ID: {offering.offeringId}<br />
                Capacity: {offering.capacity} GB<br />
                Price: {offering.pricePerGBPerDay} ETH/GB/Day<br />
              </p>
              <button onClick={() => handleEditClick(offering)}>Edit</button>
              <button onClick={() => onDelete(offering.offeringId)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default OfferingList;
