import { Nav } from '../../components/navigate/Nav.jsx';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Item } from '../../components/item/Item.jsx';
import { Pagination } from '../../components/pagination/Pagination.jsx';
import axios from 'axios';
import './Items.css';

// Skeleton card placeholder
function SkeletonCard() {
    return (
        <div className="item-card-skeleton">
            <div className="skel-line skel-title" />
            <div className="skel-line skel-sub" />
            <div className="skel-line skel-body" />
            <div className="skel-line skel-body2" />
            <div className="skel-line skel-footer" />
        </div>
    );
}

export function Items() {
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }

        if (location.state && location.state.searchResults) {
            setItems(location.state.searchResults);
            setHasNextPage(false);
            setLoading(false);
            return;
        }

        const getActiveItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/nostos/items/list?status=ACTIVE&page=${page}&size=10`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const fetchedItems = response.data.content ?? response.data;
                setItems(fetchedItems);
                setHasNextPage(fetchedItems.length === 10);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getActiveItems();
    }, [page, location.state]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isSearchResult = location.state && location.state.searchResults;

    return (
        <div className="items-page-container">
            <Nav />

            {/* Page Header */}
            <div className="items-page-header">
                <div>
                    <h1 className="items-page-title">
                        {isSearchResult ? 'Search Results' : 'Browse Items'}
                    </h1>
                    <p className="items-page-subtitle">
                        {isSearchResult
                            ? `Found ${items.length} matching item${items.length !== 1 ? 's' : ''}`
                            : 'Recently reported lost & found items'}
                    </p>
                </div>
                {!loading && items.length > 0 && (
                    <span className="items-count-badge">
                        <i className="fas fa-layer-group"></i>
                        {items.length} item{items.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* Content */}
            {loading ? (
                <div className="items-skeleton-grid">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : items.length === 0 ? (
                <div className="items-grid">
                    <div className="items-empty">
                        <div className="items-empty-icon">📭</div>
                        <p>No items found.</p>
                    </div>
                </div>
            ) : (
                <div className="items-grid">
                    {items.map(item => (
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
            )}

            <Pagination page={page} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
        </div>
    );
}