"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function useCompanyInteractions() {
  const { user } = useAuth();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper: Load local data
  const getLocalInteractions = () => {
    if (typeof window === "undefined") return [];
    
    const saved = JSON.parse(localStorage.getItem("careerbridge_saved_companies") || "[]");
    const applied = JSON.parse(localStorage.getItem("careerbridge_applied_companies") || "[]");
    
    // Merge them into a single structure
    const allSlugs = Array.from(new Set([...saved, ...applied]));
    return allSlugs.map((slug) => {
      const steps = JSON.parse(localStorage.getItem(`cb_prep_steps_${slug}`) || "[]");
      return {
        company_slug: slug,
        is_saved: saved.includes(slug),
        is_applied: applied.includes(slug),
        prep_steps: steps,
      };
    });
  };

  // Sync to database or load from database/localStorage
  useEffect(() => {
    async function loadInteractions() {
      setLoading(true);
      if (user) {
        // Authenticated: Load from Supabase
        const { data, error } = await supabase
          .from("company_interactions")
          .select("*")
          .eq("user_id", user.id);

        if (!error && data) {
          setInteractions(data);
          
          // Sync back to local storage cache
          const savedList = data.filter((item) => item.is_saved).map((item) => item.company_slug);
          const appliedList = data.filter((item) => item.is_applied).map((item) => item.company_slug);
          localStorage.setItem("careerbridge_saved_companies", JSON.stringify(savedList));
          localStorage.setItem("careerbridge_applied_companies", JSON.stringify(appliedList));
          data.forEach((item) => {
            localStorage.setItem(`cb_prep_steps_${item.company_slug}`, JSON.stringify(item.prep_steps));
          });
        }
      } else {
        // Guest: Load from localStorage
        setInteractions(getLocalInteractions());
      }
      setLoading(false);
    }

    loadInteractions();
  }, [user]);

  // Sync a single record to Supabase or update local state
  const syncInteraction = async (slug, updatedFields) => {
    // 1. Find existing
    const existing = interactions.find((item) => item.company_slug === slug) || {
      company_slug: slug,
      is_saved: false,
      is_applied: false,
      prep_steps: [],
    };

    const merged = { ...existing, ...updatedFields };

    // 2. Update local state
    const filtered = interactions.filter((item) => item.company_slug !== slug);
    const updatedState = [...filtered, merged];
    setInteractions(updatedState);

    // 3. Update localStorage
    if (typeof window !== "undefined") {
      const savedList = updatedState.filter((item) => item.is_saved).map((item) => item.company_slug);
      const appliedList = updatedState.filter((item) => item.is_applied).map((item) => item.company_slug);
      localStorage.setItem("careerbridge_saved_companies", JSON.stringify(savedList));
      localStorage.setItem("careerbridge_applied_companies", JSON.stringify(appliedList));
      if (updatedFields.prep_steps !== undefined) {
        localStorage.setItem(`cb_prep_steps_${slug}`, JSON.stringify(merged.prep_steps));
      }
    }

    // 4. Update Supabase
    if (user) {
      await supabase.from("company_interactions").upsert({
        user_id: user.id,
        company_slug: slug,
        is_saved: merged.is_saved,
        is_applied: merged.is_applied,
        prep_steps: merged.prep_steps,
      });
    }
  };

  const toggleSave = async (slug) => {
    const existing = interactions.find((item) => item.company_slug === slug);
    const isSaved = existing ? existing.is_saved : false;
    await syncInteraction(slug, { is_saved: !isSaved });
  };

  const toggleApply = async (slug) => {
    const existing = interactions.find((item) => item.company_slug === slug);
    const isApplied = existing ? existing.is_applied : false;
    await syncInteraction(slug, { is_applied: !isApplied });
  };

  const toggleStep = async (slug, step) => {
    const existing = interactions.find((item) => item.company_slug === slug) || { prep_steps: [] };
    const steps = existing.prep_steps || [];
    const updatedSteps = steps.includes(step)
      ? steps.filter((s) => s !== step)
      : [...steps, step];
    
    await syncInteraction(slug, { prep_steps: updatedSteps });
  };

  const getInteraction = (slug) => {
    const found = interactions.find((item) => item.company_slug === slug);
    return found || { is_saved: false, is_applied: false, prep_steps: [] };
  };

  const getSavedAndAppliedCounts = () => {
    const savedCount = interactions.filter((item) => item.is_saved).length;
    const appliedCount = interactions.filter((item) => item.is_applied).length;
    return { savedCount, appliedCount };
  };

  return {
    interactions,
    loading,
    toggleSave,
    toggleApply,
    toggleStep,
    getInteraction,
    getSavedAndAppliedCounts,
  };
}
