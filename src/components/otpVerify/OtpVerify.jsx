import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OtpVerify.css";
import "../../pages/login/Login.css"; /* shared form-input, form-label tokens */

export function OtpVerify(props) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handelSubmitOtp(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.post("http://localhost:8080/nostos/otpverify", { otp, email: props.email });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="otp-container">
            <div className="otp-card">
                <div className="otp-icon">📬</div>
                <h1 className="otp-title">Check Your Email</h1>
                <p className="otp-subtitle">
                    We sent a one-time password to{' '}
                    <span className="otp-email-highlight">{props.email}</span>.
                    Enter it below to verify your account.
                </p>

                {error && (
                    <div className="auth-error" style={{ marginBottom: '1.25rem' }}>
                        <i className="fas fa-exclamation-circle"></i>
                        {error}
                    </div>
                )}

                <form className="otp-form" onSubmit={handelSubmitOtp}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="otp-input">One-Time Password</label>
                        <input
                            id="otp-input"
                            className="form-input"
                            type="text"
                            value={otp}
                            placeholder="Enter 6-digit OTP"
                            onChange={e => setOtp(e.target.value)}
                            required
                            autoComplete="one-time-code"
                            inputMode="numeric"
                            maxLength={8}
                        />
                    </div>
                    <button className="otp-button" type="submit" disabled={loading}>
                        {loading && <span className="btn-spinner"></span>}
                        {loading ? 'Verifying…' : 'Verify Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}