import { useNavigate } from 'react-router-dom';
import './Profile.css';

export function Profile({ userdata, onClose }) {
    const navigate = useNavigate();
    if (!userdata) return null;

    const handleMyItems = () => { navigate("/selfitems"); onClose(); };
    const handleMyClaims = () => { navigate("/selfclaims"); onClose(); };
    const handleMyOwnClaims = () => { navigate("/myclaims"); onClose(); };

    // Avatar initials
    const initials = userdata.userName
        ? userdata.userName.slice(0, 2).toUpperCase()
        : '??';

    return (
        <div className="profile-drawer-wrapper" onClick={onClose}>
            <div className="profile-drawer left-drawer" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="profile-header">
                    <h2>My Profile</h2>
                    <button className="close-profile-btn" onClick={onClose} aria-label="Close profile">×</button>
                </div>

                {/* Avatar */}
                <div className="profile-avatar-ring">
                    <div className="profile-avatar">{initials}</div>
                    <span className="profile-username">{userdata.userName}</span>
                    <span className="profile-email-tag">{userdata.email}</span>
                </div>

                {/* Fields */}
                <div className="profile-content">
                    <div className="profile-field">
                        <span className="field-label">Registration No.</span>
                        <span className="field-value">{userdata.regno || '—'}</span>
                    </div>
                    <div className="profile-field">
                        <span className="field-label">Account Status</span>
                        <span className={`status-badge ${userdata.accountStatus?.toLowerCase()}`}>
                            {userdata.accountStatus}
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <div className="profile-nav-section">
                    <button className="profile-nav-btn indigo" onClick={handleMyItems}>
                        <i className="fas fa-box"></i>
                        My Posted Items
                    </button>
                    <button className="profile-nav-btn teal" onClick={handleMyClaims}>
                        <i className="fas fa-inbox"></i>
                        Received Claims
                    </button>
                    <button className="profile-nav-btn amber" onClick={handleMyOwnClaims}>
                        <i className="fas fa-file-alt"></i>
                        My Submitted Claims
                    </button>
                </div>
            </div>
        </div>
    );
}
