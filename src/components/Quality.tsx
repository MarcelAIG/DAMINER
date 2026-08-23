import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Quality() {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 md:py-32 bg-dark-navy text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-16 tracking-tight text-white">
          {t.quality.heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          <div className="border-t-2 border-primary-blue pt-8">
            <h3 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-white">
              ISO 9001
            </h3>
            <p className="font-body text-white/70 leading-relaxed">
              {t.quality.isoDesc}
            </p>
          </div>
          
          <div className="border-t-2 border-white/20 pt-8">
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-white">
              {t.quality.krTitle}
            </h3>
            <p className="font-body text-white/70 leading-relaxed italic">
              {t.quality.krDesc}
            </p>
          </div>
          
          <div className="border-t-2 border-white/20 pt-8">
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4 text-white">
              {t.quality.testing}
            </h3>
            <p className="font-body text-white/70 leading-relaxed">
              {t.quality.testDesc}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
