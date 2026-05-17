import React, { useState, useRef, useEffect } from 'react';
import * as LucideIcons from "lucide-react";
import { GlassCard } from "../components/GlassCard";

// ─── REPLACE EVERYTHING FROM HERE ───
const AI_SUGGESTIONS = [
  "Summarize my Q3 roadmap progress",
  "Which projects need attention this week?",
  "Generate sprint retrospective notes",
  "Analyze task completion patterns",
  "Draft a status update for the team",
];

export const AIView = ({ aiHistory, aiInput, setAiInput, sendAiMessage, d }) => {
// ─── DOWN TO HERE ───

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendAiMessage(aiInput);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 14, height: "calc(100vh - 110px)" }} className="fade-in">
      {/* Central Chat Node Panel */}
      <div style={{ 
        display: "flex", flexDirection: "column", height: "100%", borderRadius: 16, padding: 16,
        ...(d ? { background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }
              : { background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.05)" }),
        backdropFilter: "blur(20px)"
      }}>
        
        {/* Terminal Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 12, borderBottom: d ? "1px solid rgba(255,255,255,.06)" : "1px solid rgba(0,0,0,.06)" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f87171" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fbbf24" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: 11, fontWeight: 600, marginLeft: 6, color: d ? "#94a3b8" : "#475569", fontFamily: "monospace" }}>nexus_ai_core_node.sh</span>
        </div>

        {/* Scrollable Log Output Workspace */}
        <div className="scroll-slim" style={{ flex: 1, overflowY: "auto", padding: "14px 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {aiHistory.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 10, opacity: 0.5 }}>
              <LucideIcons.BrainCircuit size={32} style={{ color: d ? "#a78bfa" : "#7c3aed" }} />
              <p style={{ fontSize: 12, fontFamily: "system-ui, sans-serif", color: d ? "#94a3b8" : "#475569" }}>Core pipeline online. Awaiting data parsing parameters...</p>
            </div>
          ) : (
            aiHistory.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div key={msg.id} style={{
                  display: "flex", gap: 10, alignSelf: isUser ? "flex-end" : "flex-start",
                  maxWidth: "80%", flexDirection: isUser ? "row-reverse" : "row"
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: isUser ? "#8b5cf6" : (d ? "rgba(255,255,255,.06)" : "rgba(124,58,237,.1)"),
                    color: isUser ? "#fff" : "#a78bfa"
                  }}>
                    {isUser ? <LucideIcons.User size={12} /> : <LucideIcons.Bot size={12} />}
                  </div>
                  <div style={{
                    padding: "8px 12px", borderRadius: 12, fontSize: 12, lineHeight: 1.5, fontFamily: "system-ui, sans-serif",
                    background: isUser ? "#8b5cf6" : (d ? "rgba(255,255,255,.04)" : "#fff"),
                    border: isUser ? "none" : `1px solid ${d ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)"}`,
                    color: isUser ? "#fff" : (d ? "#e2e8f0" : "#1e293b"),
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Text Form Matrix */}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, background: d ? "rgba(0,0,0,.2)" : "rgba(255,255,255,.9)", padding: 6, borderRadius: 10, border: `1px solid ${d ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)"}` }}>
          <input 
            type="text" 
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Ask AI to scan notes or compile tasks..." 
            style={{ flex: 1, padding: "6px 10px", fontSize: 12, color: d ? "#f1f5f9" : "#0f172a" }}
          />
          <button type="submit" className="nai-btn" style={{ background: "#8b5cf6", width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            <LucideIcons.ArrowUp size={14} />
          </button>
        </form>
      </div>

      {/* Right Side Prompt Injector Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <GlassCard d={d} hover={false} style={{ padding: 14 }}>
          <p className="nai-display" style={{ fontSize: 13, fontWeight: 700, color: d ? "#f1f5f9" : "#0f172a", marginBottom: 10 }}>Contextual Filters</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {AI_SUGGESTIONS && AI_SUGGESTIONS.map((sug, idx) => (
              <button 
                key={idx} 
                onClick={() => setAiInput(sug)}
                className="nai-btn" 
                style={{
                  textAlign: "left", padding: "8px 10px", borderRadius: 8, fontSize: 11, lineHeight: 1.4, fontFamily: "system-ui, sans-serif",
                  background: d ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.02)",
                  border: `1px solid ${d ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"}`,
                  color: d ? "#cbd5e1" : "#475569"
                }}
              >
                {sug}
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};