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
