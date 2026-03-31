import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";

import "../styles/dashboard.css";
import "../styles/Features.css";

export default function Features() {
  const { systems } = useSystems();
  const { features, addFeature, deleteFeature } = useFeatures();

  const [showForm, setShowForm] = useState(false);

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

  const handleAddFeature = () => {
    if (!formData.name || !formData.systemId) return;

    addFeature(formData);

    setFormData({
      name: "",
      systemId: "",
      status: "Active",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteFeature(id);
  };

  const getSystemName = (id) => {
    const system = systems.find((s) => s.id == id);
    return system ? system.name : "-";
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <div className="features-page">
          <div className="features-header">
            <h2>Manage Features</h2>

            <button
              className="add-feature-btn"
              onClick={() => setShowForm(true)}
            >
              + Add Feature
            </button>
          </div>

          {showForm && (
            <div className="feature-form">
              <h3>Add Feature</h3>

              <input
                type="text"
                name="name"
                placeholder="Feature Name"
                value={formData.name}
                onChange={handleChange}
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
                <button onClick={handleAddFeature}>Save</button>
                <button onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          <table className="features-table">
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
                    <button className="edit-btn">Edit</button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(feature.id)}
                    >
                      Delete
                    </button>
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
  );
}
