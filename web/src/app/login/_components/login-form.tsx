"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for authenticating can go here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] text-foreground/60"
        >
          E-mail
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="bg-input-background border border-foreground px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] focus:border-primary placeholder:text-muted-foreground/50 transition-colors duration-100"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] text-foreground/60 flex justify-between"
        >
          <span>Senha</span>
          <a href="#" className="hover:text-primary transition-colors duration-100">
            Esqueci ↗
          </a>
        </span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="bg-input-background border border-foreground px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] focus:border-primary placeholder:text-muted-foreground/50 transition-colors duration-100"
        />
      </label>

      <label className="flex items-center gap-3 cursor-pointer select-none mt-1">
        <button
          type="button"
          onClick={() => setRemember((r) => !r)}
          className="w-4 h-4 border border-foreground flex items-center justify-center transition-colors duration-75 cursor-pointer"
          style={{
            background: remember ? "var(--primary)" : "transparent",
            borderColor: remember ? "var(--primary)" : undefined,
          }}
        >
          {remember && <span className="w-2 h-2 bg-primary-foreground" />}
        </button>
        <span
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] text-foreground/70"
        >
          Manter sessão ativa
        </span>
      </label>

      <button
        type="submit"
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="bg-foreground text-background px-5 py-4 uppercase tracking-widest text-[12px] flex items-center justify-between hover:bg-primary hover:text-primary-foreground transition-colors duration-100 mt-2 cursor-pointer"
      >
        <span>Entrar no Index</span>
        <ArrowRight size={14} strokeWidth={1.6} />
      </button>
    </form>
  );
}
