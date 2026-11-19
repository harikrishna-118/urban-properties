import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight, Bath, BedDouble, Building2, Check, ChevronDown,
  ChevronLeft, ChevronRight, Heart, Home, MapPin, Maximize2,
  Search, ShieldCheck, SlidersHorizontal, Sparkles, GitCompareArrows,
} from "lucide-react";
import "./Buy.css";
import "./Wishlist.css";
import { usePropertyCollections } from "./wishlistStore";
import { useCompare } from "./compareStore";
import "./Compare.css";
import { saleProperties, formatPrice as formatPropertyPrice } from "./propertyData";

// Demo listings only. Replace with your backend/API data when available.
const properties = saleProperties;

const types = ["All Types", "Apartment", "Villa", "Independent House", "Commercial", "Land"];
const locations = ["All Locations", "Gachibowli", "Kokapet", "Narsingi", "Tellapur", "Miyapur", "Kukatpally"];
const budgets = [
  { label: "Any Budget", value: "any" },
  { label: "Below ₹75 L", value: "75" },
  { label: "₹75 L – ₹1.5 Cr", value: "75-150" },
  { label: "₹1.5 Cr – ₹2.5 Cr", value: "150-250" },
  { label: "Above ₹2.5 Cr", value: "250+" },
];
const formatPrice = (value) => formatPropertyPrice(value, "For Sale");
const perPage = 6;

export default function Buy() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("location") || params.get("search") || "");
  const [type, setType] = useState(params.get("type") || "All Types");
  const [location, setLocation] = useState("All Locations");
  const [bhk, setBhk] = useState("any");
  const [budget, setBudget] = useState("any");
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const { savedIds: favorites, toggleWishlist } = usePropertyCollections();
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { comparedIds, toggleCompare } = useCompare();
  const [compareNotice, setCompareNotice] = useState("");
  const handleCompare = (id) => {
    const ok = toggleCompare(id);
    setCompareNotice(ok ? "" : "You can compare up to 4 properties. Remove one first.");
  };
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearch(params.get("location") || params.get("search") || "");
    setType(params.get("type") || "All Types");
    setPage(1);
  }, [params]);

  useEffect(() => { setPage(1); }, [search, type, location, bhk, budget, sort, onlyFavorites]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = properties.filter((p) => {
      if (term && !`${p.name} ${p.location} ${p.city} ${p.type}`.toLowerCase().includes(term)) return false;
      if (type !== "All Types" && p.type.toLowerCase() !== type.toLowerCase()) return false;
      if (location !== "All Locations" && !p.location.startsWith(location)) return false;
      if (bhk !== "any" && p.bhk !== Number(bhk)) return false;
      const lakh = p.price / 100000;
      if (budget === "75" && lakh >= 75) return false;
      if (budget === "75-150" && (lakh < 75 || lakh > 150)) return false;
      if (budget === "150-250" && (lakh < 150 || lakh > 250)) return false;
      if (budget === "250+" && lakh <= 250) return false;
      if (onlyFavorites && !favorites.includes(p.id)) return false;
      return true;
    });
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "area") result.sort((a, b) => b.area - a.area);
    return result;
  }, [search, type, location, bhk, budget, sort, onlyFavorites, favorites]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const visible = filtered.slice((page - 1) * perPage, page * perPage);
  const clearFilters = () => {
    setSearch(""); setType("All Types"); setLocation("All Locations");
    setBhk("any"); setBudget("any"); setSort("recommended"); setOnlyFavorites(false);
    setParams({});
  };
  const selectLocation = (name) => { setSearch(name); setLocation("All Locations"); setFiltersOpen(false); };

  return (
    <main className="buy-page">
      <section className="buy-hero">
        <div className="buy-shell buy-hero-inner">
          <div className="buy-hero-copy">
            <span className="buy-eyebrow"><Sparkles size={15} /> DISCOVER YOUR NEXT ADDRESS</span>
            <h1>Find a place to <span>call yours.</span></h1>
            <p>Explore thoughtfully selected homes and investment spaces. Compare options and discover what fits your future.</p>
            <div className="buy-hero-points"><span><ShieldCheck size={17} /> Curated listings</span><span><Check size={17} /> Easy discovery</span></div>
          </div>
          <div className="buy-hero-art" aria-hidden="true"><div className="buy-hero-art-label">URBAN <span>PROPERTIES</span></div></div>
        </div>
      </section>

      <div className="buy-shell buy-content">
        <div className="buy-breadcrumb"><Link to="/">Home</Link><ChevronRight size={15}/><span>Buy Properties</span></div>
        <div className="buy-title-row">
          <div><span className="buy-section-kicker">THE PROPERTY COLLECTION</span><h2>Properties for Sale</h2><p>Browse demo listings across Hyderabad's popular neighborhoods.</p></div>
          <button type="button" className="buy-filter-mobile" onClick={() => setFiltersOpen((x) => !x)} aria-expanded={filtersOpen}><SlidersHorizontal size={18}/> {filtersOpen ? "Hide Filters" : "Show Filters"}</button>
        </div>

        <div className="buy-main-layout">
          <aside className={`buy-sidebar ${filtersOpen ? "is-open" : ""}`} aria-label="Property filters">
            <div className="buy-sidebar-heading"><div><SlidersHorizontal size={19}/><h3>Filter Properties</h3></div><button type="button" onClick={clearFilters}>Reset all</button></div>
            <label className="buy-field"><span>Search</span><div className="buy-input-icon"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Area, property, city..." /></div></label>
            <label className="buy-field"><span>Location</span><div className="buy-select-wrap"><select value={location} onChange={(e) => setLocation(e.target.value)}>{locations.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown size={17}/></div></label>
            <label className="buy-field"><span>Property Type</span><div className="buy-select-wrap"><select value={type} onChange={(e) => setType(e.target.value)}>{types.map((x) => <option key={x}>{x}</option>)}</select><ChevronDown size={17}/></div></label>
            <label className="buy-field"><span>Budget</span><div className="buy-select-wrap"><select value={budget} onChange={(e) => setBudget(e.target.value)}>{budgets.map((x) => <option value={x.value} key={x.value}>{x.label}</option>)}</select><ChevronDown size={17}/></div></label>
            <div className="buy-field"><span>Bedrooms</span><div className="buy-bhk-row">{["any", "1", "2", "3", "4"].map((x) => <button type="button" key={x} className={bhk === x ? "selected" : ""} onClick={() => setBhk(x)}>{x === "any" ? "Any" : `${x}+`.replace("+", "")}</button>)}</div></div>
            <label className="buy-favorite-filter"><input type="checkbox" checked={onlyFavorites} onChange={(e) => setOnlyFavorites(e.target.checked)}/><Heart size={17}/> Saved properties only</label>
            <div className="buy-help-box"><Building2 size={25}/><strong>Need a little guidance?</strong><p>Explore your options with Urban Properties.</p><Link to="/contact-us">Contact our team <ArrowRight size={15}/></Link></div>
          </aside>

          {compareNotice && <p role="alert" style={{color:"#b25c00",fontWeight:700}}>{compareNotice}</p>}
          <section className="buy-results" aria-label="Properties for sale">
            <div className="buy-results-bar"><div><strong>{filtered.length} Properties</strong><span> found in our demo collection</span></div><label className="buy-sort">Sort by <div className="buy-select-wrap"><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="area">Largest Area</option></select><ChevronDown size={16}/></div></label></div>
            <div className="buy-quick-locations"><span>Popular:</span>{["Gachibowli", "Kokapet", "Narsingi", "Tellapur"].map((name) => <button type="button" key={name} className={search === name ? "active" : ""} onClick={() => selectLocation(name)}>{name}</button>)}</div>
            {visible.length ? (
              <div className="buy-property-grid">{visible.map((p) => <article className="buy-property-card" key={p.id}>
                <div className="buy-property-image"><img src={p.image} alt={`${p.type} listing: ${p.name}`} loading="lazy"/><span className="buy-property-tag">{p.tag}</span><button type="button" className={`buy-heart ${favorites.includes(p.id) ? "saved" : ""}`} aria-label={favorites.includes(p.id) ? `Remove ${p.name} from saved` : `Save ${p.name}`} aria-pressed={favorites.includes(p.id)} onClick={() => toggleWishlist(p.id)}><Heart size={20} fill={favorites.includes(p.id) ? "currentColor" : "none"}/></button></div>
                <div className="buy-property-body"><span className="buy-property-type">{p.type}</span><h3>{p.name}</h3><p className="buy-property-location"><MapPin size={15}/>{p.location}, {p.city}</p><div className="buy-property-price">{formatPrice(p.price)}</div><div className="buy-property-specs"><span><BedDouble size={17}/>{p.bhk ? `${p.bhk} BHK` : "Office"}</span><span><Maximize2 size={16}/>{p.area.toLocaleString("en-IN")} sq.ft</span><span><Bath size={17}/>{p.baths} Bath</span></div><div className="up-compare-buy-actions"><Link to={`/property/${p.id}`} className="buy-view-btn">View Property <ArrowRight size={17}/></Link><button type="button" className={`up-compare-button ${comparedIds.includes(p.id) ? "is-selected" : ""}`} aria-pressed={comparedIds.includes(p.id)} onClick={() => handleCompare(p.id)}><GitCompareArrows size={16}/>{comparedIds.includes(p.id) ? "Added" : "Compare"}</button></div></div>
              </article>)}</div>
            ) : <div className="buy-empty"><Search size={34}/><h3>No matching properties</h3><p>Try a different location, budget or property type.</p><button type="button" onClick={clearFilters}>Clear all filters</button></div>}
            {totalPages > 1 && <nav className="buy-pagination" aria-label="Property pages"><button type="button" disabled={page === 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page"><ChevronLeft size={18}/></button>{Array.from({length: totalPages}, (_, i) => <button type="button" key={i} className={page === i + 1 ? "current" : ""} aria-current={page === i + 1 ? "page" : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>)}<button type="button" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Next page"><ChevronRight size={18}/></button></nav>}
          </section>
        </div>
      </div>

      <section className="buy-bottom-cta"><div className="buy-shell buy-bottom-cta-inner"><div><span>YOUR NEXT CHAPTER STARTS HERE</span><h2>Make your next move with confidence.</h2><p>Discover more properties, ask questions and explore possibilities.</p></div><Link to="/contact-us">Get in Touch <ArrowRight size={18}/></Link></div></section>

    </main>
  );
}
