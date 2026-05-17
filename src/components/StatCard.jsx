import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { GlassCard } from "./GlassCard";

// Safety check wrapper for the Sparkline data array
const Spark = ({ data, color }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div style={{ height: 38 }} />;
  }
  
  const formattedData = data.map((v, i) => ({ v: Number(v) || 0, i }));

  return (
    <ResponsiveContainer width="100%" height={38}>
      <AreaChart data={formattedData} margin={{ top: 3, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`sg${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={color} stopOpacity={0.28} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.6}
          fill={`url(#sg${color.replace("#", "")})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const StatCard = ({ stat, d }) => {
  // If data fails to pass down, render an empty safe state card instead of breaking the UI
  if (!stat) {
    return <div style={{ minHeight: "120px", background: "rgba(0,0,0,0.1)", borderRadius: "16px" }} />;
  }

  const Icon = stat.icon;
  const cardColor = stat.color || "#8b5cf6";
  const labelText = stat.label || "Metrics Node";
  const displayValue = stat.value || "0.00";
  const subText = stat.sub || "Sustained";
  const sparkData = stat.spark || [];

  return (
    <GlassCard d={d} style={{
      boxShadow: `0 8px 32px ${cardColor}18, ${d ? "inset 0 1px 0 rgba(255,255,255,.04)" : "inset 0 1px 0 rgba(255,255,255,.9)"}`,
    }}>
      <div style={{ padding: "18px 18px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase",
              color: d ? "#475569" : "#94a3b8", marginBottom: 6, fontFamily: "'Plus Jakarta Sans',sans-serif"
            }}>
              {labelText}
            </p>
            <p className="nai-display" style={{
              fontSize: 28, fontWeight: 800, lineHeight: 1,
              color: d ? "#f1f5f9" : "#0f172a"
            }}>
              {displayValue}
            </p>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `${cardColor}16`,
            border: `1px solid ${cardColor}2e`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {Icon && <Icon size={17} style={{ color: cardColor }} />}
          </div>
        </div>
        
        <Spark data={sparkData} color={cardColor} />
        
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
          {stat.trend === "up"
            ? <TrendingUp size={11} style={{ color: "#34d399" }} />
            : <TrendingDown size={11} style={{ color: "#f87171" }} />}
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: stat.trend === "up" ? "#34d399" : "#f87171",
            fontFamily: "'Plus Jakarta Sans',sans-serif"
          }}>
            {subText}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};