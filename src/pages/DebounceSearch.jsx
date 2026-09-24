import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useProductSearch from "../hooks/useProductSearch";
import "../css/DebounceSearch.css";

const DebounceSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { products, isLoading, error } = useProductSearch(debouncedSearchTerm);

  return (
    <div className="App">
      <h1>Debounce Search</h1>
      <div className="input-container">
        {" "}
        <input
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-box"
        />
      </div>

      {isLoading && <p role="status">Searching...</p>}
      {debouncedSearchTerm && error && (
        <p role="alert">Error: {error.message}</p>
      )}
      {debouncedSearchTerm &&
        !isLoading &&
        !error &&
        products.length === 0 && (
          <p>No products found for &quot;{debouncedSearchTerm}&quot;.</p>
        )}

      <div className="products-container">
        {debouncedSearchTerm &&
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DebounceSearch;
