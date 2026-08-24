import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CadProduction } from './CadDrawings';

export function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0">
        
        <div className="mb-4">
          <span className="font-heading font-bold text-sm tracking-widest uppercase text-dark-navy/60">
            {t.about.eyebrow}
          </span>
        </div>
        <h2 className="font-heading font-black text-5xl md:text-6xl xl:text-[58px] text-dark-navy mb-14 md:mb-20 tracking-tight uppercase [-webkit-text-stroke:1px_currentColor]">
          {t.about.heading}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 mb-20">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            
            <p className="font-body text-lg xl:text-[20px] text-charcoal/80 leading-relaxed mb-12 max-w-xl">
              {t.about.intro}
            </p>
            
            <div className="border-t border-metallic-silver/40 mb-12">
              {t.about.proofs.map((proof, index) => (
                <div key={index} className="flex items-center gap-6 py-5 border-b border-metallic-silver/40 group">
                  <div className="w-6 h-6 flex items-center justify-center border border-metallic-silver/60 group-hover:border-primary-blue transition-colors duration-300">
                    <Check size={12} className="text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={3} />
                  </div>
                  <span className="font-heading font-bold text-dark-navy text-base tracking-wide">
                    {proof}
                  </span>
                </div>
              ))}
            </div>
            
            <div>
              <Link 
                to="/about"
                className="inline-flex items-center justify-center bg-primary-blue border-2 border-primary-blue text-white hover:bg-white hover:text-primary-blue font-heading font-bold text-[11px] tracking-widest uppercase px-8 py-4 transition-colors duration-300 shadow-sm"
              >
                {t.about.cta}
              </Link>
            </div>
            
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] bg-off-white flex items-center justify-center border-2 border-metallic-silver/60 group-hover:border-primary-blue/40 transition-colors duration-500 p-2 lg:p-3 w-full group overflow-hidden">
              <div className="w-full h-full border border-metallic-silver/40 group-hover:border-primary-blue/30 transition-colors duration-500 relative flex items-center justify-center overflow-hidden bg-white/40">
                
                {/* CAD Registration Marks */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500 z-20"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500 z-20"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500 z-20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500 z-20"></div>
                
                {/* Subtle Blueprint Dot Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #1a2530 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}></div>
                
                <div className="w-full h-full p-4 md:p-6 transform transition-transform duration-700 group-hover:scale-[1.03] relative z-0 flex items-center justify-center">
                  <CadProduction />
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 pt-16 border-t border-metallic-silver/30">
          <div>
            <h3 className="font-heading font-bold text-2xl lg:text-[28px] text-dark-navy tracking-tight mb-6 uppercase">
              {t.about.missionTitle}
            </h3>
            <p className="font-body text-base lg:text-lg text-charcoal/80 leading-relaxed max-w-xl">
              {t.about.missionText}
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-2xl lg:text-[28px] text-dark-navy tracking-tight mb-6 uppercase">
              {t.about.productionTitle}
            </h3>
            <p className="font-body text-base lg:text-lg text-charcoal/80 leading-relaxed max-w-xl">
              {t.about.productionText}
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
