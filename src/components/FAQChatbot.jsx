import React, { useState } from "react";
import "../styles/faqchatbot.css";
import robotIcon from "../assets/robot.png";

export default function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo 👋 Saya chatbot FAQ. Silakan tanya seputar website ini!",
    },
  ]);
  const [input, setInput] = useState("");

  // daftar FAQ
  const faqData = [
    {
      question: "cara login",
      answer:
        "Untuk login, klik tombol Login lalu masukkan email dan password.",
    },
    {
      question: "cara daftar",
      answer: "Untuk daftar akun, klik Register lalu isi data yang diperlukan.",
    },
    {
      question: "lupa password",
      answer:
        "Jika lupa password, klik 'Forgot Password' lalu masukkan email untuk reset password.",
    },
    {
      question: "apa itu kms",
      answer:
        "KMS adalah Knowledge Management System, yaitu sistem untuk mengelola dan berbagi pengetahuan.",
    },
    {
      question: "bagaimana cara upload konten",
      answer:
        "Untuk upload konten, masuk ke dashboard lalu pilih menu 'Tambah Konten' dan isi form yang tersedia.",
    },
    {
      question: "konten apa saja yang tersedia",
      answer:
        "Konten yang tersedia meliputi artikel, dokumen, tutorial, dan informasi internal perusahaan.",
    },
    {
      question: "bagaimana cara menghubungi admin",
      answer:
        "Kamu bisa menghubungi admin melalui menu Contact atau melalui email admin yang tersedia di website.",
    },
  ];

  // jawaban FAQ berdasarkan keyword
  const findAnswer = (userInput) => {
    const text = userInput.toLowerCase();

    const found = faqData.find((faq) => text.includes(faq.question));

    if (found) return found.answer;

    return "Maaf, saya belum menemukan jawaban untuk pertanyaan itu 😅 Coba tanya dengan kata lain.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = findAnswer(input);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 600);

    setInput("");
  };

  return (
    <div>
      <button className="chatbot-bubble" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          "✖"
        ) : (
          <img src={robotIcon} alt="Chatbot" className="chatbot-icon" />
        )}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h4>RBS Chatbot</h4>
            <span>Online</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-message ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Tulis pertanyaan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
}
