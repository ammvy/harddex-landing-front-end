"use client";

import { motion } from "motion/react";
import { Pencil, Check, X } from "lucide-react";

interface ProfileHeaderTitleProps {
  editing: boolean;
  saving: boolean;
  startEdit: () => void;
  cancelEdit: () => void;
  save: () => void;
}

export default function ProfileHeaderTitle({
  editing,
  saving,
  startEdit,
  cancelEdit,
  save,
}: ProfileHeaderTitleProps) {
  const Mono = { fontFamily: "'Space Mono', monospace" } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-end justify-between gap-4 flex-wrap"
    >
      <div>
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50"
        >
          Conta
        </div>
        <h1
          style={{ ...Mono, letterSpacing: "-0.04em", lineHeight: 0.95 }}
          className="uppercase text-[clamp(36px,5vw,64px)] mt-2"
        >
          Seu perfil<span className="text-primary">.</span>
        </h1>
      </div>
      {!editing ? (
        <button
          onClick={startEdit}
          style={Mono}
          className="bg-foreground text-background px-5 py-3.5 uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-primary hover:text-primary-foreground transition-colors duration-100 cursor-pointer"
        >
          <Pencil size={13} strokeWidth={1.8} />
          Editar perfil
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={cancelEdit}
            disabled={saving}
            style={Mono}
            className="border border-border px-4 py-3.5 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:text-primary hover:border-primary transition-colors duration-100 disabled:opacity-40 cursor-pointer"
          >
            <X size={13} strokeWidth={1.8} />
            Cancelar
          </button>
          <button
            onClick={save}
            disabled={saving}
            style={Mono}
            className="bg-primary text-primary-foreground px-5 py-3.5 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:opacity-90 transition-opacity duration-100 disabled:opacity-50 cursor-pointer"
          >
            <Check size={13} strokeWidth={1.8} />
            {saving ? "Salvando…" : "Salvar"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
