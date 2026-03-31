import { createContext, useContext, useState, useEffect } from "react";

const FeatureContext = createContext();

export function FeatureProvider({ children }) {
  const [features, setFeatures] = useState(() => {
    const saved = localStorage.getItem("features");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("features", JSON.stringify(features));
  }, [features]);

  const addFeature = (feature) => {
    setFeatures([...features, { id: Date.now(), ...feature }]);
  };

  const deleteFeature = (id) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  return (
    <FeatureContext.Provider value={{ features, addFeature, deleteFeature }}>
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeatures() {
  return useContext(FeatureContext);
}
