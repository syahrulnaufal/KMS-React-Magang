import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./quillFonts";

import PublicLayout from "./layouts/PublicLayout";

// PUBLIC PAGES
import PublicDashboard from "./pages/PublicDashboard";
import PublicKnowledgeDetail from "./pages/PublicKnowledgeDetail";
import AboutDetail from "./pages/AboutDetail";
import SaaS from "./pages/business/SaaS";
import Hardware from "./pages/business/Hardware";
import Consulting from "./pages/business/Consulting";
import LatestUpdates from "./pages/LatestUpdates";
import FullVideo from "./pages/FullVideo";
import PublicSystems from "./pages/PublicSystems";
import SystemDetail from "./pages/SystemDetail";

// AUTH
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

// ADMIN
import Dashboard from "./pages/Dashboard";
import Knowledge from "./pages/Knowledge";
import AddKnowledge from "./pages/AddKnowledge";
import EditKnowledge from "./pages/EditKnowledge";
import ManageUsers from "./pages/ManageUsers";
import Systems from "./pages/Systems";
import Features from "./pages/Features";

// PROTECTED ROUTE
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC AREA ================= */}
        <Route element={<PublicLayout />}>
          {/* LANDING PAGE */}
          <Route path="/" element={<PublicDashboard />} />
          <Route path="/public" element={<PublicDashboard />} />

          {/* DOCUMENTATION */}
          <Route path="/panduan-sistem" element={<PublicSystems />} />

          {/* KNOWLEDGE DETAIL */}
          <Route
            path="/public/knowledge/:id"
            element={<PublicKnowledgeDetail />}
          />

          <Route path="/knowledge/:id" element={<PublicKnowledgeDetail />} />

          {/* COMPANY */}
          <Route path="/about-detail" element={<AboutDetail />} />

          {/* BUSINESS */}
          <Route path="/business/saas" element={<SaaS />} />
          <Route path="/business/hardware" element={<Hardware />} />
          <Route path="/business/consulting" element={<Consulting />} />

          {/* OTHER */}
          <Route path="/latest-updates" element={<LatestUpdates />} />
          <Route path="/watch-video" element={<FullVideo />} />
          <Route path="/systems" element={<PublicSystems />} />
          <Route path="/systems/:id" element={<SystemDetail />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ================= ADMIN PROTECTED ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/systems"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <Systems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/features"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <Features />
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <Knowledge />
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge/add"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <AddKnowledge />
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <EditKnowledge />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
