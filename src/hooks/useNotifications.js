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
      if (user) {
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
        }

        // 2. Fetch read states
        const { data: readData, error: readError } = await supabase
          .from("read_notifications")
          .select("notification_id")
          .eq("user_id", user.id);

        const readIds = (!readError && readData) ? readData.map((row) => row.notification_id) : [];
        localStorage.setItem("read_notifications", JSON.stringify(readIds));

        // 3. Map read status
        notifyList.forEach((n) => {
          n.isRead = readIds.includes(n.id);
        });

        const unread = notifyList.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
        setNotifications(notifyList);
        localStorage.setItem("system_notifications", JSON.stringify(notifyList));

      } else {
        // Guest/Admin: fallback to localStorage
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

        const readIds = JSON.parse(localStorage.getItem("read_notifications") || "[]");
        list.forEach((n) => {
          n.isRead = readIds.includes(n.id);
        });

        const unread = list.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
        setNotifications(list);
      }
      setLoading(false);
    }

    loadNotificationsData();
  }, [user]);

  const markAllAsRead = async () => {
    setUnreadCount(0);
    const ids = notifications.map((n) => n.id);
    localStorage.setItem("read_notifications", JSON.stringify(ids));

    // Update local state instantly so the UI reflects the read status immediately!
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

    if (user && ids.length > 0) {
      try {
        const { data: existingRead } = await supabase
          .from("read_notifications")
          .select("notification_id")
          .eq("user_id", user.id);
        
        const existingIds = existingRead ? existingRead.map(r => r.notification_id) : [];
        const newIdsToMark = ids.filter(id => !existingIds.includes(id));
        
        if (newIdsToMark.length > 0) {
          const rows = newIdsToMark.map((id) => ({
            user_id: user.id,
            notification_id: id,
          }));
          const { error } = await supabase.from("read_notifications").insert(rows);
          if (error) console.error("Failed to insert read notifications:", error);
        }
      } catch (err) {
        console.error("Error marking notifications as read:", err);
      }
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAllAsRead,
  };
}
