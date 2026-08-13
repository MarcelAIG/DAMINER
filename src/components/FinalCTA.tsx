import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function FinalCTA() {
  const { t } = useLanguage();
  
  return (
    <section className="py-32 bg-dark-navy text-white text-center">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <h2 className="font-heading font-bold text-4xl md:text-6xl mb-16 leading-tight">
          {t.cta.heading}
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto bg-primary-blue text-white hover:bg-accent-blue font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_15px_40px_-10px_rgba(30,99,216,0.8)] active:scale-95 border border-transparent hover:border-white/20">
            {t.cta.btn1}
          </button>
          
          <button className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-dark-navy font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.4)] active:scale-95">
            {t.cta.btn2}
          </button>
        </div>
      </div>
    </section>
  );
}
