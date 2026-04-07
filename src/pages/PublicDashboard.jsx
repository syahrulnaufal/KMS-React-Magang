import React, { useState } from "react";
import "../styles/public.css";
import "../styles/modern-beautify.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaArrowRight,
  FaPlus,
  FaMinus,
  FaBrain,
  FaCogs,
  FaChartLine,
  FaUsers,
  FaBookOpen,
  FaBoxes,
  FaHeadset,
  FaProjectDiagram,
  FaShoppingCart,
  FaServer,
  FaUserAlt,
  FaFileAlt,
  FaChevronRight,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import highlight1 from "../assets/highlight/1.png";
import highlight2 from "../assets/highlight/2.png";
import highlight3 from "../assets/highlight/3.png";
import highlight4 from "../assets/highlight/4.png";

import saasImg from "../assets/saas.jpg";
import hardwareImg from "../assets/hardware.jpg";
import consultingImg from "../assets/consulting.jpg";

export default function PublicDashboard() {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const navigate = useNavigate();

  const highlightData = [
    {
      title: "System Update v2.5",
      desc: "Peluncuran fitur analitik prediktif baru untuk membantu manajemen data lebih akurat.",
      img: highlight1,
    },
    {
      title: "Knowledge Sharing Event",
      desc: "Laporan kegiatan internal sharing session antar departemen untuk kolaborasi yang lebih baik.",
      img: highlight2,
    },
    {
      title: "Digital Transformation",
      desc: "Studi kasus bagaimana Readymix beralih ke sistem digital 100% dalam satu tahun.",
      img: highlight3,
    },
    {
      title: "Women in Tech 2025",
      desc: "Mengenal para pemimpin teknologi wanita yang mendorong inovasi di Readymix.",
      img: highlight4,
    },
  ];

  const popularSystemsMock = [
    { id: 1, title: "HRIS Pro", category: "HR & Manajemen", icons: <FaUsers/>, count: 34 },
    { id: 2, title: "Inventory Ops", category: "Logistik", icons: <FaBoxes/>, count: 42 },
    { id: 3, title: "Helpdesk Ticketing", category: "IT Support", icons: <FaHeadset/>, count: 31 },
    { id: 4, title: "Project Collab", category: "PMO", icons: <FaProjectDiagram/>, count: 36 },
    { id: 5, title: "Pengadaan (Procure)", category: "Purchasing", icons: <FaShoppingCart/>, count: 33 },
    { id: 6, title: "IT Infra", category: "Infra", icons: <FaServer/>, count: 44 },
  ];

  return (
    <div className="public-wrapper">
      {/* ================= HERO ================= */}
      <section className="kms-hero">
        <div className="kms-hero-container">
          <div className="kms-hero-left">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Readymix Business Solution</span>
            </div>

            <h1 className="kms-title">
              Dokumentasi sistem.
              <br />
              Cepat, terpusat, modern.
            </h1>

            <p className="kms-desc">
              Knowledge management untuk 20+ sistem internal. Panduan fitur,
              referensi tech stack, dan akses untuk setiap pengguna.
            </p>

            <div className="public-about-buttons">
              <button
                className="public-about-btn primary"
                onClick={() => navigate("/panduan-sistem")}
              >
                Jelajahi Solusi <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="kms-hero-right">
            {[
              { icon: <FaBrain />, name: "HR" },
              { icon: <FaChartLine />, name: "Finance" },
              { icon: <FaCogs />, name: "Logistik" },
              { icon: <FaCogs />, name: "IT" },
              { icon: <FaCogs />, name: "Legal" },
              { icon: <FaCogs />, name: "Office" },
              { icon: <FaUsers />, name: "User" },
              { icon: <FaBookOpen />, name: "Docs" },
              { icon: <FaChartLine />, name: "Analytics" },
            ].map((item, i) => (
              <div
                key={i}
                className="kms-system-card glow-card"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  e.currentTarget.style.setProperty("--x", `${x}px`);
                  e.currentTarget.style.setProperty("--y", `${y}px`);
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= POPULAR SYSTEMS ================= */}
      <section className="popular-systems-section">
        <div className="popular-systems-container">
          <div className="popular-header">
            <h2 className="popular-title">Sistem populer</h2>
            <span className="popular-badge">sering diakses</span>
          </div>

          <div className="popular-grid">
            {popularSystemsMock.map((system) => (
              <div key={system.id} className="popular-card">
                <div className="popular-icon-wrapper">
                  {system.icons}
                </div>

                <div className="popular-body">
                  <h3 className="popular-card-title">{system.title}</h3>
                  <div className="popular-category">
                    <FaUserAlt className="icon-small" /> {system.category}
                  </div>
                </div>

                <div className="popular-footer">
                  <div className="popular-article-count">
                    <FaFileAlt className="icon-small" /> {system.count} artikel
                  </div>
                  <FaChevronRight className="icon-arrow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="products-section-modern">
        <div className="products-container">
          <div className="section-header">
            <h2 className="products-title">
              <span className="title-main">Solusi Terintegrasi</span>
              <br />
              <span className="title-sub">
                Ekosistem <span className="highlight-word">Readymix</span>
              </span>
            </h2>

            <p className="products-desc">
              Kami menyediakan infrastruktur lengkap untuk transformasi digital
              bisnis Anda.
            </p>
          </div>

          <div className="products-grid">
            <div className="product-card glass-card">
              <div className="product-icon-wrapper">
                <FaBrain />
              </div>

              <div className="product-image-wrapper">
                <img src={saasImg} alt="SaaS" />
              </div>

              <div className="product-content">
                <h3>Smart Knowledge Base</h3>

                <p>
                  Pusat data terpusat yang memungkinkan akses cepat ke
                  informasi, SOP, dan dokumentasi perusahaan secara real-time.
                </p>

                <button
                  className="product-link"
                  onClick={() => navigate("/business/saas")}
                >
                  Pelajari Lebih Lanjut <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="product-card glass-card">
              <div className="product-icon-wrapper">
                <FaCogs />
              </div>

              <div className="product-image-wrapper">
                <img src={hardwareImg} alt="Hardware" />
              </div>

              <div className="product-content">
                <h3>IoT & Hardware</h3>

                <p>
                  Perangkat keras pintar yang terhubung langsung dengan sistem
                  untuk akurasi data produksi dan monitoring aset.
                </p>

                <button
                  className="product-link"
                  onClick={() => navigate("/business/hardware")}
                >
                  Pelajari Lebih Lanjut <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="product-card glass-card">
              <div className="product-icon-wrapper">
                <FaChartLine />
              </div>

              <div className="product-image-wrapper">
                <img src={consultingImg} alt="Consulting" />
              </div>

              <div className="product-content">
                <h3>Strategic Consulting</h3>

                <p>
                  Konsultasi ahli untuk merancang alur kerja digital yang
                  efisien dan strategi bisnis yang berkelanjutan.
                </p>

                <button
                  className="product-link"
                  onClick={() => navigate("/business/consulting")}
                >
                  Pelajari Lebih Lanjut <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="petronas-highlights-section">
        <div className="petronas-highlights-container">
          <div className="petronas-highlights-header">
            <h2 className="petronas-highlights-title">Insights & Updates</h2>

            <p className="petronas-highlights-subtitle">
              Tetap terhubung dengan perkembangan terbaru teknologi Readymix.
            </p>
          </div>

          <div className="petronas-highlights-layout">
            <div className="petronas-highlights-image-card">
              <img
                src={highlightData[activeHighlight].img}
                alt={highlightData[activeHighlight].title}
                className="highlight-img-active"
              />

              <div className="highlight-overlay-text">
                {highlightData[activeHighlight].title}
              </div>
            </div>

            <div className="petronas-highlights-right">
              {highlightData.map((item, index) => {
                const isActive = index === activeHighlight;

                return (
                  <div key={index} className="petronas-highlight-item">
                    <div
                      className="petronas-highlight-header-row"
                      onClick={() => setActiveHighlight(index)}
                    >
                      <h4
                        className={`petronas-highlight-title ${
                          isActive ? "active" : ""
                        }`}
                      >
                        {item.title}
                      </h4>

                      <button className="petronas-highlight-toggle">
                        {isActive ? <FaMinus /> : <FaPlus />}
                      </button>
                    </div>

                    {isActive && (
                      <div className="petronas-highlight-body">
                        <p className="petronas-highlight-desc">{item.desc}</p>
                      </div>
                    )}

                    <div className="petronas-highlight-line"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="public-footer-modern">
        <div className="footer-top-info">
          <div className="footer-brand">
            <h3>Readymix Business Solution</h3>

            <p>
              Empowering businesses through intelligent knowledge management.
            </p>
          </div>

          <div className="footer-contact">
            <p>
              <b>Address:</b> Perum Bukit Asri 2 Blok S No. 8 Rt 11 Rw 09 Kel.
              Lerep Ungaran Barat
            </p>

            <p>
              <b>Email:</b> teknologireadymix@gmail.com
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © Copyright PT Teknologi Readymix Indonesia 2026. All Right
            Reserved.
          </p>

          <div className="footer-social">
            <a href="#" className="footer-social-icon">
              <FaFacebookF />
            </a>

            <a href="#" className="footer-social-icon">
              <FaXTwitter />
            </a>

            <a href="#" className="footer-social-icon">
              <FaInstagram />
            </a>

            <a href="#" className="footer-social-icon">
              <FaLinkedinIn />
            </a>

            <a href="#" className="footer-social-icon">
              <FaTiktok />
            </a>

            <a href="#" className="footer-social-icon">
              <FaYoutube />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
