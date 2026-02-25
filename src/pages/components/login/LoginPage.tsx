import React, { useState } from "react";
import { useAuthContext } from "@/hooks";
import { isError, isValidEmail } from "@/utils";
import { EmailIcon, AlertIcon } from "@/components/icons/Icons";
import styles from "./Login.module.css";
import Input from "./components/Input";
import Button from "./components/Button";

// ─── Component ────────────────────────────────────────────
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Por favor ingresa tu email");
      return;
    }

    const { valid, message } = isValidEmail(email);
    if (!valid) {
      setError(message);
      return;
    }

    setIsLoading(true);

    try {
      await login(email);
    } catch (err) {
      const isInvalidEmail = isError(err) && err.message === "INVALID_EMAIL";
      setError(
        isInvalidEmail
          ? "El email ingresado no está autorizado."
          : "Error al autenticar. Intenta nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>FASE 2</span>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to continue</p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="tu.email@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<EmailIcon />}
            disabled={isLoading}
            autoFocus
            autoComplete="email"
          />

          {error && (
            <div className={styles.error} role="alert">
              <AlertIcon />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" loading={isLoading}>
            {isLoading ? "Autenticando..." : "Continuar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
