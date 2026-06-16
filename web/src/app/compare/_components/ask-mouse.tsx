"use client";

import { useMouseOpinion } from "../_hooks/use-mouse-opinion";
import { CATS, MINI_CATS, ProfileId } from "@/components/mouse";
import { PROFILE_LABELS } from "../_data/profiles";
import { Device } from "../_data/types";
import { HeadCircuitIcon } from "@phosphor-icons/react/dist/ssr";
import { Sparkles, AlertCircle, RotateCcw } from "lucide-react";

interface AskMouseProps {
  deviceA: Device;
  deviceB: Device;
}

export default function AskMouse({ deviceA, deviceB }: AskMouseProps) {
  const { state, response, error, tdu, setTdu, askOpinion, reset } =
    useMouseOpinion();

  const handleAsk = () => {
    if (state === "loading" || state === "streaming") return;
    askOpinion(deviceA, deviceB);
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <strong key={idx} className="font-bold text-primary">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    return text.split("\n\n").map((paragraph, pIdx) => {
      if (
        paragraph.trim().startsWith("- ") ||
        paragraph.trim().startsWith("* ")
      ) {
        const items = paragraph
          .split("\n")
          .map((line) => line.replace(/^[-*]\s+/, ""));
        return (
          <ul
            key={pIdx}
            className="list-disc pl-5 mb-4 space-y-1.5 text-[13px] md:text-[14px]"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{renderInlineFormatting(item)}</li>
            ))}
          </ul>
        );
      }
      return (
        <p
          key={pIdx}
          className="mb-3 text-[13px] md:text-[14px] leading-relaxed text-foreground/90 last:mb-0"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          {renderInlineFormatting(paragraph)}
        </p>
      );
    });
  };

  const profiles: ProfileId[] = [
    "gamer",
    "pro",
    "study",
    "creative",
    "dev",
    "mobile",
  ];

  return (
    <section className="mt-14">
      {/* CSS custom animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wobble {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-4px) rotate(-1deg); }
          75% { transform: translateY(2px) rotate(1deg); }
        }
        @keyframes wobble-fast {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          15% { transform: translateY(-8px) rotate(-2deg); }
          30% { transform: translateY(4px) rotate(2deg); }
          45% { transform: translateY(-6px) rotate(-1.5deg); }
          60% { transform: translateY(3px) rotate(1.5deg); }
          75% { transform: translateY(-3px) rotate(-1deg); }
        }
        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-wobble-mouse {
          animation: wobble 3s ease-in-out infinite;
        }
        .animate-wobble-mouse-fast {
          animation: wobble-fast 0.8s ease-in-out infinite;
        }
        .animate-dot1 {
          animation: dot-bounce 0.8s ease-in-out infinite;
          animation-delay: 0ms;
        }
        .animate-dot2 {
          animation: dot-bounce 0.8s ease-in-out infinite;
          animation-delay: 150ms;
        }
        .animate-dot3 {
          animation: dot-bounce 0.8s ease-in-out infinite;
          animation-delay: 300ms;
        }
        .animate-cursor-blink {
          animation: blink 0.8s step-end infinite;
        }
      `,
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.02em",
          }}
          className="uppercase text-[32px] md:text-[40px] leading-none text-foreground font-bold"
        >
          Conversar com Mouse
        </h2>
      </div>

      <div className="border border-foreground bg-background divide-y divide-foreground/10">
        {/* TDU Profile Selector */}
        <div className="p-4 bg-muted/20">
          <div
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] opacity-60 mb-3"
          >
            Selecione seu perfil de uso
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {profiles.map((profileId) => {
              const active = tdu === profileId;
              const MiniCat = MINI_CATS[profileId];

              return (
                <button
                  key={profileId}
                  type="button"
                  onClick={() => {
                    if (state !== "loading" && state !== "streaming") {
                      setTdu(profileId);
                    }
                  }}
                  disabled={state === "loading" || state === "streaming"}
                  className={`flex items-center gap-3 p-2 border transition-all duration-150 cursor-pointer text-left rounded-none ${
                    active
                      ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(58,112,244,0.15)] scale-[1.02]"
                      : "border-foreground/10 hover:border-primary/50 hover:bg-muted/10"
                  } ${state === "loading" || state === "streaming" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                    <MiniCat className="w-full h-full" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: "-0.02em",
                      }}
                      className="uppercase text-[11px] leading-none font-bold"
                    >
                      {PROFILE_LABELS[profileId]}
                    </div>
                    <span className="text-[8px] opacity-50 uppercase tracking-wide">
                      Ver Opinião
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat / Interaction Area */}
        <div className="flex flex-col md:flex-row items-start gap-6 p-6">
          {/* Mouse Persona Avatar */}
          <div className="flex flex-col items-center gap-2 w-full md:w-fit shrink-0">
            <div
              className={`w-28 h-28 md:w-32 md:h-32 shrink-0 ${
                state === "loading" || state === "streaming"
                  ? "animate-wobble-mouse-fast"
                  : "animate-wobble-mouse"
              }`}
            >
              {CATS[tdu] ? CATS[tdu]() : null}
            </div>
            <div
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[9px] bg-foreground text-background px-2 py-0.5 font-bold"
            >
              Mouse Bot
            </div>
          </div>

          {/* Chat Bubble */}
          <div className="relative flex-1 w-full border border-foreground/10 bg-muted/5 p-4 md:p-5">
            {/* speech bubble tail (rotated square) */}
            <div className="absolute left-[-6px] top-12 w-2.5 h-2.5 bg-background border-l border-b border-foreground/10 rotate-45 hidden md:block" />

            <div className="min-h-[90px] flex flex-col justify-center">
              {state === "idle" && (
                <div>
                  <p
                    className="text-[13px] md:text-[14px] leading-relaxed text-foreground/75"
                    style={{ fontFamily: "'Inter Tight', sans-serif" }}
                  >
                    Olá! Sou o <strong>Mouse</strong>, seu especialista de
                    hardware oficial no HardDex. 🐱💻
                    <br />
                    <br />
                    Selecione o seu perfil de uso acima (ex: Gamer,
                    Produtividade, Estudo...) e clique em{" "}
                    <strong>Pedir Opinião</strong>. Vou analisar as
                    especificações técnicas do{" "}
                    <strong>
                      {deviceA.brand} {deviceA.model}
                    </strong>{" "}
                    e do{" "}
                    <strong>
                      {deviceB.brand} {deviceB.model}
                    </strong>{" "}
                    para te dar o veredito definitivo!
                  </p>
                </div>
              )}

              {state === "loading" && (
                <div className="flex flex-col items-center justify-center py-6 gap-2">
                  <div className="flex gap-1.5 items-center justify-center">
                    <span className="w-2 h-2 bg-primary rounded-full animate-dot1" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-dot2" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-dot3" />
                  </div>
                  <span
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="uppercase text-[9px] tracking-widest opacity-60 animate-pulse"
                  >
                    Analisando hardware...
                  </span>
                </div>
              )}

              {(state === "streaming" || state === "done") && (
                <div className="prose prose-sm max-w-none text-foreground">
                  <div
                    className="flex items-center gap-1.5 mb-3 text-primary text-[10px] tracking-wider uppercase font-bold"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <Sparkles size={11} className="animate-spin-slow" />
                    <span>Opinião do Mouse ({PROFILE_LABELS[tdu]})</span>
                  </div>
                  {renderFormattedText(response)}
                  {state === "streaming" && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-primary align-middle animate-cursor-blink" />
                  )}
                </div>
              )}

              {state === "error" && (
                <div className="flex items-start gap-3 text-destructive border border-destructive/20 bg-destructive/5 p-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="uppercase text-[11px] font-bold leading-none mb-1"
                    >
                      Ocorreu um erro
                    </div>
                    <p className="text-[12px] opacity-90">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bubble Action footer */}
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-foreground/5">
              {(state === "done" || state === "error") && (
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-1 text-[10px] md:text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors cursor-pointer"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <RotateCcw size={13} />
                  <span>Limpar</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ask Opinion Button Area */}
        <div className="flex justify-end p-4 bg-muted/10">
          <button
            type="button"
            onClick={handleAsk}
            disabled={state === "loading" || state === "streaming"}
            className={`w-full sm:w-auto flex justify-center items-center gap-2 bg-primary text-primary-foreground hover:cursor-pointer hover:bg-transparent hover:border-primary hover:text-primary border-transparent border-solid border-2 p-3 px-6 transition-all duration-150 uppercase tracking-wider font-bold text-[12px] ${
              state === "loading" || state === "streaming"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span>
              {state === "loading" || state === "streaming"
                ? "Analisando..."
                : state === "done"
                  ? "Analisar Novamente"
                  : "Pedir Opinião"}
            </span>
            <HeadCircuitIcon size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
