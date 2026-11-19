const image = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

const listings = [
  // BUY
  ["buy-1", "Skyline Urban Heights", "Buy", "Apartment", "Gachibowli", 9850000, 3, 1640, 3, "photo-1600607687939-ce8a6c25118c", "Featured"],
  ["buy-2", "The Grand Living", "Buy", "Apartment", "Tellapur", 11200000, 3, 1780, 3, "photo-1600566753190-17f0baa2a6c3", "Premium"],
  ["buy-3", "Urban Nest Apartments", "Buy", "Apartment", "Narsingi", 7800000, 2, 1240, 2, "photo-1600607687644-c7171b42498f", "Popular"],
  ["buy-4", "Palm Avenue Apartment", "Buy", "Apartment", "Kukatpally", 9900000, 3, 1570, 2, "photo-1600566753086-00f18fb6b3ea", "Featured"],
  ["buy-5", "The Aurelia Residences", "Buy", "Villa", "Kokapet", 18500000, 4, 2850, 4, "photo-1600596542815-ffad4c1539a9", "Luxury"],
  ["buy-6", "Oakwood Luxury Villas", "Buy", "Villa", "Narsingi", 21500000, 4, 3100, 4, "photo-1600047509807-ba8f99d2cdde", "Premium"],
  ["buy-7", "Aurora Signature Villa", "Buy", "Villa", "Kokapet", 29500000, 4, 3200, 4, "photo-1613490493576-7fde63acd811", "Luxury"],
  ["buy-8", "Westbrook Luxury Villa", "Buy", "Villa", "Tellapur", 34500000, 4, 3600, 4, "photo-1600607687920-4e2a09cf159d", "Exclusive"],
  ["buy-9", "Serene Independent Home", "Buy", "Independent House", "Kondapur", 16500000, 3, 2100, 3, "photo-1600585154340-be6161a56a0c", "Featured"],
  ["buy-10", "Cedar Grove House", "Buy", "Independent House", "Tellapur", 17800000, 3, 2320, 3, "photo-1600047509782-20d39509f26d", "Popular"],

  // COMMERCIAL
  ["commercial-1", "The Meridian Business Hub", "Commercial", "Commercial", "Financial District", 24000000, 0, 2200, 2, "photo-1497366811353-6870744d04b2", "Investment"],
  ["commercial-2", "Metro Edge Commercial", "Commercial", "Commercial", "Miyapur", 18500000, 0, 1650, 1, "photo-1486406146926-c627a92ad1ab", "Featured"],
  ["commercial-3", "Capital Square Offices", "Commercial", "Commercial", "Kokapet", 22500000, 0, 2100, 2, "photo-1497366754035-f200968a6e72", "Premium"],
  ["commercial-4", "Urban Business Center", "Commercial", "Commercial", "Gachibowli", 19500000, 0, 1800, 2, "photo-1497366858526-0766cadbe8fa", "New"],

  // PLOTS & LAND
  ["land-1", "Green Valley Residential Plot", "Plots & Land", "Land", "Shankarpally", 6500000, 0, 2400, 0, "photo-1500382017468-9049fed747ef", "Featured"],
  ["land-2", "Sunrise Premium Plot", "Plots & Land", "Land", "Mokila", 8200000, 0, 2700, 0, "photo-1473448912268-2022ce9509d8", "Premium"],
  ["land-3", "Urban Meadows Plot", "Plots & Land", "Land", "Patancheru", 4800000, 0, 1800, 0, "photo-1441974231531-c6227db76b6e", "Value"],
  ["land-4", "Lakefront Investment Land", "Plots & Land", "Land", "Kollur", 9500000, 0, 3200, 0, "photo-1500534623283-312aade485b7", "Investment"],

  // RENT
  ["rent-1", "Gachibowli Premium Apartment", "Rent", "Apartment", "Gachibowli", 35000, 2, 1250, 2, "photo-1600607687939-ce8a6c25118c", "Popular"],
  ["rent-2", "Kondapur Family Apartment", "Rent", "Apartment", "Kondapur", 42000, 3, 1650, 3, "photo-1600566753190-17f0baa2a6c3", "Featured"],
  ["rent-3", "Miyapur City Apartment", "Rent", "Apartment", "Miyapur", 22000, 2, 1100, 2, "photo-1600607687644-c7171b42498f", "Value"],
  ["rent-4", "Kokapet Luxury Villa", "Rent", "Villa", "Kokapet", 95000, 4, 3100, 4, "photo-1613490493576-7fde63acd811", "Luxury"],
  ["rent-5", "Narsingi Modern Villa", "Rent", "Villa", "Narsingi", 78000, 3, 2600, 3, "photo-1600047509807-ba8f99d2cdde", "Premium"],
  ["rent-6", "Tellapur Independent House", "Rent", "Independent House", "Tellapur", 45000, 3, 2000, 3, "photo-1600585154340-be6161a56a0c", "Featured"],
  ["rent-7", "Financial District Office", "Rent", "Commercial", "Financial District", 125000, 0, 2200, 2, "photo-1497366811353-6870744d04b2", "Commercial"],
  ["rent-8", "Kukatpally Retail Space", "Rent", "Commercial", "Kukatpally", 65000, 0, 1400, 1, "photo-1486406146926-c627a92ad1ab", "Commercial"],

  // NEW PROPERTIES
  ["new-1", "Urban Elite Residences", "New Properties", "Apartment", "Tellapur", 10500000, 3, 1750, 3, "photo-1600607687920-4e2a09cf159d", "New Launch"],
  ["new-2", "The Grand Horizon Villas", "New Properties", "Villa", "Kollur", 22500000, 4, 3000, 4, "photo-1600596542815-ffad4c1539a9", "New Launch"],
  ["new-3", "Metro View Apartments", "New Properties", "Apartment", "Miyapur", 7600000, 2, 1300, 2, "photo-1600566752355-35792bedcfea", "New Launch"],
  ["new-4", "Silver Oak Homes", "New Properties", "Independent House", "Patancheru", 12800000, 3, 2050, 3, "photo-1600047509807-ba8f99d2cdde", "New Launch"],

  // BUILDERS
  ["builder-1", "Urban Heights Phase One", "Builders", "Apartment", "Gachibowli", 11800000, 3, 1850, 3, "photo-1600607687939-ce8a6c25118c", "Project"],
  ["builder-2", "Greenfield Villa Community", "Builders", "Villa", "Kokapet", 26500000, 4, 3350, 4, "photo-1613490493576-7fde63acd811", "Project"],
  ["builder-3", "The Signature Towers", "Builders", "Apartment", "Narsingi", 14200000, 3, 1950, 3, "photo-1600607687920-4e2a09cf159d", "Project"],
  ["builder-4", "Royal Meadows Township", "Builders", "Independent House", "Tellapur", 18500000, 3, 2450, 3, "photo-1600585154340-be6161a56a0c", "Project"],
];

export const properties = listings.map((item) => {
  const [
    id, name, category, type, location,
    price, bhk, area, baths, imageId, tag
  ] = item;

  const status =
    category === "Rent" ? "For Rent" : "For Sale";

  return {
    id,
    name,
    title: name,
    category,
    type,
    location,
    city: "Hyderabad",
    price,
    bhk,
    area,
    baths,
    image: image(imageId),
    tag,
    status,
    description: `${name} is a ${type.toLowerCase()} property located in ${location}, Hyderabad.`,
    amenities:
      type === "Land"
        ? ["Road Access", "Open Plot"]
        : type === "Commercial"
        ? ["Parking", "Security", "Power Backup"]
        : ["Parking", "Security", "Power Backup", "Water Supply"],
  };
});

export const allProperties = properties;

export const saleProperties = properties.filter(
  (p) => p.status === "For Sale"
);

export const rentProperties = properties.filter(
  (p) => p.status === "For Rent"
);

export const newProperties = properties.filter(
  (p) => p.category === "New Properties"
);

export const commercialProperties = properties.filter(
  (p) => p.category === "Commercial"
);

export const landProperties = properties.filter(
  (p) => p.category === "Plots & Land"
);

export const builderProperties = properties.filter(
  (p) => p.category === "Builders"
);

export const homeListings = {
  buy: properties.filter(
    (p) => p.category === "Buy"
  ).slice(0, 4),

  rent: rentProperties.slice(0, 4),

  newProperties: newProperties.slice(0, 4),

  commercial: commercialProperties.slice(0, 4),

  land: landProperties.slice(0, 4),

  builders: builderProperties.slice(0, 4),
};

export function getPropertyById(id) {
  return properties.find(
    (p) => String(p.id) === String(id)
  );
}

export function getRelatedProperties(
  currentProperty,
  limit = 4
) {
  if (!currentProperty) return [];

  return properties
    .filter(
      (p) =>
        p.id !== currentProperty.id &&
        p.status === currentProperty.status &&
        p.type === currentProperty.type
    )
    .slice(0, limit);
}

export function formatPrice(
  price,
  status = "For Sale"
) {
  const amount = Number(price) || 0;

  if (status === "For Rent") {
    return `₹ ${amount.toLocaleString("en-IN")}/month`;
  }

  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(2)} L`;
  }

  return `₹ ${amount.toLocaleString("en-IN")}`;
}