import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import API from '../api';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
                .required("Password is required")
        }),
        // onSubmit: async (values, { setSubmitting }) => {
        //     try {
        //         const response = await API.post("/auth/login", values);
        //         console.log("Login response : ",response);
        //         //Save token and user info to local storage
        //         localStorage.setItem('token', response.data.token);
        //         localStorage.setItem('name', response.data.user.name);
        //         toast.success(response.data.message || "Login successfull!");
        //         navigate("/blogs");
        //     } catch (error) {
        //         console.log("Login error : ",error);
        //         const errMsg = error.response?.data?.message || error.response?.data?.error || "Login failed"
        //         toast.error(errMsg);
        //     } finally {
        //         setSubmitting(false);
        //     }
        // },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await API.post("/auth/login", values);
                console.log("Login Api response : ",response);
                const {token,userDetails} = response.data;
                // Ensure token and user info exist in response
                if (response.status === 200 && token && userDetails) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("name", userDetails.name);

                    toast.success("Login successful!");
                    navigate("/blogs");
                } else {
                    // Backend responded but no token/user info — unexpected case
                    toast.error("Login failed: Invalid response from server.");
                }
            } catch (error) {
                // This only runs if the API throws an error
                const errorMessage =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Login failed";
                toast.error(errorMessage);
            } finally {
                setSubmitting(false);
            }
        }

    });
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-5 col-sm-8">
                <h2 className="mb-4">Login</h2>
                <form onSubmit={formik.handleSubmit} noValidate>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
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
                                className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="At least enter 6 characters"
                            />
                            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    {/* <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="At least enter 6 characters"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        ) : null}
                    </div> */}

                    <button type="submit" disabled={formik.isSubmitting} className="btn btn-primary w-100">
                        {formik.isSubmitting ? 'Login in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/signup">Signup here</Link>
                </p>
            </div>
        </div>
    )
}
