import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKnowledge } from "../context/KnowledgeContext";
import KnowledgeEditor from "../components/KnowledgeEditor";
import { ArrowLeft, Eye, Send, Save } from "lucide-react";
import { useSystems } from "../context/SystemContext";
import { useFeatures } from "../context/FeatureContext";
import "../styles/editor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddKnowledge({ editId }) {
  const navigate = useNavigate();
  const { addKnowledge, updateKnowledge, knowledge } = useKnowledge();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { systems } = useSystems();
  const { features } = useFeatures();

  const [systemId, setSystemId] = useState("");
  const [featureId, setFeatureId] = useState("");

  const [publishMode, setPublishMode] = useState("auto");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");

  const [isPreview, setIsPreview] = useState(false);

  const [thumbnail, setThumbnail] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editId) {
      const data = knowledge.find((k) => k.id === Number(editId));

      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setSystemId(data.systemId || "");
        setFeatureId(data.featureId || "");
        setThumbnail(data.thumbnail || null);
      }
    }
  }, [editId, knowledge]);

  useEffect(() => {
    const savedThumb = localStorage.getItem("knowledge_thumbnail");
    if (savedThumb) {
      setThumbnail(savedThumb);
    }
  }, []);

  const filteredFeatures = features.filter((f) => f.systemId === systemId);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar!");
      return;
    }

    const maxSize = 500 * 1024;
    if (file.size > maxSize) {
      alert("Ukuran file maksimal 500KB");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        localStorage.setItem("knowledge_thumbnail", reader.result);
        setThumbnail(reader.result);
      } catch (err) {
        alert("Storage penuh, gagal menyimpan thumbnail");
      }
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ==========================
  // REMOVE THUMBNAIL
  // ==========================
  const handleRemoveThumbnail = () => {
    localStorage.removeItem("knowledge_thumbnail");
    setThumbnail(null);
  };

  // ==========================
  // SAVE DRAFT
  // ==========================
  const handleDraft = () => {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    addKnowledge({
      title,
      content,
      systemId,
      featureId,
      status: "draft",
      thumbnail,
      createdAt: new Date().toISOString(),
    });

    localStorage.removeItem("knowledge_thumbnail");
    navigate("/knowledge");
  };

  // ==========================
  // PUBLISH
  // ==========================
  const handlePublish = () => {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    const publishDateTime =
      publishMode === "schedule"
        ? new Date(`${publishDate}T${publishTime}`).toISOString()
        : new Date().toISOString();

    addKnowledge({
      title,
      content,
      systemId,
      featureId,
      status: "published",
      thumbnail,
      createdAt: publishDateTime,
    });

    localStorage.removeItem("knowledge_thumbnail");
    navigate("/knowledge");
  };

  return (
    <div className="editor-page-full">
      {/* HEADER */}
      <div className="editor-header-simple">
        <button
          className="btn-back-modern"
          onClick={() => navigate("/knowledge")}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* BODY */}
      <div className="editor-layout-full">
        {/* MAIN EDITOR */}
        <div className="editor-main-full">
          {/* TOP CARD */}
          <div className="editor-top-card">
            <input
              className="editor-title-navbar"
              placeholder="Judul knowledge..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div id="quill-toolbar" className="toolbar-holder">
              {/* FONT & SIZE */}
              <span className="ql-formats">
                <select className="ql-font">
                  <option value="sans-serif">Sans Serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="poppins">Poppins</option>
                  <option value="roboto">Roboto</option>
                  <option value="inter">Inter</option>
                  <option value="arial">Arial</option>
                  <option value="times-new-roman">Times New Roman</option>
                </select>
                <select className="ql-size"></select>
              </span>

              {/* HEADING */}
              <span className="ql-formats">
                <select className="ql-header">
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                  <option value=""></option>
                </select>
              </span>

              {/* TEXT STYLE */}
              <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
              </span>

              {/* LIST */}
              <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
              </span>

              {/* INDENT */}
              <span className="ql-formats">
                <button className="ql-indent" value="-1"></button>
                <button className="ql-indent" value="+1"></button>
              </span>

              {/* ALIGN */}
              <span className="ql-formats">
                <select className="ql-align"></select>
              </span>

              {/* MEDIA */}
              <span className="ql-formats">
                <button className="ql-link"></button>
                <button className="ql-image"></button>
                <button className="ql-video"></button>
              </span>

              {/* BLOCK */}
              <span className="ql-formats">
                <button className="ql-blockquote"></button>
                <button className="ql-code-block"></button>
              </span>

              {/* CLEAR */}
              <span className="ql-formats">
                <button className="ql-clean"></button>
              </span>
            </div>
          </div>

          {/* PAPER */}
          <div className="editor-paper-card">
            {isPreview ? (
              <div className="preview-box">
                <h2 className="preview-title">
                  {title || "Judul belum diisi"}
                </h2>

                <div
                  className="preview-content"
                  dangerouslySetInnerHTML={{
                    __html: content || "<p>Belum ada isi knowledge</p>",
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
          {/* ACTION */}
          <div className="action-card">
            <h4 className="action-title">Aksi</h4>

            <div className="action-buttons">
              <button
                className="btn-eye"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye size={18} />
              </button>

              <button className="btn-draft" onClick={handleDraft}>
                <Save size={16} />
                Draft
              </button>

              <button className="btn-publish" onClick={handlePublish}>
                <Send size={16} />
                Publish
              </button>
            </div>
          </div>

          {/* THUMBNAIL */}
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
                onClick={handleRemoveThumbnail}
              >
                Hapus Thumbnail
              </button>
            )}
          </div>

          {/* SYSTEM */}
          <div className="sidebar-group">
            <label>System</label>

            <select
              value={systemId}
              onChange={(e) => {
                setSystemId(e.target.value);
                setFeatureId("");
              }}
            >
              <option value="">Pilih System</option>

              {systems.map((sys) => (
                <option key={sys.id} value={sys.id}>
                  {sys.name}
                </option>
              ))}
            </select>
          </div>

          {/* FEATURE */}
          <div className="sidebar-group">
            <label>Feature</label>

            <select
              value={featureId}
              onChange={(e) => setFeatureId(e.target.value)}
              disabled={!systemId}
            >
              <option value="">Pilih Feature</option>

              {filteredFeatures.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* PUBLISH SETTING */}
          <div className="sidebar-group">
            <label>Dipublikasikan pada</label>

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
                />
              </div>
            </label>

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
                />
              </div>

              {publishMode === "schedule" && (
                <div className="publish-body">
                  <div className="datetime-row">
                    <input
                      type="date"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                    />

                    <input
                      type="time"
                      value={publishTime}
                      onChange={(e) => setPublishTime(e.target.value)}
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
