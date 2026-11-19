import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import RequestLoan from './components/RequestLoan';
import Buy from './components/Buy';
import Rent from './components/Rent';
import NewProperties from './components/NewProperties';
import Commercial from './components/Commercial';
import PlotsLand from './components/PlotsLand';
import Builders from './components/Builders';
import Home from './components/Home';
import Wishlist from "./components/Wishlist";
import Compare from "./components/Compare";
import PropertyDetails from "./components/PropertyDetails";
import UserLogin from './components/UserLogin';
import AgentLogin from './components/AgentLogin';
import LegalAdvisorLogin from './components/LegalAdvisorLogin';
import BankerLogin from './components/BankerLogin';
import InvestorLogin from './components/InvestorLogin';
import CorporateBuilderLogin from './components/CorporateBuilderLogin';
import AboutUs from './components/AboutUs';
import Careers from './components/Careers';
import ContactUs from './components/ContactUs';
import HelpCenter from './components/HelpCenter';
import FAQs from './components/FAQs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import CustomerSupport from './components/CustomerSupport';
import BlogsNews from './components/BlogsNews';
import PartnerWithUs from './components/PartnerWithUs';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return <><ScrollToTop /><Navbar /><Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/request-loan" element={<RequestLoan />} />
    <Route path="/buy" element={<Buy />} />
    <Route path="/rent" element={<Rent />} />
    <Route path="/new-properties" element={<NewProperties />} />
    <Route path="/commercial" element={<Commercial />} />
    <Route path="/plots-land" element={<PlotsLand />} />
    <Route path="/builders" element={<Builders />} />
    <Route path="/" element={<Home />} />
    <Route
      path="/property/:id"
      element={<PropertyDetails />}
    />

    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/compare" element={<Compare />} />
    <Route path="/login/user" element={<UserLogin />} />
    <Route path="/login/agent" element={<AgentLogin />} />
    <Route path="/login/legal-advisor" element={<LegalAdvisorLogin />} />
    <Route path="/login/banker" element={<BankerLogin />} />
    <Route path="/login/investor" element={<InvestorLogin />} />
    <Route path="/login/corporate-builder" element={<CorporateBuilderLogin />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/help-center" element={<HelpCenter />} />
    <Route path="/faqs" element={<FAQs />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-conditions" element={<TermsConditions />} />
    <Route path="/customer-support" element={<CustomerSupport />} />
    <Route path="/blogs-news" element={<BlogsNews />} />
    <Route path="/partner-with-us" element={<PartnerWithUs />} />
    
  </Routes><Footer /></>;
}
