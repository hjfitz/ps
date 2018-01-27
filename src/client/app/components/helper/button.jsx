import React from 'react';

export default ({
  text, classes, link, onClick,
}) => (
  <a href={link} className={`waves-effect waves-light btn ${classes}`} onClick={onClick}>
    {text}
  </a>
);
