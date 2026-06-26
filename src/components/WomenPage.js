import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import { ArrowLeftIcon } from "./Icons";

const WomenPage = () => {
  return (
    <section className="page-section">
      <div className="subpage-hero">
        <Link className="button button--ghost" to="/">
          <ArrowLeftIcon className="button__icon" />
          Back
        </Link>
        <p className="section-label">Women</p>
        <h1>Soft structure, polished finishes, and statement silhouettes.</h1>
        <p>Explore the women’s collection with a cleaner editorial presentation built in plain HTML and CSS.</p>
      </div>

      <Home
        forcedCategory="women"
        pageTitle="Women's Collection"
        pageDescription="A focused edit of refined bags and elevated everyday pieces."
        showBestCollection={false}
      />
    </section>
  );
};

export default WomenPage;
