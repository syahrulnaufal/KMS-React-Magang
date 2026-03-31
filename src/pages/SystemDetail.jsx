import { useParams, useNavigate } from "react-router-dom";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";
import { useState } from "react";
import { FiArrowLeft, FiUsers } from "react-icons/fi";

import "../styles/public.css";

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

  const groupedFeatures = systemFeatures.reduce((acc, feature) => {
    const category = feature.category || "General";

    if (!acc[category]) acc[category] = [];
    acc[category].push(feature);

    return acc;
  }, {});

  return (
    <div className="system-page">
      {/* BACK BUTTON */}
      <div className="system-container">
        <button className="back-btn" onClick={() => navigate("/systems")}>
          <FiArrowLeft />
          Kembali ke daftar sistem
        </button>
      </div>

      {/* CARD SYSTEM */}
      <div className="system-container">
        <div className="system-header-card">
          <div className="system-header">
            <div className="system-icon">
              <FiUsers size={28} />
            </div>

            <div className="system-info">
              <h1 className="system-title">{system?.name}</h1>

              <div className="system-badges">
                <span className="badge">Sales & Marketing</span>
                <span className="badge">{systemFeatures.length} panduan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="system-divider"></div>

        {/* MAIN LAYOUT */}
        <div className="docs-layout">
          {/* SIDEBAR */}
          <aside className="docs-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">Daftar Fitur</div>

              {Object.keys(groupedFeatures).map((category) => (
                <div key={category} className="feature-group">
                  <div className="feature-category">
                    {category.toUpperCase()}
                  </div>

                  {groupedFeatures[category].map((feature) => (
                    <div
                      key={feature.id}
                      className={`feature-item ${
                        selectedFeature === feature.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedFeature(feature.id)}
                    >
                      {feature.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          {/* CONTENT */}
          <main className="docs-content">
            {!selectedFeature && (
              <div className="docs-empty">
                <h2>Pilih fitur di sidebar</h2>
                <p>Silakan pilih dokumentasi sistem di sebelah kiri.</p>
              </div>
            )}

            {filteredKnowledge.map((item) => (
              <div key={item.id} className="content-card">
                <h1 className="content-title">{item.title}</h1>

                <div className="content-meta">
                  <span>Manajemen Kontak / Data Pelanggan</span>
                  <span>Diperbarui: 15 Mar 2026</span>
                  <span>5 menit</span>
                </div>

                <div
                  className="content-body"
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
