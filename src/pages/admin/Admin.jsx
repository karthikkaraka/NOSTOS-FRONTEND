import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export function Admin() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [claims, setClaims] = useState([]);
    const [dashboard, setDashboard] = useState({});
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const fetchDashboard = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8080/nostos/admin/dashboard", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Dashboard response:', response.data);
            setDashboard(response.data || {});
        } catch (error) {
            console.error("Error fetching dashboard:", error);
            setDashboard({});
        }
    }, [token]);

    useEffect(() => {
        if (role !== "ADMIN") {
            // Redirect or handle unauthorized
            return;
        }
        fetchDashboard();
    }, [role, fetchDashboard]);

    const fetchUsers = async (pageNum = 0) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/nostos/admin/users?page=${pageNum}&size=${size}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Users response:', response.data);
            const data = response.data.content || response.data;
            setUsers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchItems = async (pageNum = 0) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/nostos/admin/items?page=${pageNum}&size=${size}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Items response:', response.data);
            const data = response.data.content || response.data;
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching items:", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchClaims = async (pageNum = 0) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/nostos/admin/claims?page=${pageNum}&size=${size}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Claims response:', response.data);
            const data = response.data.content || response.data;
            setClaims(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching claims:", error);
            setClaims([]);
        } finally {
            setLoading(false);
        }
    };

    const blockUser = async (id) => {
        try {
            await axios.put(`http://localhost:8080/nostos/admin/users/${id}/block`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state immediately
            setUsers(users.map(user => 
                (user.id === id || user.userId === id) ? { ...user, blocked: true } : user
            ));
        } catch (error) {
            console.error("Error blocking user:", error);
        }
    };

    const unblockUser = async (id) => {
        try {
            await axios.put(`http://localhost:8080/nostos/admin/users/${id}/unblock`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Update local state immediately
            setUsers(users.map(user => 
                (user.id === id || user.userId === id) ? { ...user, blocked: false } : user
            ));
        } catch (error) {
            console.error("Error unblocking user:", error);
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.put(`http://localhost:8080/nostos/admin/items/${id}/remove`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchItems(page);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const restoreItem = async (id) => {
        try {
            await axios.put(`http://localhost:8080/nostos/admin/items/${id}/restore`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchItems(page);
        } catch (error) {
            console.error("Error restoring item:", error);
        }
    };

    const rejectClaim = async (id) => {
        try {
            await axios.put(`http://localhost:8080/nostos/admin/claims/${id}/reject`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchClaims(page);
        } catch (error) {
            console.error("Error rejecting claim:", error);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPage(0);
        if (tab === "users") fetchUsers();
        else if (tab === "items") fetchItems();
        else if (tab === "claims") fetchClaims();
    };

    const nextPage = () => {
        const newPage = page + 1;
        setPage(newPage);
        if (activeTab === "users") fetchUsers(newPage);
        else if (activeTab === "items") fetchItems(newPage);
        else if (activeTab === "claims") fetchClaims(newPage);
    };

    const prevPage = () => {
        if (page > 0) {
            const newPage = page - 1;
            setPage(newPage);
            if (activeTab === "users") fetchUsers(newPage);
            else if (activeTab === "items") fetchItems(newPage);
            else if (activeTab === "claims") fetchClaims(newPage);
        }
    };

    if (role !== "ADMIN") {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <div className="admin-brand">
                    <h1>NOSTOS</h1>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
            <div className="admin-main-content">
                <h1>Admin Dashboard</h1>
            <div className="admin-tabs">
                <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}><i className="fas fa-chart-line"></i> Dashboard</button>
                <button className={activeTab === "users" ? "active" : ""} onClick={() => handleTabChange("users")}><i className="fas fa-users"></i> User Management</button>
                <button className={activeTab === "items" ? "active" : ""} onClick={() => handleTabChange("items")}><i className="fas fa-box"></i> Item Management</button>
                <button className={activeTab === "claims" ? "active" : ""} onClick={() => handleTabChange("claims")}><i className="fas fa-clipboard-list"></i> Claim Management</button>
            </div>
            <div className="admin-content">
                {activeTab === "dashboard" && (
                    <div className="dashboard">
                        <h2>Monitoring Dashboard</h2>
                        <div className="dashboard-stats">
                            <div className="stat">
                                <h3>Total Users</h3>
                                <p>{dashboard.totalUsers || 0}</p>
                            </div>
                            <div className="stat">
                                <h3>Total Items</h3>
                                <p>{dashboard.totalItems || 0}</p>
                            </div>
                            <div className="stat">
                                <h3>Total Claims</h3>
                                <p>{dashboard.totalClaims || 0}</p>
                            </div>
                            <div className="stat">
                                <h3>Active Users</h3>
                                <p>{dashboard.activeUsers || 0}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === "users" && (
                    <div className="user-management">
                        <h2>User Management</h2>
                        {loading ? <div className="loading-container"><div className="loading"></div>Loading...</div> : (
                            <div>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user.id || user.userId || user.userName}>
                                                <td>{user.id || user.userId || 'N/A'}</td>
                                                <td>{user.userName || user.username || 'N/A'}</td>
                                                <td>{user.email || 'N/A'}</td>
                                                <td>{user.blocked ? "Blocked" : "Active"}</td>
                                                <td>
                                                    {user.blocked ? (
                                                        <button className="unblock-btn" onClick={() => unblockUser(user.id || user.userId)}><i className="fas fa-unlock"></i> Unblock</button>
                                                    ) : (
                                                        <button className="block-btn" onClick={() => blockUser(user.id || user.userId)}><i className="fas fa-ban"></i> Block</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination">
                                    <button onClick={prevPage} disabled={page === 0}>Previous</button>
                                    <span>Page {page + 1}</span>
                                    <button onClick={nextPage}>Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === "items" && (
                    <div className="item-management">
                        <h2>Item Management</h2>
                        {loading ? <div className="loading-container"><div className="loading"></div>Loading...</div> : (
                            <div>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => (
                                            <tr key={item.id || item.itemId}>
                                                <td>{item.id || item.itemId || 'N/A'}</td>
                                                <td>{item.title || 'N/A'}</td>
                                                <td>{item.description || item.publicDescription || 'N/A'}</td>
                                                <td>{item.removed || item.status === 'REMOVED' ? "Removed" : "Active"}</td>
                                                <td>
                                                    {item.removed || item.status === 'REMOVED' ? (
                                                        <button onClick={() => restoreItem(item.id || item.itemId)}><i className="fas fa-undo"></i> Restore</button>
                                                    ) : (
                                                        <button onClick={() => removeItem(item.id || item.itemId)}><i className="fas fa-trash"></i> Remove</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination">
                                    <button onClick={prevPage} disabled={page === 0}>Previous</button>
                                    <span>Page {page + 1}</span>
                                    <button onClick={nextPage}>Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === "claims" && (
                    <div className="claim-management">
                        <h2>Claim Management</h2>
                        {loading ? <div className="loading-container"><div className="loading"></div>Loading...</div> : (
                            <div>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Item Title</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {claims.map(claim => (
                                            <tr key={claim.id || claim.claimId}>
                                                <td>{claim.id || claim.claimId || 'N/A'}</td>
                                                <td>{claim.itemTitle || 'N/A'}</td>
                                                <td>{claim.status || 'N/A'}</td>
                                                <td>
                                                    <button onClick={() => rejectClaim(claim.id || claim.claimId)}><i className="fas fa-times"></i> Reject</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="pagination">
                                    <button onClick={prevPage} disabled={page === 0}>Previous</button>
                                    <span>Page {page + 1}</span>
                                    <button onClick={nextPage}>Next</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}