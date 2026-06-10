"use client";

import { JSX } from "react";
import { CatHeadBase } from "./cat-head-base";
import { MiniCatBase } from "./mini-cat-base";

const BODY = "var(--mouse-body, #e7eaea)";
const ACCENT = "var(--mouse-accent, #3a70f4)";
const DETAIL = "var(--mouse-detail, #0a0a0a)";

export type ProfileId = "gamer" | "pro" | "study" | "creative" | "dev" | "mobile";

export const CATS: Record<ProfileId, () => JSX.Element> = {
  gamer: () => (
    <CatHeadBase>
      <path
        d="M 36 56 Q 80 4 124 56"
        stroke={DETAIL}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="18" y="48" width="16" height="26" rx="4" fill={DETAIL} />
      <rect x="126" y="48" width="16" height="26" rx="4" fill={ACCENT} />
      <rect x="20" y="54" width="12" height="12" fill={ACCENT} />
      <path
        d="M 18 74 Q 12 92 36 102"
        stroke={DETAIL}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="38" cy="104" r="3.6" fill={ACCENT} />
      <g transform="translate(80 160)">
        <path
          d="M -34 -8 Q -34 -16 -26 -16 L 26 -16 Q 34 -16 34 -8 L 34 8 Q 34 16 26 16 L -26 16 Q -34 16 -34 8 Z"
          fill={DETAIL}
        />
        <circle cx="-16" cy="0" r="4" fill={ACCENT} />
        <rect x="-22" y="-1" width="4" height="2" fill={BODY} />
        <rect x="-14" y="-1" width="4" height="2" fill={BODY} />
        <rect x="-17" y="-5" width="2" height="4" fill={BODY} />
        <rect x="-17" y="1" width="2" height="4" fill={BODY} />
        <circle cx="16" cy="-4" r="3" fill={ACCENT} />
        <circle cx="22" cy="4" r="3" fill={BODY} />
        <circle cx="10" cy="4" r="3" fill={BODY} />
      </g>
    </CatHeadBase>
  ),
  pro: () => (
    <CatHeadBase>
      <path
        d="M 50 132 L 80 152 L 110 132 L 116 196 L 44 196 Z"
        fill={DETAIL}
      />
      <path
        d="M 60 132 L 80 146 L 100 132"
        stroke={BODY}
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M 76 146 L 84 146 L 90 162 L 80 196 L 70 162 Z" fill={ACCENT} />
      <rect x="74" y="146" width="12" height="3" fill="var(--primary, #3a70f4)" />
    </CatHeadBase>
  ),
  study: () => (
    <CatHeadBase>
      <circle
        cx="62"
        cy="80"
        r="13"
        stroke={DETAIL}
        strokeWidth="2.6"
        fill="none"
      />
      <circle
        cx="98"
        cy="80"
        r="13"
        stroke={DETAIL}
        strokeWidth="2.6"
        fill="none"
      />
      <line
        x1="75"
        y1="80"
        x2="85"
        y2="80"
        stroke={DETAIL}
        strokeWidth="2.6"
      />
      <line
        x1="49"
        y1="78"
        x2="40"
        y2="74"
        stroke={DETAIL}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="111"
        y1="78"
        x2="120"
        y2="74"
        stroke={DETAIL}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <g transform="translate(80 168)">
        <path
          d="M -36 -14 L 0 -10 L 36 -14 L 36 14 L 0 10 L -36 14 Z"
          fill={DETAIL}
        />
        <path d="M -34 -12 L 0 -8 L 0 12 L -34 12 Z" fill={BODY} />
        <path d="M 34 -12 L 0 -8 L 0 12 L 34 12 Z" fill={BODY} />
        <line
          x1="-28"
          y1="-4"
          x2="-6"
          y2="-2"
          stroke={DETAIL}
          strokeWidth="0.8"
        />
        <line
          x1="-28"
          y1="0"
          x2="-6"
          y2="2"
          stroke={DETAIL}
          strokeWidth="0.8"
        />
        <line
          x1="-28"
          y1="4"
          x2="-6"
          y2="6"
          stroke={DETAIL}
          strokeWidth="0.8"
        />
        <line
          x1="6"
          y1="-2"
          x2="28"
          y2="-4"
          stroke={ACCENT}
          strokeWidth="1.4"
        />
        <line x1="6" y1="2" x2="28" y2="0" stroke={DETAIL} strokeWidth="0.8" />
        <line x1="6" y1="6" x2="28" y2="4" stroke={DETAIL} strokeWidth="0.8" />
      </g>
    </CatHeadBase>
  ),
  creative: () => (
    <CatHeadBase>
      <ellipse cx="80" cy="36" rx="52" ry="16" fill={DETAIL} />
      <ellipse cx="80" cy="32" rx="44" ry="10" fill="#1A1A1A" />
      <circle cx="116" cy="22" r="6" fill={ACCENT} />
      <g transform="translate(80 168) rotate(-18)">
        <rect x="-36" y="-3" width="42" height="6" fill={DETAIL} />
        <rect x="6" y="-4" width="8" height="8" fill={ACCENT} />
        <path
          d="M 14 -6 L 30 -10 L 30 10 L 14 6 Z"
          fill={BODY}
          stroke={DETAIL}
          strokeWidth="1"
        />
        <circle cx="22" cy="-2" r="1.4" fill={ACCENT} />
      </g>
    </CatHeadBase>
  ),
  dev: () => (
    <CatHeadBase>
      <path
        d="M 28 50 L 132 50 L 132 38 Q 132 26 110 26 L 50 26 Q 28 26 28 38 Z"
        fill={DETAIL}
      />
      <rect x="24" y="48" width="112" height="6" fill={ACCENT} />
      <rect x="72" y="20" width="16" height="6" fill={DETAIL} />
      <g transform="translate(80 168)">
        <rect x="-38" y="-12" width="76" height="24" fill={DETAIL} />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontSize="16"
          fill={ACCENT}
          fontWeight="700"
          className="font-mono-brand"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {"</>"}
        </text>
      </g>
    </CatHeadBase>
  ),
  mobile: () => (
    <CatHeadBase>
      <path
        d="M 46 36 Q 80 -2 122 30"
        stroke={DETAIL}
        strokeWidth="3.4"
        fill="none"
      />
      <rect x="116" y="26" width="16" height="22" rx="4" fill={ACCENT} />
      <rect x="118" y="32" width="12" height="3" fill={BODY} />
      <g transform="translate(80 168)">
        <path d="M -18 -14 L 18 -14 L 16 16 L -16 16 Z" fill={DETAIL} />
        <path
          d="M 18 -8 Q 30 -6 30 4 Q 30 14 18 12"
          stroke={DETAIL}
          strokeWidth="2.4"
          fill="none"
        />
        <rect x="-14" y="-18" width="28" height="4" fill={BODY} />
        <path
          d="M -6 -22 Q -6 -28 -2 -28"
          stroke={ACCENT}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 2 -22 Q 2 -28 6 -28"
          stroke={ACCENT}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </CatHeadBase>
  ),
};

export const MINI_CATS: Record<ProfileId, () => JSX.Element> = {
  gamer: () => (
    <MiniCatBase>
      <path
        d="M 22 40 Q 50 6 78 40"
        stroke={DETAIL}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="12" y="34" width="10" height="16" rx="2.5" fill={DETAIL} />
      <rect x="78" y="34" width="10" height="16" rx="2.5" fill={ACCENT} />
      <rect x="13.5" y="38" width="7" height="8" fill={ACCENT} />
    </MiniCatBase>
  ),
  pro: () => (
    <MiniCatBase>
      <path d="M 32 92 L 50 100 L 68 92 L 68 100 L 32 100 Z" fill={DETAIL} />
      <path d="M 47 92 L 53 92 L 55 98 L 50 100 L 45 98 Z" fill={ACCENT} />
    </MiniCatBase>
  ),
  study: () => (
    <MiniCatBase>
      <circle
        cx="38"
        cy="60"
        r="8"
        stroke={DETAIL}
        strokeWidth="1.8"
        fill="none"
      />
      <circle
        cx="62"
        cy="60"
        r="8"
        stroke={DETAIL}
        strokeWidth="1.8"
        fill="none"
      />
      <line
        x1="46"
        y1="60"
        x2="54"
        y2="60"
        stroke={DETAIL}
        strokeWidth="1.8"
      />
    </MiniCatBase>
  ),
  creative: () => (
    <MiniCatBase>
      <ellipse cx="50" cy="26" rx="30" ry="9" fill={DETAIL} />
      <ellipse cx="50" cy="23" rx="24" ry="6" fill="#1A1A1A" />
      <circle cx="72" cy="18" r="3.5" fill={ACCENT} />
    </MiniCatBase>
  ),
  dev: () => (
    <MiniCatBase>
      <path
        d="M 16 36 L 84 36 L 84 28 Q 84 20 70 20 L 30 20 Q 16 20 16 28 Z"
        fill={DETAIL}
      />
      <rect x="14" y="34" width="72" height="4" fill={ACCENT} />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="10"
        fill={DETAIL}
        fontWeight="700"
        className="font-mono-brand"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {"</>"}
      </text>
    </MiniCatBase>
  ),
  mobile: () => (
    <MiniCatBase>
      <path
        d="M 28 26 Q 50 -4 76 22"
        stroke={DETAIL}
        strokeWidth="2.2"
        fill="none"
      />
      <rect x="72" y="20" width="10" height="14" rx="2.5" fill={ACCENT} />
      <rect x="73.5" y="24" width="7" height="2" fill={BODY} />
    </MiniCatBase>
  ),
};
