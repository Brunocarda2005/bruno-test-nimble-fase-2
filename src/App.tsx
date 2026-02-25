import "./App.css";
import { useAuthContext } from "@/hooks";
import { LoginPage } from "@/pages";
import type { Candidate } from "@/models";

function ChallengeView({ candidate, logout }: { candidate: Candidate; logout: () => void }) {
  return (
    <div className="challenge-view">
      <div className="challenge-card">
        <span className="challenge-badge">FASE 2</span>
        <h2 className="challenge-greeting">
          Hola, {candidate.firstName} {candidate.lastName}
        </h2>
        <p className="challenge-email">{candidate.email}</p>
        <div className="challenge-meta">
          <div className="challenge-meta-item">
            <span className="challenge-meta-label">Candidate ID</span>
            <span className="challenge-meta-value">{candidate.candidateId}</span>
          </div>
          <div className="challenge-meta-item">
            <span className="challenge-meta-label">Application ID</span>
            <span className="challenge-meta-value">{candidate.applicationId}</span>
          </div>
        </div>
        <button className="challenge-logout-btn" onClick={logout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

function App() {
  const { candidate, loading, logout } = useAuthContext();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {!candidate ? <LoginPage /> : <ChallengeView candidate={candidate} logout={logout} />}
    </div>
  );
}

export default App;
