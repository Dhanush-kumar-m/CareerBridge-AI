"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "📊",
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: "👨‍🎓",
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: "🏢",
    },
    {
      name: "Questions",
      href: "/admin/questions",
      icon: "❓",
    },
    {
      name: "Resumes",
      href: "/admin/resumes",
      icon: "📄",
    },
    {
      name: "Interviews",
      href: "/admin/interviews",
      icon: "🎤",
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: "🔔",
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: "📈",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-header">

        <h2>
          🚀 CareerBridge AI
        </h2>

        <p>
          Admin Portal
        </p>

      </div>

      <nav className="sidebar-nav">

        {menuItems.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${
              pathname === item.href
                ? "active-link"
                : ""
            }`}
          >
            <span>
              {item.icon}
            </span>

            {item.name}

          </Link>

        ))}

      </nav>

      <div className="sidebar-footer">

        <div className="admin-status">

          <span className="status-dot"></span>

          System Online

        </div>

      </div>

    </aside>
  );
}