import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Eye, EyeOff, Landmark, Mail, ShieldCheck, UserRound } from "lucide-react";
import "./Register.css";

const roles=[
 {value:"user",label:"Home Seeker",detail:"Buy, rent and save properties"},
 {value:"agent",label:"Property Agent",detail:"Manage clients and listings"},
 {value:"legal",label:"Legal Advisor",detail:"Property documents and legal reviews"},
 {value:"banker",label:"Banker",detail:"Home loan enquiries and finance"},
 {value:"investor",label:"Investor",detail:"Discover investment opportunities"},
 {value:"builder",label:"Corporate / Builder",detail:"Promote projects and developments"}
];
const loginRoutes={user:"/login/user",agent:"/login/agent",legal:"/login/legal-advisor",banker:"/login/banker",investor:"/login/investor",builder:"/login/corporate-builder"};
const requiredRoleField={agent:"Agent License / Registration ID",legal:"Bar Council / Registration Number",banker:"Bank / Institution Name",investor:"Investment Focus",builder:"Company / Builder Name"};
export default function Register(){
 const [params]=useSearchParams();
 const [role,setRole]=useState(roles.some(x=>x.value===params.get("role"))?params.get("role"):"user");
 const [form,setForm]=useState({name:"",email:"",phone:"",city:"",extra:"",password:"",confirm:"",consent:false});
 const [showPassword,setShowPassword]=useState(false);
 const [errors,setErrors]=useState({});
 const [done,setDone]=useState(false);
 useEffect(()=>{const next=params.get("role");if(roles.some(x=>x.value===next))setRole(next)},[params]);
 const update=(key,value)=>{setForm(p=>({...p,[key]:value}));setErrors(p=>({...p,[key]:undefined}));setDone(false)};
 const chooseRole=(next)=>{setRole(next);setForm(p=>({...p,extra:""}));setDone(false);setErrors({})};
 const submit=e=>{
  e.preventDefault();const issues={};
  if(form.name.trim().length<2)issues.name="Enter your full name.";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))issues.email="Enter a valid email.";
  if(!/^\d{10}$/.test(form.phone.replace(/\D/g,"")))issues.phone="Enter a 10-digit mobile number.";
  if(!form.city.trim())issues.city="Enter your city.";
  if(requiredRoleField[role]&&!form.extra.trim())issues.extra="This field is required.";
  if(form.password.length<8)issues.password="Use at least 8 characters.";
  if(form.password!==form.confirm)issues.confirm="Passwords do not match.";
  if(!form.consent)issues.consent="Please accept to continue.";
  setErrors(issues);setDone(Object.keys(issues).length===0);
 };
 return <main className="rg-page"><div className="rg-container">
  <div className="rg-heading"><Link to="/" className="rg-back"><ArrowLeft size={16}/> Back to Home</Link><span className="rg-eyebrow">URBAN PROPERTIES / CREATE ACCOUNT</span><h1>Join the Urban community<span>.</span></h1><p>Choose your account type and complete the relevant details. Registration is a frontend demo until authentication is connected.</p></div>
  <div className="rg-layout"><section className="rg-roles"><h2>01 / Choose your account type</h2><p>Select how you plan to use Urban Properties.</p><div className="rg-role-grid">{roles.map(item=><button type="button" key={item.value} className={`rg-role ${role===item.value?"active":""}`} onClick={()=>chooseRole(item.value)} aria-pressed={role===item.value}><span className="rg-role-radio"/><strong>{item.label}</strong><small>{item.detail}</small></button>)}</div><div className="rg-role-note"><ShieldCheck size={20}/><p>Each account type has its own sign-in page and relevant registration fields.</p></div></section>
  <section className="rg-form-panel"><div className="rg-form-title"><span>02 / ACCOUNT DETAILS</span><h2>Create your {roles.find(x=>x.value===role)?.label} account</h2><p>Fields marked * are required.</p></div>
  <form onSubmit={submit} noValidate><div className="rg-fields">
   <label>Full Name *<input value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Your full name"/>{errors.name&&<small>{errors.name}</small>}</label>
   <label>Email Address *<input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@example.com"/>{errors.email&&<small>{errors.email}</small>}</label>
   <label>Mobile Number *<input inputMode="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="10-digit number"/>{errors.phone&&<small>{errors.phone}</small>}</label>
   <label>City *<input value={form.city} onChange={e=>update("city",e.target.value)} placeholder="Your city"/>{errors.city&&<small>{errors.city}</small>}</label>
   {requiredRoleField[role]&&<label className="rg-full">{requiredRoleField[role]} *{role==="investor"?<select value={form.extra} onChange={e=>update("extra",e.target.value)}><option value="">Select investment focus</option><option>Residential</option><option>Commercial</option><option>Plots & Land</option><option>Mixed Portfolio</option></select>:<input value={form.extra} onChange={e=>update("extra",e.target.value)} placeholder={requiredRoleField[role]}/>} {errors.extra&&<small>{errors.extra}</small>}</label>}
   <label>Password *<div className="rg-password"><input type={showPassword?"text":"password"} autoComplete="new-password" value={form.password} onChange={e=>update("password",e.target.value)} placeholder="At least 8 characters"/><button type="button" onClick={()=>setShowPassword(p=>!p)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></div>{errors.password&&<small>{errors.password}</small>}</label>
   <label>Confirm Password *<input type={showPassword?"text":"password"} autoComplete="new-password" value={form.confirm} onChange={e=>update("confirm",e.target.value)} placeholder="Repeat password"/>{errors.confirm&&<small>{errors.confirm}</small>}</label>
  </div><label className="rg-consent"><input type="checkbox" checked={form.consent} onChange={e=>update("consent",e.target.checked)}/> I agree to the Terms & Conditions and Privacy Policy.</label>{errors.consent&&<small className="rg-error">{errors.consent}</small>}
  <button className="rg-submit" type="submit">Create Account <ArrowRight size={17}/></button>
  {done&&<div className="rg-success" role="status"><CheckCircle2 size={20}/> All fields validated. Demo only: no account has been created and no information was saved or sent to a server.</div>}
  <p className="rg-disclaimer">Demo form only. Connect a secure authentication backend before accepting real user credentials.</p></form>
  <div className="rg-login">Already registered? <Link to={loginRoutes[role]}>Sign in as {roles.find(x=>x.value===role)?.label}</Link></div></section></div>
 </div></main>
}
