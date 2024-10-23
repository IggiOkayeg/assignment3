import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OfferingForm from './OfferingForm';
import OfferingList from './ProviderOfferingsList';

function ProviderDashboard({ web3, contract, account }) {
  const [offerings, setOfferings] = useState([]);

  useEffect(() => {
    fetchProviderOfferings();
  }, [account]);

  const fetchProviderOfferings = () => {
    axios
      .get(`http://localhost:3000/offerings/provider/${account}`)
      .then((response) => {
        setOfferings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offerings:', error);
      });
  };

  const handleAddOffering = async (offeringData) => {
    const { capacity, pricePerGBPerDay } = offeringData;
  
    try {
      // Capacity should NOT be converted to Wei
      //const convertedPrice = web3.utils.toWei(pricePerGBPerDay.toString(), 'ether'); // Only convert price
  
      await contract.methods
        .createOffering(
          capacity,  // Use the capacity as it is
          pricePerGBPerDay   // Only price should be converted to Wei
        )
        .send({ from: account });
  
      alert('Offering created successfully!');
      fetchProviderOfferings();
    } catch (error) {
      console.error('Error creating offering:', error);
    }
  };

  const handleUpdateOffering = async (offeringId, updatedData) => {
    const { capacity, pricePerGBPerDay } = updatedData;
  
    try {
      // Only convert pricePerGBPerDay to Wei
      //const convertedPrice = web3.utils.toWei(pricePerGBPerDay.toString(), 'ether');
  
      await contract.methods
        .updateOffering(
          offeringId,
          capacity,            // Keep capacity as it is (in GB)
          pricePerGBPerDay     // Convert price to Wei
        )
        .send({ from: account });
  
      alert('Offering updated successfully!');
      fetchProviderOfferings();
    } catch (error) {
      console.error('Error updating offering:', error);
      alert('Failed to update offering. See console for details.');
    }
  };

  const handleDeleteOffering = async (offeringId) => {
    try {
      await contract.methods
        .removeOffering(offeringId)
        .send({ from: account });

      alert('Offering deleted successfully!');
      fetchProviderOfferings();
    } catch (error) {
      console.error('Error deleting offering:', error);
    }
  };

  return (
    <div>
      <h2>Provider Dashboard</h2>
      <h3>Create New Offering</h3>
      <OfferingForm onSubmit={handleAddOffering} />

      <h3>Your Offerings</h3>
      <OfferingList
        offerings={offerings}
        onUpdate={handleUpdateOffering}
        onDelete={handleDeleteOffering}
      />
    </div>
  );
}

export default ProviderDashboard;
