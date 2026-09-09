import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import OfferingsSection from '../components/OfferingsSection';
import ProductsSection from '../components/ProductsSection';
import AboutSection from '../components/AboutSection';
import ClientsSection from '../components/ClientsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';

const Home = () => {
  return (
    <div className="font-sans antialiased text-brand-black bg-brand-white selection:bg-brand-blue/30 selection:text-brand-blue">
      <ScrollProgress />
      <Header />
      <main className="pt-20"> {/* Add padding top to account for fixed header */}
        <HeroSection />
        <OfferingsSection />
        <ProductsSection />
        <AboutSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
