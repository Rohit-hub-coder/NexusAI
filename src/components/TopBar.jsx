// ============================================================
// src/components/TopBar.jsx
// NexusAI — Top navigation bar
// Purely presentational — receives all data as props
// ============================================================

export default function TopBar({ stats, sidebarOpen, onToggleSidebar }) {
  const completionPct =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <header className="topbar">
      {/* Sidebar Toggle */}
      <button className="sidebar-toggle" onClick={onToggleSidebar} title="Toggle Sidebar">
        <span className={`toggle-icon ${sidebarOpen ? "rotated" : ""}`}>☰</span>
      </button>

      {/* App Title */}
      <div className="topbar-title">
        <span className="topbar-logo">⬡</span>
        <h1>NexusAI <span className="canvas-badge">Canvas</span></h1>
      </div>

      {/* Live Completion Pill */}
      <div className="completion-pill">
        <div
          className="completion-fill"
          style={{ width: `${completionPct}%` }}
        />
        <span className="completion-label">{completionPct}% Done</span>
      </div>

      {/* Profile Avatar */}
      <div className="topbar-avatar">
        <span>NS</span>
      </div>
    </header>
  );
}