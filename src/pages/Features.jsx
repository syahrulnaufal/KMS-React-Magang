import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { Pencil, Trash2, X } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/dashboard.css";
import "../styles/Features.css";
import "../styles/manageusers.css";

export default function Features() {
  const { systems } = useSystems();
  const { features, addFeature, deleteFeature, editFeature } = useFeatures();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    systemId: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload web ketika disubmit pakai Enter
    if (!formData.name || !formData.systemId) return;

    if (editingId) {
      editFeature(editingId, formData);
    } else {
      addFeature(formData);
    }

    // Reset Form
    setFormData({
      name: "",
      systemId: "",
      status: "Active",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (feature) => {
    setFormData({
      name: feature.name,
      systemId: feature.systemId,
      status: feature.status || "Active", // Default jika kosong
    });
    setEditingId(feature.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      deleteFeature(id);
    }
  };

  const getSystemName = (id) => {
    const system = systems.find((s) => s.id == id);
    return system ? system.name : "-";
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <DashboardHeader />
        <div className="features-page no-padding">
          <div className="user-toolbar">
            <div className="toolbar-right">
              <div className="user-count">
                Total Features: <b>{features.length}</b>
              </div>

              <button
                className="btn-add"
                onClick={() => {
                  setFormData({ name: "", systemId: "", status: "Active" });
                  setEditingId(null);
                  setShowForm(true);
                }}
              >
                + Add Feature
              </button>
            </div>
          </div>

          {showForm && (
            <div className="modal-overlay">
              <div className="modal-box">
                <div className="modal-header" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2>{editingId ? "Edit Feature" : "Add Feature"}</h2>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                    <X size={24} color="#64748b" />
                  </button>
                </div>
                <div className="scroller">
                  <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-row-full">
                      <div className="form-col">
                        <label style={{ margin: '0 0 0.5rem 0.5rem' }}>Feature Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Feature Name"
                          value={formData.name}
                          onChange={handleChange}
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-row-full">
                      <div className="form-col">
                        <label style={{ margin: '0 0 0.5rem 0.5rem' }}>System</label>
                        <select
                          name="systemId"
                          value={formData.systemId}
                          onChange={handleChange}
                        >
                          <option value="">Select System</option>
                          {systems
                            .filter((sys) => sys.status === "Active")
                            .map((sys) => (
                              <option key={sys.id} value={sys.id}>
                                {sys.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-row-full">
                      <div className="form-col">
                        <label style={{ margin: '0 0 0.5rem 0.5rem' }}>Status</label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button 
                        type="button" 
                        onClick={() => { setShowForm(false); setEditingId(null); }} 
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-save">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Feature Name</th>
                  <th>System</th>
                  <th>Status</th>
                  <th><div style={{textAlign: "center"}}>Action</div></th>
                </tr>
              </thead>

              <tbody>
                {features.map((feature) => (
                  <tr key={feature.id}>
                    <td>{feature.name}</td>

                    <td>{getSystemName(feature.systemId)}</td>

                    <td>{feature.status}</td>

                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action"
                          onClick={() => handleEdit(feature)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(feature.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {features.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No features yet
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
