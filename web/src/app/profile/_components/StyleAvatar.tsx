"use client";

import { CATS, ProfileId } from "@/components/mouse";
import { MockUser, STYLE_TO_PROFILE_ID } from "../_data/constants";

interface StyleAvatarProps {
  styleName: MockUser["style"];
  className?: string;
}

export default function StyleAvatar({ styleName, className }: StyleAvatarProps) {
  const profileId: ProfileId = STYLE_TO_PROFILE_ID[styleName] || "study";
  const CatComponent = CATS[profileId];

  if (!CatComponent) {
    return (
      <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
        N/A
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center p-2 rounded-2xl bg-zinc-100/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/30 group ${className}`}>
      {/* Background radial glow */}
      <div className="absolute inset-0 rounded-2xl bg-radial from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative w-36 h-44 flex items-center justify-center overflow-visible">
        <CatComponent className="w-full h-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 text-zinc-900 dark:text-white" />
      </div>
    </div>
  );
}
