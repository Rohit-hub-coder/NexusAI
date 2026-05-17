import React, { useState } from 'react';
import { NOTIFS } from "../data/mockData";

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const IconBell = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconNexus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
    <line x1="12" y1="2" x2="12" y2="22"/>
    <line x1="2" y1="8.5" x2="22" y2="8.5"/>
    <line x1="2" y1="15.5" x2="22" y2="15.5"/>
  </svg>
);

const NAV_LINKS = [
  { id: "dash",    label: "Dashboard" },
  { id: "models",  label: "Models" },
  { id: "deploy",  label: "Deploy" },
  { id: "monitor", label: "Monitor" },
];

export const NavBar = ({ dark, toggle, activeLink, setActiveLink }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [q, setQ] = useState("");
  const unread = NOTIFS ? NOTIFS.filter(n => !n.read).length : 0;

  return (
    <nav className="nav">
      <div className="nav-brand">
        <div className="nav-logo"><IconNexus /></div>
        <span className="nav-wordmark">Nexus<span>AI</span></span>
      </div>

      <div className="nav-links">
        {NAV_LINKS.map(l => (
          <button key={l.id}
            className={`nav-link${activeLink === l.id ? " active" : ""}`}
            onClick={() => setActiveLink && setActiveLink(l.id)}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="nav-search">
        <span className="nav-search-icon"><IconSearch /></span>
        <input type="text" placeholder="Search models, projects…"
          value={q} onChange={e => setQ(e.target.value)} />
      </div>

      <div className="nav-actions">
        <div style={{ position: "relative" }}>
          <button className="icon-btn" onClick={() => setNotifOpen(p => !p)}>
            <IconBell />
            {unread > 0 && <span className="notif-badge" />}
          </button>
          {notifOpen && (
            <>
              <div style={{ position:"fixed", inset:0, zIndex:190 }} onClick={() => setNotifOpen(false)} />
              <div className="notif-dropdown" style={{ position:"absolute", top:"calc(100% + 8px)", right:0 }}>
                <div className="notif-header">Notifications · {unread} unread</div>
                {(NOTIFS || []).map((n, i) => (
                  <div key={i} className="notif-item">
                    <div className={`notif-dot${n.read ? " read" : ""}`} />
                    <div>
                      <div className="notif-text" style={{ margin:0 }}>{n.msg}</div>
                      <div className="notif-time">{n.t}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button className="theme-toggle" onClick={toggle}>
          <div className="theme-knob" />
        </button>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div className="avatar">RK</div>
          <div style={{ lineHeight:1.2 }}>
            <div style={{ fontSize:".82rem", fontWeight:500, color:"var(--text-primary)", whiteSpace:"nowrap" }}>Rohit Kumar</div>
            <div style={{ fontSize:".70rem", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>Lead Engineer</div>
          </div>
        </div>
      </div>
    </nav>
  );
};