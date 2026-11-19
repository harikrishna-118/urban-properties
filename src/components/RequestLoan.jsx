import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, BadgeCheck, Building2, Calculator, CheckCircle2,
  ChevronRight, CircleHelp, IndianRupee, Landmark, Mail, Phone,
  ShieldCheck, Wallet,
} from "lucide-react";
import "./RequestLoan.css";

const rupees = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
}).format(value);

const initialForm = {
  name: "", email: "", phone: "", city: "", propertyType: "Apartment",
  employment: "Salaried", amount: "", message: "", consent: false,
};

export default function RequestLoan() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [annualRate, setAnnualRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const result = useMemo(() => {
    const months = years * 12;
    const monthlyRate = annualRate / 1200;
    const emi = monthlyRate === 0
      ? loanAmount / months
      : loanAmount * monthlyRate * (1 + monthlyRate) ** months /
        ((1 + monthlyRate) ** months - 1);
    const total = emi * months;
    return { emi, total, interest: total - loanAmount };
  }, [loanAmount, annualRate, years]);

  const update = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setShowConfirmation(false);
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "")))
      next.phone = "Enter a valid 10-digit phone number.";
    if (!form.city.trim()) next.city = "Please enter your city.";
    if (!Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0)
      next.amount = "Enter a valid loan amount.";
    if (!form.consent) next.consent = "Consent is required to proceed.";
    setErrors(next);
    if (Object.keys(next).length) return;
    // Front-end only: no personal information is transmitted or saved.
    setShowConfirmation(true);
  };

  return (
    <main className="rl-page">
      <section className="rl-hero">
        <div className="rl-container rl-hero-inner">
          <div>
            <span className="rl-eyebrow"><Landmark size={17} /> URBAN PROPERTIES / HOME LOANS</span>
            <h1>Make your next move <span>possible.</span></h1>
            <p>Explore estimated monthly payments and prepare a home-loan enquiry with a clear, simple process.</p>
            <div className="rl-hero-points">
              <span><ShieldCheck size={17} /> No payment to enquire</span>
              <span><BadgeCheck size={17} /> Transparent estimates</span>
            </div>
            <a href="#loan-calculator" className="rl-hero-button">Calculate EMI <ArrowRight size={17}/></a>
          </div>
          <div className="rl-hero-art"><Landmark size={82}/><span>HOME FINANCING</span><strong>Plan with confidence.</strong></div>
        </div>
      </section>

      <div className="rl-container rl-content">
        <div className="rl-breadcrumb"><Link to="/">Home</Link><ChevronRight size={15}/><span>Request a Loan</span></div>
        <div className="rl-section-title">
          <span className="rl-eyebrow">PLAN YOUR FINANCES</span>
          <h2>Home Loan EMI Calculator</h2>
          <p>Adjust the amount, interest rate and tenure to see an illustrative monthly EMI.</p>
        </div>

        <section id="loan-calculator" className="rl-calculator">
          <div className="rl-calculator-controls">
            <h3><Calculator size={22}/> Calculate your EMI</h3>
            <div className="rl-range-field">
              <div><label htmlFor="rl-amount">Loan Amount</label><strong>{rupees(loanAmount)}</strong></div>
              <input id="rl-amount" type="range" min="100000" max="30000000" step="100000"
                value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}/>
              <div className="rl-range-limits"><span>₹1 L</span><span>₹3 Cr</span></div>
            </div>
            <div className="rl-range-field">
              <div><label htmlFor="rl-rate">Interest Rate (annual)</label><strong>{annualRate.toFixed(1)}%</strong></div>
              <input id="rl-rate" type="range" min="5" max="16" step=".1"
                value={annualRate} onChange={e => setAnnualRate(Number(e.target.value))}/>
              <div className="rl-range-limits"><span>5%</span><span>16%</span></div>
            </div>
            <div className="rl-range-field">
              <div><label htmlFor="rl-years">Loan Tenure</label><strong>{years} years</strong></div>
              <input id="rl-years" type="range" min="1" max="30" step="1"
                value={years} onChange={e => setYears(Number(e.target.value))}/>
              <div className="rl-range-limits"><span>1 year</span><span>30 years</span></div>
            </div>
          </div>
          <div className="rl-calculator-result">
            <span className="rl-eyebrow">YOUR ESTIMATED PAYMENT</span>
            <p>Monthly EMI</p>
            <strong className="rl-emi">{rupees(result.emi)}</strong>
            <div className="rl-summary-row"><span>Principal amount</span><strong>{rupees(loanAmount)}</strong></div>
            <div className="rl-summary-row"><span>Total interest</span><strong>{rupees(result.interest)}</strong></div>
            <div className="rl-summary-row"><span>Total amount payable</span><strong>{rupees(result.total)}</strong></div>
            <p className="rl-calculator-note">Illustrative estimate only. Actual rates, eligibility, fees and loan terms are determined by the lender.</p>
            <a href="#loan-enquiry">Request a Callback <ArrowRight size={17}/></a>
          </div>
        </section>

        <section className="rl-benefits">
          <div><Wallet size={26}/><h3>Understand your budget</h3><p>Estimate monthly commitments before you enquire.</p></div>
          <div><ShieldCheck size={26}/><h3>Clear next steps</h3><p>Review documents and eligibility with a lending professional.</p></div>
          <div><Building2 size={26}/><h3>Explore properties</h3><p>Browse homes and compare options with your budget in mind.</p></div>
        </section>

        <section id="loan-enquiry" className="rl-enquiry-section">
          <div className="rl-enquiry-copy">
            <span className="rl-eyebrow">GET STARTED</span>
            <h2>Request loan guidance.</h2>
            <p>Fill in your details to prepare a loan enquiry. This demonstration form validates your information locally and does not send it to a bank or server.</p>
            <div className="rl-contact-tip"><CircleHelp size={22}/><span>To receive real enquiries, connect this form to your Express backend or an approved form service.</span></div>
            <Link to="/contact-us">Contact Urban Properties <ArrowRight size={16}/></Link>
          </div>
          <form className="rl-form" onSubmit={submit} noValidate>
            <h3>Loan Enquiry Form</h3>
            <p>Fields marked * are required.</p>
            <div className="rl-form-grid">
              <label>Full Name *<input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Your full name"/>{errors.name && <small>{errors.name}</small>}</label>
              <label>Phone Number *<input inputMode="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="10-digit mobile number"/>{errors.phone && <small>{errors.phone}</small>}</label>
              <label>Email Address *<input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@example.com"/>{errors.email && <small>{errors.email}</small>}</label>
              <label>City *<input value={form.city} onChange={e=>update("city",e.target.value)} placeholder="Your city"/>{errors.city && <small>{errors.city}</small>}</label>
              <label>Property Type<select value={form.propertyType} onChange={e=>update("propertyType",e.target.value)}>
                <option>Apartment</option><option>Villa</option><option>Independent House</option><option>Plot / Land</option><option>Commercial</option>
              </select></label>
              <label>Employment Type<select value={form.employment} onChange={e=>update("employment",e.target.value)}>
                <option>Salaried</option><option>Self-employed</option><option>Business Owner</option><option>Other</option>
              </select></label>
              <label className="rl-wide">Required Loan Amount (₹) *<input type="number" min="1" value={form.amount} onChange={e=>update("amount",e.target.value)} placeholder="e.g. 5000000"/>{errors.amount && <small>{errors.amount}</small>}</label>
              <label className="rl-wide">Additional Message<textarea rows="4" value={form.message} onChange={e=>update("message",e.target.value)} placeholder="Tell us about your requirements (optional)"/></label>
            </div>
            <label className="rl-consent"><input type="checkbox" checked={form.consent} onChange={e=>update("consent",e.target.checked)}/> I agree to be contacted about this enquiry.</label>
            {errors.consent && <small className="rl-consent-error">{errors.consent}</small>}
            <button type="submit">Review Enquiry <ArrowRight size={17}/></button>
            {showConfirmation && <div className="rl-confirmation" role="status"><CheckCircle2 size={21}/><span>Form validated successfully. This is a demo: your enquiry has <strong>not</strong> been submitted or saved. Connect a backend to receive enquiries.</span></div>}
          </form>
        </section>
      </div>
    </main>
  );
}
