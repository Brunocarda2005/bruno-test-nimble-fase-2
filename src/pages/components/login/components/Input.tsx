import React from "react";
import styles from "../Login.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, icon, id, ...rest }) => (
  <div className={styles.fieldGroup}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
    <div className={styles.inputWrapper}>
      <span className={styles.inputIcon}>{icon}</span>
      <input id={id} className={styles.input} {...rest} />
    </div>
  </div>
);

export default Input;
