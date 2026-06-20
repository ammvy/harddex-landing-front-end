import React from "react";
export default function IconBtn({
  children,
  onClick,
  title,
  danger
}) {
  return <button onClick={onClick} title={title} aria-label={title} className={`w-8 h-8 border border-border flex items-center justify-center transition-colors duration-100 cursor-pointer ${danger ? "hover:text-destructive hover:border-destructive" : "hover:text-primary hover:border-primary"}`}>
      {children}
    </button>;
}