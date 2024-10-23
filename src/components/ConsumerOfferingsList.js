// src/components/ConsumerOfferingsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OfferingsList({ web3, contract, account }) {
  const [offerings, setOfferings] = useState([]);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [capacity, setCapacity] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3000/offerings')
      .then((response) => {
        setOfferings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offerings:', error);
      });
  }, []);

  const handleAcceptOffer = async () => {
    if (!selectedOffering) {
      alert('No offering selected');
      return;
    }

    if (!capacity || !duration || !startDate) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const offeringId = selectedOffering.offeringId;
      const _capacity = parseInt(capacity);
      const _durationInDays = parseInt(duration);

      // Convert startDate to timestamp
      const _startTime = Math.floor(new Date(startDate).getTime() / 1000);

      // Convert pricePerGBPerDay to wei (assuming it's in ETH in your backend)
      const pricePerGBPerDayWei = web3.utils.toWei(
        selectedOffering.pricePerGBPerDay.toString(),
        'ether'
      );

      // Calculate totalPrice = capacity * pricePerGBPerDay * durationInDays
      const totalPrice = web3.utils
        .toBN(_capacity)
        .mul(web3.utils.toBN(pricePerGBPerDayWei))
        .mul(web3.utils.toBN(_durationInDays));

      // Call the acceptOffering function from your smart contract
      await contract.methods
        .acceptOffering(offeringId, _capacity, _durationInDays, _startTime)
        .send({
          from: account,
          value: totalPrice.toString(),
        });

      alert('Offering accepted successfully!');

      // Reset form fields
      setSelectedOffering(null);
      setCapacity('');
      setDuration('');
      setStartDate('');
    } catch (error) {
      console.error('Error accepting offering:', error);
      alert('Error accepting offering: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Available Storage Offerings</h2>
      <ul>
        {offerings.map((offering, index) => (
          <li key={offering.offeringId || index}>
            <p>
              Offering ID: {offering.offeringId}
              <br />
              Provider: {offering.provider}
              <br />
              Capacity: {offering.capacity} GB
              <br />
              Price: {offering.pricePerGBPerDay} ETH/GB/Day
              <br />
            </p>
            <button onClick={() => setSelectedOffering(offering)}>
              Select Offering
            </button>
          </li>
        ))}
      </ul>

      {selectedOffering && (
        <div>
          <h3>Accept Offering ID: {selectedOffering.offeringId}</h3>
          <div>
            <label>Desired Capacity (GB):</label>
            <input
              type="number"
              max={selectedOffering.capacity}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Duration (Days):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <button onClick={handleAcceptOffer}>Accept Offer</button>
        </div>
      )}
    </div>
  );
}

export default OfferingsList;
