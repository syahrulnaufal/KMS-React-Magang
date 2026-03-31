import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./auth/AuthContext";
import { KnowledgeProvider } from "./context/KnowledgeContext";
import { SystemProvider } from "./context/SystemContext";
import { FeatureProvider } from "./context/FeatureContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <KnowledgeProvider>
      <SystemProvider>
        <FeatureProvider>
          <App />
        </FeatureProvider>
      </SystemProvider>
    </KnowledgeProvider>
  </AuthProvider>
);
