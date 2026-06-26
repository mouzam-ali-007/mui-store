import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addItem } from "../store/cartSlice";
import CheckoutModal from "./CheckoutModal";
import { CloseIcon } from "./Icons";

const ProductModal = ({ open, handleClose, product }) => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const [selectedSize, setSelectedSize] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    setSelectedSize(product?.sizes?.[0] || "");
  }, [product]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!product) {
    return null;
  }

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
        quantity: 1,
        size: selectedSize || undefined,
      })
    );
    handleClose();
  };

  const productDetails = product.details?.length
    ? product.details
    : [
        { label: "Material", value: "Premium finish for everyday use" },
        { label: "Category", value: product.category || "Signature collection" },
        { label: "Delivery", value: "Estimated in 3-5 working days" },
      ];

  return (
    <>
      {open && (
        <div className="overlay" role="presentation" onClick={handleClose}>
          <div
            className="dialog dialog--wide"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="product-dialog">
              <div className="product-dialog__media">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-dialog__content">
                <button
                  type="button"
                  className="icon-button product-dialog__close"
                  onClick={handleClose}
                  aria-label="Close product details"
                >
                  <CloseIcon className="icon-button__icon" />
                </button>

                <span className="pill pill--soft">{product.categoryLabel || product.category || "Featured Pick"}</span>
                <p className="section-label">{product.brand || "LUMA DEVAUX"}</p>
                <h2>{product.name}</h2>

                <div className="product-dialog__price">
                  <strong>PKR {Number(product.price).toLocaleString()}</strong>
                  {product.oldPrice && <span>PKR {Number(product.oldPrice).toLocaleString()}</span>}
                  {product.discount && <em>{product.discount}% OFF</em>}
                </div>

                <p className="product-dialog__express">Express delivery available</p>

                <div className="product-dialog__panel">
                  <h3>Description</h3>
                  <p>
                    {product.description ||
                      "A refined statement piece designed to elevate your everyday wardrobe with premium styling and comfort."}
                  </p>
                </div>

                <div className="product-dialog__details">
                  <h3>Product Details</h3>
                  {productDetails.map((item, index) => (
                    <div className="product-dialog__detail-row" key={index}>
                      <span>{item.label}</span>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="product-dialog__sizes">
                  <h3>Select Size</h3>
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

                <div className="product-dialog__actions">
                  <button type="button" className="button button--primary button--full" onClick={handleAddToCart}>
                    Add To Bag
                  </button>
                  <button
                    type="button"
                    className="button button--outline button--full"
                    onClick={() => {
                      handleClose();
                      setCheckoutOpen(true);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        product={[
          {
            id: product.id,
            name: `${product.brand || ""} ${product.name}`,
            price: product.price,
            image: product.image,
            quantity: 1,
            size: selectedSize || undefined,
          },
        ]}
      />
    </>
  );
};

export default ProductModal;
