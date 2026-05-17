// ============================================================
// src/components/StatsBar.jsx
// NexusAI — Live SaaS metrics bar
// Receives `stats` derived in App.jsx via deriveStats()
// Every note/task mutation auto-updates these cards.
// ============================================================

import { SAAS_STATS_CONFIG } from "../data/mockData";

export default function StatsBar({ stats }) {
  return (
    <section className="stats-bar">
      {SAAS_STATS_CONFIG.map(({ key, label, icon, color }) => (
        <div className="stat-card" key={key} style={{ "--stat-color": color }}>
          <div className="stat-icon">{icon}</div>
          <div className="stat-body">
            <span className="stat-value">{stats[key] ?? 0}</span>
            <span className="stat-label">{label}</span>
          </div>
          {/* Accent bar derived from color */}
          <div className="stat-accent-bar" />
        </div>
      ))}
    </section>
  );
}