import React from 'react';
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = ({ d, toggle }) => {
  const border = d ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.07)";
  
  return (
    <button 
      onClick={toggle} 
      className="nai-btn" 
      style={{
        width: 32, 
        height: 32, 
        borderRadius: 9, 
        display: "flex",
        alignItems: "center", 
        justifyContent: "center",
        background: d ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)",
        border: `1px solid ${border}`,
        flexShrink: 0
      }}
      title={d ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {d ? (
        <Sun size={13} style={{ color: "#f59e0b" }} />
      ) : (
        <Moon size={13} style={{ color: "#6366f1" }} />
      )}
    </button>
  );
};