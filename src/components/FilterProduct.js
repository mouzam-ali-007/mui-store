import React from "react";
import { FilterIcon } from "./Icons";

const FilterProduct = ({
  category = "",
  categories = [],
  inStock = false,
  sortBy = "",
  showCategory = true,
  onCategoryChange = () => {},
  onInStockChange = () => {},
  onSortChange = () => {},
  onClearFilters = () => {},
}) => {
  const hasActiveFilters = Boolean(category || inStock || sortBy);

  return (
    <section className="filter-bar">
      <div className="filter-bar__title">
        <FilterIcon className="filter-bar__icon" />
        <div>
          <p>Refine the collection</p>
          <span>Sort, filter, and focus on what fits your style.</span>
        </div>
      </div>

      <div className="filter-bar__controls">
        {showCategory && (
          <label className="field field--compact">
            <span>Category</span>
            <select
              className="field-control"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="field field--compact">
          <span>Sort</span>
          <select
            className="field-control"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(event) => onInStockChange(event.target.checked)}
          />
          <span>In stock only</span>
        </label>

        {hasActiveFilters && (
          <button type="button" className="button button--ghost" onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <p className="filter-bar__summary">
          Showing products matching your current filters.
        </p>
      )}
    </section>
  );
};

export default FilterProduct;
