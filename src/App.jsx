import { useState, useCallback, useMemo } from "react";
import { INITIAL_NOTES, PROJECTS, ACCENTS, deriveStats } from "./data/mockData";
import { nanoid } from "./utils/nanoid";

// ── IMPORT LAYERS ──────────────────────────────────────────────────
// Safely import everything. We pull the modules directly so we can check their exact export types at runtime.
import * as AppShellModule from "./components/AppShell";
import * as DashboardModule from "./views/Dashboard";
import * as CanvasViewModule from "./views/CanvasView";
import * as ProjectsViewModule from "./views/ProjectsView";
import * as AIViewModule from "./views/AIView";

// Helper function to extract the component whether it was exported as default OR named
const getComponent = (moduleObj, namedKey) => {
  if (!moduleObj) return () => <div style={{ padding: 20, color: 'red' }}>Module not found</div>;
  return moduleObj.default || moduleObj[namedKey] || Object.values(moduleObj).find(v => typeof v === 'function') || (() => null);
};

// Resolve components safely to bypass Vite / OXC compilation syntax mismatch traps
const AppShell = getComponent(AppShellModule, "AppShell");
const Dashboard = getComponent(DashboardModule, "Dashboard");
const CanvasView = getComponent(CanvasViewModule, "CanvasView");
const ProjectBoard = getComponent(ProjectsViewModule, "ProjectBoard") || getComponent(ProjectsViewModule, "ProjectsView");
const AIView = getComponent(AIViewModule, "AIView");

export default function App() {
  // ── Core nav state ──────────────────────────────────────────────
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("dark");

  // ── Notes / Canvas state ─────────────────────────────────────────
  const [notes, setNotes] = useState(INITIAL_NOTES || []);
  const [activeNoteId, setActiveNoteId] = useState(INITIAL_NOTES?.[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Projects state ───────────────────────────────────────────────
  const [projects, setProjects] = useState(PROJECTS || []);

  // ── AI Context state ─────────────────────────────────────────────
  const [aiHistory, setAiHistory] = useState([]);
  const [aiInput, setAiInput] = useState("");

  // ── Derived ──────────────────────────────────────────────────────
  const stats = useMemo(() => deriveStats(notes, projects), [notes, projects]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeNoteId) ?? null,
    [notes, activeNoteId]
  );

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return q
      ? notes.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            (n.tasks && n.tasks.some((t) => t.text.toLowerCase().includes(q)))
        )
      : notes;
  }, [notes, searchQuery]);

  // ── Note CRUD ────────────────────────────────────────────────────
  const addNote = useCallback(() => {
    const accent = ACCENTS[Math.floor(Math.random() * ACCENTS.length)];
    const newNote = {
      id: nanoid(),
      title: "Untitled Note",
      tasks: [],
      pinned: false,
      accent,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    setActiveView("canvas");
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setActiveNoteId((prev) => (prev === id ? null : prev));
  }, []);

  const updateNoteTitle = useCallback((id, title) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, title } : n)));
  }, []);

  const togglePinNote = useCallback((id) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  }, []);

  // ── Task CRUD (Sheryians Inspired Dynamic Checkbox Logic) ────────
  const addTask = useCallback((noteId, text) => {
    if (!text.trim()) return;
    const task = { id: nanoid(), text: text.trim(), completed: false };
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, tasks: [...(n.tasks || []), task] } : n))
    );
  }, []);

  const toggleTask = useCallback((noteId, taskId) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? {
              ...n,
              tasks: (n.tasks || []).map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
            }
          : n
      )
    );
  }, []);

  const editTask = useCallback((noteId, taskId, text) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? {
              ...n,
              tasks: (n.tasks || []).map((t) =>
                t.id === taskId ? { ...t, text } : t
              ),
            }
          : n
      )
    );
  }, []);

  const deleteTask = useCallback((noteId, taskId) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, tasks: (n.tasks || []).filter((t) => t.id !== taskId) }
          : n
      )
    );
  }, []);

  // ── Project CRUD ─────────────────────────────────────────────────
  const updateProject = useCallback((id, patch) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const addProject = useCallback((project) => {
    setProjects((prev) => [{ ...project, id: nanoid() }, ...prev]);
  }, []);

  // ── AI handlers ──────────────────────────────────────────────────
  const sendAiMessage = useCallback((msg) => {
    if (!msg.trim()) return;
    setAiHistory((prev) => [
      ...prev,
      { id: nanoid(), role: "user", text: msg },
      {
        id: nanoid(),
        role: "assistant",
        text: `Processing: "${msg}" — Context engine analyzing your workspace data across ${notes.length} notes and ${projects.length} projects.`,
      },
    ]);
    setAiInput("");
  }, [notes.length, projects.length]);

  // ── Shared props bag ─────────────────────────────────────────────
  const sharedProps = {
    notes, filteredNotes, activeNote, activeNoteId, searchQuery, stats,
    projects, aiHistory, aiInput, d: theme === "dark",
    setActiveNoteId, setSearchQuery, setAiInput,
    addNote, deleteNote, updateNoteTitle, togglePinNote,
    addTask, toggleTask, editTask, deleteTask,
    updateProject, addProject, sendAiMessage,
    setActiveView,
  };

  const views = {
    dashboard: <Dashboard {...sharedProps} />,
    canvas: <CanvasView {...sharedProps} />,
    projects: <ProjectBoard {...sharedProps} />,
    ai: <AIView {...sharedProps} />,
  };

  return (
    <div className={`app-root ${theme}`} data-theme={theme} style={{ minHeight: "100vh" }}>
      <AppShell
        activeView={activeView}
        setActiveView={setActiveView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        theme={theme}
        setTheme={setTheme}
        stats={stats}
        notesCount={notes.length}
      >
        {views[activeView] ?? views.dashboard}
      </AppShell>
    </div>
  );
}