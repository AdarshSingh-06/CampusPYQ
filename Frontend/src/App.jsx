import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { preloadCampusData } from "./services/cache";

import Home from "./pages/Home";
import Branch from "./pages/Branch";
import Semester from "./pages/Semester";
import Subject from "./pages/Subject";
import Pyq from "./pages/Pyq";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import ManageBranch from "./pages/ManageBranch";
import ManageSemester from "./pages/ManageSemester";
import ManageSubject from "./pages/ManageSubject";
import ManagePyq from "./pages/ManagePyq";

import ChangePassword from "./pages/changePassword";

function App() {

  useEffect(() => {

    // Background me data preload hoga
    // UI ko block nahi karega

    preloadCampusData();

  }, []);

  return (
    <>
      <Navbar />

      <AnnouncementBar />

      <Routes>

        {/* =========================
              PUBLIC PAGES
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/branches"
          element={<Branch />}
        />

        <Route
          path="/branches/:branchId/semesters"
          element={<Semester />}
        />

        <Route
          path="/semesters/:semesterId/subjects"
          element={<Subject />}
        />

        <Route
          path="/subjects/:subjectId/pyqs"
          element={<Pyq />}
        />


        {/* =========================
              LOGIN
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
              ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =========================
              MANAGE BRANCH
        ========================= */}

        <Route
          path="/manage-branch"
          element={
            <ProtectedRoute>
              <ManageBranch />
            </ProtectedRoute>
          }
        />


        {/* =========================
              MANAGE SEMESTER
        ========================= */}

        <Route
          path="/manage-semester"
          element={
            <ProtectedRoute>
              <ManageSemester />
            </ProtectedRoute>
          }
        />


        {/* =========================
              MANAGE SUBJECT
        ========================= */}

        <Route
          path="/manage-subject"
          element={
            <ProtectedRoute>
              <ManageSubject />
            </ProtectedRoute>
          }
        />


        {/* =========================
              MANAGE PYQ
        ========================= */}

        <Route
          path="/manage-pyq"
          element={
            <ProtectedRoute>
              <ManagePyq />
            </ProtectedRoute>
          }
        />


        {/* =========================
              CHANGE PASSWORD
        ========================= */}

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

    </>
  );
}

export default App;