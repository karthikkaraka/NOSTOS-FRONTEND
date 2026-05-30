import { useLocation, useNavigate } from 'react-router-dom';
import { Nav } from '../../components/navigate/Nav.jsx';
import { Item } from '../../components/item/Item.jsx';
import './Suggestions.css';

export function Suggestions() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const suggestions = state?.suggestions ?? [];
    const lostItem = state?.lostItem ?? {};

    return (
        <div className="suggestions-page">
            <Nav />

            <div className="suggestions-hero">
                <div className="suggestions-hero-icon">🔍</div>
                <h1 className="suggestions-hero-title">Possible Matches Found</h1>
                <p className="suggestions-hero-subtitle">
                    Based on your <strong>{lostItem.category}</strong> item
                    {lostItem.location && <> in <strong>{lostItem.location}</strong></>},
                    here are FOUND items that might be yours. Click any card to view details or submit a claim.
                </p>
            </div>

            <div className="suggestions-container">
                {suggestions.length === 0 ? (
                    <div className="suggestions-empty">
                        <div className="suggestions-empty-icon">📭</div>
                        <h2>No Matches Yet</h2>
                        <p>
                            No matching FOUND items were found for <strong>"{lostItem.title || lostItem.category}"</strong>
                            {lostItem.location && <> in <strong>{lostItem.location}</strong></>}.
                            <br />Keep checking back — new items are reported every day!
                        </p>
                        <div className="suggestions-actions">
                            <button
                                className="suggestions-btn primary"
                                onClick={() => navigate('/items')}
                            >
                                Browse All Items
                            </button>
                            <button
                                className="suggestions-btn secondary"
                                onClick={() => navigate('/selfitems')}
                            >
                                View My Reports
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="suggestions-count-bar">
                            <span className="suggestions-count-badge">
                                ✨ {suggestions.length} match{suggestions.length !== 1 ? 'es' : ''} found
                            </span>
                        </div>
                        <div className="suggestions-grid">
                            {suggestions.map(item => (
                                <Item
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    category={item.category}
                                    location={item.location}
                                    itemType={item.itemType}
                                    status={item.status}
                                    publicDescription={item.publicDescription}
                                    postedByUsername={item.postedByUsername}
                                    postedAt={item.postedAt}
                                />
                            ))}
                        </div>
                        <div className="suggestions-actions centered">
                            <button
                                className="suggestions-btn secondary"
                                onClick={() => navigate('/items')}
                            >
                                Browse All Items
                            </button>
                            <button
                                className="suggestions-btn secondary"
                                onClick={() => navigate('/selfitems')}
                            >
                                View My Reports
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
