import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKnowledge } from "../knowledge/KnowledgeContext";
import KnowledgeEditor from "../components/KnowledgeEditor";
import { ArrowLeft, Eye, Send, Save } from "lucide-react";
import "../styles/editor.css";

export default function AddKnowledge() {
  const navigate = useNavigate();
  const { addKnowledge } = useKnowledge();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("SOP");

  const [publishMode, setPublishMode] = useState("schedule");
  const [publishDate, setPublishDate] = useState("2026-02-04");
  const [publishTime, setPublishTime] = useState("12:49");

  const [isPreview, setIsPreview] = useState(false);

  // ===============================
  // THUMBNAIL
  // ===============================
  const [thumbnail, setThumbnail] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedThumb = localStorage.getItem("knowledge_thumbnail");
    if (savedThumb) {
      setThumbnail(savedThumb);
    }
  }, []);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar!");
      return;
    }

    const maxSize = 500 * 1024;
    if (file.size > maxSize) {
      alert("Ukuran file terlalu besar! Maksimal 500KB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        localStorage.setItem("knowledge_thumbnail", reader.result);
        setThumbnail(reader.result);
      } catch (err) {
        alert("Gagal menyimpan thumbnail! Storage penuh.");
        console.error(err);
      }
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemoveThumbnail = () => {
    localStorage.removeItem("knowledge_thumbnail");
    setThumbnail(null);
  };

  const handleDraft = () => {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    addKnowledge({
      title,
      content,
      category,
      status: "draft",
      thumbnail: thumbnail || null,
      createdAt: new Date().toISOString(),
    });

    localStorage.removeItem("knowledge_thumbnail");
    navigate("/knowledge");
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    addKnowledge({
      title,
      content,
      category,
      status: "published",
      thumbnail: thumbnail || null,
      createdAt:
        publishMode === "schedule"
          ? new Date(`${publishDate}T${publishTime}`).toISOString()
          : new Date().toISOString(),
    });

    localStorage.removeItem("knowledge_thumbnail");
    navigate("/knowledge");
  };

  return (
    <div className="editor-page-full">
      {/* HEADER */}
      <div className="editor-header-simple">
        <button className="btn-back-modern" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="editor-layout-full">
        {/* MAIN */}
        <div className="editor-main-full">
          {/* CARD NAVBAR (JUDUL + TOOLBAR) */}
          <div className="editor-top-card">
            <input
              className="editor-title-navbar"
              placeholder="Judul knowledge..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div id="quill-toolbar" className="toolbar-holder">
              <span className="ql-formats">
                <select className="ql-font" defaultValue="sans-serif">
                  <option value="sans-serif">Sans Serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="poppins">Poppins</option>
                  <option value="roboto">Roboto</option>
                  <option value="arial">Arial</option>
                  <option value="times-new-roman">Times New Roman</option>
                  <option value="courier-new">Courier New</option>
                  <option value="georgia">Georgia</option>
                  <option value="tahoma">Tahoma</option>
                  <option value="verdana">Verdana</option>
                </select>

                <select className="ql-size"></select>
              </span>

              <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
              </span>

              <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <button className="ql-indent" value="-1"></button>
                <button className="ql-indent" value="+1"></button>
              </span>

              <span className="ql-formats">
                <button className="ql-align" value=""></button>
                <button className="ql-align" value="center"></button>
                <button className="ql-align" value="right"></button>
                <button className="ql-align" value="justify"></button>
              </span>

              <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
              </span>

              <span className="ql-formats">
                <button className="ql-clean"></button>
              </span>
            </div>
          </div>

          {/* CARD WORD PAPER */}
          <div className="editor-paper-card">
            {isPreview ? (
              <div className="preview-box">
                <h2 className="preview-title">
                  {title || "Judul belum diisi"}
                </h2>

                <div
                  className="preview-content"
                  dangerouslySetInnerHTML={{
                    __html: content || "<p>Belum ada isi knowledge.</p>",
                  }}
                />
              </div>
            ) : (
              <KnowledgeEditor value={content} onChange={setContent} />
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="editor-sidebar">
          {/* ACTION CARD */}
          <div className="action-card">
            <h4 className="action-title">Aksi</h4>

            <div className="action-buttons">
              <button
                className="btn-eye"
                type="button"
                title="Preview"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye size={18} />
              </button>

              <button className="btn-draft" type="button" onClick={handleDraft}>
                <Save size={16} />
                Draft
              </button>

              <button
                className="btn-publish"
                type="button"
                onClick={handlePublish}
              >
                <Send size={16} />
                Publish
              </button>
            </div>
          </div>

          {/* THUMBNAIL MENU */}
          <div className="thumbnail-card">
            <h4 className="thumbnail-title">Thumbnail</h4>

            <div className="thumbnail-preview">
              {thumbnail ? (
                <img src={thumbnail} alt="thumbnail" />
              ) : (
                <p className="thumbnail-empty">Belum ada thumbnail</p>
              )}
            </div>

            <button
              type="button"
              className="thumbnail-upload-btn"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Thumbnail
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              style={{ display: "none" }}
            />

            {thumbnail && (
              <button
                className="thumbnail-remove-btn"
                type="button"
                onClick={handleRemoveThumbnail}
              >
                Hapus Thumbnail
              </button>
            )}
          </div>

          {/* SETTINGS */}
          <h4 className="sidebar-title">Setelan Posting</h4>

          <div className="sidebar-group">
            <label>Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Media Releases">Media Releases</option>
              <option value="Article">Article</option>
              <option value="Announcement">Announcement</option>
            </select>
          </div>

          <div className="sidebar-group">
            <label>Dipublikasikan pada</label>

            {/* AUTO */}
            <label
              className={`publish-box ${
                publishMode === "auto" ? "active" : ""
              }`}
            >
              <div className="publish-head">
                <span>Otomatis</span>

                <input
                  type="radio"
                  name="publishMode"
                  value="auto"
                  checked={publishMode === "auto"}
                  onChange={() => setPublishMode("auto")}
                  className="radio-hidden"
                />

                <span className="radio-custom"></span>
              </div>
            </label>

            {/* SCHEDULE */}
            <label
              className={`publish-box ${
                publishMode === "schedule" ? "active" : ""
              }`}
            >
              <div className="publish-head">
                <span>Setel tanggal dan waktu</span>

                <input
                  type="radio"
                  name="publishMode"
                  value="schedule"
                  checked={publishMode === "schedule"}
                  onChange={() => setPublishMode("schedule")}
                  className="radio-hidden"
                />

                <span className="radio-custom"></span>
              </div>

              {publishMode === "schedule" && (
                <div className="publish-body">
                  <div className="datetime-row">
                    <input
                      type="date"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <input
                      type="time"
                      value={publishTime}
                      onChange={(e) => setPublishTime(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
