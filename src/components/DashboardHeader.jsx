import { Search, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function DashboardHeader() {
  const location = useLocation();

  let title = "Dashboard";

  if (location.pathname === "/users") {
    title = "Kelola User";
  } else if (location.pathname === "/knowledge") {
    title = "Content";
  } else if (location.pathname === "/features") {
    title = "Feature";
  } else if (location.pathname === "/addSystems") {
    title = "System";
  }

  // Hanya tampilkan search & notif jika di dashboard
  const showActions = location.pathname === "/dashboard";

  return (
    <header className="dashboard-header-modern">
      <div className="dashboard-header-left">
        <h1>{title}</h1>
      </div>

      {showActions && (
        <div className="dashboard-header-right">
          <div className="dashboard-search">
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>

          <button className="dashboard-notif-btn">
            <Bell size={18} />
          </button>
        </div>
      )}
    </header>
  );
}
