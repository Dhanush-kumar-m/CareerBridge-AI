"use client";

import { useState, useEffect } from "react";

export default function useProgress() {
  const [progress, setProgress] =
    useState({
      aptitude: 82,
      coding: 76,
      resume: 88,
      interview: 71,
    });

  useEffect(() => {
    const savedProgress =
      localStorage.getItem(
        "careerbridge_progress"
      );

    if (savedProgress) {
      setProgress(
        JSON.parse(savedProgress)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "careerbridge_progress",
      JSON.stringify(progress)
    );
  }, [progress]);

  const updateProgress = (
    category,
    value
  ) => {
    setProgress((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const placementReadiness =
    Math.round(
      (
        progress.aptitude +
        progress.coding +
        progress.resume +
        progress.interview
      ) / 4
    );

  const resetProgress = () => {
    setProgress({
      aptitude: 0,
      coding: 0,
      resume: 0,
      interview: 0,
    });
  };

  return {
    progress,
    updateProgress,
    resetProgress,
    placementReadiness,
  };
}