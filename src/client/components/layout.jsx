import React from 'react';

export default ({ children }) => (
  <div className="layout container">
    <header />
    {children}
    <footer />
  </div>
);
