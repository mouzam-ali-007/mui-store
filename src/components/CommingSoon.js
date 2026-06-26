import React from "react";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <section className="coming-soon">
      <div className="coming-soon__card">
        <p className="section-label">In Progress</p>
        <h1>Coming Soon</h1>
        <p>We’re working to bring this section to life.</p>
        <button type="button" className="button button--primary" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    </section>
  );
};

export default ComingSoon;
