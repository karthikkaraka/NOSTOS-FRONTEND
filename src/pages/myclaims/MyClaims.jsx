import { Nav } from '../../components/navigate/Nav.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyClaim } from '../../components/myclaim/MyClaim.jsx';
import { Pagination } from '../../components/pagination/Pagination.jsx';
import axios from 'axios';
import './MyClaims.css';

function SkeletonClaim() {
    return (
        <div style={{ borderRadius: 20, overflow: 'hidden', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(13,148,136,0.08)' }}>
            <div style={{ height: 72, background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)', backgroundSize: '200% 100%', animation: 'skeleton-shimmer 1.5s ease-in-out infinite' }} />
            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[80, 60, 90].map((w, i) => (
                    <div key={i} style={{ height: 14, width: `${w}%`, borderRadius: 8, background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)', backgroundSize: '200% 100%', animation: 'skeleton-shimmer 1.5s ease-in-out infinite' }} />
                ))}
            </div>
        </div>
    );
}

export function MyClaims() {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        const getMyClaims = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/nostos/claims/getmyclaims?page=${page}&size=10`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const data = response.data;
                const fetchedClaims = data.content ?? data;
                setClaims(fetchedClaims);
                setHasNextPage(fetchedClaims.length === 10);
            } catch (error) {
                console.error('Error fetching my claims:', error);
            } finally {
                setLoading(false);
            }
        };
        getMyClaims();
    }, [page]);

    const handlePageChange = (newPage) => { setPage(newPage); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
        <div className="myclaims-page-container">
            <Nav />
            <div className="myclaims-header">
                <div className="myclaims-header-icon"><i className="fas fa-file-alt"></i></div>
                <div className="myclaims-header-text">
                    <h1 className="myclaims-title">My Claims</h1>
                    <p className="myclaims-subtitle">Claims you have submitted on items</p>
                </div>
            </div>

            {loading ? (
                <div className="myclaims-grid">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonClaim key={i} />)}
                </div>
            ) : claims.length === 0 ? (
                <div className="myclaims-empty">
                    <div className="myclaims-empty-icon">📋</div>
                    <p>You haven't submitted any claims yet.</p>
                </div>
            ) : (
                <>
                    <div className="myclaims-grid">
                        {claims.map(claim => (
                            <MyClaim
                                key={claim.claimId}
                                claimId={claim.claimId}
                                itemId={claim.itemId}
                                itemTitle={claim.itemTitle}
                                location={claim.location}
                                founderEmail={claim.founderEmail}
                                status={claim.status}
                                proofDescription={claim.proofDescription}
                                createdAt={claim.createdAt}
                            />
                        ))}
                    </div>
                    <Pagination page={page} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
                </>
            )}
        </div>
    );
}
