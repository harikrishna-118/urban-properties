
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  UserRound,
  ChevronDown,
  Menu,
  X,
  Heart,
  GitCompareArrows,
} from "lucide-react";

import { usePropertyCollections } from "./wishlistStore";
import { useCompare } from "./compareStore";

import urbanLogo from "../assets/urban-logo.png";

import "./Compare.css";
import "./Navbar.css";
import "./Wishlist.css";

const navLinks = [
  ["Home", "/"],
  ["Buy", "/buy"],
  ["Rent", "/rent"],
  ["New Properties", "/new-properties"],
  ["Commercial", "/commercial"],
  ["Plots & Land", "/plots-land"],
  ["Builders", "/builders"],
  ["Request a Loan", "/request-loan"],
];

const loginLinks = [
  ["User Login", "/login/user"],
  ["Agent Login", "/login/agent"],
  ["Legal Advisor Login", "/login/legal-advisor"],
  ["Banker Login", "/login/banker"],
  ["Investor Login", "/login/investor"],
  ["Corporate/Builder Login", "/login/corporate-builder"],
];

export default function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [drop, setDrop] = useState(false);

  const { savedIds } = usePropertyCollections();
  const { comparedIds } = useCompare();

  const close = () => {
    setMobile(false);
    setDrop(false);
  };

  return (
    <header className="site-header">
      <div className="navbar-inner container">
        <Link
          to="/"
          className="brand"
          onClick={close}
          aria-label="Urban Properties Home"
        >
          <img
            src={urbanLogo}
            alt="Urban Properties Logo"
            className="navbar-logo-img"
          />
        </Link>

        <button
          type="button"
          className="mobile-toggle"
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X /> : <Menu />}
        </button>

        <nav
          className={`nav-menu ${mobile ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={close}
              end={path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""} ${
                  path === "/request-loan" ? "loan-link" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Wishlist + Compare in one div */}
          <div className="wishlist-compare-group">
            <NavLink
              to="/wishlist"
              onClick={close}
              className={({ isActive }) =>
                `nav-link up-wishlist-nav ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Heart size={18} />
              <span>Wishlist</span>

              {savedIds.length > 0 && (
                <span className="up-wishlist-count">
                  {savedIds.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/compare"
              onClick={close}
              className={({ isActive }) =>
                `nav-link up-compare-nav ${
                  isActive ? "active" : ""
                }`
              }
            >
              <GitCompareArrows size={17} />
              <span>Compare</span>

              {comparedIds.length > 0 && (
                <span className="up-compare-nav-count">
                  {comparedIds.length}
                </span>
              )}
            </NavLink>
          </div>

          <div className="login-wrap">
            <button
              type="button"
              className="login-toggle"
              aria-expanded={drop}
              onClick={() => setDrop((v) => !v)}
            >
              <UserRound size={17} />
              <span>Login</span>
              <ChevronDown size={15} />
            </button>

            {drop && (
              <div className="login-dropdown">
                {loginLinks.map(([label, path]) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={close}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/register"
            onClick={close}
            className="register-btn"
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
