import "../styles/system1Header.css";

export default function System1Header() {
  return (
    <header className="system1-header">
      <div className="header-left">
        <span className="logo">⚡ Readymix Docs</span>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Search documentation..."
          className="header-search"
        />
      </div>

      <div className="header-right">
        <span className="header-link">Learn</span>
        <span className="header-link">Reference</span>
        <span className="header-link">Community</span>
      </div>
    </header>
  );
}
