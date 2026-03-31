import { useNavigate } from "react-router-dom";
import "../styles/fullvideo.css";

export default function FullVideo() {
  const navigate = useNavigate();

  return (
    <div className="video-page">
      <div className="video-wrapper">
        <button className="close-button" onClick={() => navigate(-1)}>
          ✕
        </button>

        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Full Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
