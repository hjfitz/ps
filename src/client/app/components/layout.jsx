import React from 'react';
import { Header } from './partial';

export default ({ children }) => (
  <div className="layout">
    <Header />
    <div className="container">
      {children}
    </div>
    <footer />
  </div>
);
