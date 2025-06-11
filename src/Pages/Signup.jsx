import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(3, "Minimum 3 characters"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Minium 6 characters"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await API.post("/auth/signup", values);
                toast.success("Signup successfull please login.");
                navigate("/login");
            } catch (error) {
                toast.error(error.response?.data?.error || "Signup failed");
            } finally {
                setSubmitting(false);
            }
        },
    });
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5 col-sm-8">
                <h2 className="mb-4">Signup</h2>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : "" }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            placeholder="Your name"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : "" }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="exampla@gmail.com"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="input-group">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : "" }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="At least enter 6 characters"
                        />
                        <button type="button" className="btn btn-outline-secondary" onClick={()=>setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary w-100">
                        {formik.isSubmitting ? 'Signing up...' : 'Signup'}
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}
