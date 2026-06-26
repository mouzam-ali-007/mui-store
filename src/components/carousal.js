import React from "react";
import { useNavigate } from "react-router-dom";

const CarousalComponent = () => {
  const navigate = useNavigate();
  const heroBackground = {
    backgroundImage:
      "linear-gradient(180deg, rgba(17, 17, 17, 0.18) 0%, rgba(17, 17, 17, 0.28) 30%, rgba(17, 17, 17, 0.68) 100%), url('/VR1.jpg')",
  };

  return (
    <section className="hero-banner" style={heroBackground}>
      <div className="hero-banner__content">
        <p className="hero-banner__eyebrow">New Arrival</p>
        <h1 className="hero-banner__title">Quiet luxury for the everyday carry.</h1>
        <p className="hero-banner__text">
          Because one bag is never enough.
          <br />
          Discover your next favorite carry.
        </p>

        <div className="hero-banner__actions">
          <button type="button" className="button button--light" onClick={() => navigate("/women")}>
            Shop Now
          </button>
          <button
            type="button"
            className="button button--outline-light"
            onClick={() => navigate("/women")}
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarousalComponent;
