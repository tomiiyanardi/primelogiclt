import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import OfferingsSection from '../components/OfferingsSection';
import ProductsSection from '../components/ProductsSection';
import ClientsMarquee from '../components/ClientsMarquee';
import ProcessSection from '../components/ProcessSection';
import ProjectsSection from '../components/ProjectsSection';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="site">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <HeroSection />
        <OfferingsSection />
        <ProductsSection />
        <ClientsMarquee />
        <ProcessSection />
        <ProjectsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
