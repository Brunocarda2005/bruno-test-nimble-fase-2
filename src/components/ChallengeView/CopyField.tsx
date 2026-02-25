/**
 * CopyField
 *
 * Displays a single labeled credential row with a one-click copy button.
 * Provides brief visual feedback ("copied" state) for 1.5 s after copying.
 */
import { useState } from "react";
import { CopiedIcon, CopyIcon } from "@/components/icons/Icons";
import styles from "./ChallengeView.module.css";

interface CopyFieldProps {
  label: string;
  value: string | number;
}

const CopyField: React.FC<CopyFieldProps> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const text = String(value);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.copyField}>
      <span className={styles.copyLabel}>{label}</span>
      <div className={styles.copyValueRow}>
        <span className={styles.copyValue}>{text}</span>
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
          title={`Copy ${label}`}
          aria-label={`Copy ${label}`}
        >
          {copied ? <CopiedIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
};

export default CopyField;
