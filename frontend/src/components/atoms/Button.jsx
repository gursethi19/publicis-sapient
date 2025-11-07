import React from "react";

const Button = ({
  children,
  onClick,
  disabled,
  className,
  type = "button",
}) => (
  <button
    className={className}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

export default Button;
