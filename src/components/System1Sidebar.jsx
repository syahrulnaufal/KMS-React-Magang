import { NavLink } from "react-router-dom";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";

import "../styles/system1Sidebar.css";

export default function System1Sidebar() {
  const { systems } = useSystems();
  const { features } = useFeatures();
  const { knowledge } = useKnowledge();

  return (
    <aside className="system-sidebar">
      <div className="system-sidebar-inner">
        {systems
          .filter((sys) => sys.status === "Active")
          .map((sys) => {
            // ambil feature milik system ini
            const systemFeatures = features.filter(
              (feature) =>
                feature.systemId === sys.id && feature.status === "Active"
            );

            // cek apakah feature punya knowledge
            const visibleFeatures = systemFeatures.filter((feature) =>
              knowledge.some((k) => k.feature === feature.name)
            );

            // jika tidak ada konten jangan tampilkan system
            if (visibleFeatures.length === 0) return null;

            return (
              <div key={sys.id} className="sidebar-system">
                {/* SYSTEM TITLE */}
                <h4 className="sidebar-section">{sys.name}</h4>

                {/* FEATURES */}
                {visibleFeatures.map((feature) => (
                  <NavLink
                    key={feature.id}
                    to={`/system/${sys.id}/feature/${feature.id}`}
                    className={({ isActive }) =>
                      isActive ? "sidebar-link active" : "sidebar-link"
                    }
                  >
                    {feature.name}
                  </NavLink>
                ))}
              </div>
            );
          })}
      </div>
    </aside>
  );
}
