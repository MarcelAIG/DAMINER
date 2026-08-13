import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative w-full h-screen min-h-[700px] mt-[90px] overflow-hidden bg-dark-navy">
      {/* Background Media Placeholder */}
      <div className="absolute inset-0 z-0">
        <video 
          src="/hero-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-dark-navy/20 bg-gradient-to-r from-dark-navy/50 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col justify-end pb-20 md:pb-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl relative -left-2 md:-left-6 lg:-left-12"
        >
          <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-white leading-none tracking-tight mb-1.5 drop-shadow-lg">
            DAMINER
            <span className="block text-lg md:text-2xl mt-0.5 text-metallic-silver font-semibold tracking-normal md:whitespace-nowrap drop-shadow-md">
              {t.hero.subtitle}
            </span>
          </h1>
          
          <p className="font-body text-base md:text-lg text-off-white/90 max-w-xl mb-5 leading-relaxed">
            {t.hero.description}
          </p>
          
          <a 
            href="#catalog"
            className="inline-flex items-center justify-center bg-primary-blue hover:bg-accent-blue text-white font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_15px_40px_-10px_rgba(30,99,216,0.8)] active:scale-95 border border-transparent hover:border-white/20"
          >
            {t.hero.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
