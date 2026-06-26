import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/data.service";
import FilterProduct from "../components/FilterProduct";
import { useSearchParams } from "react-router-dom";
import { formatProduct } from "../utils/product";

const Home = ({
  forcedCategory = "",
  pageTitle = "All Products",
  pageDescription = "Discover polished silhouettes and elevated everyday essentials from our latest edit.",
  showBestCollection = true,
}) => {
  const [savedProducts, setStoredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q")?.trim().toLowerCase() || "";
  const selectedCategory = forcedCategory || searchParams.get("category") || "";
  const inStockOnly = searchParams.get("inStock") === "true";
  const sortBy = searchParams.get("sort") || "";
  const hasActiveFilters = Boolean(searchTerm || selectedCategory || inStockOnly || sortBy);

  const updateFilterParam = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (!value) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };

  useEffect(() => {
    let isMounted = true;

    getProducts().then((data) => {
      if (!isMounted) {
        return;
      }

      const normalizedProducts = data?.length ? data.map((item) => formatProduct(item)) : [];
      setStoredProducts(normalizedProducts);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(savedProducts.map((product) => product.category).filter(Boolean))],
    [savedProducts]
  );

  const filteredProducts = useMemo(() => {
    const filtered = savedProducts.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name?.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm);

      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStock = !inStockOnly || product.inStock;

      return matchesSearch && matchesCategory && matchesStock;
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((first, second) => Number(first.price) - Number(second.price));
    }

    if (sortBy === "price-desc") {
      return [...filtered].sort((first, second) => Number(second.price) - Number(first.price));
    }

    return filtered;
  }, [inStockOnly, savedProducts, searchTerm, selectedCategory, sortBy]);

  const bestCollectionProducts = useMemo(() => savedProducts.slice(0, 4), [savedProducts]);

  return (
    <section className="catalog">
      {loading && <div className="loading-bar" aria-hidden="true" />}

      <div className="catalog__header">
        <p className="section-label">Curated Edit</p>
        <h2>{pageTitle}</h2>
        <p>{pageDescription}</p>
      </div>

      <FilterProduct
        category={selectedCategory}
        categories={categories}
        inStock={inStockOnly}
        sortBy={sortBy}
        showCategory={!forcedCategory}
        onCategoryChange={(value) => updateFilterParam("category", value)}
        onInStockChange={(checked) => updateFilterParam("inStock", checked ? "true" : "")}
        onSortChange={(value) => updateFilterParam("sort", value)}
        onClearFilters={() => {
          const nextParams = new URLSearchParams(searchParams);
          nextParams.delete("category");
          nextParams.delete("inStock");
          nextParams.delete("sort");
          setSearchParams(nextParams);
        }}
      />

      <div className="catalog__grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <div className="catalog__empty">
          <h3>No products matched your search.</h3>
          <p>Try a broader search, clear filters, or explore the full collection.</p>
        </div>
      )}

      {!hasActiveFilters && showBestCollection && bestCollectionProducts.length > 0 && (
        <section className="collection-panel">
          <div className="collection-panel__header">
            <p className="section-label">Best Collection</p>
            <h3>Four standout picks from the latest drop.</h3>
            <p>A small edit of polished favorites chosen for their shape, texture, and versatility.</p>
          </div>
          <div className="catalog__grid catalog__grid--featured">
            {bestCollectionProducts.map((product) => (
              <ProductCard key={`best-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default Home;
