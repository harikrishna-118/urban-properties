import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, Bath, BedDouble, Building2, Calculator,
  CheckCircle2, ChevronLeft, ChevronRight, CircleDollarSign,
  FileCheck2, FilePenLine, Headphones, Heart, Home as HomeIcon,
  IndianRupee, Landmark, MapPin, Menu, MoveUpRight, Search,
  ShieldCheck, SlidersHorizontal, Star, TrendingUp, Users, Warehouse,
  Ruler, BriefcaseBusiness, Grid2X2, House, Smartphone, Play,
  BarChart3, X, MessageCircle, Navigation, KeyRound
} from "lucide-react";
import "./Home.css";
import { usePropertyCollections } from "./wishlistStore";
import { homeListings, saleProperties, rentProperties, formatPrice } from "./propertyData";

const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

// homeListings is an object containing category arrays, not an array itself.
const featuredListings = Array.isArray(homeListings?.buy) ? homeListings.buy : [];
const newLaunchListings = Array.isArray(homeListings?.newProperties) ? homeListings.newProperties : [];
const displayPrice = (property) => formatPrice(property.price, property.status);
const displayBhk = (property) => property.bhk ? `${property.bhk} BHK` : "Office / Plot";
const displayArea = (property) => `${Number(property.area || 0).toLocaleString("en-IN")} Sq Ft`;
const displayBaths = (property) => property.baths ? `${property.baths} Baths` : "—";

const categories = [
  { name: "Apartments / Projects", icon: Building2, type: "Apartment" },
  { name: "Luxury Villas", icon: House, type: "Villa" },
  { name: "Flats", icon: Grid2X2, type: "Apartment" },
  { name: "Independent Houses", icon: HomeIcon, type: "Independent House" },
  { name: "Commercial", icon: BriefcaseBusiness, type: "Commercial" },
  { name: "Office Spaces", icon: Landmark, type: "Commercial" },
  { name: "Plots & Land", icon: MapPin, type: "Land" },
  { name: "Warehouses", icon: Warehouse, type: "Commercial" }
];

const advantages = [
  { title: "Verified Properties", subtitle: "Carefully reviewed listings", icon: BadgeCheck },
  { title: "Expert Guidance", subtitle: "Support at every step", icon: Headphones },
  { title: "Loan Assistance", subtitle: "Finance made simpler", icon: Landmark },
  { title: "Transparent Process", subtitle: "Clear property information", icon: FileCheck2 },
  { title: "End-to-End Support", subtitle: "From search to handover", icon: ShieldCheck }
];

const articles = [
  { title: "A Smarter Guide to Buying Your First Home", category: "BUYING GUIDE", date: "12 Nov 2026", image: photo("photo-1600607687920-4e2a09cf159d"), desc: "What to look for before choosing the perfect place to call home." },
  { title: "Where Hyderabad's Property Market Is Heading", category: "MARKET INSIGHTS", date: "08 Nov 2026", image: photo("photo-1486406146926-c627a92ad1ab"), desc: "Explore the factors shaping demand in growing neighborhoods." },
  { title: "How to Evaluate a Property Investment", category: "INVESTMENT", date: "03 Nov 2026", image: photo("photo-1560518883-ce09059eeffa"), desc: "Understand location, rental potential, and long-term value." },
  { title: "Design Ideas for Modern Urban Living", category: "LIFESTYLE", date: "28 Oct 2026", image: photo("photo-1600210492486-724fe5c67fb0"), desc: "Practical inspiration for a refined and comfortable home." }
];

const testimonials = [
  { name: "Priya Reddy", location: "Gachibowli, Hyderabad", initials: "PR", text: "The entire experience felt organized and straightforward. We found a home that suited our needs without the usual stress." },
  { name: "Arjun Mehta", location: "Kokapet, Hyderabad", initials: "AM", text: "I appreciated the clear property comparisons and helpful guidance throughout the search process." },
  { name: "Sneha Rao", location: "Narsingi, Hyderabad", initials: "SR", text: "The platform made exploring neighborhoods and different property options so much easier." },
  { name: "Kiran Kumar", location: "Tellapur, Hyderabad", initials: "KK", text: "A clean experience with useful information. It helped me shortlist options with more confidence." },
  { name: "Neha Shah", location: "Kondapur, Hyderabad", initials: "NS", text: "I liked having property details and categories presented in one easy-to-use place." }
];

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

function PropertyCard({ property, favorites, onFavorite }) {
  return (
    <article className="uh-property-card">
      <div className="uh-property-image-wrap">
        <img src={property.image} alt={property.title || property.name} loading="lazy" />
        <span className="uh-property-type">{property.type}</span>
        <button type="button" className={`uh-favorite ${favorites.includes(property.id) ? "is-saved" : ""}`}
          aria-label={favorites.includes(property.id) ? "Remove from saved properties" : "Save property"}
          aria-pressed={favorites.includes(property.id)} onClick={() => onFavorite(property.id)}>
          <Heart size={19} fill={favorites.includes(property.id) ? "currentColor" : "none"} />
        </button>
        <span className="uh-image-label">{property.label || property.tag || property.status}</span>
      </div>
      <div className="uh-property-content">
        <div className="uh-property-title-row"><h3>{property.title || property.name}</h3><MoveUpRight size={18} /></div>
        <p className="uh-property-location"><MapPin size={15} />{property.location}{property.city ? `, ${property.city}` : ""}</p>
        <div className="uh-property-price">{displayPrice(property)}<span>{property.status === "For Rent" ? "Monthly rent · Sample" : "Asking price · Sample"}</span></div>
        <div className="uh-property-meta">
          <span><BedDouble size={16} />{displayBhk(property)}</span>
          <span><Ruler size={16} />{displayArea(property)}</span>
          <span><Bath size={16} />{displayBaths(property)}</span>
        </div>
        <Link to={`/property/${property.id}`} className="uh-property-button">View Property <ArrowRight size={17} /></Link>
      </div>
    </article>
  );
}

function SectionTitle({ eyebrow, title, link, linkText = "Explore all" }) {
  return (
    <div className="uh-section-heading">
      <div><span className="uh-eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      {link && <Link to={link} className="uh-section-link">{linkText}<ArrowRight size={18} /></Link>}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("Buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All Types");
  const [bhk, setBhk] = useState("Any");
  const [budget, setBudget] = useState("Any Budget");
  const { savedIds: favorites, toggleWishlist: toggleFavorite } = usePropertyCollections();
  const [reviewPage, setReviewPage] = useState(0);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const emi = useMemo(() => {
    const n = Number(years) * 12;
    const r = Number(rate) / 1200;
    if (!n) return 0;
    return r === 0 ? Number(loan) / n : Number(loan) * r * (1 + r) ** n / ((1 + r) ** n - 1);
  }, [loan, rate, years]);


  const searchProperties = (event) => {
    event?.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (type !== "All Types") params.set("type", type);
    if (bhk !== "Any") params.set("bhk", bhk);
    if (budget !== "Any Budget") params.set("budget", budget);
    const route = mode === "Rent" ? "/rent" : mode === "Commercial" ? "/commercial" : mode === "Land" ? "/plots-land" : "/buy";
    navigate(`${route}${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <main className="urban-home">
      {/* HERO */}
      <section className="uh-hero">
        <div className="uh-hero-backdrop" />
        <div className="uh-container uh-hero-grid">
          <div className="uh-hero-copy">
            <span className="uh-hero-pill"><ShieldCheck size={17} /> YOUR NEXT CHAPTER STARTS HERE</span>
            <h1>Discover Spaces.<br /><span>Define Your Future.</span></h1>
            <p>Find remarkable homes, premium commercial spaces, and investment opportunities — all in one thoughtfully designed place.</p>
            <div className="uh-hero-actions">
              <Link to="/buy" className="uh-primary-button">Explore Properties <ArrowRight size={19} /></Link>
              <Link to="/contact-us" className="uh-ghost-button">Talk to an Expert <MoveUpRight size={18} /></Link>
            </div>
            <div className="uh-hero-trust"><span className="uh-trust-stars">★★★★★</span><span>Explore with confidence</span><span className="uh-hero-divider" /><span>Urban Properties</span></div>
          </div>

          <form className="uh-search-panel" onSubmit={searchProperties}>
            <div className="uh-search-top"><div><span className="uh-mini-label">FIND YOUR PERFECT SPACE</span><h2>Property Search</h2></div><SlidersHorizontal size={22} /></div>
            <div className="uh-search-tabs" role="group" aria-label="Search property category">
              {["Buy", "Rent", "Commercial", "Land", "Villa"].map((item) => (
                <button type="button" key={item} className={mode === item ? "active" : ""} onClick={() => {
                  setMode(item);
                  if (item === "Villa") setType("Villa");
                  else if (item === "Commercial") setType("Commercial");
                  else if (item === "Land") setType("Land");
                  else setType("All Types");
                }}>{item}</button>
              ))}
            </div>
            <label className="uh-search-location"><MapPin size={20} /><input aria-label="Search location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Search by location, project or landmark" /><Navigation size={19} /></label>
            <div className="uh-search-filters">
              <label>Property Type<select value={type} onChange={(e) => setType(e.target.value)}><option>All Types</option><option>Apartment</option><option>Villa</option><option>Independent House</option><option>Commercial</option><option>Land</option></select></label>
              <label>BHK Type<select value={bhk} onChange={(e) => setBhk(e.target.value)}><option>Any</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option><option>5+ BHK</option></select></label>
              <label>Budget<select value={budget} onChange={(e) => setBudget(e.target.value)}><option>Any Budget</option><option>Under ₹50 L</option><option>₹50 L - ₹1 Cr</option><option>₹1 Cr - ₹2 Cr</option><option>Above ₹2 Cr</option></select></label>
            </div>
            <button className="uh-search-submit" type="submit"><Search size={20} /> Find Properties <ArrowRight size={19} /></button>
            <div className="uh-popular"><strong>Popular searches</strong><div>{["Gachibowli", "Kokapet", "Narsingi", "Tellapur"].map((place) => <button type="button" key={place} onClick={() => setLocation(place)}>{place}</button>)}</div></div>
          </form>
        </div>
      </section>

      {/* STATS */}
      <section className="uh-stats-shell uh-container" aria-label="Platform highlights">
        <div className="uh-stats">
          {[
            { icon: Building2, value: "120+", label: "Sample Listings" },
            { icon: BadgeCheck, value: "08", label: "Property Categories" },
            { icon: Users, value: "24/7", label: "Explore Online" },
            { icon: TrendingUp, value: "01", label: "Smarter Experience" }
          ].map(({ icon: Icon, value, label }) => <div className="uh-stat" key={label}><span className="uh-stat-icon"><Icon size={25} /></span><div><strong>{value}</strong><p>{label}</p></div></div>)}
        </div>
      </section>

      {/* FEATURED */}
      <section className="uh-section uh-featured" id="featured-properties">
        <div className="uh-container">
          <SectionTitle eyebrow="HANDPICKED SPACES" title="Featured Properties" link="/buy" linkText="View all properties" />
          <div className="uh-property-grid">{featuredListings.slice(0, 3).map((item) => <PropertyCard key={item.id} property={item} favorites={favorites} onFavorite={toggleFavorite} />)}</div>
        </div>
      </section>


      {/* CATEGORY COLLECTIONS — 4 demo properties per section, View All goes to its navbar page */}
      <section className="uh-section uh-collections" id="property-collections">
        <div className="uh-container">
          <div className="uh-centered-heading"><span className="uh-eyebrow">EXPLORE BY CATEGORY</span><h2>Every Kind of <span>Property</span></h2><p>Discover homes, rentals, new launches, commercial spaces, plots and builder projects.</p></div>
          {[
            { title:"Buy Properties", subtitle:"Homes and investments for sale", href:"/buy", items:saleProperties.filter(p=>['Apartment','Villa','Independent House'].includes(p.type)).slice(0,4) },
            { title:"Rent Properties", subtitle:"Homes and spaces available for rent", href:"/rent", items:rentProperties.slice(0,4) },
            { title:"New Properties", subtitle:"Fresh launches and new homes", href:"/new-properties", items:newLaunchListings.slice(0,4) },
            { title:"Commercial Properties", subtitle:"Offices, retail and business spaces", href:"/commercial", items:homeListings.commercial || [] },
            { title:"Plots & Land", subtitle:"Open plots and investment land", href:"/plots-land", items:homeListings.land || [] },
            { title:"Builders & Projects", subtitle:"Discover developer-led projects", href:"/builders", items:homeListings.builders || [] }
          ].map(group=>(
            <div className="uh-collection" key={group.title}>
              <div className="uh-collection-heading"><div><h3>{group.title}</h3><p>{group.subtitle}</p></div><Link to={group.href} className="uh-collection-viewall">View All <ArrowRight size={18}/></Link></div>
              <div className="uh-collection-grid">{group.items.map(p=>(
                <article className="uh-collection-card" key={p.id}>
                  <div className="uh-collection-image-wrap">
                    <Link to={`/property/${p.id}`} className="uh-collection-image"><img src={p.image} alt={p.name} loading="lazy"/><span>{p.type}</span></Link>
                    <button type="button" className={`uh-collection-favorite ${favorites.includes(p.id) ? "is-saved" : ""}`} onClick={() => toggleFavorite(p.id)} aria-label={favorites.includes(p.id) ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} aria-pressed={favorites.includes(p.id)}><Heart size={19} fill={favorites.includes(p.id) ? "currentColor" : "none"}/></button>
                  </div>
                  <div className="uh-collection-body"><h4>{p.name}</h4><p><MapPin size={14}/>{p.location}</p><strong>{displayPrice(p)}</strong><Link to={`/property/${p.id}`}>View Property <ArrowRight size={16}/></Link></div>
                </article>
              ))}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="uh-section uh-categories-section">
        <div className="uh-container">
          <SectionTitle eyebrow="EXPLORE YOUR OPTIONS" title="Find Your Kind of Space" />
          <div className="uh-category-grid">{categories.map(({ name, icon: Icon, type: categoryType }, index) => <Link key={name} to={categoryType === "Land" ? "/plots-land" : categoryType === "Commercial" ? "/commercial" : `/buy?type=${encodeURIComponent(categoryType)}`} className="uh-category-card"><span className="uh-category-icon"><Icon size={28} strokeWidth={1.7} /></span><strong>{name}</strong><span className="uh-category-number">0{index + 1}</span><ArrowRight className="uh-category-arrow" size={18} /></Link>)}</div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="uh-section uh-why-section">
        <div className="uh-container">
          <div className="uh-centered-heading"><span className="uh-eyebrow">THE URBAN ADVANTAGE</span><h2>Why Choose <span>Urban Properties?</span></h2><p>A better property journey begins with the right information and thoughtful support.</p></div>
          <div className="uh-advantages-grid">{advantages.map(({ title, subtitle, icon: Icon }) => <article className="uh-advantage" key={title}><span><Icon size={29} strokeWidth={1.7} /></span><h3>{title}</h3><p>{subtitle}</p></article>)}</div>
        </div>
      </section>

      {/* NEW LAUNCHES */}
      <section className="uh-section uh-launches-section">
        <div className="uh-container"><SectionTitle eyebrow="FRESH ON THE MARKET" title="New & Noteworthy" link="/new-properties" linkText="See new launches" /><div className="uh-property-grid">{newLaunchListings.slice(0, 4).map((item) => <PropertyCard key={item.id} property={item} favorites={favorites} onFavorite={toggleFavorite} />)}</div></div>
      </section>

      {/* TOOLS */}
      <section className="uh-tools-section uh-container">
        <div className="uh-tools-banner"><div className="uh-tools-heading"><span className="uh-eyebrow">SMARTER DECISIONS</span><h2>Investment Tools</h2><p>Helpful resources to plan your next move.</p></div><div className="uh-tools-grid">{[
          { icon: Calculator, title: "EMI Calculator", desc: "Estimate monthly payments", action: () => setCalculatorOpen(true) },
          { icon: BarChart3, title: "ROI Calculator", desc: "Understand your returns", action: () => setCalculatorOpen(true) },
          { icon: House, title: "Rental Yield", desc: "Explore rental potential", action: () => setCalculatorOpen(true) },
          { icon: FilePenLine, title: "Stamp Duty", desc: "Review purchase costs", action: () => navigate("/request-loan") },
          { icon: CheckCircle2, title: "Loan Eligibility", desc: "Plan your financing", action: () => navigate("/request-loan") }
        ].map(({ icon: Icon, title, desc, action }) => <button type="button" className="uh-tool" key={title} onClick={action}><span><Icon size={27} /></span><strong>{title}</strong><small>{desc}</small></button>)}</div></div>
      </section>

      {/* BLOGS */}
      <section className="uh-section uh-blogs-section"><div className="uh-container"><SectionTitle eyebrow="THE URBAN JOURNAL" title="Insights & Inspiration" link="/blogs-news" linkText="Read all articles" /><div className="uh-blog-grid">{articles.map((article, index) => <article className="uh-blog-card" key={article.title}><div className="uh-blog-image"><img src={article.image} alt={article.title} loading="lazy" /></div><div className="uh-blog-content"><div className="uh-blog-meta"><span>{article.category}</span><time>{article.date}</time></div><h3>{article.title}</h3><p>{article.desc}</p><Link to={`/blogs-news?article=${index + 1}`}>Read article <ArrowRight size={17} /></Link></div></article>)}</div></div></section>

      {/* TESTIMONIALS - DEMO CONTENT */}
      <section className="uh-section uh-reviews-section"><div className="uh-container"><div className="uh-centered-heading"><span className="uh-eyebrow">YOUR EXPERIENCE MATTERS</span><h2>Stories From Our Community</h2><p>Illustrative reviews showing how customer stories can appear on the website.</p></div><div className="uh-review-grid">{[0, 1, 2].map((offset) => { const item = testimonials[(reviewPage + offset) % testimonials.length]; return <article className="uh-review" key={item.name}><div className="uh-review-person"><span className="uh-avatar">{item.initials}</span><div><h3>{item.name}</h3><p>{item.location}</p></div><span className="uh-review-quote">“</span></div><div className="uh-review-stars" aria-label="Five stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={17} fill="currentColor" />)}</div><p className="uh-review-text">“{item.text}”</p></article>; })}</div><div className="uh-review-controls"><button type="button" aria-label="Previous reviews" onClick={() => setReviewPage((v) => (v + testimonials.length - 1) % testimonials.length)}><ChevronLeft size={20} /></button><div className="uh-review-dots">{testimonials.map((_, i) => <button type="button" key={i} aria-label={`Show reviews starting at ${i + 1}`} aria-current={reviewPage === i ? "true" : undefined} className={reviewPage === i ? "active" : ""} onClick={() => setReviewPage(i)} />)}</div><button type="button" aria-label="Next reviews" onClick={() => setReviewPage((v) => (v + 1) % testimonials.length)}><ChevronRight size={20} /></button></div></div></section>

      {/* APP PROMO */}
      <section className="uh-app-section"><div className="uh-container"><div className="uh-app-banner"><div className="uh-app-copy"><span className="uh-eyebrow">YOUR PROPERTY JOURNEY, SIMPLIFIED</span><h2>Find Your Next Move<br /><span>With Urban Properties.</span></h2><p>Browse spaces, compare possibilities, and discover what feels right — wherever you are.</p><div className="uh-app-actions"><Link to="/buy" className="uh-primary-button">Browse Properties <ArrowRight size={19} /></Link><Link to="/contact-us" className="uh-app-secondary">Get in Touch <MoveUpRight size={18} /></Link></div><small>Mobile app coming in the future · Website available now</small></div><div className="uh-phone-stage" aria-hidden="true"><div className="uh-floating-property"><span>FEATURED SPACE</span><strong>The Aurelia Residences</strong><small>Kokapet, Hyderabad</small><b>₹ 1.85 Cr</b></div><div className="uh-phone"><div className="uh-phone-speaker" /><div className="uh-phone-screen"><div className="uh-phone-brand"><Building2 size={17} /> URBAN</div><span>Find your place</span><div className="uh-phone-photo" /><div className="uh-phone-mini"><strong>Featured Homes</strong><small>Explore thoughtfully selected spaces</small></div><div className="uh-phone-pill">Explore properties →</div></div></div></div></div></div></section>

      {/* CALCULATOR MODAL */}
      {calculatorOpen && <div className="uh-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCalculatorOpen(false); }}><section className="uh-modal" role="dialog" aria-modal="true" aria-labelledby="uh-modal-title"><div className="uh-modal-top"><div><span className="uh-eyebrow">PLAN AHEAD</span><h2 id="uh-modal-title">EMI Calculator</h2></div><button type="button" aria-label="Close calculator" onClick={() => setCalculatorOpen(false)}><X size={23} /></button></div><p>Estimate your monthly home loan payment. Illustrative only.</p><label>Loan amount (₹)<input type="number" min="10000" step="10000" value={loan} onChange={(e) => setLoan(Math.max(0, Number(e.target.value)))} /></label><label>Annual interest rate (%)<input type="number" min="0" max="50" step="0.1" value={rate} onChange={(e) => setRate(Math.max(0, Number(e.target.value)))} /></label><label>Loan term (years)<input type="number" min="1" max="40" value={years} onChange={(e) => setYears(Math.min(40, Math.max(1, Number(e.target.value))))} /></label><div className="uh-emi-result"><span>Estimated monthly EMI</span><strong>{formatMoney(emi || 0)}</strong></div><Link to="/request-loan" className="uh-primary-button" onClick={() => setCalculatorOpen(false)}>Explore Loan Assistance <ArrowRight size={18} /></Link></section></div>}
    </main>
  );
}
