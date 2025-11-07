import React from "react";

const Alert = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div
      style={{
        background: "#fdecea",
        color: "#611a15",
        padding: "10px 12px",
        borderRadius: 8,
        marginBottom: 12,
        border: "1px solid #f5c6cb",
      }}
      role="alert"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>{message}</div>
        <button
          onClick={onClose}
          aria-label="close"
          style={{
            marginLeft: 12,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
