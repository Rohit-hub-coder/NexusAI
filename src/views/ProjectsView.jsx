import React, { useState } from 'react';
import * as LucideIcons from "lucide-react";
// Line 3: Cleaned up import map - PRIO_C removed to prevent compilation failure
import { PROJECTS, TEAM, ACTIVITY, STATUS_CFG, TAG_C } from "../data/mockData";
import { GlassCard } from "../components/GlassCard";
import { Avatar } from "../components/UserAvatar";

const PRIORITY_COLOR = { high: "#F472B6", medium: "#FBBF24", low: "#34D399" };

const Tag = ({ label, d }) => {
  const c = TAG_C[label] || "#94a3b8";
  const isGray = c === "#94a3b8";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 6,
      fontSize: 10, fontWeight: 700, letterSpacing: .3, fontFamily: "system-ui, sans-serif",
      background: isGray ? (d ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)") : `${c}18`,
      border: `1px solid ${isGray ? (d ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.08)") : `${c}35`}`, 
      color: isGray ? (d ? "#64748b" : "#94a3b8") : c,
    }}>
      {label}
    </span>
  );
};

const PrioD = ({ p }) => {
  const lowerPrio = String(p).toLowerCase();
  const dotColor = PRIORITY_COLOR[lowerPrio] || "#6b7280";
  return (
    <span style={{ 
      display: "inline-block", 
      width: 7, 
      height: 7, 
      borderRadius: "50%", 
      background: dotColor, 
      boxShadow: `0 0 6px ${dotColor}88` 
    }} />
  );
};

export const ProjectBoard = ({ d }) => {
  const [projectList, setProjectList] = useState(PROJECTS || []);

  const toggleTaskCompletion = (projectId, taskId) => {
    setProjectList(prevProjects => 
      prevProjects.map(proj => {
        if (proj.id === projectId) {
          const updatedTasks = proj.tasks ? proj.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ) : [];
          
          const completedCount = updatedTasks.filter(t => t.completed).length;
          const totalTasks = updatedTasks.length;
          const newProgress = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : proj.progress;

          return { ...proj, tasks: updatedTasks, progress: newProgress };
        }
        return proj;
      })
    );
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14, alignItems: "start" }} className="fade-in">
      {/* Left Workspace Panel: Canvas Items */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p className="nai-display" style={{ fontSize: 15, fontWeight: 700, color: d ? "#f1f5f9" : "#0f172a" }}>
            Project Matrix Canvas
          </p>
          <button className="nai-btn" style={{
            display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 9, fontSize: 11, fontWeight: 600, fontFamily: "system-ui, sans-serif",
            background: d ? "rgba(139,92,246,.12)" : "rgba(124,58,237,.08)", border: `1px solid ${d ? "rgba(139,92,246,.25)" : "rgba(124,58,237,.2)"}`, color: d ? "#a78bfa" : "#7c3aed",
          }}>
            <LucideIcons.Plus size={11} /> Add Item Sheet
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
          {projectList.map((proj) => {
            const sc = STATUS_CFG[proj.status] || { c: "#94a3b8", bg: "transparent", br: "transparent" };
            return (
              <div key={proj.id} style={{
                borderRadius: 16, padding: "15px 14px",
                ...(d ? { background: "rgba(255,255,255,.042)", border: "1px solid rgba(255,255,255,.08)", boxShadow: `0 8px 32px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)` }
                  : { background: "rgba(255,255,255,.82)", border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 4px 20px rgba(0,0,0,.07)" }),
                backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)", position: "relative"
              }} className="slide-up">
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", center: "center", justifyContent: "center",
                    background: `${proj.accent}18`, border: `1px solid ${proj.accent}30`,
                  }}>
                    <LucideIcons.Folder size={15} style={{ color: proj.accent }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="nai-display" style={{ fontSize: 13, fontWeight: 700, color: d ? "#f1f5f9" : "#0f172a", lineHeight: 1.3, marginBottom: 3 }}>
                      {proj.title}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <PrioD p={proj.priority} />
                      <span style={{ fontSize: 10, color: d ? "#475569" : "#94a3b8", fontFamily: "system-ui, sans-serif" }}>{proj.priority}</span>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 9, padding: "3px 8px", borderRadius: 7, fontWeight: 700, flexShrink: 0, fontFamily: "system-ui, sans-serif",
                    background: sc.bg, border: `1px solid ${sc.br}`, color: sc.c,
                  }}>
                    {proj.status}
                  </span>
                </div>

                <p style={{ fontSize: 11, lineHeight: 1.58, color: "#64748b", marginBottom: 10, fontFamily: "system-ui, sans-serif" }}>
                  {proj.desc}
                </p>

                {proj.tasks && proj.tasks.length > 0 && (
                  <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 6, background: d ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.02)", padding: "8px 10px", borderRadius: 10 }}>
                    {proj.tasks.map(task => (
                      <label key={task.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 11, color: d ? "#cbd5e1" : "#334155" }}>
                        <input 
                          type="checkbox" 
                          checked={task.completed} 
                          onChange={() => toggleTaskCompletion(proj.id, task.id)}
                          style={{ accentColor: proj.accent, width: 13, height: 13 }}
                        />
                        <span style={{ textDecoration: task.completed ? "line-through" : "none", opacity: task.completed ? 0.5 : 1 }}>
                          {task.text}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 11 }}>
                  {proj.tags && proj.tags.map(t => <Tag key={t} label={t} d={d} />)}
                </div>

                <div style={{ marginBottom: 11 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: d ? "#475569" : "#94a3b8", fontFamily: "system-ui, sans-serif" }}>Sheet Completion</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: proj.accent, fontFamily: "system-ui, sans-serif" }}>{proj.progress}%</span>
                  </div>
                  <div className="progress-track" style={{ background: d ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)" }}>
                    <div className="progress-bar" style={{ width: `${proj.progress}%`, background: `linear-gradient(90deg,${proj.accent}cc,${proj.accent}66)`, boxShadow: `0 0 8px ${proj.accent}44` }} />
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {proj.members && proj.members.map((m, mi) => (
                      <div key={mi} style={{ marginLeft: mi === 0 ? 0 : -6, zIndex: proj.members.length - mi, position: "relative" }}>
                        <Avatar i={m.i} c={m.c} sz={24} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <LucideIcons.GitBranch size={10} style={{ color: d ? "#475569" : "#94a3b8" }} />
                      <span style={{ fontSize: 10, color: d ? "#475569" : "#94a3b8", fontFamily: "system-ui, sans-serif" }}>{proj.commits}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <LucideIcons.Clock size={10} style={{ color: d ? "#475569" : "#94a3b8" }} />
                      <span style={{ fontSize: 10, color: d ? "#475569" : "#94a3b8", fontFamily: "system-ui, sans-serif" }}>{proj.due}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side Panel Feed Metrics */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <GlassCard d={d} hover={false} style={{ padding: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p className="nai-display" style={{ fontSize: 13, fontWeight: 700, color: d ? "#f1f5f9" : "#0f172a" }}>Workspace Team</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: "#34d399", fontFamily: "system-ui, sans-serif" }}>
                {TEAM ? TEAM.filter(t => t.s === "online").length : 0} active
              </span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {TEAM && TEAM.map((m) => {
              const sC = { online: "#34d399", away: "#f59e0b", offline: "#475569" };
              return (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 8px", borderRadius: 9, background: d ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.025)" }}>
                  <Avatar i={m.i} c={m.c} sz={28} status={m.s} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: d ? "#e2e8f0" : "#1e293b", lineHeight: 1.3, fontFamily: "system-ui, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</p>
                    <p style={{ fontSize: 10, color: d ? "#475569" : "#94a3b8", fontFamily: "system-ui, sans-serif" }}>{m.role}</p>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, fontFamily: "system-ui, sans-serif", color: sC[m.s] }}>{m.s}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard d={d} hover={false} style={{ padding: "14px" }}>
          <p className="nai-display" style={{ fontSize: 13, fontWeight: 700, color: d ? "#f1f5f9" : "#0f172a", marginBottom: 12 }}>Activity Pipeline</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ACTIVITY && ACTIVITY.map((a) => (
              <div key={a.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <Avatar i={a.init} c={a.color} sz={24} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 11, lineHeight: 1.5, fontFamily: "system-ui, sans-serif", color: d ? "#94a3b8" : "#475569" }}>
                    <span style={{ fontWeight: 700, color: d ? "#cbd5e1" : "#334155" }}>{a.init} </span>
                    {a.action} <span style={{ color: d ? "#a78bfa" : "#7c3aed", fontWeight: 500 }}>{a.target}</span>
                  </p>
                  <p style={{ fontSize: 9, color: d ? "#334155" : "#cbd5e1", marginTop: 2, fontFamily: "system-ui, sans-serif" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};