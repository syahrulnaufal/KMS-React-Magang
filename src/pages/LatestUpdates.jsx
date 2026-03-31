import React, { useState } from "react";
import "../styles/public.css";
import { useNavigate } from "react-router-dom";
import { useKnowledge } from "../context/KnowledgeContext";
import { FaLink } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import heroNews from "../assets/consulting.jpg"; 

export default function LatestUpdates() {
  const navigate = useNavigate();
  const { knowledgeList } = useKnowledge();

  // FILTER STATE
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("Media Releases");
  const [year, setYear] = useState("Year");
  const [language, setLanguage] = useState("English");

  const publishedList = knowledgeList.filter((item) => {
    const status = item.status?.toLowerCase();

    return status === "published" || status === "Dipublikasikan";
  });

  const featuredNews = publishedList.length > 0 ? publishedList[0] : null;

  // FILTERING
  const filteredList = publishedList.filter((item) => {
    const titleMatch = item.title
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const yearMatch =
      year === "Year"
        ? true
        : item.date?.toLowerCase().includes(year.toLowerCase());

    // category dan language masih placeholder (belum ada field data)
    return titleMatch && yearMatch;
  });

  return (
    <div className="latest-landing-wrapper">
      {/* ================= HERO SECTION ================= */}
      <section
        className="latest-hero"
        style={{
          backgroundImage: `url(${featuredNews?.thumbnail || heroNews})`,
        }}
      >
        <div className="latest-hero-overlay"></div>

        <div className="latest-hero-content">
          <p className="latest-hero-tag">Featured News</p>

          <h1 className="latest-hero-title">
            {featuredNews?.title ||
              "Latest Updates & Media Releases from PT Teknologi Readymix Indonesia"}
          </h1>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="latest-content-section">
        {/* ================= FILTER HEADER ================= */}
        <div className="latest-filter-bar">
          <div className="latest-filter-search">
            <input
              type="text"
              placeholder="Type here"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className="latest-filter-icon">
              <FaMagnifyingGlass />
            </span>
          </div>

          <select
            className="latest-filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Media Releases</option>
            <option>Article</option>
            <option>Announcement</option>
          </select>

          <select
            className="latest-filter-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option>Year</option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>

          <select
            className="latest-filter-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Indonesia</option>
          </select>
        </div>

        {/* ================= TITLE ================= */}
        <div className="latest-content-header">
          <h2 className="latest-content-title">
            Latest <span>Updates</span>
          </h2>

          <p className="latest-content-subtitle">
            Stay informed with our latest media releases, key announcements,
            insights, and developments.
          </p>
        </div>

        {/* ================= GRID CARD STYLE PETRONAS ================= */}
        <div className="latest-content-grid-petronas">
          {filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <div
                key={index}
                className="latest-petronas-card"
                onClick={() => navigate(`/knowledge/${item.id}`)}
              >
                <div className="latest-petronas-thumb">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} />
                  ) : (
                    <div className="latest-petronas-thumb-empty">
                      No Thumbnail
                    </div>
                  )}
                </div>

                {/* TOP INFO */}
                <div className="latest-petronas-top">
                  <span className="latest-petronas-date">
                    {item.date || "12 Feb, 2026"}
                  </span>

                  <button
                    className="latest-petronas-link-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/knowledge/${item.id}`);
                    }}
                  >
                    <FaLink />
                  </button>
                </div>

                {/* OVERLAY TITLE */}
                <div className="latest-petronas-overlay">
                  <h3 className="latest-petronas-title">{item.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="latest-empty-text">Belum ada berita terbaru.</p>
          )}
        </div>
      </section>
    </div>
  );
}
