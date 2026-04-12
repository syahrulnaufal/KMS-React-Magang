import { Outlet, NavLink } from "react-router-dom";
import "../styles/public.css";
import "../styles/modern-beautify.css";
import logoImg from "../assets/logo-rbs.png";

const menus = [];

export default function PublicLayout() {
  return (
    <div className="public-wrapper">
      <header className="public-header">
        <div className="public-header-container">
          <a href="/" className="public-logo-area" style={{ textDecoration: "none" }}>
            <img src={logoImg} alt="RBS Logo" className="public-logo-img" />
            <span className="public-logo-text">READYMIX BUSINESS SOLUTION</span>
          </a>

          <nav className="public-top-nav">
            {menus.map((menu) => (
              <NavLink key={menu.id} to={menu.path}>
                {menu.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
