"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiSuccess() {
  const [showConfetti,
    setShowConfetti] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () =>
      clearTimeout(timer);
  }, []);

  if (!showConfetti) {
    return null;
  }

  return (
    <Confetti
      recycle={false}
      numberOfPieces={300}
      gravity={0.15}
    />
  );
}