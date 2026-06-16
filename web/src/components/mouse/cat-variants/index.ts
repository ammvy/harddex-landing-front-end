"use client";

import { JSX } from "react";
import { GamerCat, GamerMiniCat } from "./gamer";
import { ProCat, ProMiniCat } from "./pro";
import { StudyCat, StudyMiniCat } from "./study";
import { CreativeCat, CreativeMiniCat } from "./creative";
import { DevCat, DevMiniCat } from "./dev";
import { MobileCat, MobileMiniCat } from "./mobile";

export type ProfileId = "gamer" | "pro" | "study" | "creative" | "dev" | "mobile";

export const CATS: Record<ProfileId, (props: { className?: string }) => JSX.Element> = {
  gamer: GamerCat,
  pro: ProCat,
  study: StudyCat,
  creative: CreativeCat,
  dev: DevCat,
  mobile: MobileCat,
};

export const MINI_CATS: Record<ProfileId, (props: { className?: string }) => JSX.Element> = {
  gamer: GamerMiniCat,
  pro: ProMiniCat,
  study: StudyMiniCat,
  creative: CreativeMiniCat,
  dev: DevMiniCat,
  mobile: MobileMiniCat,
};
