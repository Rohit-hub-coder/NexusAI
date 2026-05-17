import React from 'react';

export default function AppShell({ 
  children, activeView, setActiveView, sidebarOpen, setSidebarOpen, theme, setTheme, stats, notesCount 
}) {
  const isDark = theme === "dark";

  const menuItems = [
    { id: "dashboard", label: "Analytics Dashboard", icon: "📊" },
    { id: "canvas", label: "Nexus Canvas", icon: "📝" },
    { id: "projects", label: "Project Matrix", icon: "📁" },
    { id: "ai", label: "AI Core Node", icon: "🤖" },
  ];

  return (
    <div style={{ 
      display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif",
      background: isDark ? "#0b0f19" : "#f8fafc", color: isDark ? "#f1f5f9" : "#0f172a" 
    }}>
      
      {/* Premium Sidebar Component */}
      {sidebarOpen && (
        <div style={{
          width: 260, padding: 20, display: "flex", flexDirection: "column", gap: 20,
          background: isDark ? "rgba(255,255,255,.02)" : "#fff",
          borderRight: `1px solid ${isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)"}`
        }} className="fade-in">
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#8b5cf6" }} />
              <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: .5 }}>NEXUS // AI</span>
            </div>
            <button className="nai-btn" onClick={() => setSidebarOpen(false)} style={{ fontSize: 12 }}>✕</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {menuItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className="nai-btn"
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10,
                    fontSize: 12, fontWeight: isActive ? 700 : 500, textAlign: "left",
                    background: isActive ? (isDark ? "rgba(139,92,246,.15)" : "rgba(124,58,237,.08)") : "transparent",
                    color: isActive ? "#a78bfa" : (isDark ? "#94a3b8" : "#475569"),
                    border: `1px solid ${isActive ? "rgba(139,92,246,.2)" : "transparent"}`
                  }}
                >
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  {item.label}
                  {item.id === "canvas" && notesCount > 0 && (
                    <span style={{ marginLeft: "auto", fontSize: 9, background: "#8b5cf6", color: "#fff", padding: "1px 6px", borderRadius: 6 }}>
                      {notesCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Theme Toggle Module */}
          <div style={{ paddingTop: 10, borderTop: isDark ? "1px solid rgba(255,255,255,.05)" : "1px solid rgba(0,0,0,.05)", display: "flex", gap: 10 }}>
            <button 
              className="nai-btn" 
              onClick={() => setTheme(isDark ? "light" : "dark")}
              style={{ fontSize: 11, fontWeight: 600, color: "#8b5cf6", padding: "6px 12px", borderRadius: 8, background: isDark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)" }}
            >
              {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Frame Viewport */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Top Control Header bar */}
        <div style={{ 
          display: "flex", alignItems: "center", gap: 14, padding: "14px 24px",
          background: isDark ? "rgba(255,255,255,.01)" : "#fff",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)"}`
        }}>
          {!sidebarOpen && (
            <button className="nai-btn" onClick={() => setSidebarOpen(true)} style={{ fontSize: 14, marginRight: 8 }}>☰</button>
          )}
          <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, color: "#64748b" }}>
            Workspace Cluster Node // System Core Active
          </span>

          {/* Inline Micro Stats Pipeline Header */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 9, color: "#64748b" }}>Total Canvas Actions</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#34d399" }}>{stats?.totalTasks || 0} Nodes</span>
            </div>
          </div>
        </div>

        {/* View Layout Anchor Root injection node */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {children}
        </div>
      </div>

    </div>
  );
}