import './Pagination.css';

export function Pagination({ page, hasNextPage, onPageChange }) {
    if (page === 0 && !hasNextPage) return null;

    return (
        <div className="pagination-container">
            <button
                className="pagination-btn pagination-nav"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 0}
                aria-label="Previous page"
            >
                ‹
            </button>

            <span className="pagination-label">Page</span>

            <button
                className="pagination-btn pagination-page active"
                aria-label={`Page ${page + 1}`}
                aria-current="page"
            >
                {page + 1}
            </button>

            <button
                className="pagination-btn pagination-nav"
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNextPage}
                aria-label="Next page"
            >
                ›
            </button>
        </div>
    );
}
