import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Quality() {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 md:py-16 bg-dark-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none opacity-50 z-[5]"></div>
      <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10 xl:px-0">
        <h2 className="font-heading font-black text-center text-4xl md:text-5xl lg:text-[54px] mb-10 md:mb-16 tracking-tight text-white uppercase">
          {t.quality.heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="border-t-[1px] border-white/30 pt-6 group cursor-default">
            <h3 className="font-heading font-black text-2xl lg:text-[28px] leading-tight mb-4 text-white tracking-wide">
              ISO 9001
            </h3>
            <p className="font-body text-[15px] lg:text-base text-white/70 leading-relaxed max-w-[90%]">
              {t.quality.isoDesc}
            </p>
          </div>
          
          <div className="border-t-[1px] border-white/30 pt-6 group cursor-default">
            <h3 className="font-heading font-black text-2xl lg:text-[28px] leading-tight mb-4 text-white tracking-wide">
              {t.quality.krTitle}
            </h3>
            <p className="font-body text-[15px] lg:text-base text-white/70 leading-relaxed max-w-[90%]">
              {t.quality.krDesc}
            </p>
          </div>
          
          <div className="border-t-[1px] border-white/30 pt-6 group cursor-default">
            <h3 className="font-heading font-black text-2xl lg:text-[28px] leading-tight mb-4 text-white tracking-wide">
              {t.quality.testing}
            </h3>
            <p className="font-body text-[15px] lg:text-base text-white/70 leading-relaxed max-w-[90%]">
              {t.quality.testDesc}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
