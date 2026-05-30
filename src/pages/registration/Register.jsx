import { useState } from "react";
import axios from "axios";
import "./registration.css";
import "../login/Login.css"; /* share form-input, form-label, auth-error tokens */
import { Link } from "react-router-dom";
import { OtpVerify } from "../../components/otpVerify/OtpVerify";

export function Register() {
    const [showOtp, setshowOtp] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        regno: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (errorMsg) setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:8080/nostos/register", user);
            setshowOtp(true);
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (showOtp) return <OtpVerify email={user.email} />;

    return (
        <div className="register-container">
            {/* ── LEFT PANEL ── */}
            <div className="register-left">
                <div className="register-brand">
                    <div className="register-brand-logo">Nos<span>tos</span></div>
                    <p className="register-brand-tagline">
                        Join thousands of students already using the university's safest lost &amp; found platform.
                    </p>
                    <div className="register-steps">
                        <div className="register-step-item">
                            <div className="register-step-num">1</div>
                            Create your account
                        </div>
                        <div className="register-step-item">
                            <div className="register-step-num">2</div>
                            Verify your university email
                        </div>
                        <div className="register-step-item">
                            <div className="register-step-num">3</div>
                            Start reporting &amp; claiming items
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="register-right">
                <div className="register-card">
                    <h1 className="register-title">Create Account</h1>
                    <p className="register-subtitle">Join Nostos — it's free and takes less than a minute.</p>

                    {errorMsg && (
                        <div className="auth-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {errorMsg}
                        </div>
                    )}

                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-username">Username</label>
                            <input
                                id="reg-username"
                                className="form-input"
                                type="text"
                                name="userName"
                                value={user.userName}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-email">University Email</label>
                            <input
                                id="reg-email"
                                className="form-input"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="your@university.edu"
                                required
                                autoComplete="email"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-password">Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="reg-password"
                                    className="form-input"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Create a strong password"
                                    required
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="input-toggle-btn"
                                    onClick={() => setShowPassword(p => !p)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="reg-regno">Registration Number</label>
                            <input
                                id="reg-regno"
                                className="form-input"
                                type="text"
                                name="regno"
                                value={user.regno}
                                onChange={handleChange}
                                placeholder="University registration number"
                                required
                            />
                        </div>

                        <button className="register-button" type="submit" disabled={loading}>
                            {loading && <span className="btn-spinner"></span>}
                            {loading ? 'Creating Account…' : 'Create Account'}
                        </button>

                        <p className="register-link-text">
                            Already have an account?{' '}
                            <Link to="/login" className="register-link">Sign in →</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
