import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import { Pencil, Trash2 } from "lucide-react";
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
            <form className="feature-form" onSubmit={handleSubmit}>
              <h3 style={{marginBottom: '0.5rem'}}>{editingId ? "Edit Feature" : "Add Feature"}</h3>

              <input
                type="text"
                name="name"
                placeholder="Feature Name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />

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

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="form-actions">
                {/* Wajib menggunakan type="submit" dan type="button" di dalam form */}
                <button type="submit" className="btn-x-padding">
                  Save
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }} 
                  className="btn-x-padding"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Feature Name</th>
                  <th>System</th>
                  <th>Status</th>
                  <th>Action</th>
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
                          className="btn-action"
                          style={{ borderColor: "red" }}
                          onClick={() => handleDelete(feature.id)}
                        >
                          <Trash2 size={16} color="red" />
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
