import React from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  const icons = {
    success: '✓',
    danger: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`alert alert-${type}`}>
      <span>{icons[type]}</span>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
