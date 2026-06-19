"use client";

import { useProfile } from "./_hooks/use-profile";
import Header from "@/components/header";
import ProfileHeaderTitle from "./_components/profile-header-title";
import ProfilePhoto from "./_components/profile-photo";
import ProfileFields from "./_components/profile-fields";
import ProfileToast from "./_components/profile-toast";

export default function ProfilePage() {
  const {
    user,
    name,
    setName,
    bio,
    setBio,
    photo,
    editing,
    saving,
    toast,
    startEdit,
    cancelEdit,
    onPickPhoto,
    removePhoto,
    save,
    joinedFmt,
  } = useProfile();

  return (
    <div
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-200"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <Header label="§ Perfil / 2026" />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <ProfileHeaderTitle
          editing={editing}
          saving={saving}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          save={save}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8">
          {/* Photo column */}
          <ProfilePhoto
            photo={photo}
            name={name}
            tdu={user.tdu}
            editing={editing}
            onPickPhoto={onPickPhoto}
            removePhoto={removePhoto}
          />

          {/* Fields column */}
          <ProfileFields
            user={user}
            name={name}
            setName={setName}
            bio={bio}
            setBio={setBio}
            editing={editing}
            joinedFmt={joinedFmt}
          />
        </div>
      </main>

      <ProfileToast toast={toast} />
    </div>
  );
}
