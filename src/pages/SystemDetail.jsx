import { useParams, useNavigate } from "react-router-dom";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";
import { useState } from "react";
import { FiArrowLeft, FiUsers, FiFileText, FiList, FiFolder, FiClock, FiCalendar, FiClipboard, FiMenu, FiX } from "react-icons/fi";
import * as FaIcons from "react-icons/fa";

import "../styles/public.css";
import "../styles/modern-beautify.css";

export default function SystemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { systems } = useSystems();
  const { features } = useFeatures();
  const { knowledge } = useKnowledge();

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const system = systems.find((s) => Number(s.id) === Number(id));

  const systemFeatures = features.filter(
    (f) => Number(f.systemId) === Number(id)
  );

  const filteredKnowledge = knowledge.filter(
    (item) =>
      item.status?.toLowerCase() === "publish" &&
      (Number(item.featureId) === Number(selectedFeature) || Number(item.feature) === Number(selectedFeature))
  );

  return (
    <div className="system-detail-wrapper">
      {/* MAIN CARD CONTAINER */}
      <div className="system-main-card">
        {/* HEADER NAV BACK */}
        
        {/* SIDEBAR TREE VIEW */}
        <aside className={`sys-sidebar ${isSidebarOpen ? 'open' : ''}`}>

          <div className="system-nav-area" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button className="btn-back-modern" onClick={() => navigate("/systems")} style={{ marginBottom: 0 }}>
              <FiArrowLeft size={18} />
              Kembali
            </button>
            <button className="mobile-sidebar-close" onClick={() => setIsSidebarOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <div className="sys-sidebar-title">
            <FiList size={18} /> Daftar Fitur
          </div>

          <div className="sys-subfolder-group" style={{ marginLeft: 0, paddingLeft: 0, borderLeft: 'none' }}>
            {systemFeatures.map((f) => (
              <div
                key={f.id}
                className={`sys-file-item ${
                  selectedFeature === f.id ? "active" : ""
                }`}
                onClick={() => setSelectedFeature(f.id)}
                style={{ marginLeft: 0 }}
              >
                <FiFileText size={14}/> {f.name}
              </div>
            ))}
          </div>
        </aside>

        

        {/* BODY (SIDEBAR + CONTENT) */}
        <div className="system-body-modern">

          {/* HEADER */}
          <div className="system-header-modern">
            <div style={{display: "flex", gap: "15px", flex: 1, width: "100%"}}>
            <div className="system-logo-modern" style={{ overflow: "hidden" }}>
              {(() => {
                if (system?.logo && FaIcons[system.logo]) {
                  const IconComp = FaIcons[system.logo];
                  return <IconComp size={42} />;
                } else if (system?.logo) {
                  return <img src={system.logo} alt={system?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
                } else {
                  return <FiUsers size={42} />;
                }
              })()}
            </div>
            <div className="system-title-section" style={{width: "100%"}}>
              <div style={{display: "flex", justifyContent: 'space-between', flex: 1, alignItems: "center"}}>
                <h1>{system?.name || "Sistem"}</h1>
                <button className="mobile-sidebar-toggle" onClick={() => setIsSidebarOpen(true)}>
                  <FiMenu size={24} />
                </button>
              </div>
              <div className="system-badges-modern">
                <span className="sys-badge-filled">
                  <FiUsers size={16}/> HR & Manajemen
                </span>
                <span className="sys-badge-outline">
                  <FiFileText size={16}/> {systemFeatures.length} panduan
                </span>
              </div>
            </div>
            </div>
            
          </div>

          {/* MAIN CONTENT AREA */}
          <main className="sys-content-area">
            <div className="sys-content-inner">
              {!selectedFeature && (
                <div className="sys-doc-empty" style={{textAlign:"center", color:"#64748b", marginTop:"40px"}}>
                  <h3>Pilih bagian fitur di menu kiri</h3>
                  <p>Dokumentasi detail akan ditampilkan di sini.</p>
                </div>
              )}

              {filteredKnowledge.map((item) => (
                <div key={item.id} className="sys-doc-container">
                  <h1 className="sys-doc-title">{item.title}</h1>

                  {/* METADATA BAR */}
                  <div className="sys-doc-meta">
                    <span><FiFolder size={14}/> Manajemen Karyawan / Data Master</span>
                    <span><FiCalendar size={14}/> Diperbarui: 15 Mar 2026</span>
                    <span><FiClock size={14}/> 5 menit</span>
                  </div>

                  <p className="sys-doc-desc">
                    Profil, dokumen, jabatan. Panduan lengkap penggunaan fitur ini.
                  </p>

                  {item.thumbnail && (
                    <div className="sys-doc-thumbnail-banner" style={{ marginBottom: "24px", borderRadius: "12px", overflow: "hidden" }}>
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", display: "block" }} 
                      />
                    </div>
                  )}

                  <h3 className="sys-doc-heading">
                    <FiClipboard color="#d97706" fill="#fde68a" size={24}/> Gambaran Umum
                  </h3>

                  <div
                    className="sys-doc-body"
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
