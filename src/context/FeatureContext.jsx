import { createContext, useContext, useState, useEffect } from "react";

const FeatureContext = createContext();

export function FeatureProvider({ children }) {
  const [features, setFeatures] = useState(() => {
    const saved = localStorage.getItem("features");
    return saved ? JSON.parse(saved) : [];

    // return saved ? JSON.parse(saved) : [
    //   { id: 101, name: "Data Karyawan", systemId: 1, category: "Data Master" },
    //   { id: 102, name: "Mutasi & Promosi", systemId: 1, category: "Data Master" },
    //   { id: 103, name: "Penilaian Kinerja", systemId: 1, category: "Pengembangan" },
    //   { id: 104, name: "Penilaian Kinerja Berkala", systemId: 1, category: "Pengembangan" }
    // ];

  });

  useEffect(() => {
    localStorage.setItem("features", JSON.stringify(features));
  }, [features]);

  const addFeature = (feature) => {
    setFeatures([...features, { id: Date.now(), ...feature }]);
  };

  const editFeature = (id, updatedFeature) => {
    setFeatures(features.map((f) => (f.id === id ? { ...f, ...updatedFeature } : f)));
  };

  const deleteFeature = (id) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  return (
    <FeatureContext.Provider value={{ features, addFeature, editFeature, deleteFeature }}>
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeatures() {
  return useContext(FeatureContext);
}
