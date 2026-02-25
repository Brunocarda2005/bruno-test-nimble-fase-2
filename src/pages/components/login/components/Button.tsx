import React from "react";
import styles from "../Login.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ loading = false, children, disabled, ...rest }) => (
  <button className={styles.button} disabled={disabled ?? loading} {...rest}>
    {loading && <span className={styles.spinner} aria-hidden="true" />}
    {children}
  </button>
);

export default Button;
