
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  MapPin,
  Maximize2,
  Search,
  Store,
  BriefcaseBusiness,
  Heart,
  GitCompareArrows,
} from "lucide-react";

import {
  commercialProperties,
  formatPrice,
} from "./propertyData";

import { usePropertyCollections } from "./wishlistStore";
import { useCompare } from "./compareStore";

import "./Commercial.css";

export default function Commercial() {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState("All Spaces");
  const [sort, setSort] = useState("default");
  const [message, setMessage] = useState("");

  const { savedIds, toggleWishlist } =
    usePropertyCollections();

  const { comparedIds, toggleCompare } = useCompare();

  const isSaved = (id) =>
    savedIds.some((x) => String(x) === String(id));

  const isCompared = (id) =>
    comparedIds.some((x) => String(x) === String(id));

  const handleWishlist = (id) => {
    toggleWishlist(String(id));
    setMessage("");
  };

  const handleCompare = (id) => {
    const success = toggleCompare(String(id));

    setMessage(
      success
        ? ""
        : "You can compare a maximum of 4 properties."
    );
  };

  const categories = [
    "All Spaces",
    ...new Set(
      commercialProperties.map((p) => p.type)
    ),
  ];

  const filtered = useMemo(() => {
    const items = commercialProperties.filter(
      (p) =>
        (category === "All Spaces" ||
          p.type === category) &&
        `${p.name} ${p.location} ${p.city}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );

    if (sort === "low") {
      items.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [query, category, sort]);

  return (
    <main className="ux-page cm-page">
      <section className="ux-hero cm-hero">
        <div className="ux-wrap ux-hero-content">
          <span className="ux-kicker">
            COMMERCIAL REAL ESTATE
          </span>

          <h1>
            Find the right space
            <br />
            for your <span>next big move.</span>
          </h1>

          <p>
            Offices, retail destinations and
            investment-ready commercial properties —
            built for ambition.
          </p>

          <div className="cm-hero-icons">
            <span>
              <BriefcaseBusiness size={17} />
              Business spaces
            </span>

            <span>
              <Store size={17} />
              Retail opportunities
            </span>
          </div>
        </div>
      </section>

      <div className="ux-wrap">
        <div className="ux-crumb">
          <Link to="/">Home</Link> / Commercial
        </div>

        <div className="cm-head">
          <div>
            <span className="ux-kicker">
              EXPLORE COMMERCIAL SPACES
            </span>

            <h2 className="ux-heading">
              Spaces that work for you
            </h2>

            <p className="ux-lead">
              Discover the right address for your
              business or investment.
            </p>
          </div>

          <span className="cm-count">
            {commercialProperties.length}
            <small>available listings</small>
          </span>
        </div>

        <div className="cm-filterbar">
          <label>
            <Search size={18} />

            <input
              placeholder="Search building, location or area..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
            />
          </label>

          <div className="cm-filter-controls">
            <select
              aria-label="Space type"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>

            <select
              aria-label="Sort by price"
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
            >
              <option value="default">
                Recommended
              </option>

              <option value="low">
                Price: Low to High
              </option>

              <option value="high">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        {message && (
          <p className="up-action-message" role="alert">
            {message}
          </p>
        )}

        <div className="cm-layout">
          <div className="cm-list">
            <div className="cm-list-heading">
              <strong>
                {filtered.length} Commercial properties
              </strong>

              <span>Sample listings</span>
            </div>

            {filtered.length ? (
              filtered.map((p) => (
                <article
                  className="ux-card cm-item"
                  key={p.id}
                >
                  <div className="cm-item-photo up-action-image">
                    <img
                      src={p.image}
                      alt={p.name}
                    />

                    <span>
                      {p.tag || "Commercial"}
                    </span>

                    <div className="up-property-actions">
                      <button
                        type="button"
                        className={`up-action-btn ${
                          isSaved(p.id)
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          handleWishlist(p.id)
                        }
                        aria-label={`Save ${p.name}`}
                        aria-pressed={isSaved(p.id)}
                      >
                        <Heart
                          size={18}
                          fill={
                            isSaved(p.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <button
                        type="button"
                        className={`up-action-btn ${
                          isCompared(p.id)
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          handleCompare(p.id)
                        }
                        aria-label={`Compare ${p.name}`}
                        aria-pressed={isCompared(p.id)}
                      >
                        <GitCompareArrows size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="cm-item-copy">
                    <span className="ux-kicker">
                      {p.type}
                    </span>

                    <h3>{p.name}</h3>

                    <p className="ux-meta">
                      <MapPin size={15} />
                      {p.location}, {p.city}
                    </p>

                    <p className="cm-desc">
                      {p.description}
                    </p>

                    <div className="cm-item-bottom">
                      <div>
                        <strong className="ux-price">
                          {formatPrice(
                            p.price,
                            p.status
                          )}
                        </strong>

                        <span>
                          <Maximize2 size={14} />
                          {Number(
                            p.area
                          ).toLocaleString("en-IN")}{" "}
                          sq.ft
                        </span>
                      </div>

                      <Link
                        className="ux-link"
                        to={`/property/${p.id}`}
                      >
                        View Space
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="ux-empty">
                No commercial spaces match your search.
              </div>
            )}
          </div>

          <aside className="cm-aside">
            <div className="cm-aside-top">
              <Building2 size={34} />

              <span className="ux-kicker">
                BUSINESS-FIRST DISCOVERY
              </span>

              <h3>
                Find a space that fits your goals.
              </h3>

              <p>
                Explore locations, floor areas and
                property details before requesting
                more information.
              </p>

              <Link to="/contact-us">
                Speak to our team
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="cm-aside-steps">
              <h3>What to compare</h3>

              <p>
                <b>01</b> Location & access
              </p>

              <p>
                <b>02</b> Space & layout
              </p>

              <p>
                <b>03</b> Budget & suitability
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
