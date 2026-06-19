"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Camera, Trash2, Fingerprint } from "lucide-react";

interface ProfilePhotoProps {
  photo: string;
  name: string;
  tdu: string;
  editing: boolean;
  onPickPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removePhoto: () => void;
}

function MouseAvatar() {
  return (
    <svg viewBox="0 0 100 100" className="w-3/5 h-3/5">
      <path d="M 26 26 L 34 10 L 44 28 Z" fill="var(--mouse-body)" />
      <path d="M 74 26 L 66 10 L 56 28 Z" fill="var(--mouse-body)" />
      <path d="M 31 24 L 34 16 L 39 26 Z" fill="var(--mouse-accent)" />
      <path d="M 69 24 L 66 16 L 61 26 Z" fill="var(--mouse-accent)" />
      <path
        d="M 22 28 Q 22 18 32 18 L 68 18 Q 78 18 78 28 L 78 60 Q 78 74 50 74 Q 22 74 22 60 Z"
        fill="var(--mouse-body)"
      />
      <circle cx="38" cy="46" r="3.4" fill="var(--mouse-eye)" />
      <circle cx="62" cy="46" r="3.4" fill="var(--mouse-eye)" />
      <path d="M 48 56 L 52 56 L 50 59 Z" fill="var(--mouse-accent)" />
      <path
        d="M 50 59 Q 50 62 47 62 M 50 59 Q 50 62 53 62"
        stroke="var(--mouse-detail)"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 30 41 L 22 39 M 30 45 L 21 45 M 30 49 L 22 51"
        stroke="var(--mouse-detail)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M 70 41 L 78 39 M 70 45 L 79 45 M 70 49 L 78 51"
        stroke="var(--mouse-detail)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function ProfilePhoto({
  photo,
  name,
  tdu,
  editing,
  onPickPhoto,
  removePhoto,
}: ProfilePhotoProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const Mono = { fontFamily: "'Space Mono', monospace" } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="border border-border bg-card/10"
    >
      <div className="aspect-square w-full bg-card relative flex items-center justify-center overflow-hidden">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <MouseAvatar />
        )}
        {editing && (
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-white opacity-0 hover:opacity-100 transition-opacity duration-150 cursor-pointer"
            style={Mono}
          >
            <Camera size={18} strokeWidth={1.6} />
            <span className="uppercase tracking-widest text-[10px]">
              Trocar foto
            </span>
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onPickPhoto}
          className="hidden"
        />
      </div>

      {editing && (
        <div className="border-t border-border flex">
          <button
            onClick={() => fileRef.current?.click()}
            style={Mono}
            className="flex-1 py-3 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:text-primary transition-colors duration-100 cursor-pointer"
          >
            <Camera size={12} strokeWidth={1.8} /> Enviar
          </button>
          {photo && (
            <button
              onClick={removePhoto}
              style={Mono}
              className="flex-1 py-3 border-l border-border uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:text-primary transition-colors duration-100 cursor-pointer"
            >
              <Trash2 size={12} strokeWidth={1.8} /> Remover
            </button>
          )}
        </div>
      )}

      <div className="border-t border-border p-4" style={Mono}>
        <div className="flex items-center gap-2 uppercase tracking-widest text-[9px] text-foreground/50">
          <Fingerprint size={12} strokeWidth={1.8} /> TDU
        </div>
        <div className="mt-2 uppercase tracking-wider text-[15px] text-primary break-all">
          {tdu}
        </div>
      </div>
    </motion.div>
  );
}
