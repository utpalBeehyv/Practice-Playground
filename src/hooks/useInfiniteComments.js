import axios from "axios";
import { useCallback, useRef, useState } from "react";

const LIMIT = 20;
const BASE_URL = "https://dummyjson.com/comments";

const useInfiniteComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(0);
  const loadingRef = useRef(false);

  const loadMore = useCallback(
    async (signal) => {
      if (loadingRef.current || !hasMore) return;
      loadingRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: { limit: LIMIT, skip: skipRef.current },
          signal,
        });
        const { comments: newComments, total } = response.data;
        setComments((prev) => [...prev, ...newComments]);
        skipRef.current += newComments.length;
        setHasMore(skipRef.current < total);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        setError(err);
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    },
    [hasMore]
  );

  return { comments, isLoading, error, hasMore, loadMore };
};

export default useInfiniteComments;
