import React, { useState, useRef, useEffect } from "react";
import "../styles/public.css";

import { useKnowledge } from "../knowledge/KnowledgeContext";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaCheckCircle,
  FaMobileAlt,
  FaArrowRight,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { GiGearStickPattern } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import heroImg from "../assets/page.png";
import logoImg from "../assets/logo-rbs.png";
import dashboardImg from "../assets/dashboard.png";
import highlight1 from "../assets/highlight/1.png";
import highlight2 from "../assets/highlight/2.png";
import highlight3 from "../assets/highlight/3.png";
import highlight4 from "../assets/highlight/4.png";
import saasImg from "../assets/saas.jpg";
import hardwareImg from "../assets/hardware.jpg";
import consultingImg from "../assets/consulting.jpg";
import truckImg from "../assets/truck-rbs.png";
import FAQChatbot from "../components/FAQChatbot";
import FullVideo from "./FullVideo";

export default function PublicDashboard() {
  const { knowledgeList } = useKnowledge();
  const navigate = useNavigate();

  const [activeHighlight, setActiveHighlight] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const updatesSliderRef = useRef(null);

  const publishedList = knowledgeList.filter(
    (item) => item.status?.toLowerCase() === "published"
  );
  const [showVideo, setShowVideo] = useState(false);
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  /* ================= HEADER SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= AUTO SCROLL (Kanan ke kiri) ================= */
  useEffect(() => {
    const slider = updatesSliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollLeft += 1;

      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  const highlightData = [
    {
      title: "The story telling of us 2025",
      desc: "Readymix is......",
      linkText: "Watch full video",
      linkUrl: "/watch-video",
      img: highlight1,
    },
    {
      title: "Legacy Beneath the Waves",
      desc: "Readymix .....",
      linkText: "Read more",
      linkUrl: "#",
      img: highlight2,
    },
    {
      title: "The Spirit of Gresik",
      desc: "Readymix .....",
      linkText: "Read more",
      linkUrl: "#",
      img: highlight3,
    },
    {
      title: "Meet Our Women Trailblazers in Technology",
      desc: "Readymix .....",
      linkText: "Read more",
      linkUrl: "#",
      img: highlight4,
    },
  ];

  return (
    <div className="public-wrapper">
      <FAQChatbot />;{/* ================= HEADER ================= */}
      <header className={`public-header ${scrolled ? "scrolled" : ""}`}>
        <div className="public-header-container">
          {/* LOGO + TEXT */}
          <div className="public-logo-area">
            <img src={logoImg} alt="RBS Logo" className="public-logo-img" />

            <span className="public-logo-text">READYMIX BUSINESS SOLUTION</span>
          </div>

          {/* NAVIGATION */}
          <nav className="public-top-nav">
            <a href="#">Beranda</a>

            <div className="nav-dropdown">
              <span className="nav-dropdown-title">Our Business</span>

              <div className="nav-dropdown-panel">
                <ul>
                  <li onClick={() => navigate("/business/saas")}>
                    Software as a Service
                  </li>
                  <li onClick={() => navigate("/business/hardware")}>
                    Hardware
                  </li>
                  <li onClick={() => navigate("/business/consulting")}>
                    Consulting
                  </li>
                </ul>
              </div>
            </div>

            <div className="nav-dropdown">
              <span className="nav-dropdown-title">News & Media</span>

              <div className="nav-dropdown-panel">
                <ul>
                  <li>Media Releases</li>
                  <li>Article</li>
                  <li>Announcement</li>
                </ul>
              </div>
            </div>

            <a href="#">Keberlanjutan</a>
          </nav>
        </div>
      </header>
      {/* ================= HERO ABOUT ================= */}
      <section className="public-about-hero">
        <div className="public-about-content">
          <h1 className="public-about-title">
            <span className="title-main">Readymix Business Solution</span>
            <br />
          </h1>

          <p className="public-about-desc">
            Investasi untuk memaksimalkan potensi bisnis readymix anda
          </p>

          <div className="public-about-buttons">
            <button
              className="public-about-btn primary"
              onClick={() => navigate("/about-detail")}
            >
              Selengkapnya <span>↗</span>
            </button>
          </div>
        </div>

        <img src={truckImg} alt="Truck RBS" className="hero-truck" />
      </section>
      <section className="products-section-modern">
        <div className="products-container">
          <h2 className="products-title">
            <span className="title-main">Produk dan Layanan</span>
            <br />
            <span className="title-sub">
              untuk bisnis <span className="highlight-word">readymix</span> Anda
            </span>
          </h2>

          <div className="products-grid">
            {/* CARD 1 */}
            <div className="product-card">
              <div className="product-image-wrapper">
                <img src={saasImg} alt="SaaS" />
              </div>

              <div className="product-content">
                <h3>Software as a Service</h3>
                <p>
                  Solusi digital untuk memaksimalkan operasional dan manajemen
                  bisnis readymix Anda.
                </p>
                <button
                  className="product-link"
                  onClick={() => navigate("/business/saas")}
                >
                  Read More <FaArrowRight />
                </button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="product-card">
              <div className="product-image-wrapper">
                <img src={hardwareImg} alt="Hardware" />
              </div>

              <div className="product-content">
                <h3>Hardware</h3>
                <p>
                  Perangkat terintegrasi untuk meningkatkan efisiensi dan
                  akurasi produksi readymix.
                </p>

                <button
                  className="product-link"
                  onClick={() => navigate("/business/hardware")}
                >
                  Read More <FaArrowRight />
                </button>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="product-card">
              <div className="product-image-wrapper">
                <img src={consultingImg} alt="Consulting" />
              </div>

              <div className="product-content">
                <h3>Consulting</h3>
                <p>
                  Solusi dalam perencanaan dan pengembangan bisnis readymix
                  perusahaan Anda.
                </p>

                <button
                  className="product-link"
                  onClick={() => navigate("/business/consulting")}
                >
                  Read More <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= INVEST SECTION ================= */}
      <section className="rbs-invest-section">
        <div className="rbs-invest-container">
          <div className="rbs-invest-left">
            <h2 className="rbs-invest-title">
              Investasi untuk memaksimalkan potensi <br />
              readymix perusahaan Anda
            </h2>

            <p className="rbs-invest-desc">
              Kebanyakan Operasional Bisnis Readymix berpotensi mengalami
              kerugian karena tidak memiliki kontrol dan monitoring operasional.
              RBS adalah investasi yang membantu Anda mempermudah manajemen
              readymix dengan cara menekan ketidaksesuaian seminimal mungkin
              untuk memperoleh hasil semaksimal mungkin.
            </p>

            <div className="rbs-invest-line"></div>

            <ul className="rbs-invest-list">
              <li>
                <span className="rbs-invest-check">
                  <FaCheckCircle />
                </span>
                Kelola dan monitor penjualan
              </li>

              <li>
                <span className="rbs-invest-check">
                  <FaCheckCircle />
                </span>
                Pantau dan prediksi kebutuhan stock material
              </li>

              <li>
                <span className="rbs-invest-check">
                  <FaCheckCircle />
                </span>
                Pastikan resource dan equipment beroperasi dengan baik
              </li>
            </ul>
          </div>

          <div className="rbs-invest-right">
            <img src={dashboardImg} alt="Dashboard Preview" />
          </div>
        </div>
      </section>
      {/* ================= LATEST UPDATES SECTION ================= */}
      <section className="rbs-latest-section">
        <div className="rbs-latest-container">
          {/* HEADER */}
          <div className="rbs-latest-header">
            <h2>
              Latest <span>Updates</span>
            </h2>

            <p className="rbs-latest-subtitle">
              Stay informed with our latest media releases, article, and
              announcements.
            </p>

            <button
              className="rbs-latest-viewall"
              onClick={() => navigate("/latest-updates")}
            >
              View All <FaArrowRight />
            </button>
          </div>

          {/* SLIDER */}
          <div className="rbs-latest-slider" ref={updatesSliderRef}>
            {publishedList.length > 0 ? (
              publishedList.map((item) => (
                <div key={item.id} className="rbs-news-card">
                  <div className="rbs-news-image">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} />
                    ) : (
                      <div className="rbs-no-thumb">No Thumbnail</div>
                    )}
                  </div>

                  <div className="rbs-news-content">
                    <div className="rbs-news-meta">
                      <span className="rbs-news-date">
                        {formatDate(item.createdAt)}
                      </span>

                      <span className="rbs-news-category">
                        {item.category?.toUpperCase() || "MEDIA RELEASE"}
                      </span>
                    </div>

                    <h4 className="rbs-news-title">
                      {item.title || "(Tanpa Judul)"}
                    </h4>

                    <p className="rbs-news-excerpt">
                      {item.content
                        ? stripHtml(item.content).length > 140
                          ? stripHtml(item.content).substring(0, 140) + "..."
                          : stripHtml(item.content)
                        : "Tidak ada deskripsi."}
                    </p>

                    <button
                      className="rbs-news-btn"
                      onClick={() => navigate(`/knowledge/${item.id}`)}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="public-knowledge-empty">
                Belum ada berita terbaru.
              </p>
            )}
          </div>
        </div>
      </section>
      {/* ================= HIGHLIGHTS SECTION ================= */}
      <section className="petronas-highlights-section">
        <div className="petronas-highlights-container">
          <div className="petronas-highlights-header">
            <h2 className="petronas-highlights-title">Highlights</h2>
            <p className="petronas-highlights-subtitle">
              Discover what's happening around PT Teknologi Readymix Indonesia.
            </p>
          </div>

          <div className="petronas-highlights-layout">
            <div className="petronas-highlights-image-card">
              <img
                src={highlightData[activeHighlight].img}
                alt={highlightData[activeHighlight].title}
              />
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

                      <button
                        className={`petronas-highlight-toggle ${
                          isActive ? "active" : ""
                        }`}
                      >
                        {isActive ? <FaMinus /> : <FaPlus />}
                      </button>
                    </div>

                    {isActive && (
                      <div className="petronas-highlight-body">
                        <p className="petronas-highlight-desc">{item.desc}</p>

                        <button
                          className="petronas-highlight-readmore"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowVideo(true);
                          }}
                        >
                          <FaArrowRight />
                          <span>Watch full video</span>
                        </button>
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
          <p>
            <b>Address:</b> Perum Bukit Asri 2 Blok S No. 8 Rt 11 Rw 09 Kel.
            Lerep Ungaran barat
          </p>
          <p>
            <b>Email:</b> teknologireadymix@gmail.com
          </p>
        </div>

        <div className="footer-main">
          <div className="footer-column">
            <h4>Announcement</h4>
            <ul>
              <li>Readymix Info</li>
              <li>Pengadaan Umum</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Situs Terkait</h4>
            <ul>
              <li>RBS...</li>
              <li>RBS...</li>
              <li>RBS...</li>
              <li>Rbs...</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Tools</h4>
            <ul>
              <li>Tata Kelola Perusahaan</li>
              <li>Informasi Publik</li>
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <h4>Kontak Kami</h4>

            <div className="footer-contact-box">
              <h5>Whistle Blowing System</h5>
              <p>https://pertaminaclean.tipoffs.info/</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              © Copyright PT Teknologi Readymix Indonesia 2026. All Right
              Reserved.
            </p>

            <div className="footer-links">
              <a href="#">Kebijakan Privasi</a>
              <a href="#">Waspada Penipuan</a>
            </div>
          </div>

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
