import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";
import "../styles/editor.css";
import "../styles/knowledge.css";

export default function Knowledge() {
  const { systems } = useSystems();
  const { features } = useFeatures();
  const { knowledge, addKnowledge, deleteKnowledge } = useKnowledge();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    systemId: "",
    featureId: "",
    content: "",
    video: "",
    status: "Publish",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title) return;

    addKnowledge(formData);

    setFormData({
      title: "",
      systemId: "",
      featureId: "",
      content: "",
      video: "",
      status: "Publish",
    });

    setShowForm(false);
  };

  const getSystemName = (id) => {
    const sys = systems.find((s) => s.id == id);
    return sys ? sys.name : "-";
  };

  const getFeatureName = (id) => {
    const f = features.find((f) => f.id == id);
    return f ? f.name : "-";
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="content-page">
          <div className="content-header">
            <h2>Postingan</h2>
            <button
              className="add-btn"
              onClick={() => navigate("/knowledge/add")}
            >
              + Add Content
            </button>
          </div>

          {/* LIST CONTENT */}

          <div className="knowledge-list">
            {knowledge.map((item) => (
              <div key={item.id} className="knowledge-card">
                <div className="knowledge-left">
                  <div className="knowledge-thumb">{item.title?.charAt(0)}</div>

                  <div className="knowledge-info">
                    <h4>{item.title}</h4>

                    <div className="knowledge-meta-row">
                      <span className="meta-system">
                        {getSystemName(item.systemId)}
                      </span>

                      <span className="meta-dot">•</span>

                      <span className="meta-feature">
                        {getFeatureName(item.featureId)}
                      </span>

                      <span
                        className={
                          item.status === "Publish"
                            ? "status-publish"
                            : "status-draft"
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="knowledge-actions">
                  <button
                    className="btn-edit"
                    onClick={() => navigate("/knowledge/edit/" + item.id)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteKnowledge(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
