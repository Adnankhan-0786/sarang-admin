import React from 'react';

const StatCard = ({ title, value, icon, color = 'primary', trend }) => {
  const colorClass = {
    primary: '',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
  }[color];

  return (
    <div className={`stat-card ${colorClass}`}>
      <div className="stat-content">
        <h3>{title}</h3>
        <div className="stat-value">{value}</div>
        {trend && <small style={{ marginTop: '0.5rem' }}>{trend}</small>}
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  );
};

export default StatCard;
