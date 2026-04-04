import { createContext, useContext, useState, useEffect } from "react";

const KnowledgeContext = createContext();

export function KnowledgeProvider({ children }) {
  const [knowledge, setKnowledge] = useState(() => {
    const saved = localStorage.getItem("knowledge");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("knowledge", JSON.stringify(knowledge));
  }, [knowledge]);

  // ADD CONTENT
  const addKnowledge = (data) => {
    const newData = {
      id: Date.now(),
      title: data.title,
      systemId: data.systemId || data.system,
      featureId: data.featureId || data.feature,
      content: data.content,
      status: (data.status === "published" || data.status === "Publish") ? "Publish" : "Draft",
      thumbnail: data.thumbnail,
    };

    setKnowledge((prev) => [...prev, newData]);
  };

  // DELETE CONTENT
  const deleteKnowledge = (id) => {
    if(!confirm('yakin ingin menghapus content ini ?\n(content ini akan dihapus permanen)')) return;
    setKnowledge((prev) => prev.filter((k) => k.id !== id));
  };

  // UPDATE CONTENT (UNTUK EDIT)
  const updateKnowledge = (id, updatedData) => {
    setKnowledge((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  // GET DATA BY ID (untuk halaman edit)
  const getKnowledgeById = (id) => {
    return knowledge.find((item) => item.id === Number(id));
  };

  // GET KNOWLEDGE BY FEATURE (untuk public page)
  const getKnowledgeByFeature = (feature) => {
    return knowledge.filter(
      (item) =>
        Number(item.feature) === Number(feature) && item.status === "Publish"
    );
  };

  return (
    <KnowledgeContext.Provider
      value={{
        knowledge,
        addKnowledge,
        deleteKnowledge,
        updateKnowledge,
        getKnowledgeById,
        getKnowledgeByFeature,
      }}
    >
      {children}
    </KnowledgeContext.Provider>
  );
}

export function useKnowledge() {
  return useContext(KnowledgeContext);
}
