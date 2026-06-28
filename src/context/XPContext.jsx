"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const XPContext =
  createContext();

export function XPProvider({
  children,
}) {
  const [xp, setXP] =
    useState(0);

  useEffect(() => {
    const savedXP =
      localStorage.getItem(
        "careerbridge_xp"
      );

    if (savedXP) {
      setXP(
        Number(savedXP)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "careerbridge_xp",
      xp
    );
  }, [xp]);

  const addXP = (value) => {
    setXP(
      (prev) => prev + value
    );
  };

  const removeXP = (
    value
  ) => {
    setXP((prev) =>
      Math.max(
        prev - value,
        0
      )
    );
  };

  const level =
    Math.floor(xp / 1000) + 1;

  const currentXP =
    xp % 1000;

  const nextLevelXP =
    1000;

  const progress =
    (currentXP /
      nextLevelXP) *
    100;

  return (
    <XPContext.Provider
      value={{
        xp,
        level,
        progress,
        currentXP,
        nextLevelXP,
        addXP,
        removeXP,
      }}
    >
      {children}
    </XPContext.Provider>
  );
}

export const useXP = () =>
  useContext(XPContext);