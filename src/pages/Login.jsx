import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

import "../styles/login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Email atau password salah");
    }
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>ReadyMix Indonesia</h2>
          <p>Knowledge Management System</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div className="form-group">
            <label>Username / Email</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Mail size={18} />
              </div>

              <input
                type="text"
                value={username}
                placeholder="Masukkan username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <div className="input-icon">
                <Lock size={18} />
              </div>

              <input
                type={showPass ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-extra">
            <span className="forgot-password">Lupa Password?</span>
          </div>

          <div className="login-actions">
            <button type="submit" className="btn-login">
              Login
            </button>

            <button type="button" className="btn-google">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
              />
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
