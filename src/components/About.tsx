import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ArrowRight, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  
  return (
    <section id="about" className="py-10 md:py-16 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0">
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-20 lg:items-center">
          
          <div className="w-full lg:w-1/2 flex flex-col relative">
            
            <div className="mb-4">
              <span className="font-heading font-black text-[14px] md:text-[15px] tracking-[0.15em] uppercase text-cool-gray inline-flex flex-col relative pb-3 mb-2">
                {t.about.eyebrow}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-blue"></span>
              </span>
            </div>
            
            <div className="flex-1 flex flex-col">
              <h2 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-dark-navy mb-4 tracking-tight uppercase">
                {t.about.heading}
              </h2>
              
              <p className="font-body text-base lg:text-[17px] text-charcoal/70 leading-relaxed mb-6 max-w-xl">
                {t.about.intro}
              </p>
              
              <div className="flex flex-col gap-2 mb-8">
                {t.about.proofs.map((proof, index) => (
                  <div key={index} className="flex items-center justify-between p-3 md:p-4 border border-[#E3E8EF] rounded-lg bg-white hover:border-primary-blue/30 hover:shadow-sm transition-all duration-300 cursor-default group">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-[20px] h-[20px] text-primary-blue" strokeWidth={1.5} />
                      <span className="font-heading font-bold text-dark-navy text-[14px] md:text-[15px]">{proof}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-start">
              <Link 
                to="/about"
                className="inline-flex items-center justify-center bg-primary-blue text-white hover:bg-dark-navy font-heading font-bold text-[14px] tracking-wide px-8 py-3.5 rounded-md transition-colors duration-300 shadow-sm gap-3 group"
              >
                {t.about.cta}
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
              </Link>
            </div>
            
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col lg:items-center mt-10 lg:mt-0">
            <div className="relative w-full max-w-[520px] aspect-[4/5] border border-[#E3E8EF] rounded-xl overflow-hidden bg-[#FAFBFC] p-3 flex items-center justify-center">
              
              <div className="w-full h-full relative z-10 rounded-lg overflow-hidden shadow-sm bg-metallic-silver/10">
                <video 
                  src="/videos/IMG_0077.mov"
                  className="w-full h-full object-cover object-center"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-dark-navy/40 bg-gradient-to-r from-dark-navy/80 via-dark-navy/40 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-mesh pointer-events-none z-[5]"></div>
              </div>
              
              {/* Sound Toggle */}
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-6 right-6 z-20 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-metallic-silver/20 text-dark-navy hover:text-primary-blue transition-colors"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
