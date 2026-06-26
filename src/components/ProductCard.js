import React, { useState } from "react";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";
import { BagIcon } from "./Icons";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <article className="product-card">
        <button
          type="button"
          className="product-card__media"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img className="product-card__image" src={product.image} alt={product.name} />
          <span className="product-card__category">{product.categoryLabel}</span>
        </button>

        <div className="product-card__body">
          <div className="product-card__price-row">
            <p className="product-card__price">PKR {Number(product.price).toLocaleString()}</p>
            {product.oldPrice && (
              <span className="product-card__old-price">
                PKR {Number(product.oldPrice).toLocaleString()}
              </span>
            )}
          </div>

          <h3 className="product-card__title">
            {product.brand} • {product.name}
          </h3>
          <p className="product-card__description">{product.description}</p>

          <div className="product-card__chips">
            {product.express && <span className="pill pill--accent">Express</span>}
            {product.rating && <span className="pill">★ {product.rating}</span>}
          </div>
        </div>

        <button type="button" className="product-card__bag-button" onClick={() => setOpen(true)}>
          <BagIcon className="product-card__bag-icon" />
        </button>
      </article>

      <ProductModal open={open} handleClose={() => setOpen(false)} product={product} />
    </>
  );
};

export default ProductCard;
