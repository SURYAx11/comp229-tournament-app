import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path ? { fontWeight: "bold", textDecoration: "underline" } : {};

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#222",
        color: "#fff",
      }}
    >
      {/* Left: logo / site name */}
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>
          TournamentHub
        </Link>
      </div>

      {/* Right: links */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link style={{ color: "#fff", textDecoration: "none", ...isActive("/") }} to="/">
          Home
        </Link>

        {!user && (
          <>
            <Link
              style={{ color: "#fff", textDecoration: "none", ...isActive("/login") }}
              to="/login"
            >
              Sign In
            </Link>
            <Link
              style={{ color: "#fff", textDecoration: "none", ...isActive("/signup") }}
              to="/signup"
            >
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <>
            <Link
              style={{ color: "#fff", textDecoration: "none", ...isActive("/tournaments") }}
              to="/tournaments"
            >
              Tournaments
            </Link>

            <Link
              style={{ color: "#fff", textDecoration: "none", ...isActive("/profile") }}
              to="/profile"
            >
              My Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#fff",
                color: "#222",
                border: "none",
                borderRadius: "4px",
                padding: "0.25rem 0.75rem",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
