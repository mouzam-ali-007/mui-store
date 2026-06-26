import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addItem } from "../store/cartSlice";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import { ArrowLeftIcon, MinusIcon, PlusIcon } from "./Icons";

const ProductDetails = ({ product, loading = false }) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.image);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  useEffect(() => {
    setSelectedImage(product?.images?.[0] || product?.image);
    setSelectedSize(product?.sizes?.[0] || null);
  }, [product]);

  const handleAddToCart = () => {
    if (!user) {
      // Local mode still allows adding to cart.
    }

    dispatch(
      addItem({
        id: product.id,
        name: `${product.brand || ""} ${product.name}`,
        price: product.price,
        image: product.image,
        quantity: qty,
        size: selectedSize || undefined,
      })
    );
  };

  if (loading) {
    return <div className="loading-bar" aria-hidden="true" />;
  }

  if (!product) {
    return (
      <section className="state-card">
        <h2>Product not found.</h2>
        <p>We couldn’t find that item right now. Try heading back to the collection.</p>
        <Link className="button button--primary" to="/">
          Back to Home
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="product-page">
        <div className="product-page__back">
          <Link className="button button--ghost" to="/">
            <ArrowLeftIcon className="button__icon" />
            Back to Home
          </Link>
        </div>

        <div className="product-page__layout">
          <div className="product-page__gallery">
            <div className="product-page__thumbs">
              {(product.images || [product.image]).map((img, index) => (
                <button
                  type="button"
                  className={`product-page__thumb ${selectedImage === img ? "product-page__thumb--active" : ""}`}
                  key={index}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="product-page__main-image">
              <img src={selectedImage} alt={product.name} />
            </div>
          </div>

          <div className="product-page__content">
            <p className="section-label">{product.brand || "Brand"}</p>
            <h1>{product.name}</h1>
            <p className="product-page__description">{product.description}</p>

            <div className="product-page__price">
              <strong>PKR {Number(product.price).toLocaleString()}</strong>
              <div>
                {product.oldPrice && <span>PKR {Number(product.oldPrice).toLocaleString()}</span>}
                {product.discount && <em>-{product.discount}%</em>}
              </div>
            </div>

            <p className="product-page__rating">
              ★ {product.rating || 4.0} ({product.reviews || 50} reviews)
            </p>

            <div className="product-page__express">
              <strong>Express</strong>
              <p>Instant dispatch with estimated delivery in 3-5 days.</p>
            </div>

            <div className="product-page__block">
              <h2>Size</h2>
              <div className="size-list">
                {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-chip ${selectedSize === size ? "size-chip--active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-page__block">
              <h2>Quantity</h2>
              <div className="qty-stepper qty-stepper--wide">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="icon-button__icon" />
                </button>
                <strong>{qty}</strong>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="icon-button__icon" />
                </button>
              </div>
            </div>

            <div className="product-page__actions">
              <button type="button" className="button button--primary button--full" onClick={handleAddToCart}>
                Add To Bag
              </button>
              <button type="button" className="button button--outline button--full" onClick={() => setCheckoutOpen(true)}>
                Buy Now
              </button>
            </div>

            <div className="product-page__details">
              {product.details?.map((item, index) => (
                <div className="product-page__detail-row" key={index}>
                  <span>{item.label}</span>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        product={[
          {
            id: product.id,
            name: `${product.brand || ""} ${product.name}`,
            price: product.price,
            image: product.image,
            quantity: qty,
            size: selectedSize || undefined,
          },
        ]}
      />
    </>
  );
};

export default ProductDetails;
