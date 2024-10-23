// src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({ account }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    // Implement encryption and fragmentation here if needed

    const formData = new FormData();
    formData.append('file', file);
    formData.append('walletAddress', account);

    axios.post('http://localhost:3000/upload', formData)
      .then(response => {
        alert('File uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
