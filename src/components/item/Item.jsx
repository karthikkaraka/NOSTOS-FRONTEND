import './Item.css';
import { useNavigate } from 'react-router-dom';

export function Item({ id, title, category, location, itemType, status, publicDescription, postedByUsername, postedAt }) {
  const formattedDate = postedAt ? new Date(postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown date';
  const navigate = useNavigate();

  const handleClick = () => navigate(`/itemdetail/${id}`);

  // Avatar initials from username
  const initials = postedByUsername
    ? postedByUsername.slice(0, 2).toUpperCase()
    : '??';

  const typeClass = itemType === 'FOUND' ? 'found' : 'lost';

  return (
    <div className="item-card" onClick={handleClick} data-type={itemType} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}>

      {/* Header */}
      <div className="item-card-header">
        <h3 className="item-card-title">{title}</h3>
        <span className={`item-type-badge ${typeClass}`}>
          {itemType === 'FOUND' ? ' Found' : ' Lost'}
        </span>
      </div>

      {/* Category chip */}
      {category && (
        <div className="item-category">
          <i className="fas fa-tag" style={{ fontSize: '0.7rem' }}></i>
          {category}
        </div>
      )}

      {/* Meta info */}
      <div className="item-meta">
        {location && (
          <div className="item-meta-row">
            <i className="fas fa-map-marker-alt"></i>
            {location}
          </div>
        )}
        {status && (
          <div className="item-meta-row">
            <i className="fas fa-circle" style={{ fontSize: '0.5rem', color: status === 'ACTIVE' ? '#0D9488' : '#94A3B8' }}></i>
            <strong>{status}</strong>
          </div>
        )}
      </div>

      {/* Description */}
      {publicDescription && (
        <p className="item-description">{publicDescription}</p>
      )}

      {/* Footer */}
      <div className="item-card-footer">
        <div className="item-posted-by">
          <div className="item-avatar">{initials}</div>
          {postedByUsername}
        </div>
        <span className="item-date">{formattedDate}</span>
      </div>
    </div>
  );
}