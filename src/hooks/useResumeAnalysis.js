"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function useResumeAnalysis() {
  const { user } = useAuth();
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalysis() {
      setLoading(true);
      if (user && user.role !== "admin") {
        // Authenticated: Load latest resume analysis from Supabase
        const { data, error } = await supabase
          .from("resume_analyses")
          .select("*")
          .eq("user_id", user.id)
          .order("analyzed_at", { ascending: false })
          .limit(1);

        if (!error && data && data.length > 0) {
          const analysis = {
            score: data[0].score,
            ...data[0].analysis_data,
          };
          setLatestAnalysis(analysis);
          localStorage.setItem("low_score_resume_analysis", JSON.stringify(analysis));
        } else {
          setLatestAnalysis(null);
        }
      } else {
        // Guest: fallback to localStorage
        const saved = localStorage.getItem("low_score_resume_analysis");
        if (saved) {
          try {
            setLatestAnalysis(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        } else {
          setLatestAnalysis(null);
        }
      }
      setLoading(false);
    }

    loadAnalysis();
  }, [user]);

  const saveAnalysis = async (score, analysisData) => {
    const analysis = {
      score,
      ...analysisData,
    };
    setLatestAnalysis(analysis);
    localStorage.setItem("low_score_resume_analysis", JSON.stringify(analysis));

    if (user && user.role !== "admin") {
      await supabase.from("resume_analyses").insert({
        user_id: user.id,
        score: score,
        analysis_data: analysisData,
      });
    }
  };

  const clearAnalysis = async () => {
    setLatestAnalysis(null);
    localStorage.removeItem("low_score_resume_analysis");

    if (user && user.role !== "admin") {
      await supabase.from("resume_analyses").delete().eq("user_id", user.id);
    }
  };

  return {
    latestAnalysis,
    loading,
    saveAnalysis,
    clearAnalysis,
  };
}
