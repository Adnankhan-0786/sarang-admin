import React from 'react';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options,
  rows,
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">-- Select {label} --</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className="form-control"
          rows={rows || 4}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          className="form-control"
        />
      )}
      {error && (
        <small style={{ color: '#dc2626', marginTop: '0.25rem' }}>
          {error}
        </small>
      )}
    </div>
  );
};

export default FormField;
