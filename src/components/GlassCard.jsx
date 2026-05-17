import React from 'react';

export const GlassCard = ({ children, d, hover = true, style = {} }) => {
  return (
    <div 
      className={`${d ? "glass-d" : "glass-l"} ${hover ? "card-hover" : ""}`} 
      style={{
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        ...style
      }}
    >
      {children}
    </div>
  );
};