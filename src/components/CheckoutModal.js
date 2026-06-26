import React, { useEffect, useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/cartSlice";
import { placeOrder } from "../services/data.service";
import SuccessModal from "./SuccessModal";
import { CloseIcon } from "./Icons";

const CheckoutModal = ({ open, onClose, onSuccess, product = [] }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const items = product.length > 0 ? product : cartItems;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const user = useMemo(() => {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.full_name || "",
        phone: user.phone || "",
        email: user.email || "",
        address: "",
      });
    }
  }, [user]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const orderData = {
        user_id: user?.id || "guest-order",
        items,
        total,
        status: "pending",
        ...formData,
      };

      await placeOrder(orderData);

      if (product.length === 0) {
        dispatch(clearCart());
      }

      setOrderSummary(orderData);
      setSuccessOpen(true);
      onClose();
      onSuccess?.();
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open && !successOpen) {
    return null;
  }

  return (
    <>
      {open && (
        <div className="overlay" role="presentation" onClick={!loading ? onClose : undefined}>
          <div
            className="dialog dialog--compact"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="dialog__header">
              <div>
                <p className="section-label">Checkout</p>
                <h2>Complete your order</h2>
              </div>
              {!loading && (
                <button type="button" className="icon-button" onClick={onClose} aria-label="Close checkout">
                  <CloseIcon className="icon-button__icon" />
                </button>
              )}
            </div>

            <div className="checkout-summary">
              <h3>Order Summary</h3>
              {items.map((item) => (
                <div className="checkout-summary__row" key={`${item.id}-${item.size || "default"}`}>
                  <span>{item.name} x{item.quantity}</span>
                  <strong>PKR {(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
              <div className="checkout-summary__total">
                <span>Total</span>
                <strong>PKR {total.toFixed(2)}</strong>
              </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <form className="form-grid" onSubmit={handleSubmit}>
              <label className="field">
                <span>Full Name</span>
                <input
                  className="field-control"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Phone</span>
                <input
                  className="field-control"
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  placeholder="+92 300 1234567"
                  required
                />
              </label>

              <label className="field">
                <span>Email</span>
                <input
                  className="field-control"
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  required
                />
              </label>

              <label className="field">
                <span>Address / Street</span>
                <textarea
                  className="field-control field-control--textarea"
                  value={formData.address}
                  onChange={(event) => setFormData({ ...formData, address: event.target.value })}
                  rows={4}
                  required
                />
              </label>

              <button type="submit" className="button button--primary button--full" disabled={loading}>
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}

      <SuccessModal
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
          setOrderSummary(null);
        }}
        orderSummary={orderSummary}
      />
    </>
  );
};

export default CheckoutModal;
