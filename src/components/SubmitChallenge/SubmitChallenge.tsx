import { useState } from "react";
import { ChallengeService } from "@/services";
import { isError } from "@/utils";
import { LinkIcon, HashIcon, AlertIcon, CheckIcon } from "@/components/icons/Icons";
import styles from "./SubmitChallenge.module.css";

// ─── Types ────────────────────────────────────────────────

interface SubmitChallengeProps {
  /** applicationId returned from Step 1 (GET credentials) */
  applicationId: string;
}

// ─── Component ────────────────────────────────────────────
const SubmitChallenge: React.FC<SubmitChallengeProps> = ({ applicationId }) => {
  const [pastebinUrl, setPastebinUrl] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const numAnswer = Number(answer);
    if (!pastebinUrl.trim()) {
      setErrorMsg("La URL de Pastebin es requerida.");
      return;
    }
    if (!answer.trim() || isNaN(numAnswer)) {
      setErrorMsg("La respuesta debe ser un número válido.");
      return;
    }

    setStatus("loading");

    try {
      await ChallengeService.submitChallenge({
        applicationId,
        pastebinUrl: pastebinUrl.trim(),
        answer: numAnswer,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        isError(err) ? err.message : "Error inesperado. Intentá nuevamente.",
      );
    }
  };

  return (
    <section className={styles.section} aria-label="Enviar respuesta del challenge">
      <div className={styles.header}>
        <span className={styles.stepBadge}>STEP 3</span>
        <h3 className={styles.title}>Enviar Respuesta</h3>
      </div>

      {status === "success" ? (
        <div className={styles.success} role="status">
          <div className={styles.successIcon}>
            <CheckIcon width={18} height={18} />
          </div>
          <div className={styles.successText}>
            <span className={styles.successTitle}>¡Respuesta enviada correctamente!</span>
            <span className={styles.successSub}>Tu solución fue recibida por el servidor.</span>
          </div>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Pastebin URL */}
          <div className={styles.field}>
            <label htmlFor="pastebinUrl" className={styles.label}>
              URL de Pastebin
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><LinkIcon /></span>
              <input
                id="pastebinUrl"
                className={styles.input}
                type="url"
                placeholder="https://pastebin.com/xxxxxxxx"
                value={pastebinUrl}
                onChange={(e) => { setPastebinUrl(e.target.value); setStatus("idle"); }}
                disabled={status === "loading"}
                autoComplete="off"
              />
            </div>
            <span className={styles.hint}>Subí tu query SQL a Pastebin y pegá el link aquí.</span>
          </div>

          {/* Numeric answer */}
          <div className={styles.field}>
            <label htmlFor="challengeAnswer" className={styles.label}>
              Respuesta numérica
            </label>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><HashIcon /></span>
              <input
                id="challengeAnswer"
                className={styles.input}
                type="number"
                placeholder="Ej: 12345"
                value={answer}
                onChange={(e) => { setAnswer(e.target.value); setStatus("idle"); }}
                disabled={status === "loading"}
                autoComplete="off"
              />
            </div>
            <span className={styles.hint}>El resultado numérico obtenido de tu consulta SQL.</span>
          </div>

          {/* Error */}
          {status === "error" && errorMsg && (
            <div className={styles.error} role="alert">
              <AlertIcon />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={styles.button}
            disabled={status === "loading"}
          >
            {status === "loading" && <span className={styles.spinner} aria-hidden="true" />}
            {status === "loading" ? "Enviando..." : "Enviar Respuesta"}
          </button>

        </form>
      )}
    </section>
  );
};

export default SubmitChallenge;
