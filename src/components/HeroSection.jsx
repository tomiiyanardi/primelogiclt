import React from 'react';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-brand-white text-brand-black flex flex-col justify-center items-center pt-20 px-8 relative overflow-hidden">
      <div className="max-w-4xl w-full text-center z-10 flex flex-col items-center">
        <img 
          src="/logo.svg" 
          alt="Primelogic LT Logo" 
          className="w-32 md:w-40 h-auto mb-10"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-brand-blue">
          Primelogic LT
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-light">
          Transformando ideas en realidades tecnológicas. Somos tu socio estratégico en innovación, desarrollo y automatización.
        </p>
      </div>
      
      {/* Subtle modern background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-brand-blue/[0.03] rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
