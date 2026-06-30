"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function AuthGuard({ children }) {
  const { user, isAuthenticated, loading, logoutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || "";

  const isStudentRoute = !pathname.startsWith("/admin");
  const isAdminRoute = pathname.startsWith("/admin");

  const isStudentPublic = pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/register");
  const isAdminPublic = pathname.startsWith("/admin/login");

  const isPublicRoute = isStudentPublic || isAdminPublic;

  useEffect(() => {
    // Intercept and auto-fix any malformed object URL pathnames permanently
    if (pathname && (pathname.includes("[object") || pathname.includes("%5Bobject"))) {
      router.replace("/");
      return;
    }

    // Only execute redirects once both loading is complete and the real pathname is resolved
    if (!loading && pathname && pathname !== "") {
      if (!isAuthenticated) {
        // Unauthenticated access redirects
        if (isAdminRoute && !isAdminPublic) {
          router.push("/admin/login");
        } else if (isStudentRoute && !isStudentPublic) {
          router.push("/login");
        }
      } else {
        // Authenticated redirects
        const role = user?.role;
        if (role === "admin") {
          if (isStudentPublic) {
            logoutUser(pathname); // Clear admin session if visiting student logins
          } else if (isStudentRoute || isAdminPublic) {
            router.push("/admin");
          }
        } else {
          if (isAdminPublic) {
            logoutUser(pathname); // Clear student session if visiting admin logins
          } else if (isAdminRoute || isStudentPublic) {
            router.push("/");
          }
        }
      }
    }
  }, [isAuthenticated, loading, pathname, router, user, isStudentRoute, isAdminRoute, isStudentPublic, isAdminPublic, logoutUser]);

  if (loading || !pathname || pathname === "") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "var(--bg-body)" }}>
        <div className="spin-loader" style={{ width: "40px", height: "40px", border: "4px solid var(--border-color)", borderTop: "4px solid var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  // Render spinner while routing checks are resolving
  const isPrivateAndUnauth = !isAuthenticated && !isPublicRoute;
  const isRoleMismatched = isAuthenticated && ((user?.role === "admin" && isStudentRoute) || (user?.role !== "admin" && isAdminRoute));

  if (isPrivateAndUnauth || isRoleMismatched) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "var(--bg-body)" }}>
        <div className="spin-loader" style={{ width: "40px", height: "40px", border: "4px solid var(--border-color)", borderTop: "4px solid var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return children;
}
