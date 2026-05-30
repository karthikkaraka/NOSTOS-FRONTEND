import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { jwtDecode } from "jwt-decode";

export function Login() {
    const [user, setUser] = useState({ userName: "", password: "" });
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handelChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (errorMsg) setErrorMsg("");
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/nostos/login", user);
            localStorage.setItem("token", response.data);
            const decodedToken = jwtDecode(response.data);
            const role = decodedToken.role;
            if (role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/items");
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* ── LEFT PANEL ── */}
            <div className="login-left">
                <div className="login-brand">
                    <div className="login-brand-logo">Nos<span>tos</span></div>
                    <p className="login-brand-tagline">
                        Reuniting people with their lost belongings — one verified claim at a time.
                    </p>
                    <div className="login-brand-features">
                        <div className="login-feature-item">
                            <div className="login-feature-icon">🔒</div>
                            University email verification
                        </div>
                        <div className="login-feature-item">
                            <div className="login-feature-icon">✅</div>
                            Claim proof validation
                        </div>
                        <div className="login-feature-item">
                            <div className="login-feature-icon">⚡</div>
                            Fast & secure reconnects
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="login-right">
                <div className="login-card">
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">Sign in to your Nostos account to continue.</p>

                    {errorMsg && (
                        <div className="auth-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {errorMsg}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handelSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="login-username">Username</label>
                            <input
                                id="login-username"
                                className="form-input"
                                type="text"
                                name="userName"
                                value={user.userName}
                                onChange={handelChange}
                                placeholder="Enter your username"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="login-password">Password</label>
                            <div className="input-with-toggle">
                                <input
                                    id="login-password"
                                    className="form-input"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={user.password}
                                    onChange={handelChange}
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="current-password"
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

                        <button className="login-button" type="submit" disabled={loading}>
                            {loading && <span className="btn-spinner"></span>}
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>

                        <p className="login-link-text">
                            Don't have an account?{' '}
                            <Link to="/register" className="login-link">Create one →</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}