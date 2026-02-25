import React, { useState } from "react";
import { useAuthContext } from "@/hooks";
import "./LoginPage.css";
import { isError, isValidEmail } from "@/utils";

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
      const valid = isError(err) && err.message === "INVALID_EMAIL";
      setError(valid ? "El email ingresado no está autorizado." : "Error al autenticar. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <span className="login-fase-badge">FASE 2</span>
            <h1 className="login-title">Nimble Challenge</h1>
            <p className="login-subtitle">Ingresa tu email para acceder al segundo desafío</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="login-form-input"
                placeholder="tu.email@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoFocus
              />
            </div>

            {error && (
              <div className="login-error-message" role="alert">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 4v4M8 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Autenticando..." : "Continuar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
