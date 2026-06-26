import React from "react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/" },
      { label: "Women", to: "/women" },
      { label: "Men", to: "/comingsoon" },
      { label: "Kids", to: "/comingsoon" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", to: "/" },
      { label: "Shipping Info", to: "/" },
      { label: "Returns", to: "/" },
      { label: "Order Support", to: "/" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/" },
      { label: "Stores", to: "/" },
      { label: "Privacy Policy", to: "/" },
      { label: "Terms & Conditions", to: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <section className="site-footer__brand">
          <h2 className="site-footer__title">LUMA DEVAUX</h2>
          <p className="site-footer__copy">
            Timeless pieces curated for modern wardrobes, with elevated styling,
            refined details, and a seamless shopping experience.
          </p>
          <div className="site-footer__meta">
            <p>support@lumadevaux.com</p>
            <p>Lahore, Pakistan</p>
          </div>
        </section>

        {footerSections.map((section) => (
          <section className="site-footer__section" key={section.title}>
            <h3>{section.title}</h3>
            <div className="site-footer__links">
              {section.links.map((item) => (
                <Link key={item.label} className="site-footer__link" to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 LUMA DEVAUX. All rights reserved.</p>
        <p>Secure payments. Fast dispatch. Elevated essentials.</p>
      </div>
    </footer>
  );
};

export default Footer;
