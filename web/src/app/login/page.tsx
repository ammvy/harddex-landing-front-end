"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const ACCENT = "#3D7FFF";
const CAT_WHITE = "#F2F2EE";

function Logo({ fg, size = "md" }: { fg: string; size?: "md" | "sm" }) {
  const fontSize =
    size === "sm"
      ? "text-[clamp(44px,5vw,68px)]"
      : "text-[clamp(56px,9vw,120px)]";
  const barTop = "top-[43%]";
  return (
    <div className="relative inline-block select-none">
      <span
        style={{
          fontFamily: "'Blanka', 'Space Mono', monospace",
          letterSpacing: "0.02em",
          color: fg,
        }}
        className={`uppercase ${fontSize} leading-[0.85] block`}
      >
        Hard<span style={{ color: ACCENT }}>dex</span>
      </span>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
        style={{ background: ACCENT }}
        className={`absolute left-[-3%] right-[-3%] ${barTop} h-[12%] mix-blend-multiply`}
      />
    </div>
  );
}

function CatWelcome({ blink }: { blink: boolean }) {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-auto max-w-[320px]">
      <path d="M 26 26 L 34 10 L 44 28 Z" fill={CAT_WHITE} />
      <path d="M 74 26 L 66 10 L 56 28 Z" fill={CAT_WHITE} />
      <path d="M 31 24 L 34 16 L 39 26 Z" fill={ACCENT} />
      <path d="M 69 24 L 66 16 L 61 26 Z" fill={ACCENT} />
      <path
        d="M 22 28 Q 22 18 32 18 L 68 18 Q 78 18 78 28 L 78 52 Q 78 64 50 64 Q 22 64 22 52 Z"
        fill={CAT_WHITE}
      />
      {blink ? (
        <>
          <rect x="35" y="43.5" width="6" height="1.5" fill="#0A0A0A" />
          <rect x="59" y="43.5" width="6" height="1.5" fill="#0A0A0A" />
        </>
      ) : (
        <>
          <circle cx="38" cy="44" r="3" fill="#0A0A0A" />
          <circle cx="62" cy="44" r="3" fill="#0A0A0A" />
        </>
      )}
      <path d="M 48 52 L 52 52 L 50 55 Z" fill={ACCENT} />
      <path
        d="M 50 55 Q 50 58 47 58 M 50 55 Q 50 58 53 58"
        stroke="#0A0A0A"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 30 70 Q 30 66 34 66 L 66 66 Q 70 66 70 70 L 72 110 Q 72 116 66 116 L 34 116 Q 28 116 28 110 Z"
        fill="#0F0F0F"
      />
      <path
        d="M 50 66 L 50 116"
        stroke={ACCENT}
        strokeWidth="2.5"
        opacity="0.9"
      />
      <circle cx="50" cy="80" r="3" fill={ACCENT} />
      <circle cx="50" cy="92" r="3" fill={ACCENT} />
      <circle cx="50" cy="104" r="3" fill={ACCENT} />
      <path
        d="M 75 92 Q 92 88 92 70 Q 92 58 84 58"
        stroke={CAT_WHITE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Login() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const bg = dark ? "bg-[#0E0E0E]" : "bg-white";
  const fg = dark ? "text-white" : "text-black";
  const fgHex = dark ? "#FFFFFF" : "#000000";
  const border = dark ? "border-white" : "border-black";
  const borderSoft = dark ? "border-white/20" : "border-black/20";
  const inputBg = dark ? "bg-white/[0.04]" : "bg-black/[0.02]";

  return (
    <div
      className={`min-h-screen w-full ${bg} ${fg} transition-colors duration-200`}
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <div className={`border-b ${borderSoft}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link
            href="/"
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="flex items-center gap-2 uppercase tracking-widest text-[11px] hover:text-[#3D7FFF] transition-colors duration-100"
          >
            <ArrowLeft size={12} strokeWidth={1.8} />
            Voltar
          </Link>
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] opacity-50"
          >
            § Acesso / 2026
          </span>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Alternar tema"
            className={`w-9 h-9 border ${border} flex items-center justify-center hover:text-[#3D7FFF] hover:border-[#3D7FFF] transition-colors duration-100`}
          >
            {dark ? (
              <Sun size={14} strokeWidth={1.6} />
            ) : (
              <Moon size={14} strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-12 min-h-[calc(100vh-66px)]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`col-span-12 lg:col-span-7 border-r ${borderSoft} pr-0 lg:pr-16 py-12 lg:py-20 flex flex-col justify-center`}
        >
          <div className="max-w-md w-full">
            <Logo fg={fgHex} size="sm" />

            <div className="mt-10">
              <div
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[10px] opacity-50 mb-3"
              >
                § 01 / Identificação
              </div>
              <h1
                style={{
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
                className="uppercase text-[clamp(32px,3.8vw,48px)]"
              >
                Entrar<span style={{ color: ACCENT }}>.</span>
              </h1>
              <p className="mt-3 text-[13px] opacity-70 max-w-sm">
                Acesse seu Index pessoal. Componentes salvos e recomendações sob
                medida.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              {[
                {
                  name: "Google",
                  svg: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  svg: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill={fgHex}>
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.5 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                  ),
                },
                {
                  name: "Apple",
                  svg: (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill={fgHex}>
                      <path d="M17.05 13.04c-.03-2.79 2.28-4.13 2.38-4.2-1.3-1.9-3.32-2.16-4.04-2.19-1.72-.18-3.36 1.01-4.23 1.01-.88 0-2.22-.99-3.65-.96-1.88.03-3.61 1.09-4.58 2.77-1.95 3.38-.5 8.39 1.4 11.14.93 1.35 2.04 2.86 3.49 2.8 1.4-.06 1.93-.91 3.62-.91 1.69 0 2.17.91 3.65.88 1.51-.03 2.46-1.37 3.39-2.72 1.07-1.56 1.51-3.07 1.53-3.15-.03-.01-2.94-1.13-2.96-4.47zM14.46 4.93c.77-.94 1.29-2.24 1.15-3.54-1.11.05-2.45.74-3.25 1.67-.72.83-1.35 2.16-1.18 3.42 1.24.1 2.51-.63 3.28-1.55z" />
                    </svg>
                  ),
                },
              ].map((p) => (
                <button
                  key={p.name}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className={`border ${border} ${inputBg} py-3 px-3 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] hover:border-[#3D7FFF] hover:text-[#3D7FFF] transition-colors duration-100`}
                  type="button"
                >
                  {p.svg}
                  <span className="hidden sm:inline">{p.name}</span>
                </button>
              ))}
            </div>

            <div className="my-6 flex items-center gap-4">
              <div
                className={`flex-1 h-px ${dark ? "bg-white/15" : "bg-black/15"}`}
              />
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[9px] opacity-50"
              >
                ou via e-mail
              </span>
              <div
                className={`flex-1 h-px ${dark ? "bg-white/15" : "bg-black/15"}`}
              />
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <label className="flex flex-col gap-2">
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[10px] opacity-60"
                >
                  E-mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className={`${inputBg} border ${border} px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] focus:border-[#3D7FFF] transition-colors duration-100 ${dark ? "placeholder:text-white/30" : "placeholder:text-black/30"}`}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[10px] opacity-60 flex justify-between"
                >
                  <span>Senha</span>
                  <a href="#" className="hover:text-[#3D7FFF]">
                    Esqueci ↗
                  </a>
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className={`${inputBg} border ${border} px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] focus:border-[#3D7FFF] transition-colors duration-100 ${dark ? "placeholder:text-white/30" : "placeholder:text-black/30"}`}
                />
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setRemember((r) => !r)}
                  className={`w-4 h-4 border ${border} flex items-center justify-center transition-colors duration-75`}
                  style={{
                    background: remember ? ACCENT : "transparent",
                    borderColor: remember ? ACCENT : undefined,
                  }}
                >
                  {remember && <span className="w-2 h-2 bg-white" />}
                </button>
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[10px] opacity-70"
                >
                  Manter sessão ativa
                </span>
              </label>

              <button
                type="submit"
                style={{ fontFamily: "'Space Mono', monospace" }}
                className={`${dark ? "bg-white text-black" : "bg-black text-white"} px-5 py-4 uppercase tracking-widest text-[12px] flex items-center justify-between hover:bg-[#3D7FFF] hover:text-white transition-colors duration-100 mt-2`}
              >
                <span>Entrar no Index</span>
                <ArrowRight size={14} strokeWidth={1.6} />
              </button>
            </form>

            <div
              className={`mt-8 pt-6 border-t ${borderSoft} flex items-center justify-between`}
            >
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[10px] opacity-50"
              >
                Sem cadastro?
              </span>
              <Link
                href="/signup"
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[11px] hover:text-[#3D7FFF] transition-colors duration-100"
              >
                Solicitar acesso ↗
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex col-span-5 bg-black text-white relative overflow-hidden flex-col justify-between"
        >
          <div
            className="px-10 pt-10 flex items-center justify-between"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1.5 h-1.5 block"
                style={{ background: ACCENT }}
              />
              <span className="uppercase tracking-widest text-[10px] text-white/70">
                Sessão segura
              </span>
            </div>
            <span className="uppercase tracking-widest text-[10px] text-white/40">
              P-01
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center px-10">
            <CatWelcome blink={blink} />
          </div>

          <div
            className="border-t border-white/15 px-10 py-6 grid grid-cols-2 gap-6"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <div>
              <div className="uppercase tracking-widest text-[9px] text-white/50">
                Bordão
              </div>
              <div className="uppercase tracking-widest text-[11px] mt-1.5">
                Compare. <span style={{ color: ACCENT }}>Descubra.</span>{" "}
                Resolva.
              </div>
            </div>
            <div className="text-right">
              <div className="uppercase tracking-widest text-[9px] text-white/50">
                Build
              </div>
              <div className="uppercase tracking-widest text-[11px] mt-1.5">
                001.05.27
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
