// ============================================================
// src/components/NexusCanvas.jsx
// Nexus Canvas — The Heart of the Engine
// Full inline edit: title, tasks (add / toggle / edit / delete)
// Two-way binding via controlled inputs → handlers → App state
// ============================================================

import { useState, useRef, useEffect } from "react";
import TaskItem from "./TaskItem";

export default function NexusCanvas({
  note,
  onUpdateTitle,
  onTogglePin,
  onDeleteNote,
  onAddTask,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
  // Local controlled input for new task text
  const [newTaskText, setNewTaskText] = useState("");
  const inputRef = useRef(null);

  // Reset new task input whenever active note changes
  useEffect(() => {
    setNewTaskText("");
  }, [note?.id]);

  if (!note) {
    return (
      <main className="canvas-empty">
        <div className="empty-illustration">⬡</div>
        <h2>No Note Selected</h2>
        <p>Select a note from the sidebar or create a new one.</p>
      </main>
    );
  }

  const completedCount = note.tasks.filter((t) => t.done).length;
  const progress = note.tasks.length > 0
    ? (completedCount / note.tasks.length) * 100
    : 0;

  // ── Add task on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddTask(note.id, newTaskText);
      setNewTaskText("");
      inputRef.current?.focus();
    }
  };

  const handleAddClick = () => {
    onAddTask(note.id, newTaskText);
    setNewTaskText("");
    inputRef.current?.focus();
  };

  return (
    <main className="nexus-canvas" style={{ "--note-accent": note.accent }}>
      {/* ── Canvas Header ──────────────────────────────── */}
      <div className="canvas-header">
        <div className="canvas-icon-wrap">
          <span className="canvas-icon">{note.icon}</span>
        </div>

        {/* Inline Title Edit — controlled input */}
        <input
          type="text"
          className="canvas-title-input"
          value={note.title}
          onChange={(e) => onUpdateTitle(note.id, e.target.value)}
          placeholder="Note title..."
          spellCheck={false}
        />

        {/* Header Actions */}
        <div className="canvas-header-actions">
          <button
            className={`hdr-btn ${note.pinned ? "active" : ""}`}
            onClick={() => onTogglePin(note.id)}
            title={note.pinned ? "Unpin" : "Pin note"}
          >
            📌
          </button>
          <button
            className="hdr-btn danger"
            onClick={() => onDeleteNote(note.id)}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* ── Progress Bar ───────────────────────────────── */}
      <div className="canvas-progress-wrap">
        <div className="canvas-progress-track">
          <div
            className="canvas-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="canvas-progress-label">
          {completedCount} / {note.tasks.length} tasks
        </span>
      </div>

      {/* ── Task List ──────────────────────────────────── */}
      <div className="task-list">
        {note.tasks.length === 0 && (
          <div className="task-empty">
            <span>✨</span>
            <p>No tasks yet. Add your first one below!</p>
          </div>
        )}

        {note.tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            noteId={note.id}
            accent={note.accent}
            onToggle={onToggleTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      {/* ── Add Task Input ─────────────────────────────── */}
      <div className="add-task-row">
        <input
          ref={inputRef}
          type="text"
          className="add-task-input"
          placeholder="Add a new task… (Enter to save)"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="add-task-btn"
          onClick={handleAddClick}
          disabled={!newTaskText.trim()}
        >
          ＋
        </button>
      </div>

      {/* ── Meta Footer ────────────────────────────────── */}
      <div className="canvas-footer">
        <span className="meta-chip">{note.icon} {note.title}</span>
        <span className="meta-chip">
          🕐 {new Date(note.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric"
          })}
        </span>
        {note.pinned && <span className="meta-chip pinned-chip">📌 Pinned</span>}
      </div>
    </main>
  );
} 