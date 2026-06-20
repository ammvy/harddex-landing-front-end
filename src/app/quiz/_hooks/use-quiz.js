"use client";

import { useState, useMemo } from "react";
import { QUESTIONS } from "../_data/questions";
export function useQuiz() {
  const [phase, setPhase] = useState("intro");
  const [level, setLevel] = useState(1);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const active = useMemo(() => QUESTIONS.filter(q => q.level <= level), [level]);
  const total = active.length;
  const current = active[idx];
  const scores = useMemo(() => {
    const s = {
      GAMER: 0,
      PRO: 0,
      STUDY: 0,
      CREATIVE: 0,
      DEV: 0,
      MOBILE: 0
    };
    Object.entries(answers).forEach(([qid, oi]) => {
      const q = QUESTIONS.find(x => x.id === qid);
      if (!q) return;
      const w = q.options[oi]?.w || {};
      Object.keys(w).forEach(k => {
        s[k] += w[k] || 0;
      });
    });
    return s;
  }, [answers]);
  const ranking = useMemo(() => {
    return Object.entries(scores).sort((a, b) => b[1] - a[1]);
  }, [scores]);
  const winner = ranking[0]?.[0] || "PRO";
  const winnerTotal = ranking.reduce((acc, [, v]) => acc + v, 0) || 1;
  const startQuiz = selectedLevel => {
    setLevel(selectedLevel);
    setAnswers({});
    setIdx(0);
    setPhase("questions");
  };
  const answerCurrent = optionIndex => {
    if (!current) return;
    setAnswers(prev => ({
      ...prev,
      [current.id]: optionIndex
    }));
    setTimeout(() => {
      if (idx + 1 >= total) {
        setPhase("result");
      } else {
        setIdx(prev => prev + 1);
      }
    }, 220);
  };
  const prev = () => {
    setIdx(prevIdx => Math.max(0, prevIdx - 1));
  };
  const restart = () => {
    setPhase("intro");
    setIdx(0);
    setAnswers({});
  };
  return {
    phase,
    level,
    idx,
    answers,
    active,
    total,
    current,
    scores,
    ranking,
    winner,
    winnerTotal,
    setLevel,
    startQuiz,
    answerCurrent,
    prev,
    restart
  };
}