import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Hash, Workflow, Brain, Send, Sparkles, Star, ChevronRight } from "lucide-react";
import { CHAT_INIT, PROMPTS, FLOWS } from "../data/mockData";
import { GlassCard } from "../components/GlassCard";
import { Avatar } from "../components/UserAvatar";

export const Sidebar = ({ d }) => {
  const [messages, setMessages] = useState(CHAT_INIT || []);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const endRef = useRef(null);
  const border = d ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)";

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const uM = {
      id: Date.now(),
      role: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, uM]);
    setInput("");

    setTimeout(() => {
      const aiM = {
        id: Date.now() + 1,
        role: "ai",
        text: `Acknowledged. Processing workspace query optimization matrix for: "${input}". Frontend execution telemetry logged.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiM]);
    }, 750);
  };

  return (
    <GlassCard d={d} hover={false} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", padding: "6px", background: d ? "rgba(0,0,0,.15)" : "rgba(0,0,0,.03)", borderRadius: "12px", margin: "12px 12px 0", border: `1px solid ${border}` }}>
        {[
          { id: "chat", label: "Copilot", icon: MessageSquare },
          { id: "prompts", label: "Library", icon: Brain },
          { id: "flows", label: "Agents", icon: Workflow },
        ].map(t => {
          const Icon = t.icon;
          const isAct = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className="nai-btn" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "6px 0", borderRadius: "8px", fontSize: "11px", fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              background: isAct ? (d ? "rgba(255,255,255,.07)" : "#fff") : "transparent",
              boxShadow: isAct && !d ? "0 2px 8px rgba(0,0,0,.05)" : "none",
              color: isAct ? (d ? "#a78bfa" : "#7c3aed") : (d ? "#475569" : "#94a3b8"),
            }}>
              <Icon size={11} /> {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, padding: "12px", overflowY: "auto", minHeight: 0 }} className="scroll-slim">
        {activeTab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map(m => {
              const isAi = m.role === "ai";
              return (
                <div key={m.id} className="slide-up" style={{ display: "flex", gap: 8, flexDirection: isAi ? "row" : "row-reverse" }}>
                  <Avatar i={isAi ? "AI" : "AK"} c={isAi ? "linear-gradient(135deg,#8b5cf6,#22d3ee)" : "#8b5cf6"} sz={24} />
                  <div style={{
                    maxWidth: "80%", padding: "8px 10px", borderRadius: isAi ? "0 12px 12px 12px" : "12px 0 12px 12px", fontSize: "11.5px", lineHeight: 1.5,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    background: isAi ? (d ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.02)") : (d ? "#7c3aed" : "#8b5cf6"),
                    border: isAi ? `1px solid ${border}` : "none",
                    color: isAi ? (d ? "#cbd5e1" : "#334155") : "#fff",
                  }}>
                    <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{m.text}</p>
                    <span style={{ display: "block", textAlign: "right", fontSize: "8.5px", opacity: 0.5, marginTop: 4 }}>{m.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
        )}

        {activeTab === "prompts" && PROMPTS && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {PROMPTS.map(p => (
              <div key={p.id} className="slide-up card-hover" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px", borderRadius: "10px", background: d ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.015)", border: `1px solid ${border}`, cursor: "pointer" }}>
                <span style={{ fontSize: "14px" }}>{p.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "11.5px", fontWeight: 600, color: d ? "#e2e8f0" : "#1e293b", margin: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.title}</p>
                  <p style={{ fontSize: "9.5px", color: d ? "#475569" : "#94a3b8", margin: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.cat}</p>
                </div>
                {p.pinned && <Star size={10} fill="#f59e0b" stroke="#f59e0b" style={{ flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        )}

        {activeTab === "flows" && FLOWS && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {FLOWS.map(f => {
              const FIcon = f.icon;
              return (
                <div key={f.id} className="slide-up card-hover" style={{ padding: "10px", borderRadius: "10px", background: d ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.015)", border: `1px solid ${border}`, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "6px", background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* Fixed: Use safe dynamic layout mounting instantiation */}
                      {FIcon && typeof FIcon === 'function' ? <FIcon size={11} style={{ color: f.color }} /> : <Workflow size={11} style={{ color: f.color }} />}
                    </div>
                    <p style={{ fontSize: "11.5px", fontWeight: 600, color: d ? "#e2e8f0" : "#1e293b", margin: 0, flex: 1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{f.title}</p>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: f.status === "active" ? "#34d399" : "#f59e0b" }} />
                  </div>
                  <p style={{ fontSize: "10px", color: d ? "#475569" : "#94a3b8", margin: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {activeTab === "chat" && (
        <form onSubmit={handleSend} style={{ padding: "10px", borderTop: `1px solid ${border}`, display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, background: d ? "rgba(0,0,0,.2)" : "rgba(0,0,0,.03)", padding: "6px 10px", borderRadius: "10px", border: `1px solid ${border}` }}>
            <input type="text" placeholder="Ask anything..." value={input} onChange={e => setInput(e.target.value)} style={{ flex: 1, fontSize: "11.5px", color: d ? "#94a3b8" : "#64748b", background: "transparent", border: "none", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
            <Sparkles size={11} style={{ color: d ? "#475569" : "#94a3b8" }} />
          </div>
          <button type="submit" className="nai-btn" style={{ width: 28, height: 28, borderRadius: "9px", background: d ? "#7c3aed" : "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
            <Send size={11} />
          </button>
        </form>
      )}
    </GlassCard>
  );
};