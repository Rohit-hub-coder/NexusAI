export default function Dashboard({
  stats, notes, projects, setActiveView, setActiveNoteId, addNote,
}) {
  const recentNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const topProjects = [...projects]
    .sort((a, b) => {
      const pr = { high: 3, medium: 2, low: 1 };
      return pr[b.priority] - pr[a.priority];
    })
    .slice(0, 4);

  const STAT_CARDS = [
    {
      label: "Total Notes",
      value: stats.totalNotes,
      sub: `${stats.pinnedNotes} pinned`,
      icon: "📝",
      accent: "#6EE7B7",
      delta: "+2 this week",
    },
    {
      label: "Tasks Done",
      value: `${stats.doneTasks}/${stats.totalTasks}`,
      sub: `${stats.completionRate}% completion`,
      icon: "✅",
      accent: "#818CF8",
      delta: `${stats.pendingTasks} pending`,
    },
    {
      label: "Active Projects",
      value: stats.activeProjects,
      sub: `of ${stats.totalProjects} total`,
      icon: "🚀",
      accent: "#F472B6",
      delta: `${stats.avgProgress}% avg progress`,
    },
    {
      label: "Avg Progress",
      value: `${stats.avgProgress}%`,
      sub: "across all projects",
      icon: "📊",
      accent: "#FBBF24",
      delta: "↑ 8% from last week",
    },
  ];

  return (
    <div className="view dashboard-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h1 className="view-title">Good morning, Rohit 👋</h1>
          <p className="view-sub">Here's what's happening in your workspace today.</p>
        </div>
        <button className="btn-primary" onClick={addNote}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="btn-icon">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Note
        </button>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {STAT_CARDS.map((card) => (
          <div className="stat-card" key={card.label} style={{ "--accent": card.accent }}>
            <div className="stat-card-top">
              <span className="stat-card-icon">{card.icon}</span>
              <span className="stat-card-delta">{card.delta}</span>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div className="stat-card-label">{card.label}</div>
            <div className="stat-card-sub">{card.sub}</div>
            <div className="stat-card-bar">
              <div
                className="stat-card-fill"
                style={{
                  width: card.label === "Avg Progress" ? card.value :
                    card.label === "Tasks Done" ? `${stats.completionRate}%` : "60%",
                  background: card.accent,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Two-column grid */}
      <div className="dashboard-grid">
        {/* Recent notes */}
        <section className="dash-section">
          <div className="section-header">
            <h2 className="section-title">Recent Notes</h2>
            <button className="section-link" onClick={() => setActiveView("canvas")}>
              View all →
            </button>
          </div>
          <div className="notes-list-compact">
            {recentNotes.map((note) => {
              const done = note.tasks.filter((t) => t.done).length;
              const total = note.tasks.length;
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <button
                  key={note.id}
                  className="note-card-compact"
                  style={{ "--note-accent": note.accent }}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    setActiveView("canvas");
                  }}
                >
                  <div className="note-compact-accent" />
                  <div className="note-compact-body">
                    <div className="note-compact-title">
                      {note.pinned && <span className="pin-badge">📌</span>}
                      {note.title}
                    </div>
                    <div className="note-compact-meta">
                      {total > 0 ? `${done}/${total} tasks` : "No tasks"}
                      {total > 0 && (
                        <span className="note-compact-pct" style={{ color: note.accent }}>
                          {pct}%
                        </span>
                      )}
                    </div>
                    {total > 0 && (
                      <div className="note-compact-prog">
                        <div
                          className="note-compact-prog-fill"
                          style={{ width: `${pct}%`, background: note.accent }}
                        />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active projects */}
        <section className="dash-section">
          <div className="section-header">
            <h2 className="section-title">Project Status</h2>
            <button className="section-link" onClick={() => setActiveView("projects")}>
              View all →
            </button>
          </div>
          <div className="projects-list-compact">
            {topProjects.map((proj) => (
              <div key={proj.id} className="proj-card-compact">
                <div className="proj-compact-top">
                  <div className="proj-compact-dot" style={{ background: proj.color }} />
                  <span className="proj-compact-name">{proj.name}</span>
                  <span className={`proj-status-badge status-${proj.status}`}>
                    {proj.status}
                  </span>
                </div>
                <div className="proj-compact-bar-wrap">
                  <div className="proj-compact-bar">
                    <div
                      className="proj-compact-fill"
                      style={{ width: `${proj.progress}%`, background: proj.color }}
                    />
                  </div>
                  <span className="proj-compact-pct">{proj.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Activity strip */}
      <section className="activity-section">
        <h2 className="section-title" style={{ marginBottom: "1rem" }}>Quick Activity</h2>
        <div className="activity-strip">
          {[
            { icon: "📝", text: "Note created", detail: '"Q3 Product Roadmap"', time: "2h ago", color: "#6EE7B7" },
            { icon: "✅", text: "Task completed", detail: "Finalize design tokens", time: "3h ago", color: "#818CF8" },
            { icon: "🚀", text: "Project updated", detail: "Nexus Canvas → 72%", time: "5h ago", color: "#F472B6" },
            { icon: "🤖", text: "AI query", detail: "Sprint retrospective draft", time: "1d ago", color: "#FBBF24" },
          ].map((act, i) => (
            <div key={i} className="activity-item">
              <div className="act-icon" style={{ background: act.color + "22", color: act.color }}>
                {act.icon}
              </div>
              <div className="act-body">
                <span className="act-text">{act.text}</span>
                <span className="act-detail">{act.detail}</span>
              </div>
              <span className="act-time">{act.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}