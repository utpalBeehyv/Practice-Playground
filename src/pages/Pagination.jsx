import { useEffect, useMemo, useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import "../css/Pagination.css";

const USERS_PER_PAGE = 12;
const MAX_PAGE_BUTTONS = 5;

const Pagination = () => {
  const { users, total, loading, error, fetchUsers } = useGetUsers();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(total / USERS_PER_PAGE) || 1;

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(
      USERS_PER_PAGE,
      (currentPage - 1) * USERS_PER_PAGE,
      controller.signal
    );
    return () => controller.abort();
  }, [currentPage]);

  const pageNumbers = useMemo(() => {
    const half = Math.floor(MAX_PAGE_BUTTONS / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + MAX_PAGE_BUTTONS - 1);
    start = Math.max(1, end - MAX_PAGE_BUTTONS + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>Pagination</h1>

      {error && <p role="alert">Error: {error}</p>}

      {loading ? (
        <p role="status">Loading users...</p>
      ) : (
        <div className="users-container">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Company:</strong> {user.company?.name}
              </p>
            </div>
          ))}
        </div>
      )}

      <nav className="pagination-controls" aria-label="Pagination">
        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button className="pagination-btn" onClick={() => goToPage(1)}>
              1
            </button>
            {pageNumbers[0] > 2 && <span className="pagination-ellipsis">…</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`pagination-btn${page === currentPage ? " active" : ""}`}
            onClick={() => goToPage(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="pagination-ellipsis">…</span>
            )}
            <button className="pagination-btn" onClick={() => goToPage(totalPages)}>
              {totalPages}
            </button>
          </>
        )}

        <button
          className="pagination-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </nav>

      <p className="pagination-status">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
