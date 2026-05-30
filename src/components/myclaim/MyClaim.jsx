import './MyClaim.css';

const STATUS_META = {
    PENDING:    { bg: 'rgba(245,158,11,0.15)',  color: '#B45309', border: 'rgba(245,158,11,0.4)' },
    IN_CONTACT: { bg: 'rgba(99,102,241,0.15)',  color: '#4338CA', border: 'rgba(99,102,241,0.4)' },
    APPROVED:   { bg: 'rgba(13,148,136,0.15)',  color: '#0D9488', border: 'rgba(13,148,136,0.4)' },
    REJECTED:   { bg: 'rgba(239,68,68,0.15)',   color: '#DC2626', border: 'rgba(239,68,68,0.4)'  },
};

export function MyClaim({ claimId, itemId, itemTitle, location, founderEmail, status, proofDescription, createdAt }) {
    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        : 'Unknown';
    const statusMeta = STATUS_META[status] || STATUS_META.PENDING;

    return (
        <div className="myclaim-card">
            {/* Teal gradient header */}
            <div className="myclaim-card-header">
                <h3 className="myclaim-item-title">{itemTitle}</h3>
                <span
                    className="myclaim-status-badge"
                    style={{ background: statusMeta.bg, color: statusMeta.color, border: `1px solid ${statusMeta.border}` }}
                >
                    {status}
                </span>
            </div>

            <div className="myclaim-body">
                <div className="myclaim-details-grid">
                    {location && (
                        <div className="myclaim-detail-row">
                            <span className="myclaim-detail-label">📍 Location</span>
                            <span className="myclaim-detail-value">{location}</span>
                        </div>
                    )}
                    <div className="myclaim-detail-row">
                        <span className="myclaim-detail-label">🕐 Submitted</span>
                        <span className="myclaim-detail-value">{formattedDate}</span>
                    </div>

                    {status === 'IN_CONTACT' && founderEmail && (
                        <div className="myclaim-detail-row myclaim-contact-row">
                            <span className="myclaim-detail-label">📧 Founder</span>
                            <a className="myclaim-detail-value myclaim-email-link" href={`mailto:${founderEmail}`}>
                                {founderEmail}
                            </a>
                        </div>
                    )}
                </div>

                {proofDescription && (
                    <div className="myclaim-proof-section">
                        <span className="myclaim-proof-label">Your Proof</span>
                        <p className="myclaim-proof-text">{proofDescription}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
