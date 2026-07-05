"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotificationsData() {
      setLoading(true);
      if (user && user.role !== "admin") {
        // 1. Fetch relevant notifications from Supabase
        const { data: list, error } = await supabase
          .from("notifications")
          .select("*")
          .order("created_at", { ascending: false });

        let notifyList = [];
        if (!error && list) {
          notifyList = list.map((n) => ({
            id: n.id,
            title: n.title,
            content: n.message,
            date: new Date(n.created_at).toLocaleDateString(),
            status: "Sent",
          }));
          setNotifications(notifyList);
          localStorage.setItem("system_notifications", JSON.stringify(notifyList));
        }

        // 2. Fetch read states
        const { data: readData, error: readError } = await supabase
          .from("read_notifications")
          .select("notification_id")
          .eq("user_id", user.id);

        if (!readError && readData) {
          const readIds = readData.map((row) => row.notification_id);
          localStorage.setItem("read_notifications", JSON.stringify(readIds));
          const unread = notifyList.filter((n) => !readIds.includes(n.id)).length;
          setUnreadCount(unread);
        }
      } else {
        // Guest: fallback to localStorage
        const stored = localStorage.getItem("system_notifications");
        let list = [];
        if (stored) {
          list = JSON.parse(stored);
        } else {
          list = [
            {
              id: 1,
              title: "TCS Placement Drive",
              content: "TCS is conducting a placement drive for engineering graduates. Register by 30th June.",
              date: "22 June 2026",
              status: "Sent"
            },
            {
              id: 2,
              title: "Resume Submission Reminder",
              content: "Please upload your updated resume to the ATS analyzer to clear internal placement audits.",
              date: "20 June 2026",
              status: "Sent"
            },
            {
              id: 3,
              title: "Mock Interview Schedule",
              content: "HR mock interview slots are now open. Choose your timing in the mock interview tab.",
              date: "18 June 2026",
              status: "Sent"
            }
          ];
          localStorage.setItem("system_notifications", JSON.stringify(list));
        }
        setNotifications(list);

        const readIds = JSON.parse(localStorage.getItem("read_notifications") || "[]");
        const unread = list.filter((n) => !readIds.includes(n.id)).length;
        setUnreadCount(unread);
      }
      setLoading(false);
    }

    loadNotificationsData();
  }, [user]);

  const markAllAsRead = async () => {
    setUnreadCount(0);
    const ids = notifications.map((n) => n.id);
    localStorage.setItem("read_notifications", JSON.stringify(ids));

    if (user && user.role !== "admin" && ids.length > 0) {
      const rows = ids.map((id) => ({
        user_id: user.id,
        notification_id: id,
      }));
      await supabase.from("read_notifications").upsert(rows);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAllAsRead,
  };
}
