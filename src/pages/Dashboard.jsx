import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";
import { useAuth } from "../auth/AuthContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layers, FileText, Component, Plus, ArrowRight, User } from "lucide-react";

import "../styles/dashboard.css";

export default function Dashboard() {
  const { systems } = useSystems();
  const { features } = useFeatures();
  const { knowledge } = useKnowledge();
  const { user } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardHome = location.pathname === "/dashboard";

  // Recent 5 content
  const recentKnowledge = [...knowledge]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <div className="welcome-wrapper">
          <DashboardHeader />
        </div>

        <main className="dashboard-content">
          {isDashboardHome && (
            <div className="dashboard-home-wrapper">
              <div className="dashboard-welcome">
                <h2>Selamat Datang, {user?.username || "Admin"}!</h2>
                <p>Berikut adalah ikhtisar dari seluruh sistem pengetahuan Anda hari ini.</p>
              </div>

              {/* STATS GRID */}
              <div className="modern-stats-grid">
                <div className="modern-stat-card">
                  <div className="stat-icon-wrapper blue">
                    <Layers size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{systems?.length || 0}</h3>
                    <p>Total Systems</p>
                  </div>
                </div>

                <div className="modern-stat-card">
                  <div className="stat-icon-wrapper green">
                    <Component size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{features?.length || 0}</h3>
                    <p>Total Features</p>
                  </div>
                </div>

                <div className="modern-stat-card">
                  <div className="stat-icon-wrapper purple">
                    <FileText size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{knowledge?.length || 0}</h3>
                    <p>Total Contents</p>
                  </div>
                </div>
              </div>

              {/* BOTTOM SECTION */}
              <div className="dashboard-bottom-grid">
                {/* RECENT ACIVITY */}
                <div className="recent-activity-card">
                  <div className="card-header">
                    <h3>Konten Terakhir Ditambahkan</h3>
                  </div>
                  <div className="activity-list">
                    {recentKnowledge.length > 0 ? (
                      recentKnowledge.map((item) => (
                        <div key={item.id} className="activity-item">
                          <div className="activity-icon">
                            <FileText size={18} />
                          </div>
                          <div className="activity-details">
                            <h4>{item.title}</h4>
                            <span 
                              className={`status-badge ${
                                (item.status === 'Publish' || item.status === 'published') 
                                  ? 'publish' 
                                  : 'draft'
                              }`}
                            >
                              {item.status || "Publish"}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-state">Belum ada konten.</p>
                    )}
                  </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="quick-actions-card">
                  <div className="card-header">
                    <h3>Aksi Cepat</h3>
                  </div>
                  <div className="quick-action-btns">
                    <button onClick={() => navigate('/addSystems')} className="quick-btn">
                      <div className="icon"><Layers size={20}/></div>
                      <span>Kelola Sistem</span>
                      <ArrowRight size={16} className="arrow"/>
                    </button>
                    <button onClick={() => navigate('/features')} className="quick-btn">
                      <div className="icon"><Component size={20}/></div>
                      <span>Kelola Fitur</span>
                      <ArrowRight size={16} className="arrow"/>
                    </button>
                    <button onClick={() => navigate('/knowledge/add')} className="quick-btn">
                      <div className="icon"><Plus size={20}/></div>
                      <span>Tulis Konten</span>
                      <ArrowRight size={16} className="arrow"/>
                    </button>
                    <button onClick={() => navigate('/users')} className="quick-btn">
                      <div className="icon"><User size={20}/></div>
                      <span>Manajemen User</span>
                      <ArrowRight size={16} className="arrow"/>
                    </button>
                  </div>
                </div>
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
