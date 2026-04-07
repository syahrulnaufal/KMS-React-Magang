import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  Layers,
  FolderTree,
  Image,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";
import "../styles/sidebar.css";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) setIsOpen(false);
  };

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
    <>
      {/* MOBILE HEADER (Hanya nampak di layar HP) */}
      <div className="mobile-top-header">
        <div className="mobile-brand">
          {/* <img src={logo} alt="Logo" width={'100%'}/> */}
          <div className="mobile-logo"></div>
          {/* <span>KMS Admin</span> */}
        </div>
        <button className="mobile-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* OVERLAY BELAKANG */}
      <div className={`sidebar-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)}></div>

      <aside className={`kms-sidebar ${isOpen ? "open" : ""}`}>
      <div className="kms-sidebar-header">
        <div className="sidebar-brand">
          <img src={logo} alt="RBS Logo" />
        </div>
      </div>

      <nav className="kms-sidebar-menu">
        {/* DASHBOARD */}
        <NavLink
          to="/dashboard"
          onClick={handleLinkClick}
          className={`kms-menu-item ${isDashboard ? "active" : ""}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        {/* CONTENT */}
        <NavLink
          to="/knowledge"
          onClick={handleLinkClick}
          className={`kms-menu-item ${isKnowledge ? "active" : ""}`}
        >
          <BookOpen size={18} />
          <span>Content</span>
        </NavLink>

        {/* SYSTEM MANAGEMENT */}
        <NavLink
          to="/addSystems"
          onClick={handleLinkClick}
          className={`kms-menu-item ${isSystems ? "active" : ""}`}
        >
          <Layers size={18} />
          <span>Systems</span>
        </NavLink>

        {/* FEATURE MANAGEMENT */}
        <NavLink
          to="/features"
          onClick={handleLinkClick}
          className={`kms-menu-item ${isFeatures ? "active" : ""}`}
        >
          <FolderTree size={18} />
          <span>Features</span>
        </NavLink>

        {/* USERS */}
        {user?.role === "superadmin" && (
          <NavLink
            to="/users"
            onClick={handleLinkClick}
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
    </>
  );
}
