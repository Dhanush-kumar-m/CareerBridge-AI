"use client";

import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <header className="admin-navbar">

      <div className="admin-navbar-left">

        <h1>
          🚀 CareerBridge AI Admin
        </h1>

        <span className="admin-subtitle">
          Placement Management Portal
        </span>

      </div>

      <div className="admin-navbar-right">

        <div className="admin-user">

          <div className="admin-avatar">
            A
          </div>

          <div>
            <h4>Admin User</h4>
            <p>Super Administrator</p>
          </div>

        </div>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}