import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  Layers,
  FolderTree,
  Image,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";
import "../styles/sidebar.css";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isDashboard = location.pathname === "/dashboard";
  const isKnowledge = location.pathname.startsWith("/knowledge");
  const isUsers = location.pathname.startsWith("/users");
  const isSystems = location.pathname.startsWith("/addSystems");
  const isFeatures = location.pathname.startsWith("/features");
  const isMedia = location.pathname.startsWith("/media");

  return (
    <aside className="kms-sidebar">
      <div className="kms-sidebar-header">
        <div className="sidebar-brand">
          <img src={logo} alt="RBS Logo" />
        </div>
      </div>

      <nav className="kms-sidebar-menu">
        {/* DASHBOARD */}
        <NavLink
          to="/dashboard"
          className={`kms-menu-item ${isDashboard ? "active" : ""}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        {/* CONTENT */}
        <NavLink
          to="/knowledge"
          className={`kms-menu-item ${isKnowledge ? "active" : ""}`}
        >
          <BookOpen size={18} />
          <span>Content</span>
        </NavLink>

        {/* SYSTEM MANAGEMENT */}
        <NavLink
          to="/addSystems"
          className={`kms-menu-item ${isSystems ? "active" : ""}`}
        >
          <Layers size={18} />
          <span>Systems</span>
        </NavLink>

        {/* FEATURE MANAGEMENT */}
        <NavLink
          to="/features"
          className={`kms-menu-item ${isFeatures ? "active" : ""}`}
        >
          <FolderTree size={18} />
          <span>Features</span>
        </NavLink>

        {/* USERS */}
        {user?.role === "superadmin" && (
          <NavLink
            to="/users"
            className={`kms-menu-item ${isUsers ? "active" : ""}`}
          >
            <Users size={18} />
            <span>Kelola User</span>
          </NavLink>
        )}
      </nav>

      <div className="kms-sidebar-footer">
        <button className="kms-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
