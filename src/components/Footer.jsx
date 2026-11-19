
import { Link } from "react-router-dom";

import {
  Building2,
  House,
  Headset,
  Handshake,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Landmark,
  HeartHandshake,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

import urbanLogo from "../assets/urban-logo.png";
import "./Footer.css";

// ==========================================
// COMPANY LINKS
// ==========================================

const company = [
  ["About Us", "/about-us"],
  ["Careers", "/careers"],
  ["Contact Us", "/contact-us"],
];

// ==========================================
// PROPERTIES LINKS
// ==========================================

const properties = [
  ["Buy Properties", "/buy"],
  ["Rent Properties", "/rent"],
  ["New Properties", "/new-properties"],
  ["Request a Loan", "/request-loan"],
  ["Commercial", "/commercial"],
  ["Plots & Land", "/plots-land"],
];

// ==========================================
// SUPPORT LINKS
// ==========================================

const support = [
  ["Help Center", "/help-center"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms & Conditions", "/terms-conditions"],
  ["FAQs", "/faqs"],
  ["Blogs & News", "/blogs-news"],
  ["Partner With Us", "/partner-with-us"],
];

// ==========================================
// PARTNER LINKS
// ==========================================

const partners = [
  ["Become an Agent", "/login/agent"],
  ["Become a Banker", "/login/banker"],
  ["Become a Corporate/Builder", "/login/corporate-builder"],
  ["Become an Investor", "/login/investor"],
  ["Become a User", "/login/user"],
  ["Become a Legal Advisor", "/login/legal-advisor"],
];

// ==========================================
// FOOTER SECTIONS
// ==========================================

const sections = [
  ["Company", company, Building2],
  ["Properties", properties, House],
  ["Support", support, Headset],
  ["Partner With Us", partners, Handshake],
];

// ==========================================
// FOOTER COMPONENT
// ==========================================

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">

        {/* ==================================
            FOOTER TOP SECTION
        ================================== */}

        <div className="footer-grid">

          {/* ABOUT & LOGO */}
          <div className="footer-about">

            <Link
              to="/"
              className="footer-logo"
              aria-label="Urban Properties Home"
            >
              <img
                src={urbanLogo}
                alt="Urban Properties Logo"
                className="footer-logo-img"
              />
            </Link>

            <div className="footer-accent"></div>

            <p>
              Discover exceptional spaces with confidence,
              clarity and a more personal approach to property.
            </p>

            <span className="footer-kicker">
              FOLLOW US
            </span>

            {/* SOCIAL MEDIA */}
            <div className="social-row">

              <span aria-label="Facebook">
                <Facebook size={18} />
              </span>

              <span aria-label="Instagram">
                <Instagram size={18} />
              </span>

              <span aria-label="LinkedIn">
                <Linkedin size={18} />
              </span>

              <span aria-label="YouTube">
                <Youtube size={18} />
              </span>

            </div>
          </div>

          {/* FOOTER LINK COLUMNS */}
          {sections.map(([heading, links, Icon]) => (
            <div
              className="footer-column"
              key={heading}
            >

              <h3>
                <span className="footer-heading-icon">
                  <Icon size={18} />
                </span>

                {heading.toUpperCase()}
              </h3>

              {links.map(([label, path]) => (
                <Link
                  to={path}
                  key={path}
                >
                  <span className="footer-chevron">
                    ›
                  </span>

                  {label}
                </Link>
              ))}

            </div>
          ))}

        </div>

        {/* ==================================
            CONTACT SECTION
        ================================== */}

        <div className="footer-contact">

          <div className="footer-contact-heading">
            <strong>CONTACT US</strong>

            <span>
              We're here to help you find your next property.
            </span>
          </div>

          <div className="contact-grid">

            {/* PHONE */}
            <div>
              <Phone size={22} />

              <section>
                <strong>Call us</strong>

                <p>
                  Contact details coming soon
                </p>
              </section>
            </div>

            {/* EMAIL */}
            <div>
              <Mail size={22} />

              <section>
                <strong>Email us</strong>

                <p>
                  Contact details coming soon
                </p>
              </section>
            </div>

            {/* ADDRESS */}
            <div>
              <MapPin size={22} />

              <section>
                <strong>Visit us</strong>

                <p>
                  Office address to be updated
                </p>
              </section>
            </div>

          </div>
        </div>

        {/* ==================================
            TRUST FEATURES
        ================================== */}

        <div className="trust-grid">

          <div>
            <BadgeCheck />

            <section>
              <strong>Curated Listings</strong>

              <p>
                Discover homes and spaces selected
                for your needs.
              </p>
            </section>
          </div>

          <div>
            <Landmark />

            <section>
              <strong>More Choices</strong>

              <p>
                Explore apartments, commercial
                spaces and land.
              </p>
            </section>
          </div>

          <div>
            <HeartHandshake />

            <section>
              <strong>Clear Guidance</strong>

              <p>
                Understand your options at
                every step.
              </p>
            </section>
          </div>

          <div>
            <Headset />

            <section>
              <strong>Here to Help</strong>

              <p>
                Find answers and reach
                the right team.
              </p>
            </section>
          </div>

        </div>

        {/* ==================================
            FOOTER BOTTOM
        ================================== */}

        <div className="footer-bottom">

          {/* COPYRIGHT */}
          <div>
            <p>
              © {new Date().getFullYear()} Urban Properties.
              All rights reserved.
            </p>

            <small>
              Frontend demo · Sample listings and content
            </small>
          </div>

          {/* BRAND */}
          <div className="footer-bottom-mark">
            URBAN <span>PROPERTIES</span>
          </div>

          {/* SECURITY */}
          <div className="secure-note">
            <ShieldCheck size={19} />

            <span>
              Secure browsing experience
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
