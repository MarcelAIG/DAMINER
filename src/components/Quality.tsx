import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Quality() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 md:py-28 bg-dark-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none opacity-50 z-[5]"></div>
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0">
        <h2 className="font-heading font-black text-center text-5xl md:text-6xl xl:text-[58px] mb-16 md:mb-20 tracking-tight text-white uppercase [-webkit-text-stroke:1px_currentColor]">
          {t.quality.heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          <div className="border-t-2 border-primary-blue pt-10">
            <h3 className="font-heading font-bold text-5xl lg:text-6xl mb-6 text-white tracking-tight">
              ISO 9001
            </h3>
            <p className="font-body text-lg xl:text-[18px] text-white/70 leading-relaxed max-w-sm">
              {t.quality.isoDesc}
            </p>
          </div>
          
          <div className="border-t-2 border-white/20 pt-10 hover:border-white/50 transition-colors duration-500">
            <h3 className="font-heading font-bold text-3xl lg:text-4xl mb-6 text-white tracking-tight">
              {t.quality.krTitle}
            </h3>
            <p className="font-body text-lg xl:text-[18px] text-white/70 leading-relaxed italic max-w-sm">
              {t.quality.krDesc}
            </p>
          </div>
          
          <div className="border-t-2 border-white/20 pt-10 hover:border-white/50 transition-colors duration-500">
            <h3 className="font-heading font-bold text-3xl lg:text-4xl mb-6 text-white tracking-tight">
              {t.quality.testing}
            </h3>
            <p className="font-body text-lg xl:text-[18px] text-white/70 leading-relaxed max-w-sm">
              {t.quality.testDesc}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
