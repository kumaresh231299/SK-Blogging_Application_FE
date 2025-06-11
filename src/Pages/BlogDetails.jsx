import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { FaUser, FaCalendarAlt, FaEdit, FaTrash, FaArrowLeft, } from "react-icons/fa";
import { DarkModeContext } from "../contexts/DarkModeContext";

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name");
    const { darkMode, setDarkMode } = useContext(DarkModeContext);


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                const response = await API.get(`/blogs/${id}`);
                setBlog(response.data.blog || response.data);
            } catch (error) {
                toast.error("Failed to fetch blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const deleteBlog = async () => {
        if (!window.confirm("Are you sure you want to delete this Blog?")) return;
        try {
            await API.delete(`/blogs/${id}`);
            toast.success("Blog deleted");
            navigate("/blogs");
        } catch (error) {
            toast.error("Failed to delete blog");
        }
    };

    if (loading) return <Loader />;
    if (!blog) return <p>Blog not found.</p>;

    const isOwner = token && userName === blog.author;

    const cardStyle = {
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#f1f1f1" : "#333333",
        boxShadow: darkMode
            ? "0 4px 12px rgba(0,0,0,0.8)"
            : "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        maxWidth: "800px",
        margin: "auto",
        animation: "fadeIn 0.5s ease-in-out",
        transition: "all 0.3s ease",
    };

    const iconStyle = {
        verticalAlign: "middle",
        marginRight: "6px",
        color: darkMode ? "#f1f1f1" : "#333333",
    };

    const buttonStyle = {
        border: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background 0.3s, color 0.3s",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
    };

    const editBtnStyle = {
        ...buttonStyle,
        backgroundColor: darkMode ? "#ffc107" : "#ffecb3",
        color: darkMode ? "#1e1e1e" : "#333333",
    };

    const deleteBtnStyle = {
        ...buttonStyle,
        backgroundColor: darkMode ? "#dc3545" : "#f8d7da",
        color: darkMode ? "#ffffff" : "#721c24",
    };

    const backBtnStyle = {
        ...buttonStyle,
        backgroundColor: darkMode ? "#6c757d" : "#e2e3e5",
        color: darkMode ? "#ffffff" : "#333333",
    };

    // Inline hover styles using onMouseEnter/onMouseLeave
    const handleHover = (e, hoverColor) => {
        e.target.style.backgroundColor = hoverColor;
    };
    const handleLeave = (e, originalColor) => {
        e.target.style.backgroundColor = originalColor;
    };

    return (
        <div className="container mt-4">
            <div style={cardStyle}>
                {blog.image && (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                            width: "100%",
                            height: "350px",
                            objectFit: "cover",
                        }}
                    />
                )}
                <div style={{ borderTop: darkMode ? "1px solid #444" : "1px solid #ddd" }}></div>
                <div style={{ padding: "20px" }}>
                    <h2 className="mb-3" style={{ textAlign: "center", wordWrap: "break-word" }}>
                        {blog.title}
                    </h2>

                    <div
                        className="d-flex justify-content-between align-items-center mb-3 flex-wrap"
                        style={{ gap: "8px" }}
                    >
                        <div style={{ fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "16px" }}>
                            <span>
                                <FaUser style={iconStyle} />
                                {blog.author}
                            </span>
                            <span>
                                <FaCalendarAlt style={iconStyle} />
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {isOwner && (
                            <div className="d-flex gap-2 mt-2 mt-md-0">
                                <Link
                                    to={`/edit/${blog._id}`}
                                    style={editBtnStyle}
                                    onMouseEnter={(e) =>
                                        handleHover(e, darkMode ? "#e0a800" : "#ffe082")
                                    }
                                    onMouseLeave={(e) =>
                                        handleLeave(e, darkMode ? "#ffc107" : "#ffecb3")
                                    }
                                >
                                    <FaEdit style={iconStyle} />
                                    Edit
                                </Link>
                                <button
                                    onClick={deleteBlog}
                                    style={deleteBtnStyle}
                                    onMouseEnter={(e) =>
                                        handleHover(e, darkMode ? "#c82333" : "#f5c6cb")
                                    }
                                    onMouseLeave={(e) =>
                                        handleLeave(e, darkMode ? "#dc3545" : "#f8d7da")
                                    }
                                >
                                    <FaTrash style={iconStyle} />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* <p
                        style={{
                            lineHeight: "1.7",
                            whiteSpace: "pre-wrap",
                            fontSize: "1rem",
                        }}
                    >
                        {blog.content ? blog.content : "_No content available._"}
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
                            ? blog.content
                            : (
                                <em style={{ color: darkMode ? "#888" : "#aaa" }}>
                                    No content available.
                                </em>
                            )}
                    </div>

                    <div className="mt-4 text-center">
                        <Link
                            to="/blogs"
                            style={backBtnStyle}
                            onMouseEnter={(e) =>
                                handleHover(e, darkMode ? "#5a6268" : "#d6d8db")
                            }
                            onMouseLeave={(e) =>
                                handleLeave(e, darkMode ? "#6c757d" : "#e2e3e5")
                            }
                        >
                            <FaArrowLeft style={iconStyle} />
                            Back to Blogs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
