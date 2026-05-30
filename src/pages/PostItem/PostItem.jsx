import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Nav } from '../../components/navigate/Nav.jsx';
import './PostItem.css';
import '../login/Login.css'; /* shared form tokens */

export function PostItem() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlType = searchParams.get('type') ?? ''; // 'FOUND' | 'LOST' | ''

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        title: "",
        category: "",
        location: "",
        lostDate: "",
        publicDescription: "",
        privateDescription: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }
        if (!urlType) { alert("Please use the navbar buttons to select Lost or Found."); return; }

        setLoading(true);
        try {
            if (urlType === 'LOST') {
                const token = localStorage.getItem("token");
                const params = new URLSearchParams({
                    title: data.title.trim(),
                    category: data.category.trim(),
                    location: data.location.trim(),
                    lostDate: data.lostDate,
                });
                const res = await axios.get(
                    `http://localhost:8080/nostos/items/automatch/suggestions?${params.toString()}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                navigate('/suggestions', { state: { suggestions: res.data, lostItem: data } });
            } else {
                await axios.post('http://localhost:8080/nostos/items/found', {
                    title: data.title,
                    category: data.category,
                    location: data.location,
                    publicDescription: data.publicDescription,
                    privateDescription: data.privateDescription,
                }, { headers: { Authorization: `Bearer ${token}` } });
                navigate('/items');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="postitem-page">
            <Nav />
            <div className="postitem-container">
                <div className="postitem-card">
                    <div className="postitem-header">
                        <div className={`postitem-type-badge ${urlType === 'LOST' ? 'badge-lost' : 'badge-found'}`}>
                            {urlType === 'LOST' ? '🔍 Lost Item Search' : '📍 Post Found Item'}
                        </div>
                        <h1 className="postitem-title">
                            {urlType === 'LOST' ? 'Find Your Lost Item' : 'Report a Found Item'}
                        </h1>
                        <p className="postitem-subtitle">
                            {urlType === 'LOST'
                                ? 'Fill in the details below and we\'ll search for matching found items.'
                                : 'Help someone recover their item by reporting what you found.'}
                        </p>
                    </div>
                    <form className="postitem-form" onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="form-group full-width">
                            <label className="form-label" htmlFor="pi-title">Title *</label>
                            <input
                                id="pi-title"
                                className="form-input"
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                                placeholder="e.g. Black Nike Backpack"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="pi-category">Category *</label>
                            <input
                                id="pi-category"
                                className="form-input"
                                type="text"
                                name="category"
                                value={data.category}
                                onChange={handleChange}
                                placeholder="e.g. Electronics, Keys"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="pi-location">Location *</label>
                            <input
                                id="pi-location"
                                className="form-input"
                                type="text"
                                name="location"
                                value={data.location}
                                onChange={handleChange}
                                placeholder="Where was it lost/found?"
                                required
                            />
                        </div>

                        {/* Lost Date — only for LOST flow */}
                        {urlType === 'LOST' && (
                            <div className="form-group">
                                <label className="form-label" htmlFor="pi-lost-date">Date Lost *</label>
                                <input
                                    id="pi-lost-date"
                                    className="form-input"
                                    type="date"
                                    name="lostDate"
                                    value={data.lostDate}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        )}

                        {/* Descriptions — only for FOUND items */}
                        {urlType === 'FOUND' && (
                          <>
                        {/* Public Description */}
                        <div className="form-group full-width">
                            <label className="form-label" htmlFor="pi-pub-desc">Public Description *</label>
                            <textarea
                                id="pi-pub-desc"
                                className="form-textarea"
                                name="publicDescription"
                                value={data.publicDescription}
                                onChange={handleChange}
                                placeholder="Describe the item — this will be visible to everyone."
                                required
                            />
                        </div>

                        {/* Private Description */}
                        <div className="form-group full-width">
                            <label className="form-label" htmlFor="pi-priv-desc">
                                Private Description
                                <span style={{ fontWeight: 400, color: '#94A3B8', marginLeft: '0.4rem' }}>(optional — only visible during claim verification)</span>
                            </label>
                            <textarea
                                id="pi-priv-desc"
                                className="form-textarea"
                                name="privateDescription"
                                value={data.privateDescription}
                                onChange={handleChange}
                                placeholder="Secret details only the true owner would know…"
                            />
                        </div>
                          </>
                        )}

                        <button
                            className={`postitem-button ${urlType === 'LOST' ? 'btn-lost' : 'btn-found'}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading && <span className="btn-spinner"></span>}
                            {loading
                                ? (urlType === 'LOST' ? 'Searching…' : 'Posting…')
                                : (urlType === 'LOST' ? '🔍 Find Matches' : '📍 Submit Found Item')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}