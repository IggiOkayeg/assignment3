// src/components/ConsumerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConsumerDashboard({ web3, contract, account }) {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    if (account) {
      fetchConsumerAgreements();
    } else {
      console.error('Account is not available');
    }
  }, [account]);

  const fetchConsumerAgreements = () => {
    if (!account) {
      console.error('No account found for fetching agreements');
      return;
    }

    axios
      .get(`http://localhost:3000/agreements/consumer/${account}`)
      .then((response) => {
        setAgreements(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agreements:', error);
      });
  };

  const handleCancelAgreement = async (agreementId, startTime) => {
    if (contract && account) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime < startTime) {
        try {
          await contract.methods
            .cancelAgreement(agreementId)
            .send({ from: account });

          alert('Agreement canceled successfully!');
          fetchConsumerAgreements();
        } catch (error) {
          console.error('Error canceling agreement:', error);
        }
      } else {
        alert('Cannot cancel agreement that has already started.');
      }
    }
  };

  return (
    <div>
      <h2>Consumer Dashboard</h2>
      <h3>Your Agreements:</h3>
      <ul>
        {agreements.map((agreement) => (
          <li key={agreement.agreementId}>
            Agreement ID: {agreement.agreementId}<br />
            Provider: {agreement.provider}<br />
            Capacity: {agreement.capacity} GB<br />
            Start Date: {new Date(agreement.startTime * 1000).toLocaleString()}<br />
            End Date: {new Date(agreement.endTime * 1000).toLocaleString()}<br />
            Status: {agreement.isActive ? 'Active' : 'Inactive'}
            {agreement.isActive && (
              <button
                onClick={() =>
                  handleCancelAgreement(agreement.agreementId, agreement.startTime)
                }
              >
                Cancel Agreement
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsumerDashboard;