import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Item } from "../../components/item/Item.jsx";
import { Nav } from "../../components/navigate/Nav.jsx";
import { Pagination } from "../../components/pagination/Pagination.jsx";
import './SelfItems.css';
import '../Items/Items.css'; /* reuse items-grid */

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

export function SelfItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const token = localStorage.getItem("token");
    const id = jwtDecode(token).userId;

    const getSelfItems = async (currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:8080/nostos/items/getbyuser?page=${currentPage}&size=10`,
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

    useEffect(() => { getSelfItems(page); }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="selfitems-page-container">
            <Nav />

            {/* Page Header */}
            <div className="selfitems-header">
                <div className="selfitems-header-icon"><i className="fas fa-box-open"></i></div>
                <div>
                    <h1 className="selfitems-title">My Posted Items</h1>
                    <p className="selfitems-subtitle">Items you have reported as lost or found</p>
                </div>
            </div>

            {loading ? (
                <div className="items-skeleton-grid">
                    {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : items.length === 0 ? (
                <div className="items-grid">
                    <div className="items-empty">
                        <div className="items-empty-icon">📭</div>
                        <p>You haven't posted any items yet.</p>
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