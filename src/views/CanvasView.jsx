import React, { useState } from 'react';
import * as LucideIcons from "lucide-react";
import { GlassCard } from "../components/GlassCard";

export const CanvasView = ({
  filteredNotes, activeNoteId, setActiveNoteId, addNote, deleteNote,
  updateNoteTitle, addTask, toggleTask, deleteTask, d
}) => {
  const [newTaskText, setNewTaskText] = useState("");

  const activeNote = filteredNotes.find(n => n.id === activeNoteId) || filteredNotes[0] || null;

  const handleAddTaskSubmit = (e, noteId) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addTask(noteId, newTaskText);
    setNewTaskText("");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 14, height: "calc(100vh - 110px)" }} className="fade-in">
      
      {/* Left Pane: Tactile Notes Sheet Selector List */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 10, padding: 12, borderRadius: 16,
        background: d ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.02)",
        border: `1px solid ${d ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)"}`
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: d ? "#94a3b8" : "#475569", textTransform: "uppercase", letterSpacing: .5 }}>Notes Stack</span>
          <button onClick={addNote} className="nai-btn" style={{
            width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            background: "#8b5cf6", color: "#fff"
          }}>
            <LucideIcons.Plus size={12} />
          </button>
        </div>

        <div className="scroll-slim" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredNotes.map((note) => {
            const isActive = note.id === activeNoteId;
            const completedTasks = note.tasks ? note.tasks.filter(t => t.completed || t.done).length : 0;
            const totalTasks = note.tasks ? note.tasks.length : 0;
            
            return (
              <div 
                key={note.id} 
                onClick={() => setActiveNoteId(note.id)}
                style={{
                  padding: "10px 12px", borderRadius: 12, cursor: "pointer", position: "relative",
                  transition: "all .2s ease", transform: isActive ? "scale(1.02)" : "scale(1)",
                  background: isActive ? (d ? "rgba(255,255,255,.05)" : "#fff") : "transparent",
                  border: `1px solid ${isActive ? (note.accent || "#8b5cf6") : "transparent"}`,
                  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,.05)" : "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: note.accent || "#8b5cf6" }} />
                  <p style={{ fontSize: 12, fontWeight: 600, color: d ? "#f1f5f9" : "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {note.title || "Untitled Note"}
                  </p>
                  {note.pinned && <LucideIcons.Pin size={10} style={{ color: note.accent, transform: "rotate(45deg)" }} />}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#64748b" }}>
                  <span>Tasks Checklist</span>
                  <span>{completedTasks}/{totalTasks}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Premium Skeuomorphic "Floating Paper" Canvas Surface Workspace */}
      <div style={{ position: "relative", height: "100%" }}>
        {activeNote ? (
          <div style={{
            height: "100%", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column",
            background: d ? "rgba(255,255,255,.03)" : "#fff",
            border: "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,.15)",
            position: "relative"
          }} className="slide-up">
            
            {/* Top Interactive Styling Banner */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, pb: 12, borderBottom: d ? "1px solid rgba(255,255,255,.05)" : "1px solid rgba(0,0,0,.05)" }}>
              <input 
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNoteTitle(activeNote.id, e.target.value)}
                style={{ flex: 1, fontSize: 16, fontWeight: 700, color: d ? "#f1f5f9" : "#0f172a", background: "transparent" }}
              />
              <button onClick={() => deleteNote(activeNote.id)} className="nai-btn" style={{ padding: 6, borderRadius: 8, color: "#f87171" }}>
                <LucideIcons.Trash2 size={14} />
              </button>
            </div>

            {/* Task Checklist Sandbox Layer (Sheryians Inspired Dynamic Array Manipulation Flow) */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: d ? "#64748b" : "#94a3b8", textTransform: "uppercase", letterSpacing: .5 }}>Interactive Checklist Items</p>
              
              <div className="scroll-slim" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {activeNote.tasks && activeNote.tasks.map((task) => {
                  const isDone = task.completed || task.done;
                  return (
                    <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: d ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.015)" }}>
                      <input 
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleTask(activeNote.id, task.id)}
                        style={{ accentColor: activeNote.accent, width: 14, height: 14, cursor: "pointer" }}
                      />
                      <span style={{ flex: 1, fontSize: 12, color: d ? "#cbd5e1" : "#334155", textDecoration: isDone ? "line-through" : "none", opacity: isDone ? 0.45 : 1 }}>
                        {task.text}
                      </span>
                      <button onClick={() => deleteTask(activeNote.id, task.id)} className="nai-btn" style={{ opacity: .4, color: "#f87171" }}>
                        <LucideIcons.X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Add New Checkpoint Form Matrix */}
              <form onSubmit={(e) => handleAddTaskSubmit(e, activeNote.id)} style={{ display: "flex", gap: 8, background: d ? "rgba(0,0,0,.15)" : "rgba(0,0,0,.02)", padding: 6, borderRadius: 10 }}>
                <input 
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Drop a new checklist checkpoint node..."
                  style={{ flex: 1, padding: "6px 10px", fontSize: 12, color: d ? "#f1f5f9" : "#0f172a" }}
                />
                <button type="submit" className="nai-btn" style={{ background: activeNote.accent || "#8b5cf6", width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                  <LucideIcons.Plus size={14} />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.4, gap: 8 }}>
            <LucideIcons.Layers size={36} style={{ color: "#8b5cf6" }} />
            <p style={{ fontSize: 12, fontFamily: "system-ui, sans-serif" }}>No canvas sheets matching criteria initialized.</p>
          </div>
        )}
      </div>

    </div>
  );
};