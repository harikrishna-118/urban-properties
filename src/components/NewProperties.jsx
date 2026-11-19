
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  MapPin,
  MoveUpRight,
  Sparkles,
  Heart,
  GitCompareArrows,
} from "lucide-react";

import { newProperties, formatPrice } from "./propertyData";
import { usePropertyCollections } from "./wishlistStore";
import { useCompare } from "./compareStore";

import "./NewProperties.css";

const stages = [
  "All Launches",
  "Apartments",
  "Villas",
  "Other",
];

export default function NewProperties() {
  const [stage, setStage] = useState("All Launches");

  const { savedIds, toggleWishlist } =
    usePropertyCollections();

  const { comparedIds, toggleCompare } = useCompare();

  const [message, setMessage] = useState("");

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

    if (!success) {
      setMessage(
        "You can compare a maximum of 4 properties."
      );
    } else {
      setMessage("");
    }
  };

  const filtered = newProperties.filter(
    (p) =>
      stage === "All Launches" ||
      (stage === "Apartments"
        ? p.type === "Apartment"
        : stage === "Villas"
        ? p.type === "Villa"
        : !["Apartment", "Villa"].includes(p.type))
  );

  const featured = filtered[0];

  return (
    <main className="ux-page np-page">
      <section className="ux-hero np-hero">
        <div className="ux-wrap ux-hero-content">
          <span className="ux-kicker">
            THE NEXT CHAPTER IN LIVING
          </span>

          <h1>
            New spaces.
            <br />
            <em>New possibilities.</em>
          </h1>

          <p>
            Explore our latest residential launches,
            modern architecture and thoughtfully
            designed homes.
          </p>

          <a className="np-hero-action" href="#launches">
            Explore Launches <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <div className="ux-wrap">
        <div className="ux-crumb">
          <Link to="/">Home</Link> / New Properties
        </div>

        <div className="np-intro">
          <div>
            <span className="ux-kicker">
              FRESH ON THE MARKET
            </span>

            <h2 className="ux-heading">
              Explore the latest launches
            </h2>

            <p className="ux-lead">
              Curated sample projects across emerging
              and established neighbourhoods.
            </p>
          </div>

          <span className="np-count">
            {newProperties.length
              .toString()
              .padStart(2, "0")}
            <small>featured launches</small>
          </span>
        </div>

        {featured && (
          <section className="np-feature">
            <div className="up-action-image">
              <img
                src={featured.image}
                alt={featured.name}
              />

              <div className="up-property-actions">
                <button
                  type="button"
                  className={`up-action-btn ${
                    isSaved(featured.id) ? "is-active" : ""
                  }`}
                  onClick={() =>
                    handleWishlist(featured.id)
                  }
                  aria-label="Toggle wishlist"
                  aria-pressed={isSaved(featured.id)}
                >
                  <Heart
                    size={18}
                    fill={
                      isSaved(featured.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

                <button
                  type="button"
                  className={`up-action-btn ${
                    isCompared(featured.id)
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    handleCompare(featured.id)
                  }
                  aria-label="Toggle compare"
                  aria-pressed={isCompared(featured.id)}
                >
                  <GitCompareArrows size={18} />
                </button>
              </div>
            </div>

            <div className="np-feature-copy">
              <span className="ux-kicker">
                <Sparkles size={14} /> FEATURED LAUNCH
              </span>

              <h2>{featured.name}</h2>

              <p>{featured.description}</p>

              <div className="ux-meta">
                <MapPin size={16} />
                {featured.location}, {featured.city}
              </div>

              <strong className="ux-price">
                {formatPrice(
                  featured.price,
                  featured.status
                )}
              </strong>

              <Link
                className="ux-link"
                to={`/property/${featured.id}`}
              >
                Explore Property
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

        <section id="launches" className="np-launches">
          <div className="np-toolbar">
            <div>
              <span className="ux-kicker">
                THE COLLECTION
              </span>

              <h2 className="ux-heading">
                Find your next address
              </h2>
            </div>

            <div className="np-tabs">
              {stages.map((x) => (
                <button
                  key={x}
                  type="button"
                  className={`ux-chip ${
                    stage === x ? "active" : ""
                  }`}
                  onClick={() => setStage(x)}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>

          {message && (
            <p className="up-action-message" role="alert">
              {message}
            </p>
          )}

          {filtered.length ? (
            <div className="np-grid">
              {filtered.map((item, i) => (
                <article
                  className="ux-card np-card"
                  key={item.id}
                >
                  <div className="np-photo up-action-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <span>
                      {item.tag || "New launch"}
                    </span>

                    <div className="up-property-actions">
                      <button
                        type="button"
                        className={`up-action-btn ${
                          isSaved(item.id)
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          handleWishlist(item.id)
                        }
                        aria-label={`Save ${item.name}`}
                        aria-pressed={isSaved(item.id)}
                      >
                        <Heart
                          size={18}
                          fill={
                            isSaved(item.id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      <button
                        type="button"
                        className={`up-action-btn ${
                          isCompared(item.id)
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          handleCompare(item.id)
                        }
                        aria-label={`Compare ${item.name}`}
                        aria-pressed={isCompared(item.id)}
                      >
                        <GitCompareArrows size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="np-card-copy">
                    <div className="np-card-index">
                      PROJECT{" "}
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <h3>{item.name}</h3>

                    <p className="ux-meta">
                      <MapPin size={15} />
                      {item.location}, {item.city}
                    </p>

                    <div className="np-facts">
                      <span>
                        <BedDouble size={16} />
                        {item.bhk
                          ? `${item.bhk} BHK`
                          : item.type}
                      </span>

                      <span>
                        {Number(item.area).toLocaleString(
                          "en-IN"
                        )}{" "}
                        sq.ft
                      </span>
                    </div>

                    <div className="np-card-bottom">
                      <strong>
                        {formatPrice(
                          item.price,
                          item.status
                        )}
                      </strong>

                      <Link
                        to={`/property/${item.id}`}
                        aria-label={`View ${item.name}`}
                      >
                        <MoveUpRight size={21} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="ux-empty">
              No properties in this category yet.
            </div>
          )}
        </section>

        <div className="np-story">
          <CalendarDays size={30} />

          <div>
            <h3>
              Looking for a newly launched home?
            </h3>

            <p>
              Compare layouts, locations and available
              information before making your next move.
            </p>
          </div>

          <Link className="ux-link" to="/contact-us">
            Talk to our team <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
