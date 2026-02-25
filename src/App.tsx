import { useAuthContext } from "@/hooks";
import { LoginPage } from "@/pages";
import { ChallengeView } from "@/components";

function App() {
  const { candidate, loading, logout } = useAuthContext();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
        <div style={{ width: 32, height: 32, border: "3px solid #1f2937", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
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
