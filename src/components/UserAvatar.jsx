import React from 'react';

export const Avatar = ({ i, c, sz = 32, status }) => {
  const sC = { online: "#34d399", away: "#f59e0b", offline: "#94a3b8" };
  
  return (
    <div style={{ position: "relative", width: sz, height: sz, flexShrink: 0 }}>
      <div 
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: c || "#8b5cf6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(255,255,255,.1)"
        }}
      >
        <span 
          style={{ 
            fontSize: sz * 0.38, 
            fontWeight: 700, 
            color: "#fff", 
            letterSpacing: -0.2,
            fontFamily: "sans-serif"
          }}
        >
          {i || "AI"}
        </span>
      </div>
      
      {status && sC[status] && (
        <span 
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: sz * 0.28,
            height: sz * 0.28,
            minWidth: 7,
            minHeight: 7,
            borderRadius: "50%",
            background: sC[status],
            border: "1.5px solid #05050f"
          }} 
        />
      )}
    </div>
  );
};