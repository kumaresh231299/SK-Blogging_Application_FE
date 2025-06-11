import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiSongkick } from "react-icons/si";
import { FaSun, FaMoon, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { DarkModeContext } from "../contexts/DarkModeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Custom inline styles
  const navStyle = {
    background: darkMode
      ? "linear-gradient(90deg, #1a1a1a, #2c2c2c)"
      : "linear-gradient(90deg, #ffffff, #f0f0f0)",
    transition: "all 0.4s ease",
    borderBottom: darkMode ? "1px solid #444" : "1px solid #ddd",
  };

  const brandStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(90deg, #007bff, #00bfff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textDecoration: "none",
  };

  const buttonOutlined = {
    padding: "6px 12px",
    borderRadius: "20px",
    border: `2px solid ${darkMode ? "#66b2ff" : "#007bff"}`,
    fontWeight: "600",
    cursor: "pointer",
    background: "transparent",
    color: darkMode ? "#66b2ff" : "#007bff",
    transition: "all 0.3s ease",
  };

  const buttonFilled = {
    ...buttonOutlined,
    background: "linear-gradient(45deg, #007bff, #00bfff)",
    border: "none",
    color: "#fff",
  };

  const logoutButton = {
    background: "transparent",
    border: "none",
    color: darkMode ? "#ff4d4d" : "#cc0000",
    cursor: "pointer",
    fontSize: "1.1rem",
    marginLeft: "10px",
  };

  return (
    <nav
      className={`navbar navbar-expand-md ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      style={navStyle}
    >
      <div className="container">
        {/* Brand */}
        <Link to="/blogs" className="navbar-brand" style={brandStyle}>
          <SiSongkick size={28} /> Blogging App
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left-aligned Links */}
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {token && (
              <>
                <li className="nav-item">
                  <Link
                    to="/blogs"
                    className={`nav-link ${darkMode ? "text-light" : "text-dark"}`}
                  >
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/create"
                    className={`nav-link ${darkMode ? "text-light" : "text-dark"}`}
                  >
                    Create Blog
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right-aligned Actions */}
          <div className="d-flex align-items-center flex-wrap gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={handleDarkModeToggle}
              style={buttonOutlined}
              className="btn btn-sm"
            >
              {darkMode ? (
                <>
                  <FaMoon /> Dark Mode
                </>
              ) : (
                <>
                  <FaSun /> Light Mode
                </>
              )}
            </button>

            {token ? (
              <div className="d-flex align-items-center">
                <span
                  className={`d-flex align-items-center gap-1 fw-semibold ${
                    darkMode ? "text-light" : "text-dark"
                  }`}
                >
                  <FaUserCircle /> {name}
                </span>
                <button
                  onClick={logout}
                  style={logoutButton}
                  aria-label="Logout"
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm" style={buttonFilled}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm" style={buttonFilled}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
