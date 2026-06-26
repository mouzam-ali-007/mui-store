import React, { useState } from "react";
import ShoppingBag from "./ShoppingBag";
import { useAppSelector } from "../store/hooks";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BagIcon, ChevronDownIcon, MenuIcon, SearchIcon } from "./Icons";

const Navbar = ({ setMobileOpen }) => {
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("PKR");
  const [bagOpen, setBagOpen] = useState(false);
  const [country] = useState("Pakistan");
  const [searchInput, setSearchInput] = useState("");

  const cartItemsCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  React.useEffect(() => {
    setSearchInput(searchParams.get("q") || "");
  }, [searchParams]);

  const updateSearchParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "All") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    if (location.pathname !== "/") {
      navigate({
        pathname: "/",
        search: nextParams.toString() ? `?${nextParams.toString()}` : "",
      });
      return;
    }

    setSearchParams(nextParams);
  };

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar__brand-row">
          <button
            type="button"
            className="icon-button icon-button--menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <MenuIcon className="icon-button__icon" />
          </button>

          <button type="button" className="site-brand" onClick={() => navigate("/")}>
            LUMA DEVAUX
          </button>
        </div>

        <div className="topbar__search">
          <label className="visually-hidden" htmlFor="navbar-category">
            Browse category
          </label>
          <select
            id="navbar-category"
            className="topbar__select"
            value={selectedCategory}
            onChange={(event) => updateSearchParams({ category: event.target.value })}
          >
            <option value="All">All</option>
            <option value="women">Women</option>
          </select>

          <label className="visually-hidden" htmlFor="navbar-search">
            Search products
          </label>
          <input
            id="navbar-search"
            className="topbar__input"
            placeholder='Search for "red wedding dress"'
            value={searchInput}
            onChange={(event) => {
              const value = event.target.value;
              setSearchInput(value);
              updateSearchParams({ q: value.trim() });
            }}
          />
          <SearchIcon className="topbar__search-icon" />
        </div>

        <div className="topbar__actions">
          <div className="topbar__menu-wrap">
            <button
              type="button"
              className="topbar__delivery"
              onClick={() => setCurrencyMenuOpen((current) => !current)}
            >
              <span className="topbar__eyebrow">Deliver To / Currency</span>
              <span className="topbar__delivery-value">
                PK / {currency}
                <ChevronDownIcon className="topbar__chevron" />
              </span>
            </button>

            {currencyMenuOpen && (
              <div className="floating-menu">
                <p className="floating-menu__label">Country</p>
                <div className="floating-menu__value">{country}</div>

                <label className="floating-menu__label" htmlFor="currency-select">
                  Currency
                </label>
                <select
                  id="currency-select"
                  className="field-control"
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                >
                  <option value="PKR">PKR</option>
                  <option value="USD">USD</option>
                  <option value="SAR">SAR</option>
                </select>

                <button
                  type="button"
                  className="button button--ghost button--full"
                  onClick={() => setCurrencyMenuOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="icon-button icon-button--bag"
            onClick={() => setBagOpen(true)}
            aria-label="Open shopping bag"
          >
            <span className="cart-badge">{cartItemsCount > 99 ? "99+" : cartItemsCount}</span>
            <BagIcon className="icon-button__icon" />
          </button>

          <ShoppingBag bagOpen={bagOpen} setBagOpen={setBagOpen} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
