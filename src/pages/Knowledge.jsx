import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { useKnowledge } from "../context/KnowledgeContext";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

import "../styles/dashboard.css";
import "../styles/editor.css";
import "../styles/knowledge.css";
import "../styles/manageusers.css";

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
        <DashboardHeader/>
        <div className="content-page no-padding">
          <div className="user-toolbar">
            <div className="toolbar-right">
              <div className="user-count">
                Total Konten: <b>{knowledge.length}</b>
              </div>

              <button
                className="btn-add"
                onClick={() => navigate("/knowledge/add")}
              >
                + Add Content
              </button>
            </div>
          </div>

          {/* LIST CONTENT as TABLE */}
          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Judul Konten</th>
                  <th>System</th>
                  <th>Feature</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {knowledge.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.title}</strong>
                    </td>
                    <td>{getSystemName(item.systemId)}</td>
                    <td>{getFeatureName(item.featureId)}</td>
                    <td>
                      <span
                        className={
                          item.status === "Publish"
                            ? "status-publish"
                            : "status-draft"
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action"
                          onClick={() => navigate("/knowledge/edit/" + item.id)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="btn-action btn-delete"
                          onClick={() => deleteKnowledge(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {knowledge.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Belum ada konten
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
