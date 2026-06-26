import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeItem, updateQuantity } from "../store/cartSlice";
import CheckoutModal from "./CheckoutModal";
import { CloseIcon, MinusIcon, PlusIcon } from "./Icons";

const ShoppingBag = ({ bagOpen, setBagOpen }) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setBagOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCheckoutOpen(false);
    setBagOpen(false);
  };

  return (
    <>
      {bagOpen && (
        <div className="overlay overlay--drawer" role="presentation" onClick={() => setBagOpen(false)}>
          <aside
            className="drawer drawer--right"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer__header">
              <div>
                <p className="section-label">Shopping Bag</p>
                <h2>Your Bag ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
              </div>
              <button type="button" className="icon-button" onClick={() => setBagOpen(false)} aria-label="Close bag">
                <CloseIcon className="icon-button__icon" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="drawer__empty">
                <p>Your cart is empty.</p>
                <button type="button" className="button button--outline button--full" onClick={() => setBagOpen(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="bag-list">
                  {items.map((item) => (
                    <article className="bag-item" key={`${item.id}-${item.size || "no-size"}`}>
                      <img className="bag-item__image" src={item.image} alt={item.name} />
                      <div className="bag-item__content">
                        <h3>{item.name}</h3>
                        <p>PKR {Number(item.price).toLocaleString()} x {item.quantity}</p>
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                      <div className="bag-item__actions">
                        <div className="qty-stepper">
                          <button
                            type="button"
                            className="icon-button"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1, size: item.size }))
                            }
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon className="icon-button__icon" />
                          </button>
                          <strong>{item.quantity}</strong>
                          <button
                            type="button"
                            className="icon-button"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1, size: item.size }))
                            }
                            aria-label="Increase quantity"
                          >
                            <PlusIcon className="icon-button__icon" />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="bag-item__remove"
                          onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="drawer__footer">
                  <div className="bag-total">
                    <span>Total</span>
                    <strong>PKR {total.toFixed(2)}</strong>
                  </div>
                  <button type="button" className="button button--primary button--full" onClick={handleCheckout}>
                    Go to Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};

export default ShoppingBag;
