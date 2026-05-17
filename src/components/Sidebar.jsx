// ============================================================
// src/components/Sidebar.jsx
// NexusAI — Left navigation panel
// Receives: notes list, handlers. No internal state mutation.
// ============================================================

import { useState } from "react";

export default function Sidebar({
  notes,
  activeNoteId,
  isOpen,
  searchQuery,
  onSearch,
  onSelectNote,
  onAddNote,
  onDeleteNote,
  onTogglePin,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const pinned   = notes.filter((n) => n.pinned);
  const unpinned = notes.filter((n) => !n.pinned);

  const renderNote = (note) => (
    <div
      key={note.id}
      className={`sidebar-note ${note.id === activeNoteId ? "active" : ""}`}
      style={{ "--accent": note.accent }}
      onClick={() => onSelectNote(note.id)}
      onMouseEnter={() => setHoveredId(note.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <span className="note-icon">{note.icon}</span>
      <span className="note-title">{note.title}</span>
      <span className="note-badge">
        {note.tasks.filter((t) => t.done).length}/{note.tasks.length}
      </span>

      {/* Context actions — appear on hover */}
      {hoveredId === note.id && (
        <div className="note-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="action-btn pin-btn"
            title={note.pinned ? "Unpin" : "Pin"}
            onClick={() => onTogglePin(note.id)}
          >
            {note.pinned ? "📌" : "🔖"}
          </button>
          <button
            className="action-btn del-btn"
            title="Delete"
            onClick={() => onDeleteNote(note.id)}
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-mark">⬡</span>
        <span className="logo-text">NexusAI</span>
      </div>

      {/* Search */}
      <div className="sidebar-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search notes & tasks..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-search" onClick={() => onSearch("")}>✕</button>
        )}
      </div>

      {/* Add Note */}
      <button className="add-note-btn" onClick={onAddNote}>
        <span>＋</span> New Note
      </button>

      {/* Pinned Section */}
      {pinned.length > 0 && (
        <div className="note-section">
          <p className="section-label">📌 Pinned</p>
          {pinned.map(renderNote)}
        </div>
      )}

      {/* All Notes Section */}
      <div className="note-section">
        <p className="section-label">📋 Notes</p>
        {unpinned.length === 0 && pinned.length === 0 && (
          <p className="empty-state">No notes yet. Hit + to start!</p>
        )}
        {unpinned.map(renderNote)}
      </div>
    </aside>
  );
}