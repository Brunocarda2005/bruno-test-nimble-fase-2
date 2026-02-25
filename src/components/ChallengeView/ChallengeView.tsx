import type { Candidate } from "@/models";
import { SubmitChallenge } from "@/components";
import CopyField from "./CopyField";
import styles from "./ChallengeView.module.css";

// ─── Types ────────────────────────────────────────────────

interface ChallengeViewProps {
  candidate: Candidate;
  logout: () => void;
}

// ─── Helpers ──────────────────────────────────────────────

/**
 * Normalizes DB credentials from either a nested `dbCredentials`
 * object (preferred) or legacy flat fields on the Candidate object.
 */
function resolveDbCredentials(c: Candidate) {
  if (c.dbCredentials) return c.dbCredentials;
  return {
    host:     c.dbHost ?? "",
    port:     c.dbPort ?? 5432,
    database: c.dbDatabase ?? c.dbName ?? "",
    username: c.dbUsername ?? c.dbUser ?? "",
    password: c.dbPassword ?? "",
  };
}

// ─── Component ────────────────────────────────────────────

/**
 * Main post-login view. Displays:
 *  - User header with logout button (Step 1 result)
 *  - DB credentials with copy-to-clipboard (Step 2)
 *  - Challenge instructions (Step 2)
 *  - Submission form (Step 3)
 */
const ChallengeView: React.FC<ChallengeViewProps> = ({ candidate, logout }) => {
  const db = resolveDbCredentials(candidate);
  const hasDb = db.host || db.database || db.username;
  const instructions = candidate.instructions ?? candidate.challenge;

  return (
    <div className={styles.view}>
      <div className={styles.layout}>

        {/* ── User info card ──────────────────────────────── */}
        <div className={styles.userCard}>
          <div className={styles.userInfo}>
            <span className={styles.badge}>FASE 2</span>
            <h2 className={styles.userName}>
              {candidate.firstName} {candidate.lastName}
            </h2>
            <p className={styles.userMeta}>
              {candidate.email} &mdash; App ID:{" "}
              <code>{candidate.applicationId}</code>
            </p>
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            Log out
          </button>
        </div>

        {/* ── Step 2: DB Credentials ──────────────────────── */}
        {hasDb && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.stepBadge}>STEP 2</span>
              <h3 className={styles.sectionTitle}>Database Credentials</h3>
            </div>
            <p className={styles.hint}>
              Connect with your Postgres client.{" "}
              <strong>SSL Mode: Required.</strong>
            </p>
            <div className={styles.dbGrid}>
              {db.host     && <CopyField label="Host"     value={db.host} />}
              {db.port     && <CopyField label="Port"     value={db.port} />}
              {db.database && <CopyField label="Database" value={db.database} />}
              {db.username && <CopyField label="Username" value={db.username} />}
              {db.password && <CopyField label="Password" value={db.password} />}
            </div>
          </section>
        )}

        {/* ── Challenge instructions ───────────────────────── */}
        {instructions && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Challenge Instructions</h3>
            </div>
            <pre className={styles.instructions}>{instructions}</pre>
          </section>
        )}

        {/* ── Step 3: Submit answer ────────────────────────── */}
        <SubmitChallenge applicationId={candidate.applicationId} />

      </div>
    </div>
  );
};

export default ChallengeView;
