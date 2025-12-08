import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TournamentsList from "./pages/TournamentsList";
import TournamentForm from "./pages/TournamentForm";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "1rem" }}>
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route
            path="/tournaments"
            element={
              <PrivateRoute>
                <TournamentsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/tournaments/new"
            element={
              <PrivateRoute>
                <TournamentForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/tournaments/:id/edit"
            element={
              <PrivateRoute>
                <TournamentForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

        </Routes>
      </main>
    </>
  );
}

export default App;
