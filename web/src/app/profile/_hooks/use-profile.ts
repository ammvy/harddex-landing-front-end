"use client";

import { useState, useEffect } from "react";
import { User, Toast } from "../_types";
import { INITIAL_USER } from "../_data/mock-user";

export function useProfile() {
  const [user, setUser] = useState<User>(INITIAL_USER);

  // Draft states for editing
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [photo, setPhoto] = useState(user.photo);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const startEdit = () => {
    setName(user.name);
    setBio(user.bio);
    setPhoto(user.photo);
    setEditing(true);
  };

  const cancelEdit = () => {
    setName(user.name);
    setBio(user.bio);
    setPhoto(user.photo);
    setEditing(false);
  };

  const onPickPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast({ kind: "err", msg: "Arquivo precisa ser uma imagem." });
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setToast({ kind: "err", msg: "Imagem acima de 4MB." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto("");
  };

  const save = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setToast({ kind: "err", msg: "Nome precisa ter ao menos 2 caracteres." });
      return;
    }
    if (bio.length > 280) {
      setToast({ kind: "err", msg: "Bio limitada a 280 caracteres." });
      return;
    }
    setSaving(true);
    // Simulated async persistence
    setTimeout(() => {
      setUser((u) => ({ ...u, name: trimmed, bio: bio.trim(), photo }));
      setSaving(false);
      setEditing(false);
      setToast({ kind: "ok", msg: "Alterações salvas." });
    }, 700);
  };

  const joinedFmt = (() => {
    try {
      return new Date(user.joined).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return user.joined;
    }
  })();

  return {
    user,
    name,
    setName,
    bio,
    setBio,
    photo,
    editing,
    saving,
    toast,
    setToast,
    startEdit,
    cancelEdit,
    onPickPhoto,
    removePhoto,
    save,
    joinedFmt,
  };
}
