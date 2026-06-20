"use client";

import { useState } from "react";
export function useMouseOpinion() {
  const [state, setState] = useState("idle");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [tdu, setTdu] = useState("GAMER");
  const reset = () => {
    setState("idle");
    setResponse("");
    setError(null);
  };
  const askOpinion = async (deviceA, deviceB) => {
    if (!deviceA || !deviceB) return;
    setState("loading");
    setResponse("");
    setError(null);
    try {
      const res = await fetch("/api/mouse-opinion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          deviceA,
          deviceB,
          tdu
        })
      });
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.statusText}`);
      }
      if (!res.body) {
        throw new Error("Corpo da resposta vazio.");
      }
      setState("streaming");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = "";
      while (!done) {
        const {
          value,
          done: doneReading
        } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, {
            stream: !done
          });
          accumulatedText += chunk;
          setResponse(accumulatedText);
        }
      }
      setState("done");
    } catch (err) {
      console.error(err);
      setError(err.message || "Ocorreu um erro desconhecido.");
      setState("error");
    }
  };
  return {
    state,
    response,
    error,
    tdu,
    setTdu,
    askOpinion,
    reset
  };
}