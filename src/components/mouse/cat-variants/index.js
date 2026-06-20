"use client";

import { GamerCat, GamerMiniCat } from "./gamer";
import { ProCat, ProMiniCat } from "./pro";
import { StudyCat, StudyMiniCat } from "./study";
import { CreativeCat, CreativeMiniCat } from "./creative";
import { DevCat, DevMiniCat } from "./dev";
import { MobileCat, MobileMiniCat } from "./mobile";
export const CATS = {
  GAMER: GamerCat,
  PRO: ProCat,
  STUDY: StudyCat,
  CREATIVE: CreativeCat,
  DEV: DevCat,
  MOBILE: MobileCat
};
export const MINI_CATS = {
  GAMER: GamerMiniCat,
  PRO: ProMiniCat,
  STUDY: StudyMiniCat,
  CREATIVE: CreativeMiniCat,
  DEV: DevMiniCat,
  MOBILE: MobileMiniCat
};