import React from "react";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "./Icons";

const SuccessModal = ({ open, onClose, orderSummary }) => {
  const navigate = useNavigate();

  if (!open) {
    return null;
  }

  return (
    <div className="overlay" role="presentation" onClick={onClose}>
      <div
        className="dialog dialog--compact dialog--success"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="icon-button dialog__close"
          onClick={onClose}
          aria-label="Close success message"
        >
          <CloseIcon className="icon-button__icon" />
        </button>

        <div className="success-state">
          <p className="section-label">Order Confirmed</p>
          <h2>Thank you for your purchase.</h2>
          <p>Your order has been confirmed and we’ll send a confirmation email shortly.</p>
        </div>

        {orderSummary && (
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            {orderSummary.items.map((item, index) => (
              <div className="checkout-summary__row" key={index}>
                <span>{item.name} x{item.quantity}</span>
                <strong>PKR {Number(item.price).toFixed(2)}</strong>
              </div>
            ))}
            <div className="checkout-summary__total">
              <span>Total</span>
              <strong>PKR {orderSummary.total.toFixed(2)}</strong>
            </div>
            <p className="success-state__address">
              Delivery to: {orderSummary.address || "Your address"}
            </p>
          </div>
        )}

        <button
          type="button"
          className="button button--primary button--full"
          onClick={() => {
            onClose();
            navigate("/");
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
