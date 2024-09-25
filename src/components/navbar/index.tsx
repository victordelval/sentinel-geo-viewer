import React from 'react';

import './style.css';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="navbar-title">{APP_NAME ?? 'GeoViewer'}</h1>
    </div>
  );
}
