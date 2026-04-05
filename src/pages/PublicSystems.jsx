import { useState } from "react";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { FiSearch } from "react-icons/fi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

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
              <div className="system-icon"></div>

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
