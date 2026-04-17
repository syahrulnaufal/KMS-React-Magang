import { useParams, useNavigate } from "react-router-dom";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";
import { useState, useMemo } from "react";
import { FiArrowLeft, FiUsers, FiFileText, FiList, FiFolder, FiClock, FiCalendar, FiClipboard, FiMenu, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

  const processedKnowledge = useMemo(() => {
    return filteredKnowledge.map((item, itemIdx) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(item.content || "", "text/html");
      const headings = doc.querySelectorAll("h1, h2, h3");
      const toc = [];

      headings.forEach((heading, hIdx) => {
        const slug = `doc-${itemIdx}-heading-${hIdx}`;
        heading.id = slug;
        toc.push({
          id: slug,
          title: heading.innerText || heading.textContent,
          level: parseInt(heading.tagName.replace('H', ''), 10)
        });
      });

      return {
        ...item,
        modifiedContent: doc.body.innerHTML,
        toc
      };
    });
  }, [filteredKnowledge]);

  const globalToc = processedKnowledge.flatMap(item => item.toc);

  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // Offset accounting for sticky header
      const yOffset = -120; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const currentIndex = systemFeatures.findIndex(f => f.id === selectedFeature);
  const prevFeature = currentIndex > 0 ? systemFeatures[currentIndex - 1] : null;
  const nextFeature = currentIndex !== -1 && currentIndex < systemFeatures.length - 1 ? systemFeatures[currentIndex + 1] : null;

  const navigateToFeature = (featureId) => {
    setSelectedFeature(featureId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <div className="sys-content-layout">
              {/* BODY BLOCK */}
              <div className="sys-content-body-area">
                {!selectedFeature && (
                  <div className="sys-doc-empty" style={{textAlign:"center", color:"#64748b", marginTop:"40px"}}>
                    <h3>Pilih bagian fitur di menu kiri</h3>
                    <p>Dokumentasi detail akan ditampilkan di sini.</p>
                  </div>
                )}

                {processedKnowledge.map((item) => (
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
                        __html: item.modifiedContent,
                      }}
                    />
                  </div>
                ))}

                {/* NAVIGATION BUTTONS */}
                {selectedFeature && systemFeatures.length > 0 && (
                  <div className="sys-doc-nav-buttons">
                    {prevFeature ? (
                      <button className="sys-nav-btn prev" onClick={() => navigateToFeature(prevFeature.id)}>
                        <span className="nav-label"><FiChevronLeft size={16}/> Sebelumnya</span>
                        <span className="nav-title">{prevFeature.name}</span>
                      </button>
                    ) : <div style={{flex: 1}} />}
                    
                    {nextFeature ? (
                      <button className="sys-nav-btn next" onClick={() => navigateToFeature(nextFeature.id)}>
                        <span className="nav-label">Selanjutnya <FiChevronRight size={16}/></span>
                        <span className="nav-title">{nextFeature.name}</span>
                      </button>
                    ) : <div style={{flex: 1}} />}
                  </div>
                )}
              </div>

              {/* TOC RIGHT */}
              {globalToc.length > 0 && (
                <aside className="sys-toc-right">
                  <h4 className="sys-toc-header">
                    <FiList size={16} /> On this page
                  </h4>
                  <ul className="sys-toc-list">
                    {globalToc.map((tocItem) => (
                      <li key={tocItem.id}>
                        <a 
                          href={`#${tocItem.id}`} 
                          className={`sys-toc-item level-${tocItem.level}`}
                          onClick={(e) => handleTocClick(e, tocItem.id)}
                        >
                          {tocItem.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
