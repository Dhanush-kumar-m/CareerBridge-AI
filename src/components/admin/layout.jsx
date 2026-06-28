import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}) {
  return (
    <div className="admin-layout">

      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Content */}

      <div className="admin-main">

        <AdminNavbar />

        <main className="admin-content">

          {children}

        </main>

      </div>

    </div>
  );
}