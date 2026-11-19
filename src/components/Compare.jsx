import { Link } from "react-router-dom";
import { ArrowRight, GitCompareArrows, MapPin, Trash2, X, BedDouble, Bath, Maximize2 } from "lucide-react";
import { allProperties, formatPrice } from "./propertyData";
import { useCompare } from "./compareStore";
import "./Compare.css";

const fields = [
  ["Property type", (p) => p.type],
  ["Location", (p) => `${p.location}, ${p.city}`],
  ["Price", (p) => formatPrice(p.price, p.status)],
  ["Listing status", (p) => p.status],
  ["Bedrooms", (p) => p.bhk ? `${p.bhk} BHK` : "N/A"],
  ["Bathrooms", (p) => p.baths ? `${p.baths}` : "N/A"],
  ["Area", (p) => `${Number(p.area || 0).toLocaleString("en-IN")} sq.ft`],
  ["Amenities", (p) => (p.amenities || []).join(", ") || "Not specified"],
];

export default function Compare() {
  const { comparedIds, removeCompare, clearCompare } = useCompare();
  const properties = comparedIds.map((id) => allProperties.find((p) => p.id === id)).filter(Boolean);

  return (
    <main className="up-compare-page">
      <header className="up-compare-hero">
        <div className="up-compare-shell">
          <span className="up-compare-eyebrow">URBAN PROPERTIES / COMPARE</span>
          <h1>Compare your <em>next move.</em></h1>
          <p>See property details side by side to make a more informed choice.</p>
          <div className="up-compare-count"><GitCompareArrows size={19}/> {properties.length} of 4 properties selected</div>
        </div>
      </header>
      <div className="up-compare-shell up-compare-main">
        <div className="up-compare-toolbar">
          <div><h2>Property Comparison</h2><p>Choose 2–4 properties for the best comparison.</p></div>
          <div className="up-compare-toolbar-actions">
            <Link to="/buy">Add Properties <ArrowRight size={17}/></Link>
            {properties.length > 0 && <button type="button" onClick={clearCompare}><Trash2 size={17}/> Clear All</button>}
          </div>
        </div>
        {!properties.length ? (
          <div className="up-compare-empty">
            <GitCompareArrows size={48}/>
            <h3>No properties selected</h3>
            <p>Use the Compare button on any Buy listing or property details page.</p>
            <Link to="/buy">Browse Properties <ArrowRight size={18}/></Link>
          </div>
        ) : (
          <div className="up-compare-scroll" role="region" aria-label="Side-by-side property comparison" tabIndex={0}>
            <table className="up-compare-table">
              <thead><tr>
                <th scope="col" className="up-compare-label">Compare</th>
                {properties.map((p) => <th scope="col" key={p.id}>
                  <div className="up-compare-property">
                    <button type="button" className="up-compare-remove" aria-label={`Remove ${p.name} from comparison`} onClick={() => removeCompare(p.id)}><X size={18}/></button>
                    <Link to={`/property/${p.id}`}><img src={p.image} alt={p.name} loading="lazy"/></Link>
                    <span>{p.type}</span>
                    <h3>{p.name}</h3>
                    <p><MapPin size={15}/>{p.location}, {p.city}</p>
                    <strong>{formatPrice(p.price, p.status)}</strong>
                    <Link className="up-compare-view" to={`/property/${p.id}`}>View Details <ArrowRight size={16}/></Link>
                  </div>
                </th>)}
              </tr></thead>
              <tbody>{fields.map(([label, getValue]) => <tr key={label}>
                <th scope="row">{label}</th>
                {properties.map((p) => <td key={p.id}>{getValue(p)}</td>)}
              </tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
