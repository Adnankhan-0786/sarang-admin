import React from 'react';

const Badge = ({ text, type = 'secondary' }) => {
  return <span className={`badge badge-${type}`}>{text}</span>;
};

export default Badge;
