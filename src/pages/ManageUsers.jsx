import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft, Plus, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import "../styles/manageusers.css";
import "../styles/dashboard.css";

export default function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      id: 1,
      nama: "Super Admin",
      ttl: "2001-05-15",
      gender: "Laki-laki",
      alamat: "Semarang",
      nohp: "081234567890",
      username: "superadmin",
      password: "super123",
      status: "aktif",
      role: "superadmin",
      roleId: 1,
    },
    {
      id: 2,
      nama: "Admin",
      ttl: "2002-08-20",
      gender: "Perempuan",
      alamat: "Jakarta",
      nohp: "082233445566",
      username: "admin",
      password: "admin123",
      status: "aktif",
      role: "admin",
      roleId: 2,
    },
  ]);

  const [form, setForm] = useState({
    nama: "",
    ttl: "",
    gender: "Laki-laki",
    alamat: "",
    nohp: "",
    username: "",
    password: "",
    status: "aktif",
    role: "admin",
  });

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const resetForm = () => {
    setForm({
      nama: "",
      ttl: "",
      gender: "Laki-laki",
      alamat: "",
      nohp: "",
      username: "",
      password: "",
      status: "aktif",
      role: "admin",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditId(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditId(user.id);
    setForm(user);
    setShowModal(true);
  };

  const saveUser = () => {
    if (!form.nama || !form.username || !form.password || !form.role) {
      alert("Nama, Username, Password, dan Role wajib diisi!");
      return;
    }

    if (editId) {
      setUsers(
        users.map((u) =>
          u.id === editId
            ? { ...u, ...form, roleId: form.role === "superadmin" ? 1 : 2 }
            : u
        )
      );
    } else {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          ...form,
          roleId: form.role === "superadmin" ? 1 : 2,
        },
      ]);
    }

    setShowModal(false);
    resetForm();
  };

  const deleteUser = (id) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <DashboardHeader />

        <main className="dashboard-content no-padding">
          <div className="manage-users-container">
            {/* TOOLBAR */}
            <div className="user-toolbar">
              <div className="toolbar-right">
                <div className="user-count">
                  Total User: <b>{users.length}</b>
                </div>

                <button className="btn-add" onClick={openAddModal}>
                  Tambah User
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="user-table-wrapper">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Tanggal Lahir</th>
                    <th>Gender</th>
                    <th>Alamat</th>
                    <th>No HP</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Role ID</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nama}</td>
                      <td>{u.ttl}</td>
                      <td>{u.gender}</td>
                      <td>{u.alamat}</td>
                      <td>{u.nohp}</td>
                      <td>{u.username}</td>
                      <td>••••••••</td>
                      <td>{u.status}</td>
                      <td>{u.role}</td>
                      <td>{u.roleId}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-action"
                            onClick={() => openEditModal(u)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="btn-action btn-delete"
                            onClick={() => deleteUser(u.id)}
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
        </main>

        {showModal && (
          <div className="modal-overlay" >
            <div className="modal-box">
              <div className="modal-header" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>{editId ? "Edit User" : "Tambah User"}</h2>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <X size={24} color="#64748b" />
                </button>
              </div>

              <div className="scroller">
              <form
                className="modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveUser();
                }}
              >
                <div className="form-row">
                  <div className="form-col">
                    <label htmlFor="nama" style={{margin: '0 0 0.5rem 0.5rem'}}>Nama</label>
                    <input
                      name="nama"
                      placeholder="Nama Lengkap"
                      value={form.nama}
                      onChange={handleChange}
                      autoFocus
                      />
                  </div>
                  <div className="form-col">
                    <label htmlFor="username" style={{margin: '0 0 0.5rem 0.5rem'}}>username</label>
                    <input
                      name="username"
                      placeholder="Username"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                  <label htmlFor="password" style={{margin: '0 0 0.5rem 0.5rem'}}>password</label>
                  <input
                    name="password"
                    placeholder="Password (Isi baru/ubah)"
                    value={form.password}
                    onChange={handleChange}
                    />
                  </div>
                  <div className="form-col">
                  <label htmlFor="role" style={{margin: '0 0 0.5rem 0.5rem'}}>role</label>
                  <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                  <label htmlFor="ttl" style={{margin: '0 0 0.5rem 0.5rem'}}>tanggal lahir</label>
                  <input
                    type="date"
                    name="ttl"
                    value={form.ttl}
                    onChange={handleChange}
                    />
                  </div>
                  <div className="form-col">
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                  <label htmlFor="nohp" style={{margin: '0 0 0.5rem 0.5rem'}}>nomor hp</label>
                  <input
                    name="nohp"
                    placeholder="Nomor HP"
                    value={form.nohp}
                    onChange={handleChange}
                    />
                  </div>
                  <div className="form-col">
                  <label htmlFor="status" style={{margin: '0 0 0.5rem 0.5rem'}}>status</label>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="aktif">Aktif</option>
                    <option value="tidak aktif">Tidak Aktif</option>
                  </select>
                  </div>
                </div>

                <div className="form-row-full">
                  <div className="form-col">
                    <label htmlFor="alamat" style={{margin: '0 0 0.5rem 0.5rem'}}>
                      alamat
                    </label>
                    <input
                      name="alamat"
                      placeholder="Alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                    Batal
                  </button>
                  <button type="submit" className="btn-save">
                    Simpan
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
