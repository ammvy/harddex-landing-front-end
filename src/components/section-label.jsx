import React from "react";
export default function SectionLabel({
  children,
  className = ""
}) {
  return <div style={{
    fontFamily: "'Space Mono', monospace"
  }} className={`uppercase tracking-widest text-[10px] text-muted-foreground ${className}`}>
      {children}
    </div>;
}