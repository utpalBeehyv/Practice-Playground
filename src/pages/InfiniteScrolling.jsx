import { useEffect, useMemo, useRef, useState } from 'react'
import useInfiniteComments from '../hooks/useInfiniteComments';
import '../css/InfiniteScrolling.css';

const InfiniteScrolling = () => {
  const { comments, isLoading, error, hasMore, loadMore } =
    useInfiniteComments();
  const [searchTerm, setSearchTerm] = useState("");
  const sentinelRef = useRef(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    loadMore(controller.signal);
    return () => controller.abort();
  }, [loadMore]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const controller = new AbortController();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore(controller.signal);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, [hasMore, loadMore, comments.length]);

  const filterData = useMemo(() => {
    if (!searchTerm) return comments;

    const cleaned = searchTerm
      .toLowerCase()
      .replace(/\b(email|comment|name)\b[:\s]*/g, "")
      .trim();

    const tokens = cleaned.split(/\s+/).filter(Boolean);

    return comments?.filter((comment) => {
      const hay =
        `${comment.user?.fullName} ${comment.user?.username} ${comment.body}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [comments, searchTerm]);

  if (error) return <p role="alert">Error: {error?.message}</p>;
  

  return (
    <div className="App">
      <h1>Comments</h1>
      <div className="input-container">
        {" "}
        <input
          type="text"
          placeholder="Search comments..."
          aria-label="Search comments"
          value={searchTerm}
          onChange={handleChange}
          className="input-box"
        />
      </div>

      <div className="comments-container">
        {filterData?.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <h3>{comment.user?.fullName}</h3>

            <p>
              <strong>Username:</strong> {comment.user?.username}
            </p>

            <p>
              <strong>Comment:</strong> {comment.body}
            </p>
          </div>
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />

      {isLoading && <p role="status">Loading more comments...</p>}
      {!hasMore && !isLoading && <p>No more comments.</p>}
    </div>
  );
}

export default InfiniteScrolling;