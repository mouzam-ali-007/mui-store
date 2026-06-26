import React, { useEffect, useState } from "react";
import { getUserSession, signOut } from "../services/data.service";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, CloseIcon } from "./Icons";

const SideBar = ({ mobileOpen, setMobileOpen }) => {
  const [openWomen, setOpenWomen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const res = await getUserSession();

      if (res) {
        setUser(res.session);
      }
    };

    getSession();
  }, []);

  const handleLogout = async () => {
    const res = await signOut();

    if (res) {
      setUser(null);
      navigate("/");
    }
  };

  const navigateAndClose = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`sidebar-backdrop ${mobileOpen ? "sidebar-backdrop--visible" : ""}`}
        aria-label="Close navigation"
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__panel">
          <div className="sidebar__header">
            <p className="sidebar__eyebrow">Discover</p>
            <button
              type="button"
              className="icon-button sidebar__close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <CloseIcon className="icon-button__icon" />
            </button>
          </div>

          <div className="sidebar__intro">
            <h2>Collections</h2>
            <p>Browse our signature edits with a cleaner and more focused shopping menu.</p>
          </div>

          <nav className="sidebar__nav">
            <button type="button" className="sidebar__link" onClick={() => navigateAndClose("/")}>
              All Products
            </button>

            <button type="button" className="sidebar__link" onClick={() => navigateAndClose("/comingsoon")}>
              Men
            </button>

            <div className="sidebar__group">
              <button
                type="button"
                className="sidebar__link sidebar__link--group"
                onClick={() => setOpenWomen((current) => !current)}
              >
                Women
                {openWomen ? (
                  <ChevronUpIcon className="sidebar__chevron" />
                ) : (
                  <ChevronDownIcon className="sidebar__chevron" />
                )}
              </button>

              {openWomen && (
                <div className="sidebar__subnav">
                  {["Pouch Bags", "Clutches", "Mini Bags"].map((label) => (
                    <button
                      key={label}
                      type="button"
                      className="sidebar__sublink"
                      onClick={() => navigateAndClose("/women")}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" className="sidebar__link" onClick={() => navigateAndClose("/comingsoon")}>
              Kids
            </button>
          </nav>

          {user && (
            <button
              type="button"
              className="button button--ghost button--full sidebar__logout"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
