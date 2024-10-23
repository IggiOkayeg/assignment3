// src/App.js
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import ProviderDashboard from './components/ProviderDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import OfferingsList from './components/ConsumerOfferingsList';
import FileUpload from './components/FileUpload';
import OfferingForm from './components/OfferingForm';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get the user's account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Create contract instance
          const contractABI = [{
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "agreementId",
                "type": "uint256"
              }
            ],
            "name": "AgreementCancelled",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "agreementId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "consumer",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "provider",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "capacity",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalPrice",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
              }
            ],
            "name": "AgreementCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "offeringId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "provider",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "capacity",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "pricePerGBPerDay",
                "type": "uint256"
              }
            ],
            "name": "OfferingCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "offeringId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "provider",
                "type": "address"
              }
            ],
            "name": "OfferingRemoved",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "offeringId",
                "type": "uint256"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "provider",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "capacity",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "pricePerGBPerDay",
                "type": "uint256"
              }
            ],
            "name": "OfferingUpdated",
            "type": "event"
          },
          {
            "stateMutability": "payable",
            "type": "fallback",
            "payable": true
          },
          {
            "inputs": [],
            "name": "agreementCounter",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "agreements",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "agreementId",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "consumer",
                "type": "address"
              },
              {
                "internalType": "address payable",
                "name": "provider",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "capacity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "pricePerGBPerDay",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "totalPrice",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [],
            "name": "offeringCounter",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "offerings",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "offeringId",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "provider",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "capacity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "pricePerGBPerDay",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "isAvailable",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
          },
          {
            "stateMutability": "payable",
            "type": "receive",
            "payable": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_capacity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_pricePerGBPerDay",
                "type": "uint256"
              }
            ],
            "name": "createOffering",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_offeringId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_capacity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_pricePerGBPerDay",
                "type": "uint256"
              }
            ],
            "name": "updateOffering",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_offeringId",
                "type": "uint256"
              }
            ],
            "name": "removeOffering",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_offeringId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_capacity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_durationInDays",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
              }
            ],
            "name": "acceptOffering",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
            "payable": true
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_agreementId",
                "type": "uint256"
              }
            ],
            "name": "cancelAgreement",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
          ];
          const contractAddress = '0x6e25D3626C3716BE6c3c38659794657c07B1a595';
          const contractInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);


        // Expose to window for debugging
        window.contract = contractInstance;
        window.account = accounts[0];
        window.web3 = web3Instance; // Optionally expose web3 as well


        } catch (error) {
          console.error('User denied account access or error occurred', error);
        }
      } else {
        alert('Please install MetaMask to use this application.');
      }
    }

    initWeb3();
  }, []);

  return (
    <Router>
      <Navbar account={account} />
      <div className="container">
        <Routes>
          <Route
            path="/provider"
            element={<ProviderDashboard web3={web3} contract={contract} account={account} />}
          />
          <Route
            path="/consumer"
            element={<ConsumerDashboard web3={web3} contract={contract} account={account} />}
          />
          <Route
            path="/offerings"
            element={<OfferingsList web3={web3} contract={contract} account={account} />}
          />
          <Route
            path="/upload"
            element={<FileUpload account={account} />}
          />
          <Route
            path="/offering-form"
            element={<OfferingForm web3={web3} contract={contract} account={account} />}
          />
          <Route
            path="/"
            element={<h1>Welcome to the Decentralized Storage Platform</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;