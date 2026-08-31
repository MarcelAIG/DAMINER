import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CadProduction } from './CadDrawings';

export function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-10 xl:gap-20 lg:items-stretch">
          
          <div className="w-full lg:w-1/2 flex flex-col relative pt-0 lg:pt-[56px]">
            
            <div className="lg:absolute lg:top-0 lg:left-0 mb-6 lg:mb-0">
              <span className="font-heading font-black text-[15px] md:text-base tracking-[0.15em] uppercase text-cool-gray inline-flex flex-col relative pb-4 mb-4 lg:mb-6">
                {t.about.eyebrow}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-blue"></span>
              </span>
            </div>
            
            <div className="flex-1 flex flex-col">
              <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-[54px] leading-[1.15] text-dark-navy mb-6 tracking-tight uppercase">
                {t.about.heading}
              </h2>
              
              <p className="font-body text-base lg:text-[17px] text-charcoal/70 leading-relaxed mb-10 max-w-xl">
                {t.about.intro}
              </p>
              
              <div className="flex flex-col gap-3 mb-10">
                {t.about.proofs.map((proof, index) => (
                  <div key={index} className="flex items-center justify-between p-5 border border-[#E3E8EF] rounded-lg bg-white hover:border-primary-blue/30 hover:shadow-sm transition-all duration-300 cursor-default group">
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="w-[22px] h-[22px] text-primary-blue" strokeWidth={1.5} />
                      <span className="font-heading font-bold text-dark-navy text-[15px]">{proof}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto flex items-start">
              <Link 
                to="/about"
                className="inline-flex items-center justify-center bg-primary-blue text-white hover:bg-dark-navy font-heading font-bold text-[14px] tracking-wide px-10 py-4 rounded-md transition-colors duration-300 shadow-sm gap-3 group"
              >
                {t.about.cta}
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </Link>
            </div>
            
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col lg:justify-end mt-10 lg:mt-0">
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-[calc(100%-56px)] border border-[#E3E8EF] rounded-xl overflow-hidden bg-[#FAFBFC] p-4 flex items-center justify-center">
              
              {/* Inner thin frame */}
              <div className="absolute inset-6 border border-[#E3E8EF] pointer-events-none z-10 flex items-center justify-center">
                {/* Registration marks */}
                <div className="absolute -top-2 left-1/2 w-[1px] h-4 bg-[#E3E8EF]"></div>
                <div className="absolute -bottom-2 left-1/2 w-[1px] h-4 bg-[#E3E8EF]"></div>
                <div className="absolute top-1/2 -left-2 w-4 h-[1px] bg-[#E3E8EF]"></div>
                <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-[#E3E8EF]"></div>
                
                {/* Corner Crosshairs */}
                <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 border-t border-l border-[#E3E8EF]"></div>
                <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 border-t border-r border-[#E3E8EF]"></div>
                <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 border-b border-l border-[#E3E8EF]"></div>
                <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 border-b border-r border-[#E3E8EF]"></div>
              </div>
              
              {/* Blueprint Dot Grid */}
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #0A1F44 1px, transparent 0)',
                backgroundSize: '32px 32px',
                backgroundPosition: 'center center'
              }}></div>
              
              <div className="w-full h-full p-8 md:p-16 relative z-10 flex items-center justify-center">
                <CadProduction />
              </div>
              
              {/* Badge */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full">
                <ShieldCheck className="w-[18px] h-[18px] text-primary-blue" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-[10px] text-dark-navy tracking-wide uppercase leading-tight">Якість та надійність</span>
                  <span className="font-body text-[9px] text-charcoal/50 tracking-wider uppercase leading-tight">Власне виробництво в Україні</span>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
