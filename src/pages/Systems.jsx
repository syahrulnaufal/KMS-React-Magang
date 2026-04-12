import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useSystems } from "../context/SystemContext";
import { Pencil, Trash2, X } from "lucide-react";
import * as FaIcons from "react-icons/fa";
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
    logo: "",
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
      logo: "",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleEditClick = (sys) => {
    setFormData({
      name: sys.name,
      description: sys.description,
      status: sys.status,
      logo: sys.logo || "",
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
            <div className="modal-overlay">
              <div className="modal-box">
                <div className="modal-header" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2>{editId ? "Edit System" : "Add System"}</h2>
                  <button type="button" onClick={resetForm} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                    <X size={24} color="#64748b" />
                  </button>
                </div>
                <div className="scroller">
                  <form className="modal-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="form-row-full">
                      <div className="form-col">
                        <label style={{ margin: '0 0 0.5rem 0.5rem' }}>System Name</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="System Name"
                          value={formData.name}
                          onChange={handleChange}
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="form-row-full">
                      <div className="form-col">
                        <label style={{ margin: '0 0 0.5rem 0.5rem' }}>Description</label>
                        <textarea
                          name="description"
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleChange}
                          style={{ minHeight: '100px', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row-full">
                      <div className="form-col">
                        <label style={{ margin: '0 0 0.5rem 0.5rem' }}>Nama Ikon FontAwesome (cth: FaDesktop) / URL Gambar</label>
                        <input
                          type="text"
                          name="logo"
                          placeholder="FaLaptop / https://..."
                          value={formData.logo}
                          onChange={handleChange}
                        />
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
                      <button type="button" className="btn-cancel" onClick={resetForm}>
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
                  <th style={{ width: "60px", textAlign: "center" }}>Logo</th>
                  <th>System Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th><div style={{textAlign: "center"}}>Action</div></th>
                </tr>
              </thead>

              <tbody>
                {systems.map((sys) => (
                  <tr key={sys.id}>
                    <td style={{ textAlign: "center" }}>
                      {(() => {
                        if (sys.logo && FaIcons[sys.logo]) {
                          const IconComp = FaIcons[sys.logo];
                          return <IconComp size={20} color="#3b82f6" />;
                        } else if (sys.logo && sys.logo.startsWith("http")) {
                          return <img src={sys.logo} alt="logo" style={{ width: "24px", height: "24px", objectFit: "cover", borderRadius: "4px" }} />;
                        } else {
                          return <span style={{ color: "#94a3b8" }}>-</span>;
                        }
                      })()}
                    </td>
                    <td>{sys.name}</td>
                    <td>{sys.description}</td>
                    <td>{sys.status}</td>

                    <td>
                      <div className="action-buttons">
                        <button className="btn-action" onClick={() => handleEditClick(sys)}>
                          <Pencil size={16} />
                        </button>

                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(sys.id)}
                        >
                          <Trash2 size={16}/>
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
