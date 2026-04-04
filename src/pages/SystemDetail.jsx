import { useParams, useNavigate } from "react-router-dom";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";
import { useState } from "react";
import { FiArrowLeft, FiUsers, FiFileText, FiList, FiFolder, FiClock, FiCalendar, FiClipboard } from "react-icons/fi";

import "../styles/public.css";
import "../styles/modern-beautify.css";

export default function SystemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { systems } = useSystems();
  const { features } = useFeatures();
  const { knowledge } = useKnowledge();

  const [selectedFeature, setSelectedFeature] = useState(null);

  const system = systems.find((s) => Number(s.id) === Number(id));

  const systemFeatures = features.filter(
    (f) => Number(f.systemId) === Number(id)
  );

  const filteredKnowledge = knowledge.filter(
    (item) =>
      item.status?.toLowerCase() === "publish" &&
      Number(item.featureId) === Number(selectedFeature)
  );

  return (
    <div className="system-detail-wrapper">
      {/* HEADER NAV BACK */}
      <div className="system-nav-area">
        <button className="btn-back-modern" onClick={() => navigate("/systems")}>
          <FiArrowLeft size={18} />
          Kembali ke daftar sistem 
        </button>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div className="system-main-card">
        {/* HEADER */}
        <div className="system-header-modern">
          <div className="system-logo-modern">
            <FiUsers size={42} />
          </div>
          <div className="system-title-section">
            <h1>{system?.name || "Sistem"}</h1>
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

        {/* BODY (SIDEBAR + CONTENT) */}
        <div className="system-body-modern">
          {/* SIDEBAR TREE VIEW */}
          <aside className="sys-sidebar">
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
