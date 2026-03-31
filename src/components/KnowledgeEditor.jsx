import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function KnowledgeEditor({ value, onChange }) {
  const modules = {
    toolbar: {
      container: "#quill-toolbar",
    },
  };

  return (
    <div className="knowledge-editor">
      {/* CUSTOM TOOLBAR */}
      <div id="quill-toolbar">
        <span className="ql-formats">
          <select className="ql-header" defaultValue="">
            <option value="1"></option>
            <option value="2"></option>
            <option value=""></option>
          </select>
        </span>

        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
        </span>

        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </span>

        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
        </span>

        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </div>

      {/* EDITOR */}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Tulis isi knowledge di sini..."
      />
    </div>
  );
}
