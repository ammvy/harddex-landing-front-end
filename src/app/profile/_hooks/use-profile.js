"use client";

import { useState } from "react";
import { INITIAL_USER } from "../_data/mock-user";
export function useProfile() {
  const [user, setUser] = useState(INITIAL_USER);
  return {
    user
  };
}