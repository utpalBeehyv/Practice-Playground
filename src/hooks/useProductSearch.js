import axios from "axios";
import { useEffect, useState } from "react";

const useProductSearch = (query) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          "https://dummyjson.com/products/search",
          { params: { q: query, limit: 10 }, signal: controller.signal }
        );
        setProducts(response.data?.products || []);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [query]);

  return { products, isLoading, error };
};

export default useProductSearch;
