import React, { useState } from 'react';
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Generic TextInput component
export const TextInput = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  autoComplete,
  required = false,
  ...others
}) => {
  return (
    <div style={styles.container}>
      <label style={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        style={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        {...others}
      />
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

// Generic TextInput component
export const TextArea = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  rows = 3,
  required = false,
  ...others
}) => {
  return (
    <div style={styles.container}>
      <label style={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        style={styles.textarea}
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...others}
      />
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

// PasswordInput component with show/hide eye toggle
export const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  autoComplete = 'current-password',
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <label style={styles.label} htmlFor={id}>
        {label}
      </label>
      <div style={styles.passwordWrapper}>
        <input
          style={{ ...styles.input, paddingRight: 40 }}
          type={showPassword ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          style={styles.eyeButton}
        >
          {showPassword ? (
            // Eye closed icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.05 10.05 0 0 1 12 20c-5.52 0-10-4.48-10-10 0-2.02.63-3.89 1.69-5.44" />
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
              <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
            </svg>
          ) : (
            // Eye open icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 8,
    border: '1.5px solid #ccc',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    width: "100%",
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 8,
    border: '1.5px solid #ccc',
    width: "100%",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 8,
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
};