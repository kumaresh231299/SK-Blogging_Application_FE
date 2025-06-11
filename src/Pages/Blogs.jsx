import React, { useContext, useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import { FaUser, FaTag, FaCalendarAlt, FaChevronRight } from "react-icons/fa";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("");
  const userName = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const {darkMode,setDarkMode}= useContext(DarkModeContext);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      let url = "/blogs/get-all-blogs";
      const queryParams = [];
      if (filter === "my" && userName) queryParams.push(`author=${userName}`);
      if (category) queryParams.push(`category=${category}`);
      if (queryParams.length > 0) url += `?${queryParams.join("&")}`;
      const response = await API.get(url);
      setBlogs(response.data.blogs || response.data || []);
    } catch (error) {
      console.log("Fetch blog error:", error.response || error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filter, category]);

  if (loading) return <Loader />;

  // Styles
  const pageStyle = {
    backgroundColor: darkMode ? "#121212" : "#f7f9fc",
    color: darkMode ? "#e0e0e0" : "#333",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: "all 0.4s ease",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "30px",
    position: "relative",
    display: "inline-block",
  };

  const headingUnderline = {
    content: "''",
    position: "absolute",
    left: "50%",
    bottom: "-8px",
    width: "60%",
    height: "4px",
    background: "linear-gradient(90deg, #007bff, #00c6ff)",
    transform: "translateX(-50%)",
    borderRadius: "2px",
  };

  const filterBar = {
    backgroundColor: darkMode ? "#1f1f1f" : "#fff",
    padding: "15px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "30px",
    border: darkMode ? "1px solid #333" : "1px solid #ddd",
  };

  const filterButton = (active) => ({
    padding: "10px 22px",
    borderRadius: "25px",
    border: "none",
    fontWeight: "bold",
    background: active
      ? "linear-gradient(45deg, #007bff, #00c6ff)"
      : darkMode
        ? "#333"
        : "#f0f0f0",
    color: active ? "#fff" : darkMode ? "#e0e0e0" : "#333",
    cursor: "pointer",
    transition: "background 0.3s ease",
  });

  const selectStyle = {
    padding: "10px 20px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    background: darkMode ? "#333" : "#fff",
    color: darkMode ? "#e0e0e0" : "#333",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const dividerStyle = {
    width: "100%",
    height: "2px",
    background: darkMode ? "#333" : "#ddd",
    margin: "25px 0",
  };

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  };

  const cardStyle = {
    background: darkMode
      ? "linear-gradient(135deg, #1e1e1e, #2a2a2a)"
      : "linear-gradient(135deg, #ffffff, #f9f9f9)",
    color: darkMode ? "#e0e0e0" : "#333",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: darkMode
      ? "0 8px 20px rgba(0,0,0,0.4)"
      : "0 8px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
  };

  const cardHover = {
    transform: "translateY(-5px)",
    boxShadow: darkMode
      ? "0 12px 25px rgba(0,0,0,0.6)"
      : "0 12px 25px rgba(0,0,0,0.2)",
  };

  const titleStyle = {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "10px",
  };

  const linkStyle = {
    color: darkMode ? "#66b2ff" : "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    marginTop: "12px",
  };

  const blogNotFoundStyle = {
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "800",
    marginBottom: "30px",
    background: "linear-gradient(90deg, #007bff, #00c6ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <div style={pageStyle}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={headingStyle}>
          Explore Our Latest Blogs
          <span style={headingUnderline}></span>
        </h2>
      </div>

      <div style={filterBar}>
        <button
          onClick={() => setFilter("all")}
          style={filterButton(filter === "all")}
        >
          All Blogs
        </button>
        <button
          onClick={() => setFilter("my")}
          style={filterButton(filter === "my")}
          disabled={!token}
        >
          My Blogs
        </button>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
      </div>

      <div style={dividerStyle}></div>

      {blogs.length === 0 ? (
        <p style={blogNotFoundStyle}>No blogs found...</p>
      ) : (
        <div style={gridContainer}>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              style={cardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, cardHover)
              }
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  darkMode
                    ? "0 8px 20px rgba(0,0,0,0.4)"
                    : "0 8px 20px rgba(0,0,0,0.1)";
              }}
            >
              <h3 style={titleStyle}>{blog.title}</h3>
              {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            border:"3px #007bff solid",
                            borderRadius:"5px"
                        }}
                    />
                )}
              <p style={{ marginBottom: "6px" }}>
                <FaUser /> <strong>Author:</strong> {blog.author}
              </p>
              <p style={{ marginBottom: "6px" }}>
                <FaTag /> <strong>Category:</strong> {blog.category}
              </p>
              <p style={{ marginBottom: "6px" }}>
                <FaCalendarAlt />{" "}
                <strong>Date:</strong>{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              {/* <p style={{ marginTop: "12px" }}>
                {blog.content.length > 120
                  ? blog.content.slice(0, 120) + "..."
                  : blog.content}
              </p> */}
              <div
                style={{
                  borderLeft: `4px solid ${darkMode ? '#444' : '#007bff'}`,
                  paddingLeft: '12px',
                  marginTop: '12px',
                  color: darkMode ? '#e0e0e0' : '#333',
                }}
              >
                {blog.content
                  ? blog.content.length > 120
                    ? blog.content.slice(0, 120) + "..."
                    : blog.content
                  : (
                    <em style={{ color: darkMode ? "#888" : "#aaa" }}>
                      No content available.
                    </em>
                  )}
              </div>

              <Link to={`/blogs/${blog._id}`} style={linkStyle}>
                Read More <FaChevronRight style={{ marginLeft: "5px" }} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
