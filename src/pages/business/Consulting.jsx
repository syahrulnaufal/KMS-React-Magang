import "../../styles/consulting.css";

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

export default function Consulting() {
  return (
    <>
      <section className="public-hero-bottom">
        <div className="hero-bottom-container">
          <div className="hero-bottom-left">
            <h2 className="hero-bottom-title">
              We help to <span className="highlight-word">optimize</span>{" "}
              production
            </h2>

            <p className="hero-bottom-desc">
              Maksimalkan potensi bisnis Readymix dengan kontrol monitoring dan
              operasional yang terintegrasi.
            </p>

            <div className="hero-bottom-features">
              <div className="feature-item">
                <CheckCircle className="feature-icon" />
                <span>Realtime</span>
              </div>

              <div className="feature-divider"></div>

              <div className="feature-item">
                <Workflow className="feature-icon" />
                <span>Integrated</span>
              </div>

              <div className="feature-divider"></div>

              <div className="feature-item">
                <Smartphone className="feature-icon" />
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= CONSULT SECTION ================= */}
      <section className="rbs-consult-section">
        <div className="rbs-consult-wrapper">
          {/* LEFT */}
          <div className="rbs-consult-left">
            <h2>Readymix Consulting</h2>
            <p className="rbs-consult-subtitle">
              Konsultasikan bisnis readymix Anda dengan Tim Ahli dari Kami!
            </p>

            <p className="rbs-consult-desc">
              Kami menyediakan layanan strategis dan solusi bisnis yang dipandu
              Expert dari pelaku Readymix dengan pengalaman >10 tahun. Dengan
              pengetahuan mendalam tentang lanskap industri readymix di
              Indonesia dan pengalaman yang luas, kami membantu klien kami
              mencapai keunggulan kompetitif, mengoptimalkan operasional mereka,
              dan mencapai pertumbuhan yang berkelanjutan
            </p>
          </div>

          {/* RIGHT */}
          <div className="rbs-consult-right">
            <div className="rbs-stat-box">
              <Server className="rbs-stat-icon" />
              <h3>99.99%</h3>
              <p>System uptime dengan zero maintenance downtime</p>
            </div>

            <div className="rbs-stat-box">
              <Users className="rbs-stat-icon" />
              <h3>600M+</h3>
              <p>Users trust di seluruh Indonesia</p>
            </div>

            <div className="rbs-stat-box">
              <TrendingUp className="rbs-stat-icon" />
              <h3>120%</h3>
              <p>Peningkatan profit perusahaan</p>
            </div>

            <div className="rbs-stat-box">
              <ShoppingCart className="rbs-stat-icon" />
              <h3>5000+ M3</h3>
              <p>Transactions per day</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEMO CTA SECTION ================= */}
      <section className="rbs-demo-section">
        <div className="rbs-demo-content">
          <h2>Coba demo sistem</h2>

          <p>
            Anda dapat mengajukan request demo melalui link berikut. Kami akan
            menghubungi Anda di hari kerja.
          </p>

          <button className="rbs-demo-btn">Request Demo</button>
        </div>
      </section>
    </>
  );
}
