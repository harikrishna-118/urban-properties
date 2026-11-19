
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  MapPin,
  Maximize2,
  Trees,
  Ruler,
  Search,
  Heart,
  GitCompareArrows,
} from "lucide-react";

import { landProperties, formatPrice } from "./propertyData";
import { usePropertyCollections } from "./wishlistStore";
import { useCompare } from "./compareStore";

import "./PlotsLand.css";
export default function PlotsLand() {
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("any");
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

  const filtered = useMemo(
    () =>
      landProperties.filter(
        (p) =>
          `${p.name} ${p.location} ${p.city}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (budget === "any" ||
            (budget === "under" &&
              p.price < 10000000) ||
            (budget === "over" &&
              p.price >= 10000000))
      ),
    [query, budget]
  );

  return (
    <main className="ux-page pl-page">
      <section className="ux-hero pl-hero">
        <div className="ux-wrap ux-hero-content">
          <span className="ux-kicker">
            PLOTS & LAND / URBAN PROPERTIES
          </span>

          <h1>
            Every great future
            <br />
            starts with <em>land.</em>
          </h1>

          <p>
            Find your canvas. Explore residential plots
            and land opportunities in locations that matter.
          </p>

          <a href="#plot-collection">
            Discover plots <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <div className="ux-wrap">
        <div className="ux-crumb">
          <Link to="/">Home</Link> / Plots & Land
        </div>

        <div className="pl-intro">
          <span className="ux-kicker">
            SPACE TO BUILD
          </span>

          <h2 className="ux-heading">
            Find a plot for your next chapter
          </h2>

          <p className="ux-lead">
            Explore sample listings with area,
            location and pricing details.
          </p>
        </div>

        <div className="pl-categories">
          <div>
            <Trees size={28} />
            <h3>Residential Plots</h3>
            <p>Space for your future home.</p>
          </div>

          <div>
            <Compass size={28} />
            <h3>Land Investments</h3>
            <p>
              Explore opportunities in growing
              neighbourhoods.
            </p>
          </div>

          <div>
            <Ruler size={28} />
            <h3>Flexible Spaces</h3>
            <p>Compare dimensions and locations.</p>
          </div>
        </div>

        <section
          id="plot-collection"
          className="pl-collection"
        >
          <div className="pl-top">
            <div>
              <span className="ux-kicker">
                AVAILABLE LAND
              </span>

              <h2 className="ux-heading">
                Explore plots & land
              </h2>
            </div>

            <div className="pl-controls">
              <label>
                <Search size={17} />

                <input
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Search location..."
                />
              </label>

              <select
                value={budget}
                onChange={(e) =>
                  setBudget(e.target.value)
                }
                aria-label="Budget"
              >
                <option value="any">Any Budget</option>
                <option value="under">
                  Below ₹1 Cr
                </option>
                <option value="over">
                  ₹1 Cr and above
                </option>
              </select>
            </div>
          </div>

          {message && (
            <p className="up-action-message" role="alert">
              {message}
            </p>
          )}

          {filtered.length ? (
            <div className="pl-grid">
              {filtered.map((item, i) => (
                <article
                  className="ux-card pl-card"
                  key={item.id}
                >
                  <div className="pl-image up-action-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <span>
                      LAND /{" "}
                      {String(i + 1).padStart(2, "0")}
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

                  <div className="pl-card-body">
                    <div className="ux-meta">
                      <MapPin size={15} />
                      {item.location}, {item.city}
                    </div>

                    <h3>{item.name}</h3>

                    <p>{item.description}</p>

                    <div className="pl-card-stats">
                      <span>
                        <Maximize2 size={17} />
                        <strong>
                          {Number(
                            item.area
                          ).toLocaleString("en-IN")}{" "}
                          sq.ft
                        </strong>
                      </span>

                      <span>
                        <Compass size={17} />
                        <strong>{item.type}</strong>
                      </span>
                    </div>

                    <div className="pl-bottom">
                      <strong className="ux-price">
                        {formatPrice(
                          item.price,
                          item.status
                        )}
                      </strong>

                      <Link
                        to={`/property/${item.id}`}
                      >
                        Explore Plot
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="ux-empty">
              No plots match these filters.
            </div>
          )}
        </section>

        <div className="pl-advice">
          <div>
            <span className="ux-kicker">
              BEFORE YOU DECIDE
            </span>

            <h2>Things worth checking.</h2>

            <p>
              Review location, land-use permissions,
              title documentation, access and applicable
              approvals with qualified professionals
              before making a purchase.
            </p>
          </div>

          <Link
            className="ux-link"
            to="/contact-us"
          >
            Request guidance
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
