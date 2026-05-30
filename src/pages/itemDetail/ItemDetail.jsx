import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Nav } from '../../components/navigate/Nav.jsx';
import './itemDetail.css';

export function ItemDetail() {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const navigate = useNavigate();
    const [showclaim, setShowclaim] = useState(false);
    const [claimDesc, setClaimDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const handleclick = () => setShowclaim(true);

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!claimDesc.trim()) {
            alert('Please enter a description to verify ownership.');
            return;
        }
        setLoading(true);
        try {
            await axios.post(
                `http://localhost:8080/nostos/claims/claim/${id}`,
                { proofDescription: claimDesc },
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );
            navigate("/items");
        } catch (error) {
            console.error('Error submitting claim:', error);
            alert('Failed to submit claim. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }
        const getItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/nostos/items/get/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setItem(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setFetching(false);
            }
        };
        getItems();
    }, []);

    const isFound = item.itemType === 'FOUND';
    const statusClass = item.status ? item.status.toLowerCase() : '';
    const formattedDate = item.postedAt ? new Date(item.postedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

    return (
        <div className="item-detail-container">
            <Nav />
            <div className="item-detail-inner">
                {/* Breadcrumb */}
                <nav className="item-detail-breadcrumb" aria-label="Breadcrumb">
                    <Link to="/items">Browse Items</Link>
                    <i className="fas fa-chevron-right"></i>
                    <span>{item.title || 'Item Detail'}</span>
                </nav>

                {fetching ? (
                    <div className="item-detail-card">
                        <div style={{ padding: '3rem', display: 'flex', justifyContent: 'center', color: '#94A3B8' }}>
                            <span className="btn-spinner" style={{ borderTopColor: '#4338CA', borderColor: 'rgba(67,56,202,0.2)', width: '2rem', height: '2rem' }}></span>
                        </div>
                    </div>
                ) : (
                    <div className="item-detail-card">
                        {/* Hero header */}
                        <div className={`item-detail-hero ${isFound ? 'found-type' : ''}`}>
                            <h1 className="item-detail-title">{item.title}</h1>
                            <span className="item-detail-type-badge">
                                {isFound ? '📍 Found' : '🔍 Lost'}
                            </span>
                        </div>

                        {/* Body */}
                        <div className="item-detail-body">
                            <div className="item-detail-info">
                                <div className="info-group">
                                    <span className="info-label">Category</span>
                                    <span className="info-value">{item.category || '—'}</span>
                                </div>
                                <div className="info-group">
                                    <span className="info-label">Location</span>
                                    <span className="info-value">{item.location || '—'}</span>
                                </div>
                                <div className="info-group">
                                    <span className="info-label">Status</span>
                                    <span className={`status-badge ${statusClass}`}>{item.status}</span>
                                </div>
                                <div className="info-group">
                                    <span className="info-label">Posted By</span>
                                    <span className="info-value">{item.postedByUsername || '—'}</span>
                                </div>
                                <div className="info-group">
                                    <span className="info-label">Date Posted</span>
                                    <span className="info-value">{formattedDate || '—'}</span>
                                </div>
                                <div className="info-group full-width">
                                    <span className="info-label">Description</span>
                                    <p className="info-value description">{item.publicDescription || 'No description provided.'}</p>
                                </div>
                            </div>

                            <div className="detail-divider" />

                            {/* Claim action */}
                            {!showclaim && (
                                <button className="claim-button" onClick={handleclick}>
                                    <i className="fas fa-hand-paper"></i>
                                    Claim This Item
                                </button>
                            )}

                            {showclaim && (
                                <div className="claim-section">
                                    <span className="claim-section-label">Verify Ownership</span>
                                    <input
                                        type="text"
                                        className="claim-input"
                                        placeholder="Enter private details only the true owner would know…"
                                        value={claimDesc}
                                        onChange={e => setClaimDesc(e.target.value)}
                                    />
                                    <div className="claim-actions">
                                        <button className="claim-submit-btn" onClick={handleSubmit} disabled={loading}>
                                            {loading ? <span className="claim-spinner" /> : 'Submit Claim'}
                                        </button>
                                        <button className="claim-cancel-btn" onClick={() => { setShowclaim(false); setClaimDesc(''); }}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}