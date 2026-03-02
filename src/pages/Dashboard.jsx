import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { useKnowledge } from "../knowledge/KnowledgeContext";
import { Outlet, useLocation } from "react-router-dom";

import "../styles/dashboard.css";

export default function Dashboard() {
  const { knowledgeList } = useKnowledge();
  const location = useLocation();

  const published = knowledgeList.filter((k) => k.status === "Published");

  const countByCategory = (category) =>
    published.filter((k) => k.category === category).length;

  const isDashboardHome = location.pathname === "/dashboard";

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <DashboardHeader />

        <main className="dashboard-content">
          {isDashboardHome && (
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <div className="stat-number">
                  {countByCategory("Media Releases")}
                </div>
                <div className="stat-label">Media Releases</div>
              </div>

              <div className="dashboard-stat-card">
                <div className="stat-number">
                  {countByCategory("Lesson Learned")}
                </div>
                <div className="stat-label">Article</div>
              </div>

              <div className="dashboard-stat-card">
                <div className="stat-number">{countByCategory("Teknis")}</div>
                <div className="stat-label">Announcement</div>
              </div>
            </div>
          )}

          {/* CHILD PAGE RENDER DI SINI */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
