import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, MapPin, Scale, Landmark, TrendingUp, Building2, House, BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react";
import "./UserLogin.css";

export default function UserLogin() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [city, setCity] = useState("");
    const [specialty, setSpecialty] = useState("Residential Properties");
    const [organization, setOrganization] = useState("");
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const submit = (e) => {
        e.preventDefault(); setSubmitted(false);
        if (!identifier.trim() || !password.trim()) { setError("Enter your credentials to continue."); return; }
        if (false && !identifier.trim()) { setError("Complete the required profile field."); return; }
        setError(""); setSubmitted(true);
    };
    return <main className="auth-page auth-page--user"><div className="auth-shell">
        <section className="auth-story"><div><span className="auth-story-label">URBAN PROPERTIES / HOME SEEKERS</span><h1>Find your place<span>.</span></h1><p>Sign in to explore saved homes and enquiries.</p></div>
            <div className="auth-story-points"><span><ShieldCheck size={18} /> Role-specific access experience</span><span><BadgeCheck size={18} /> Dedicated home seekers workspace</span><span><House size={18} /> Built for your workflow</span></div></section>
        <section className="auth-panel"><Link className="auth-back" to="/"><ArrowLeft size={16} /> Back to Home</Link><span className="auth-kicker">USER LOGIN</span><h2>Welcome back</h2><p>Enter your home seekers details to continue.</p>
            <form className="auth-form" onSubmit={submit}>
                <label className="auth-field">Email Address<div className="auth-input"><UserRound size={17} /><input autoComplete="username" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="you@example.com" required /></div></label>
                <div className="auth-extra"><label><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember this device</label><Link to="/register?role=user">New here?</Link></div>
                <label className="auth-field">Password<div className="auth-input"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required /><button className="auth-show" type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
                {error && <div className="auth-error" role="alert">{error}</div>}
                <button className="auth-submit" type="submit">Sign in to User <ArrowRight size={17} /></button>
                {submitted && <div className="auth-success" role="status"><CheckCircle2 size={17} /> Demo form validated. No login request was sent. Connect your authentication backend to enable sign-in.</div>}
                <div className="auth-notice">Demo interface only. No accounts are authenticated and no credentials are stored or transmitted.</div>
            </form><div className="auth-footer">Need an account? <Link to="/register?role=user">Register as User</Link></div>
        </section></div></main>
}
