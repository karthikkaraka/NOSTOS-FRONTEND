import { Nav } from '../../components/navigate/Nav.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Claim } from '../../components/claim/Claim.jsx';
import { Pagination } from '../../components/pagination/Pagination.jsx';
import axios from 'axios';
import './selfClaims.css';

function SkeletonClaim() {
    return (
        <div style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(99,102,241,0.08)' }}>
            <div style={{ height: 72, background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)', backgroundSize: '200% 100%', animation: 'skeleton-shimmer 1.5s ease-in-out infinite' }} />
            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[80, 60, 90].map((w, i) => (
                    <div key={i} style={{ height: 14, width: `${w}%`, borderRadius: 8, background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'skeleton-shimmer 1.5s ease-in-out infinite' }} />
                ))}
            </div>
        </div>
    );
}

export function SelfClaims() {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        const getReceivedClaims = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/nostos/claims/recievedclaims?page=${page}&size=10`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = response.data;
                const fetchedClaims = data.content ?? data;
                setClaims(fetchedClaims);
                setHasNextPage(fetchedClaims.length === 10);
            } catch (error) {
                console.error('Error fetching claims:', error);
            } finally {
                setLoading(false);
            }
        };
        getReceivedClaims();
    }, [page]);

    const handleAccept = (id) => setClaims(prev => prev.map(c => c.claimId === id ? { ...c, status: 'IN_CONTACT' } : c));
    const handleReject = (id) => setClaims(prev => prev.map(c => c.claimId === id ? { ...c, status: 'REJECTED' } : c));
    const handlePageChange = (newPage) => { setPage(newPage); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
        <div className="selfclaims-page-container">
            <Nav />
            <div className="selfclaims-header">
                <div className="selfclaims-header-icon"><i className="fas fa-inbox"></i></div>
                <div className="selfclaims-header-text">
                    <h1 className="selfclaims-title">Received Claims</h1>
                    <p className="selfclaims-subtitle">Claims submitted on your posted items</p>
                </div>
            </div>

            {loading ? (
                <div className="selfclaims-grid">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonClaim key={i} />)}
                </div>
            ) : claims.length === 0 ? (
                <div className="selfclaims-empty">
                    <div className="selfclaims-empty-icon">📭</div>
                    <p>No claims received yet.</p>
                </div>
            ) : (
                <>
                    <div className="selfclaims-grid">
                        {claims.map(claim => (
                            <Claim
                                key={claim.claimId}
                                claimId={claim.claimId}
                                itemTitle={claim.itemTitle}
                                claimantName={claim.claimantName}
                                claimantEmail={claim.claimantEmail}
                                status={claim.status}
                                proofDescription={claim.proofDescription}
                                createdAt={claim.createdAt}
                                onAccept={handleAccept}
                                onReject={handleReject}
                            />
                        ))}
                    </div>
                    <Pagination page={page} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
                </>
            )}
        </div>
    );
}