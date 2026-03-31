import { Link } from "react-router-dom";

export default function PublicKnowledgeCard({ data }) {
  return (
    <div className="public-card">
      <span className="badge">{data.category}</span>
      <h3>{data.title}</h3>

      <div
        className="public-excerpt"
        dangerouslySetInnerHTML={{
          __html: data.content.slice(0, 150) + "...",
        }}
      />

      <Link to={`/public/${data.id}`} className="read-more">
        Baca selengkapnya →
      </Link>
    </div>
  );
}
