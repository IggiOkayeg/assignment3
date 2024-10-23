// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ account }) {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/offerings">View Offerings</Link></li>
        <li><Link to="/provider">Provider Dashboard</Link></li>
        <li><Link to="/consumer">Consumer Dashboard</Link></li>
        <li><Link to="/upload">Upload File</Link></li>
      </ul>
      <div>
        <p>Connected account: {account}</p>
      </div>
    </nav>
  );
}

export default Navbar;
