import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { Profile } from '../profile/Profile.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export function Nav() {
    const handleLogout = () => {
        localStorage.removeItem("token");
    };

    const { theme, toggleTheme } = useTheme();

    const token = localStorage.getItem("token");
    let id = null;
    if (token) {
        try { id = jwtDecode(token).userId; }
        catch { console.error("Invalid token format"); }
    }

    const [user, setUser] = useState(null);
    const [isopenprofile, setIsopenprofile] = useState(false);
    const [searchType, setSearchType] = useState('name');
    const [searchTypeOpen, setSearchTypeOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        try {
            let url = '';
            if (searchType === 'category')
                url = `http://localhost:8080/nostos/items/filteritems/bycategory?category=${encodeURIComponent(searchQuery)}`;
            else if (searchType === 'location')
                url = `http://localhost:8080/nostos/items/filteritems/bylocation?location=${encodeURIComponent(searchQuery)}`;
            else
                url = `http://localhost:8080/nostos/items/filteritems/byname?name=${encodeURIComponent(searchQuery)}`;

            const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
            navigate('/items', { state: { searchResults: response.data } });
        } catch (error) {
            console.error("Error searching items:", error);
        }
    };

    useEffect(() => {
        const getuser = async () => {
            if (!id || !token) return;
            try {
                const response = await axios.get(`http://localhost:8080/nostos/getuser/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (id) getuser();
    }, [id, token]);

    const handelprofile = () => setIsopenprofile(!isopenprofile);

    return (
        <nav className="navbar">
            {/* Brand */}
            <div className="navbar-brand">
                <button className="profile-btn" onClick={handelprofile} aria-label="Profile">
                    <i className="fas fa-user-circle"></i>
                </button>
                {isopenprofile && <Profile userdata={user} onClose={handelprofile} />}
                <Link to="/" className="navbar-logo">Nostos</Link>
            </div>

            {/* Search bar */}
            {location.pathname !== '/selfitems' && (
                <form className="navbar-search" onSubmit={handleSearch}>
                    <div className="search-toggle" role="group" aria-label="Search type">
                        <button
                            type="button"
                            className="search-type-button"
                            aria-haspopup="listbox"
                            aria-expanded={searchTypeOpen}
                            onClick={() => setSearchTypeOpen(prev => !prev)}
                        >
                            <span>{searchType.charAt(0).toUpperCase() + searchType.slice(1)}</span>
                            <i className={`fas fa-chevron-${searchTypeOpen ? 'up' : 'down'}`} aria-hidden="true" style={{ fontSize: '0.7rem' }}></i>
                        </button>
                        {searchTypeOpen && (
                            <div className="search-toggle-menu" role="listbox">
                                {['name', 'category', 'location']
                                    .filter(type => type !== searchType)
                                    .map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            className="search-type-option"
                                            onClick={() => { setSearchType(type); setSearchTypeOpen(false); }}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        className="search-input"
                        placeholder={`Search by ${searchType}…`}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-btn" aria-label="Search">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
            )}

            {/* Nav links */}
            <div className="navbar-links">
                <Link to="/" className="nav-link" title="Home">
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </Link>
                <Link to="/items" className="nav-link" title="Browse Items">
                    <i className="fas fa-th-large"></i>
                    <span>Browse</span>
                </Link>
                <Link to="/postitem?type=FOUND" className="nav-link nav-link-found" title="Post Found Item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Post Found</span>
                </Link>
                <Link to="/postitem?type=LOST" className="nav-link nav-link-lost" title="I Lost Something">
                    <i className="fas fa-search"></i>
                    <span>Lost Item</span>
                </Link>

                {/* Theme toggle */}
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
                </button>

                <Link to="/login" onClick={handleLogout} className="nav-link logout-btn" title="Logout">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </Link>
            </div>
        </nav>
    );
}