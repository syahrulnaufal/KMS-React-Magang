import { useState } from "react";
import {
  Server,
  Users,
  TrendingUp,
  ShoppingCart,
  CheckCircle,
  Workflow,
  Smartphone,
  Code2,
  Presentation,
  UserCheck,
} from "lucide-react";
import managementImg from "../assets/app-management.png";
import operationImg from "../assets/app-operation.png";
import driverImg from "../assets/app-driver.png";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question:
        "Apakah saya dapat menggunakan RBS untuk memantau lebih dari 1 plant produksi?",
      answer:
        "Anda dapat memantau masing-masing plant produksi di perusahaan Anda dari manapun dengan Sistem RBS. Anda juga dapat mengatur hak akses untuk setiap stakeholder di perusahaan Anda.",
    },
    {
      question:
        "Apakah kami bisa mendapat pendampingan saat proses implementasi?",
      answer:
        "Ya, tim kami menyediakan pendampingan penuh selama proses implementasi hingga sistem berjalan optimal.",
    },
    {
      question: "Bagaimana cara menggunakan sistem RBS untuk perusahaan saya?",
      answer:
        "Anda dapat menghubungi tim kami untuk demo dan konsultasi. Kami akan menyesuaikan sistem sesuai kebutuhan bisnis Anda.",
    },
    {
      question: "Apakah perlu infrastruktur khusus untuk pemasangan software?",
      answer:
        "Tidak. Sistem kami fleksibel dan dapat disesuaikan dengan infrastruktur yang sudah Anda miliki.",
    },
  ];

  return (
    <>
      {/* ===== CTA SECTION ===== */}
      <section className="rbs-cta-modern">
        <div className="rbs-cta-wrapper">
          <div className="rbs-cta-modern-content">
            <h1 className="cta-title">
              Siap Memaksimalkan <br />
              <span>Bisnis Readymix Anda?</span>
            </h1>

            <p className="cta-desc">
              Hubungi kami sekarang untuk konsultasi dan layanan terbaik untuk
              meningkatkan performa bisnis ready mix Anda.
            </p>

            <button className="cta-modern-btn">Hubungi Kami →</button>
          </div>

          <div className="rbs-cta-image">
            <div className="image-shape"></div>
            <div className="badge-top">1-on-1 Asistensi</div>
            <div className="badge-bottom">
              <span>20+</span> Mentor Berpengalaman
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="dform-about">
        <div className="dform-card">
          <div className="dform-header">
            <div className="dform-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h2>Apa itu RBS?</h2>
          </div>

          <p>
            PT Teknologi Readymix Indonesia adalah perusahaan teknologi pertama
            di Indonesia yang memiliki visi untuk meningkatkan produktifitas
            lanskap konstruksi, khususnya industri readymix.
          </p>

          <p>
            Sistem terintegrasi kami berupa mesin Automasi Produksi (RBS Auto),
            Sistem Timbang (RBS Weighing), serta Sistem Manajemen Readymix (RBS
            Solution) telah digunakan oleh banyak plant readymix di Indonesia.
          </p>

          <p>
            Platform ini juga memudahkan proses monitoring, manajemen, dan
            optimalisasi produksi secara real-time.
          </p>
        </div>
      </section>

      {/* ================= OPTIMIZE SECTION ================= */}
      <section className="rbs-optimize-section">
        <div className="rbs-optimize-top">
          <h2>
            We help to <span>optimize</span> production
          </h2>
          <p>
            Maksimalkan potensi bisnis Readymix dengan kontrol monitoring dan
            operasional yang terintegrasi.
          </p>
          <div> </div>
        </div>

        <div className="rbs-optimize-apps">
          {/* MANAGEMENT */}
          <div className="rbs-app-card">
            <h4>Management App</h4>
            <p>Monitoring all resources, sales</p>
            <div className="rbs-app-image">
              <img src={managementImg} alt="Management App" />
            </div>
          </div>

          {/* OPERATION */}
          <div className="rbs-app-card">
            <h4>Operation App</h4>
            <p>Manage Orders, Schedule, Material Stock etc.</p>
            <div className="rbs-app-image">
              <img src={operationImg} alt="Operation App" />
            </div>
          </div>

          {/* DRIVER */}
          <div className="rbs-app-card">
            <h4>Driver App</h4>
            <p>Delivery Schedule & Tracking</p>
            <div className="rbs-app-image">
              <img src={driverImg} alt="Driver App" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY SECTION ================= */}
      <section className="rbs-why-section">
        <div className="rbs-why-wrapper">
          <div className="rbs-why-left">
            <p className="rbs-why-subtitle">Kenapa harus memilih kami?</p>

            <h2 className="rbs-why-title">
              <span>Support Penuh Akan Anda Dapatkan</span>
              <span>Jika Menggunakan Sistem Kami</span>
            </h2>

            <div className="rbs-why-list">
              <div className="rbs-why-item">
                <div className="rbs-why-icon">
                  <Code2 size={20} />
                </div>
                <div>
                  <h4>Implementasi Praktis</h4>
                  <p>
                    Pendampingan langsung dalam implementasi sistem agar
                    operasional berjalan optimal.
                  </p>
                </div>
              </div>

              <div className="rbs-why-divider"></div>

              <div className="rbs-why-item">
                <div className="rbs-why-icon">
                  <Presentation size={20} />
                </div>
                <div>
                  <h4>Training Interaktif</h4>
                  <p>
                    Pelatihan sistem secara langsung bersama tim ahli untuk
                    memastikan penggunaan maksimal.
                  </p>
                </div>
              </div>

              <div className="rbs-why-divider"></div>

              <div className="rbs-why-item">
                <div className="rbs-why-icon">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h4>Dukungan 1-on-1</h4>
                  <p>
                    Tim support kami siap membantu kebutuhan teknis dan
                    konsultasi bisnis Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rbs-why-right">
            <img
              src="/images/consulting-team.jpg"
              alt="RBS Consulting"
              className="rbs-why-img"
            />
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="rbs-faq-section">
        <div className="rbs-faq-wrapper">
          <h2 className="rbs-faq-title">Frequently asked questions</h2>

          <div className="rbs-faq-list">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`rbs-faq-item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div
                  className="rbs-faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>

                {activeIndex === index && (
                  <div className="rbs-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
