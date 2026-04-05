import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";

import "../styles/Systems.css";
import "../styles/dashboard.css";

export default function Systems() {
  const { systems, addSystem, deleteSystem, editSystem } = useSystems();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    if (editId) {
      editSystem(editId, formData);
    } else {
      addSystem(formData);
    }
    resetForm();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      status: "Active",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleEditClick = (sys) => {
    setFormData({
      name: sys.name,
      description: sys.description,
      status: sys.status,
    });
    setEditId(sys.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus system ini?")) {
      deleteSystem(id);
    }
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
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
            >
              + Add System
            </button>
          </div>

          {showForm && (
            <div className="system-form" onKeyDown={handleKeyDown}>
              <h3>{editId ? "Edit System" : "Add System"}</h3>

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
                <button onClick={handleSubmit} style={{padding: '0.2rem 0.5rem'}}>Save</button>
                <button onClick={resetForm} style={{padding: '0.2rem 0.5rem'}}>Cancel</button>
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
                    <button className="edit-btn" onClick={() => handleEditClick(sys)}>Edit</button>

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
