import React from "react";
import { useParams, Link } from "react-router-dom";
import { useKnowledge } from "../context/KnowledgeContext";
import "../styles/publicKnowledgeDetail.css";
import { FiLink, FiCalendar } from "react-icons/fi";

export default function PublicKnowledgeDetail() {
  const { id } = useParams();
  const { knowledgeList } = useKnowledge();

  const data = knowledgeList.find(
    (k) =>
      String(k.id) === String(id) &&
      String(k.status).toLowerCase() === "published"
  );

  if (!data) {
    return (
      <div className="public-detail-notfound">
        <h2>Knowledge tidak ditemukan</h2>
        <Link to="/public" className="back-btn">
          ← Kembali
        </Link>
      </div>
    );
  }

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Unknown Date";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    } catch (err) {
      alert("Gagal menyalin link");
    }
  };

  return (
    <div className="public-detail-page">
      {/* HERO */}
      <section className="public-hero">
        <div className="hero-overlay"></div>

        <div className="hero-container">
          <Link to="/public" className="hero-back">
            ← Back
          </Link>

          <h1 className="hero-title">{data.title}</h1>

          <div className="hero-meta">
            <span className="hero-date">{formattedDate}</span>
            <span className="hero-dot">•</span>
            <span className="hero-category">{data.category}</span>
          </div>
        </div>
      </section>

      {/* BREADCRUMB HEADER */}
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-sep">›</span>

          <Link to="/public" className="breadcrumb-link">
            News & Media
          </Link>
          <span className="breadcrumb-sep">›</span>

          <span className="breadcrumb-text">Media Releases</span>
          <span className="breadcrumb-sep">›</span>

          <span className="breadcrumb-active">{data.title}</span>
        </div>

        <div className="breadcrumb-line"></div>
      </div>

      {/* CONTENT CARD */}
      <section className="public-content-wrapper">
        <div className="public-content-card">
          {/* HEADER META */}
          <div className="content-topbar">
            <div className="topbar-left">
              <FiCalendar className="topbar-icon" />
              <span className="topbar-text">
                {data.category} - {formattedDate}
              </span>
            </div>

            <button className="copy-link-btn" onClick={handleCopyLink}>
              <FiLink className="topbar-icon-link" />
            </button>
          </div>

          <hr className="divider-line" />

          {/* Thumbnail */}
          {data.thumbnail && (
            <img
              src={data.thumbnail}
              alt={data.title}
              className="detail-thumbnail"
            />
          )}

          {/* Content */}
          <div
            className="public-content-body"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </section>
    </div>
  );
}
