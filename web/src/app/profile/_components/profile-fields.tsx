"use client";

import { motion } from "motion/react";
import { Mail, CalendarDays } from "lucide-react";
import { User } from "../_types";

interface ProfileFieldsProps {
  user: User;
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  editing: boolean;
  joinedFmt: string;
}

export default function ProfileFields({
  user,
  name,
  setName,
  bio,
  setBio,
  editing,
  joinedFmt,
}: ProfileFieldsProps) {
  const Mono = { fontFamily: "'Space Mono', monospace" } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 }}
      className="border border-border divide-y divide-border bg-card/5"
    >
      {/* Name */}
      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3"
        >
          Nome completo
        </div>
        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full bg-input-background border border-border px-4 py-3 outline-none text-[15px] focus:border-primary transition-colors duration-100 placeholder:text-foreground/30"
          />
        ) : (
          <div className="text-[20px] sm:text-[22px] font-medium text-foreground">
            {user.name}
          </div>
        )}
      </div>

      {/* Email (read-only) */}
      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3 flex items-center gap-2"
        >
          <Mail size={12} strokeWidth={1.8} /> E-mail
        </div>
        <div
          style={Mono}
          className="text-[14px] flex items-center gap-3 flex-wrap text-foreground"
        >
          <span className="break-all">{user.email}</span>
          <span className="border border-border px-2 py-0.5 uppercase tracking-widest text-[8px] opacity-60">
            Verificado
          </span>
        </div>
        {editing && (
          <div className="mt-2 text-[12px] text-foreground/50">
            O e-mail não pode ser alterado por aqui.
          </div>
        )}
      </div>

      {/* Bio */}
      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3 flex items-center justify-between"
        >
          <span>Bio</span>
          {editing && (
            <span
              className={bio.length > 280 ? "text-destructive" : "opacity-60"}
            >
              {bio.length}/280
            </span>
          )}
        </div>
        {editing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Conte algo sobre você e seu setup…"
            className="w-full bg-input-background border border-border px-4 py-3 outline-none text-[14px] leading-relaxed resize-none focus:border-primary transition-colors duration-100 placeholder:text-foreground/30"
          />
        ) : user.bio ? (
          <p className="text-[14px] leading-relaxed text-foreground/80 max-w-xl">
            {user.bio}
          </p>
        ) : (
          <p className="text-[14px] text-foreground/45 italic">
            Nenhuma bio adicionada ainda.
          </p>
        )}
      </div>

      {/* Joined */}
      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3 flex items-center gap-2"
        >
          <CalendarDays size={12} strokeWidth={1.8} /> Membro desde
        </div>
        <div style={Mono} className="text-[14px] text-foreground">
          {joinedFmt}
        </div>
      </div>
    </motion.div>
  );
}
