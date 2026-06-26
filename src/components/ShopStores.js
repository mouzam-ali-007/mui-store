import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Women", image: "/womens.avif", path: "/women" },
  { title: "Men", image: "/mens.avif", path: "/comingsoon" },
  { title: "Kids", image: "/kids.jpg", path: "/comingsoon" },
];

const ShopStores = () => {
  const navigate = useNavigate();

  return (
    <section className="store-grid-section">
      <div className="store-grid-section__header">
        <p className="section-label">Shop Our Stores</p>
        <h2>Browse by collection</h2>
      </div>

      <div className="store-grid">
        {categories.map((item, index) => (
          <article
            className="store-card"
            key={index}
            onClick={() => navigate(item.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                navigate(item.path);
              }
            }}
          >
            <div className="store-card__media">
              <img src={item.image} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ShopStores;
