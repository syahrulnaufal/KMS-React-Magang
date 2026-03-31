import { Link } from "react-router-dom";
import { useSystems } from "../context/SystemContext";
import "../styles/landing.css";

export default function PublicHeader() {
  const { systems } = useSystems();

  return (
    <header className="landing-header">
      <div className="logo">
        <Link to="/">READYMIX BUSINESS SOLUTION</Link>
      </div>

      <nav>
        {systems
          .filter((sys) => sys.status === "Active")
          .map((sys) => (
            <Link key={sys.id} to={`/system/${sys.id}`}>
              {sys.name}
            </Link>
          ))}
      </nav>
    </header>
  );
}
