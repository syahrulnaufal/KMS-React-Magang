import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";
import { Pencil, Trash2 } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

import "../styles/Systems.css";
import "../styles/dashboard.css";
import "../styles/manageusers.css";

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
        <DashboardHeader />
        <div className="systems-page no-padding">
          <div className="user-toolbar">
            <div className="toolbar-right">
              <div className="user-count">
                Total Systems: <b>{systems.length}</b>
              </div>

              <button
                className="btn-add"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                + Add System
              </button>
            </div>
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

          <div className="user-table-wrapper">
            <table className="user-table">
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
                      <div className="action-buttons">
                        <button className="btn-action" onClick={() => handleEditClick(sys)}>
                          <Pencil size={16} />
                        </button>

                        <button
                          className="btn-action"
                          style={{ borderColor: "red" }}
                          onClick={() => handleDelete(sys.id)}
                        >
                          <Trash2 size={16} color="red" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
