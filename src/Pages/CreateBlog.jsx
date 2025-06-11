import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function CreateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

const {darkMode,setDarkMode}= useContext(DarkModeContext);

  // Fetch blog data in edit mode
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const response = await API.get(`/blogs/${id}`);
          const blog = response.data.blog || response.data;
          setTitle(blog.title);
          setContent(blog.content);
          setCategory(blog.category);
          setImage(blog.image || "");
        } catch (error) {
          toast.error("Failed to load blog");
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      toast.error("Title, Content and Category are required");
      return;
    }

    try {
      setLoading(true);
      const payload = { title, content, category, image };

      if (id) {
        await API.put(`/blogs/${id}`, payload);
        toast.success("Blog updated successfully");
      } else {
        await API.post("/blogs/create-blog", payload);
        toast.success("Blog created successfully");
      }
      navigate("/blogs");
    } catch (error) {
      console.error("Create Blog Error:", error.response);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to save blog"
      );
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    backgroundColor: darkMode ? "#121212" : "#f7f9fc",
    color: darkMode ? "#e0e0e0" : "#333",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: "all 0.4s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formContainer = {
    background: darkMode
      ? "linear-gradient(135deg, #1e1e1e, #2a2a2a)"
      : "linear-gradient(135deg, #ffffff, #f9f9f9)",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: darkMode
      ? "0 8px 20px rgba(0,0,0,0.4)"
      : "0 8px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  };

  const inputStyle = {
    background: darkMode ? "#333" : "#fff",
    color: darkMode ? "#e0e0e0" : "#333",
    border: darkMode ? "1px solid #444" : "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px 15px",
    marginBottom: "20px",
    width: "100%",
    fontSize: "1rem",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "6px",
    display: "block",
  };

  const submitButton = {
    background: "linear-gradient(45deg, #007bff, #00c6ff)",
    border: "none",
    borderRadius: "25px",
    padding: "12px 24px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    width: "100%",
    transition: "background 0.3s ease",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "20px",
  };

  return (
    <div style={pageStyle}>
      <div style={formContainer}>
        <h2 style={headingStyle}>{id ? "Edit Blog" : "Create Blog"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" style={labelStyle}>
              Title
            </label>
            <input
              id="title"
              type="text"
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label htmlFor="category" style={labelStyle}>
              Category
            </label>
            <select
              id="category"
              style={inputStyle}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div>
            <label htmlFor="content" style={labelStyle}>
              Content
            </label>
            <textarea
              id="content"
              style={{ ...inputStyle, minHeight: "150px", resize: "vertical" }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <div>
            <label htmlFor="image" style={labelStyle}>
              Image URL (optional)
            </label>
            <input
              id="image"
              type="url"
              style={inputStyle}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button type="submit" style={submitButton} disabled={loading}>
            {loading
              ? id
                ? "Updating..."
                : "Creating..."
              : id
              ? "Update Blog"
              : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
