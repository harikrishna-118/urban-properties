
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  Mail,
  MapPin,
  Maximize2,
  Share2,
  ShieldCheck,
  GitCompareArrows,
  X,
  Send,
  Clock3,
  Phone,
  UserRound,
} from "lucide-react";

import {
  getPropertyById,
  getRelatedProperties,
  formatPrice,
} from "./propertyData";

import "./PropertyDetails.css";
import "./Wishlist.css";
import { usePropertyCollections } from "./wishlistStore";
import { useCompare } from "./compareStore";
import "./Compare.css";

const highlights = [
  "Thoughtfully planned spaces",
  "Convenient neighborhood access",
  "Modern design and finishes",
  "Property information on request",
  "Guided enquiry process",
  "Explore nearby conveniences",
];

export default function PropertyDetails() {
  const { id } = useParams();

  const property = getPropertyById(id);

  const { savedIds, toggleWishlist, recordRecentlyViewed } = usePropertyCollections();
  const saved = savedIds.includes(id);
  const { comparedIds, toggleCompare } = useCompare();
  const [compareNotice, setCompareNotice] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState("enquiry");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", date: "", time: "", message: "",
  });

  const todayLocal = () => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };

  const openEnquiry = (type) => {
    setEnquiryType(type);
    setSubmitted(false);
    setEnquiryOpen(true);
  };

  const closeEnquiry = () => {
    setEnquiryOpen(false);
    setSubmitted(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleEnquirySubmit = (event) => {
    event.preventDefault();
    if (enquiryType === "visit" && formData.date < todayLocal()) return;
    // Frontend demo only: replace this with a backend POST request.
    console.log("Demo property request:", {
      propertyId: property.id,
      propertyName: property.name,
      enquiryType,
      ...formData,
    });
    setSubmitted(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setCopied(false);
    setEnquiryOpen(false);
    setSubmitted(false);
  }, [id]);

  useEffect(() => {
    if (property) recordRecentlyViewed(id);
  }, [id, property]);

  const gallery = useMemo(() => {
    if (!property) return [];

    if (Array.isArray(property.images) && property.images.length) {
      return property.images;
    }

    return property.image ? [property.image] : [];
  }, [property]);

  const related = useMemo(() => {
    if (!property) return [];

    return getRelatedProperties(property, 4);
  }, [property]);

  if (!property) {
    return (
      <main className="pd-page">
        <div className="pd-shell pd-not-found">
          <Building2 size={52} />

          <h1>Property not found</h1>

          <p>
            This listing is not available in our demo collection.
          </p>

          <Link to="/buy">
            Browse Properties <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  const isRent = property.status === "For Rent";

  const listingRoute = isRent
    ? "/rent"
    : property.category === "New Properties"
    ? "/new-properties"
    : property.category === "Commercial"
    ? "/commercial"
    : property.category === "Plots & Land"
    ? "/plots-land"
    : property.category === "Builders"
    ? "/builders"
    : "/buy";

  const propertyPrice = formatPrice(
    property.price,
    property.status
  );

  const propertyLocation = [
    property.location,
    property.city,
  ]
    .filter(Boolean)
    .join(", ");

  const share = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="pd-page">
      {/* TOP SECTION */}
      <section className="pd-top">
        <div className="pd-shell">
          <div className="pd-breadcrumb">
            <Link to="/">Home</Link>

            <ChevronRight size={15} />

            <Link to={listingRoute}>
              Properties
            </Link>

            <ChevronRight size={15} />

            <span>{property.name}</span>
          </div>

          <div className="pd-heading">
            <div>
              <span className="pd-eyebrow">
                <ShieldCheck size={15} />
                URBAN PROPERTIES · DEMO LISTING
              </span>

              <h1>{property.name}</h1>

              <p>
                <MapPin size={18} />
                {propertyLocation}
              </p>
            </div>

            <div className="pd-heading-price">
              <span>
                {isRent
                  ? "Monthly rent · Sample"
                  : "Asking price · Sample"}
              </span>

              <strong>{propertyPrice}</strong>

              <small>
                Price subject to verification
              </small>
            </div>
          </div>
        </div>
      </section>

      <div className="pd-shell pd-body">
        {/* PROPERTY GALLERY */}
        <div className="pd-gallery">
          <div className="pd-main-image">
            {gallery.length > 0 ? (
              <img
                src={gallery[activeImage]}
                alt={property.name}
              />
            ) : (
              <div className="pd-image-placeholder">
                <Building2 size={48} />
                <p>Image not available</p>
              </div>
            )}

            <span className="pd-image-tag">
              {property.tag || property.type}
            </span>

            <div className="pd-gallery-actions">
              <button
                type="button"
                aria-label="Save property"
                aria-pressed={saved}
                onClick={() => toggleWishlist(id)}
              >
                <Heart
                  size={19}
                  fill={
                    saved ? "currentColor" : "none"
                  }
                />

                {saved ? "Saved" : "Save"}
              </button>

              <button type="button" className={`up-compare-button up-compare-details-action ${comparedIds.includes(id) ? "is-selected" : ""}`} aria-pressed={comparedIds.includes(id)} onClick={() => { const ok = toggleCompare(id); setCompareNotice(ok ? "" : "Maximum 4 properties. Remove one from Compare first."); }}><GitCompareArrows size={18}/>{comparedIds.includes(id) ? "Added to Compare" : "Compare"}</button>
              <button
                type="button"
                onClick={share}
              >
                <Share2 size={18} />

                {copied
                  ? "Link copied"
                  : "Share"}
              </button>
            </div>
          </div>

          {compareNotice && <p role="alert" style={{color:"#ff891c",fontWeight:700}}>{compareNotice}</p>}
          {gallery.length > 1 && (
            <div className="pd-gallery-nav">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setActiveImage(
                    (v) =>
                      (v + gallery.length - 1) %
                      gallery.length
                  )
                }
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={() =>
                  setActiveImage(
                    (v) =>
                      (v + 1) % gallery.length
                  )
                }
              >
                <ChevronRight />
              </button>
            </div>
          )}

          <p className="pd-image-caption">
            Illustrative property image · Additional
            verified photos may be requested
          </p>
        </div>

        <div className="pd-layout">
          <div className="pd-main-column">
            {/* PROPERTY OVERVIEW */}
            <section className="pd-card pd-overview">
              <div className="pd-section-top">
                <div>
                  <span className="pd-kicker">
                    AT A GLANCE
                  </span>

                  <h2>Property Overview</h2>
                </div>

                <span className="pd-type-pill">
                  {property.type}
                </span>
              </div>

              <div className="pd-spec-grid">
                <div>
                  <BedDouble />

                  <span>Configuration</span>

                  <strong>
                    {property.bhk
                      ? `${property.bhk} BHK`
                      : "Commercial / Plot"}
                  </strong>
                </div>

                <div>
                  <Maximize2 />

                  <span>Built-up Area</span>

                  <strong>
                    {Number(
                      property.area || 0
                    ).toLocaleString("en-IN")}{" "}
                    Sq Ft
                  </strong>
                </div>

                <div>
                  <Bath />

                  <span>Bathrooms</span>

                  <strong>
                    {property.baths
                      ? `${property.baths} Baths`
                      : "N/A"}
                  </strong>
                </div>

                <div>
                  <Home />

                  <span>Property Type</span>

                  <strong>{property.type}</strong>
                </div>
              </div>
            </section>

            {/* DESCRIPTION */}
            <section className="pd-card">
              <span className="pd-kicker">
                ABOUT THIS SPACE
              </span>

              <h2>Property Description</h2>

              <p className="pd-description">
                {property.description}
              </p>

              <p className="pd-note">
                This is a demonstration listing.
                Property specifications, pricing,
                amenities and availability must be
                confirmed before making any decision.
              </p>
            </section>

            {/* AMENITIES */}
            <section className="pd-card">
              <span className="pd-kicker">
                PROPERTY FEATURES
              </span>

              <h2>Property Amenities</h2>

              <div className="pd-highlights">
                {(
                  property.amenities?.length
                    ? property.amenities
                    : highlights
                ).map((item) => (
                  <div key={item}>
                    <CheckCircle2 size={18} />

                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="pd-note">
                Amenities shown are sample listing
                information and require verification.
              </p>
            </section>

            {/* LOCATION */}
            <section className="pd-card">
              <span className="pd-kicker">
                LOCATION
              </span>

              <h2>Explore the Neighborhood</h2>

              <div className="pd-location-box">
                <MapPin size={28} />

                <div>
                  <strong>
                    {propertyLocation}
                  </strong>

                  <p>
                    Contact our team for the exact
                    address, nearby landmarks and
                    location details.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* CONTACT SIDEBAR */}
          <aside className="pd-aside">
            <div className="pd-contact-card">
              <span className="pd-kicker">
                INTERESTED IN THIS PROPERTY?
              </span>

              <h2>Take the next step.</h2>

              <p>
                Ask about availability, arrange a
                viewing or request more information.
              </p>

              <div className="pd-contact-property">
                <Building2 size={21} />

                <span>{property.name}</span>
              </div>

              <button type="button" className="pd-primary" onClick={() => openEnquiry("enquiry")}>
                Enquire Now <ArrowRight size={19} />
              </button>

              <button type="button" className="pd-secondary" onClick={() => openEnquiry("visit")}>
                <CalendarDays size={18} /> Schedule a Visit
              </button>

              <p className="pd-disclaimer">
                <ShieldCheck size={15} />
                No payment required to send an enquiry
              </p>
            </div>

            <div className="pd-assistance">
              <Mail size={20} />

              <div>
                <strong>Need guidance?</strong>

                <p>
                  Our team can help you compare your
                  options.
                </p>

                <Link to="/contact-us">
                  Contact Us
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED PROPERTIES */}
        {related.length > 0 && (
          <section className="pd-related">
            <div className="pd-related-head">
              <div>
                <span className="pd-kicker">
                  KEEP EXPLORING
                </span>

                <h2>Similar Properties</h2>
              </div>

              <Link to={listingRoute}>
                View all properties
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="pd-related-grid">
              {related.map((item) => (
                <Link
                  className="pd-related-card"
                  to={`/property/${item.id}`}
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />

                  <div>
                    <span>{item.type}</span>

                    <h3>{item.name}</h3>

                    <p>
                      <MapPin size={14} />
                      {item.location}
                    </p>

                    <strong>
                      {formatPrice(
                        item.price,
                        item.status
                      )}
                    </strong>

                    <span className="pd-related-link">
                      View Property
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* PROPERTY ENQUIRY / VISIT MODAL */}
      {enquiryOpen && (
        <div className="pd-modal-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeEnquiry();
        }}>
          <div className="pd-modal" role="dialog" aria-modal="true" aria-labelledby="pd-modal-title">
            <button type="button" className="pd-modal-close" onClick={closeEnquiry} aria-label="Close enquiry form">
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <span className="pd-modal-kicker">URBAN PROPERTIES</span>
                <h2 id="pd-modal-title">{enquiryType === "visit" ? "Schedule a Property Visit" : "Enquire About This Property"}</h2>
                <p className="pd-modal-description">
                  {enquiryType === "visit"
                    ? "Choose your preferred date and time to request a site visit."
                    : "Send a request for more information about this property."}
                </p>
                <div className="pd-selected-property">
                  <strong>{property.name}</strong>
                  <span>{propertyLocation}</span>
                </div>

                <form className="pd-enquiry-form" onSubmit={handleEnquirySubmit}>
                  <label>Full Name
                    <span className="pd-input-wrap"><UserRound size={18} />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" minLength={2} required />
                    </span>
                  </label>
                  <label>Email Address
                    <span className="pd-input-wrap"><Mail size={18} />
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
                    </span>
                  </label>
                  <label>Phone Number
                    <span className="pd-input-wrap"><Phone size={18} />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10-digit mobile number" pattern="[0-9]{10}" maxLength={10} inputMode="numeric" required />
                    </span>
                  </label>

                  {enquiryType === "visit" && (
                    <div className="pd-form-row">
                      <label>Preferred Date
                        <span className="pd-input-wrap"><CalendarDays size={18} />
                          <input type="date" name="date" value={formData.date} min={todayLocal()} onChange={handleInputChange} required />
                        </span>
                      </label>
                      <label>Preferred Time
                        <span className="pd-input-wrap"><Clock3 size={18} />
                          <select name="time" value={formData.time} onChange={handleInputChange} required>
                            <option value="">Select time</option>
                            {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                              <option value={time} key={time}>{new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true })}</option>
                            ))}
                          </select>
                        </span>
                      </label>
                    </div>
                  )}

                  <label>Message (Optional)
                    <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us what you would like to know..." rows={4} />
                  </label>
                  <button type="submit" className="pd-submit-btn">
                    {enquiryType === "visit" ? "Request Visit" : "Send Enquiry"} <Send size={17} />
                  </button>
                  <p className="pd-demo-note">Demo only — no request will be sent until a backend is connected.</p>
                </form>
              </>
            ) : (
              <div className="pd-enquiry-success" role="status">
                <CheckCircle2 size={56} />
                <h2 id="pd-modal-title">Demo Request Recorded</h2>
                <p>Your form details were logged in the browser console. This is not a confirmed booking or a message to our team.</p>
                <button type="button" onClick={closeEnquiry}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
