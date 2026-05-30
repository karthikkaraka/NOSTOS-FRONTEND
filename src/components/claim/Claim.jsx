import { useState } from 'react';
import axios from 'axios';
import './Claim.css';

const STATUS_META = {
    PENDING:    { bg: 'rgba(245,158,11,0.15)',  color: '#B45309', border: 'rgba(245,158,11,0.4)' },
    IN_CONTACT: { bg: 'rgba(99,102,241,0.15)',  color: '#4338CA', border: 'rgba(99,102,241,0.4)' },
    APPROVED:   { bg: 'rgba(13,148,136,0.15)',  color: '#0D9488', border: 'rgba(13,148,136,0.4)' },
    REJECTED:   { bg: 'rgba(239,68,68,0.15)',   color: '#DC2626', border: 'rgba(239,68,68,0.4)'  },
};

export function Claim({ claimId, itemTitle, claimantName, claimantEmail, status, proofDescription, createdAt, onAccept, onReject }) {
    const formattedDate = createdAt ? new Date(createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Unknown';
    const statusMeta = STATUS_META[status] || STATUS_META.PENDING;
    const [acceptLoading, setAcceptLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    const handelAccept = async () => {
        const token = localStorage.getItem('token');
        setAcceptLoading(true);
        try {
            await axios.put(`http://localhost:8080/nostos/claims/${claimId}/accept`, {}, { headers: { Authorization: `Bearer ${token}` } });
            onAccept && onAccept(claimId);
        } catch (error) {
            console.error('Error accepting claim:', error);
        } finally {
            setAcceptLoading(false);
        }
    };

    const handelReject = async () => {
        const token = localStorage.getItem('token');
        setRejectLoading(true);
        try {
            await axios.put(`http://localhost:8080/nostos/claims/${claimId}/reject`, {}, { headers: { Authorization: `Bearer ${token}` } });
            onReject && onReject(claimId);
        } catch (error) {
            console.error('Error rejecting claim:', error);
        } finally {
            setRejectLoading(false);
        }
    };

    return (
        <div className="claim-card">
            {/* Gradient header */}
            <div className="claim-card-header">
                <h3 className="claim-item-title">{itemTitle}</h3>
                <span
                    className="claim-status-badge"
                    style={{ background: statusMeta.bg, color: statusMeta.color, border: `1px solid ${statusMeta.border}` }}
                >
                    {status}
                </span>
            </div>

            <div className="claim-body">
                <div className="claim-details-grid">
                    <div className="claim-detail-row">
                        <span className="claim-detail-label">👤 Claimant</span>
                        <span className="claim-detail-value">{claimantName}</span>
                    </div>
                    <div className="claim-detail-row">
                        <span className="claim-detail-label">🕐 Submitted</span>
                        <span className="claim-detail-value">{formattedDate}</span>
                    </div>
                </div>

                {status === 'IN_CONTACT' && claimantEmail && (
                    <div className="claim-detail-row claim-contact-row">
                        <span className="claim-detail-label">📧 Email</span>
                        <a className="claim-detail-value claim-email-link" href={`mailto:${claimantEmail}`}>
                            {claimantEmail}
                        </a>
                    </div>
                )}

                {proofDescription && (
                    <div className="claim-proof-section">
                        <span className="claim-proof-label">Proof Description</span>
                        <p className="claim-proof-text">{proofDescription}</p>
                    </div>
                )}

                {status === 'PENDING' && (
                    <div className="claim-actions">
                        <button className="claim-btn claim-btn-accept" onClick={handelAccept} disabled={acceptLoading || rejectLoading}>
                            {acceptLoading ? <span className="claim-btn-spinner" /> : '✓ Accept'}
                        </button>
                        <button className="claim-btn claim-btn-reject" onClick={handelReject} disabled={acceptLoading || rejectLoading}>
                            {rejectLoading ? <span className="claim-btn-spinner" style={{ borderTopColor: '#DC2626', borderColor: 'rgba(220,38,38,0.3)' }} /> : '✕ Reject'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
