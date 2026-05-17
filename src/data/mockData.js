import { nanoid } from "../utils/nanoid";

export const ACCENTS = [
  "#6EE7B7", "#818CF8", "#F472B6", "#FBBF24",
  "#34D399", "#60A5FA", "#A78BFA", "#FB923C",
];

// Cleaned up array data to map seamlessly with ProjectsView key evaluations
export const PROJECTS = [
  {
    id: "p1",
    title: "Nexus Canvas",
    desc: "AI-powered interactive notes engine with real-time collaboration",
    status: "In Progress",
    progress: 72,
    priority: "High",
    accent: "#6EE7B7",
    members: [{ i: "AS", c: "#6EE7B7" }, { i: "RK", c: "#818CF8" }, { i: "PM", c: "#F472B6" }],
    due: "Aug 15",
    tags: ["React", "AI", "UX"],
    tasks: [
      { id: "t1", text: "Finalize design system tokens", completed: true },
      { id: "t2", text: "Ship Nexus Canvas v1.0", completed: true },
      { id: "t3", text: "Integrate AI context engine", completed: false },
      { id: "t4", text: "Performance audit on dashboard", completed: false },
      { id: "t5", text: "Beta user onboarding flow", completed: false },
    ],
  },
  {
    id: "p2",
    title: "Context Engine v2",
    desc: "Next-gen AI context management with multi-modal input support",
    status: "In Progress",
    progress: 45,
    priority: "High",
    accent: "#818CF8",
    members: [{ i: "KL", c: "#818CF8" }, { i: "TN", c: "#FBBF24" }],
    due: "Sep 01",
    tags: ["AI", "Backend", "ML"],
    tasks: [
      { id: "t6", text: "Compare GPT-4o vs Claude 3.5", completed: true },
      { id: "t7", text: "Benchmark context window usage", completed: false },
      { id: "t8", text: "Evaluate fine-tuning cost", completed: false },
    ],
  },
  {
    id: "p3",
    title: "Design System",
    desc: "Unified token-based design system across all NexusAI products",
    status: "Review",
    progress: 89,
    priority: "Medium",
    accent: "#F472B6",
    members: [{ i: "AS", c: "#6EE7B7" }, { i: "DV", c: "#60A5FA" }, { i: "RK", c: "#818CF8" }],
    due: "July 20",
    tags: ["Design", "CSS", "Figma"],
    tasks: [
      { id: "t9", text: "Define sprint goals with team", completed: true },
      { id: "t10", text: "Break down epic into user stories", completed: true },
      { id: "t11", text: "Assign story points", completed: false },
    ],
  },
  {
    id: "p4",
    title: "Infrastructure Matrix",
    desc: "Zero-trust pipeline framework handling automated edge deploy routes.",
    status: "Planning",
    progress: 18,
    priority: "Low",
    accent: "#FBBF24",
    members: [{ i: "PM", c: "#F472B6" }, { i: "TN", c: "#FBBF24" }],
    due: "Nov 01",
    tags: ["Mobile", "React Native"],
    tasks: [
      { id: "t12", text: "Configure CI/CD pipeline", completed: true },
      { id: "t13", text: "Set up staging environment", completed: false },
      { id: "t14", text: "Enable autoscaling on prod", completed: false },
      { id: "t15", text: "Security audit for API keys", completed: false },
    ],
  }
];

export const INITIAL_NOTES = [
  {
    id: nanoid(),
    title: "Q3 Product Roadmap",
    pinned: true,
    accent: "#6EE7B7",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    tasks: [
      { id: nanoid(), text: "Finalize design system tokens", completed: true },
      { id: nanoid(), text: "Ship Nexus Canvas v1.0", completed: true },
      { id: nanoid(), text: "Integrate AI context engine", completed: false },
    ],
  }
];

// ── FIXED MANDATORY EXPORT NODE ─────────────────────────────────────
export function deriveStats(notes = [], projects = []) {
  const allTasks = notes.flatMap((n) => n.tasks || []);
  const totalTasks = allTasks.length;
  const doneTasks = allTasks.filter((t) => t.completed || t.done).length;
  const activeProjects = projects.filter((p) => p.status === "In Progress" || p.status === "active").length;
  const avgProgress =
    projects.length > 0
      ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length)
      : 0;

  return {
    totalNotes: notes.length,
    pinnedNotes: notes.filter((n) => n.pinned).length,
    totalTasks,
    doneTasks,
    completionRate: totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0,
    activeProjects,
    totalProjects: projects.length,
    avgProgress,
    pendingTasks: totalTasks - doneTasks,
  };
}

export const TEAM = [
  { id: 1, name: "Aarav Kumar", role: "AI Engineer", i: "AK", c: "#8b5cf6", s: "online" },
  { id: 2, name: "Julia Reeves", role: "Full Stack", i: "JR", c: "#22d3ee", s: "online" },
  { id: 3, name: "Sam Liu", role: "DevOps", i: "SL", c: "#34d399", s: "online" },
  { id: 4, name: "Mia Lopez", role: "Data Engineer", i: "ML", c: "#f59e0b", s: "away" },
  { id: 5, name: "Tom Nash", role: "Security Lead", i: "TN", c: "#f87171", s: "offline" },
];

export const ACTIVITY = [
  { id: 1, init: "SL", color: "#34d399", action: "deployed", target: "auth-service v2.4.1", time: "2m ago" },
  { id: 2, init: "AK", color: "#8b5cf6", action: "merged PR#842", target: "token optimisation patch", time: "18m ago" },
];

export const NOTIFS = [
  { id: 1, title: "Build succeeded", desc: "auth-service@v2.4.1 deployed to prod", t: "2m", read: false, type: "ok" },
];

export const STATUS_CFG = {
  "In Progress": { c: "#8b5cf6", bg: "rgba(139,92,246,.12)", br: "rgba(139,92,246,.28)" },
  "Review": { c: "#22d3ee", bg: "rgba(34,211,238,.1)", br: "rgba(34,211,238,.22)" },
  "Planning": { c: "#f59e0b", bg: "rgba(245,158,11,.1)", br: "rgba(245,158,11,.22)" },
  "Completed": { c: "#34d399", bg: "rgba(52,211,153,.1)", br: "rgba(52,211,153,.22)" },
};

export const TAG_C = {
  "React": "#8b5cf6", "AI": "#22d3ee", "UX": "#34d399",
  "Backend": "#94a3b8", "ML": "#f59e0b", "Design": "#f472b6"
};

export const STATS = [
  { id: 1, label: "Active Models", value: "12", sub: "+3 this week", trend: "up", color: "#8b5cf6", spark: [28, 42, 38, 55, 50, 64, 58, 72, 68, 80] },
  { id: 2, label: "API Calls / hr", value: "84.2K", sub: "+12.4%", trend: "up", color: "#22d3ee", spark: [18, 30, 28, 48, 42, 58, 53, 68, 62, 76] }
];

export const CHART = [
  { t: "Mon", api: 34200, tok: 28000, lat: 148 },
  { t: "Tue", api: 49100, tok: 41400, lat: 141 }
];