import { useState } from "react";

export default function TaskItem({ task, accent, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [localText, setLocalText] = useState(task.text);

  const commitEdit = () => {
    if (localText.trim()) onEdit(localText.trim());
    else setLocalText(task.text);
    setEditing(false);
  };

  return (
    <div className={`task-item ${task.done ? "task-done" : ""}`}>
      {/* Checkbox */}
      <button
        className="task-check"
        style={{ "--accent": accent }}
        onClick={onToggle}
      >
        {task.done && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* Text */}
      {editing ? (
        <input
          className="task-edit-input"
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") { setLocalText(task.text); setEditing(false); }
          }}
          autoFocus
        />
      ) : (
        <span
          className="task-text"
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
        >
          {task.text}
        </span>
      )}

      {/* Delete */}
      <button className="task-delete" onClick={onDelete}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}