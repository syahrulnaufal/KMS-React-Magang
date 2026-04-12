import { useState } from "react";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { FiSearch } from "react-icons/fi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

import "../styles/public.css";

export default function PublicSystems() {
  const { systems } = useSystems();
  const { features } = useFeatures();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const filteredSystems = systems.filter((sys) =>
    sys.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <section className="systems-hero">
        <div className="systems-hero-content">
          <h1 className="systems-title">
            Semua<span>Sistem</span>
          </h1>

          <p className="systems-subtitle">
            Sistem Internal ReadyMix Business Solution
          </p>

          <div className="systems-search">
            <div className="systems-search-input">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Cari sistem atau pengguna..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="systems-search-btn">
              <HiAdjustmentsHorizontal />
              Cari
            </button>
          </div>
        </div>
      </section>

      <div className="link-back">
        <a href="/">Home </a> / <span><a href="/systems">Panduan Sistem</a></span>
      </div>
      <div className="systems-grid">
        {filteredSystems.map((sys) => {
          const systemFeatures = features.filter(
            (f) => Number(f.systemId) === Number(sys.id)
          );

          return (
            <div
              key={sys.id}
              className="system-card"
              onClick={() => navigate(`/systems/${sys.id}`)}
            >
              <div className="system-icon" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {(() => {
                  if (sys.logo && FaIcons[sys.logo]) {
                    const IconComp = FaIcons[sys.logo];
                    return <IconComp style={{ fontSize: "2rem", color: "#3b82f6" }} />;
                  } else if (sys.logo) {
                    return <img src={sys.logo} alt={sys.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
                  } else {
                    return <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#3b82f6" }}>{sys.name.charAt(0)}</span>;
                  }
                })()}
              </div>

              <h3>{sys.name}</h3>

              <p>{sys.description}</p>

              <div className="system-footer">
                <span className="guide">{systemFeatures.length} fitur</span>

                <span className="category">Sistem</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
