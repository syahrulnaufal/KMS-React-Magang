import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";

import "../styles/Systems.css";
import "../styles/dashboard.css";

export default function Systems() {
  const { systems, addSystem, deleteSystem } = useSystems();

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSystem = () => {
    if (!formData.name) return;

    addSystem(formData);

    setFormData({
      name: "",
      description: "",
      status: "Active",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteSystem(id);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <div className="systems-page">
          <div className="systems-header">
            <h2>Manage Systems</h2>

            <button
              className="add-system-btn"
              onClick={() => setShowForm(true)}
            >
              + Add System
            </button>
          </div>

          {showForm && (
            <div className="system-form">
              <h3>Add System</h3>

              <input
                type="text"
                name="name"
                placeholder="System Name"
                value={formData.name}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="form-actions">
                <button onClick={handleAddSystem}>Save</button>

                <button onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </div>
          )}

          <table className="systems-table">
            <thead>
              <tr>
                <th>System Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {systems.map((sys) => (
                <tr key={sys.id}>
                  <td>{sys.name}</td>
                  <td>{sys.description}</td>
                  <td>{sys.status}</td>

                  <td>
                    <button className="edit-btn">Edit</button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(sys.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
