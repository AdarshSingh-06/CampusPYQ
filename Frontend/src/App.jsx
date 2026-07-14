import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import { ToastContainer } from "react-toastify";

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
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />

      <AnnouncementBar/>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/branches" element={<Branch />} />

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

        <Route path="/login" element={<Login />} />

<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
        <Route
path="/manage-branch"
element={
<ProtectedRoute>
<ManageBranch/>
</ProtectedRoute>
}
/>

<Route
path="/manage-semester"
element={
<ProtectedRoute>
<ManageSemester/>
</ProtectedRoute>
}
/>

<Route
path="/manage-subject"
element={
<ProtectedRoute>
<ManageSubject/>
</ProtectedRoute>
}
/>

<Route
path="/manage-pyq"
element={
<ProtectedRoute>
<ManagePyq/>
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