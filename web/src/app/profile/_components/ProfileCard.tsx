"use client";

import { useState } from "react";
import { 
  ShieldCheck, 
  Gamepad2, 
  Laptop, 
  Cpu, 
  Home, 
  HardDrive, 
  BatteryCharging, 
  Plane, 
  Sparkles,
  Mail,
  User,
  LogOut,
  Edit2,
  Check,
  X
} from "lucide-react";
import { MockUser, STYLE_DETAILS } from "../_data/constants";
import StyleAvatar from "./StyleAvatar";

interface ProfileCardProps {
  user: MockUser;
  onUpdateUser: (updatedUser: MockUser) => void;
  onLogout: () => void;
}

const STYLE_ICONS: Record<MockUser["style"], React.ComponentType<any>> = {
  BASIC: Sparkles,
  INTERMEDIATE: Cpu,
  ADVANCED: Cpu,
  GAMER: Gamepad2,
  PROFESSIONAL: Laptop,
  "Remote work": Home,
  "File / Media": HardDrive,
  Mobility: BatteryCharging,
  "Light travel": Plane,
};

export default function ProfileCard({ user, onUpdateUser, onLogout }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedStyle, setEditedStyle] = useState<MockUser["style"]>(user.style);

  const styleInfo = STYLE_DETAILS[user.style];
  const StyleIcon = STYLE_ICONS[user.style] || Sparkles;
  const showPermissionBadge = user.permission === "ADMIN" || user.permission === "CURATOR";

  const handleSave = () => {
    if (editedName.trim() === "") return;
    onUpdateUser({
      ...user,
      name: editedName,
      style: editedStyle,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setEditedStyle(user.style);
    setIsEditing(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative background glow behind card */}
      <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-primary/10 to-secondary/10 dark:from-primary/30 dark:to-secondary/30 blur-2xl opacity-40 transition-all duration-500" />

      {/* Main glassmorphism card */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-black/40 p-6 md:p-8 text-zinc-800 dark:text-zinc-100 backdrop-blur-xl shadow-xl dark:shadow-2xl flex flex-col items-center">
        
        {/* Style Avatar Component */}
        <StyleAvatar styleName={user.style} className="mb-6" />

        {/* View / Edit Form */}
        {!isEditing ? (
          /* VIEW MODE */
          <div className="w-full flex flex-col items-center space-y-4">
            <div className="text-center w-full space-y-2">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-zinc-400 dark:text-muted-foreground/50 shrink-0" />
                  {user.name}
                </h1>
                
                {showPermissionBadge && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase ${
                    user.permission === "ADMIN" 
                      ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20" 
                      : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
                  }`}>
                    <ShieldCheck className="w-3 h-3" />
                    {user.permission}
                  </span>
                )}
              </div>

              <p className="text-sm text-zinc-500 dark:text-muted-foreground flex items-center justify-center gap-1.5 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200">
                <Mail className="w-4 h-4 text-zinc-400 dark:text-muted-foreground/60" />
                {user.email}
              </p>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-zinc-200 dark:bg-white/10 my-2" />

            {/* Persona Preference / Style Card Section */}
            <div className="w-full text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-muted-foreground/60 block mb-2">
                Perfil de Uso
              </span>
              <div className={`p-4 rounded-xl border bg-gradient-to-br transition-all duration-300 ${styleInfo.colorClass}`}>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5">
                    <StyleIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">{styleInfo.label}</h4>
                    <p className="text-xs text-zinc-500 dark:text-muted-foreground leading-relaxed">
                      {styleInfo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full pt-4 flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white text-sm font-semibold hover:bg-zinc-200/50 dark:hover:bg-white/10 active:scale-98 transition-all duration-200"
              >
                <Edit2 className="w-4 h-4 text-primary" />
                Editar Perfil
              </button>
              
              <button
                onClick={onLogout}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-500/20 active:scale-98 transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        ) : (
          /* EDIT MODE */
          <div className="w-full flex flex-col space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white text-center">Editar Informações</h2>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-muted-foreground/60 block">
                Nome Completo
              </label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Insira seu nome"
              />
            </div>

            {/* Email Input (Disabled/Read-only) */}
            <div className="space-y-1.5 opacity-60">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-muted-foreground/60 block">
                E-mail (Não alterável)
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 text-zinc-400 dark:text-muted-foreground text-sm cursor-not-allowed"
              />
            </div>

            {/* Style Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-muted-foreground/60 block">
                Estilo de Uso (Mouse)
              </label>
              <select
                value={editedStyle}
                onChange={(e) => setEditedStyle(e.target.value as MockUser["style"])}
                className="w-full px-3 py-2 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [&_option]:bg-white dark:[&_option]:bg-zinc-900 [&_option]:text-zinc-900 dark:[&_option]:text-white"
              >
                {Object.keys(STYLE_DETAILS).map((styleKey) => (
                  <option key={styleKey} value={styleKey}>
                    {STYLE_DETAILS[styleKey as MockUser["style"]].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Edit Mode Buttons */}
            <div className="w-full pt-4 flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/80 active:scale-98 transition-all duration-200"
              >
                <Check className="w-4 h-4" />
                Salvar
              </button>
              
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white text-sm font-semibold hover:bg-zinc-200/50 dark:hover:bg-white/10 active:scale-98 transition-all duration-200"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Footer/Signature of Card */}
        <div className="mt-8 text-[9px] font-mono tracking-widest text-zinc-400 dark:text-muted-foreground/40 uppercase">
          Harddex ID: #{user.id.toString().padStart(4, "0")}
        </div>
      </div>
    </div>
  );
}
