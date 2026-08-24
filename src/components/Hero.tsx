import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ConsultationModal } from './ConsultationModal';

export function Hero() {
  const { t } = useLanguage();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  
  return (
    <>
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
          <div className="absolute inset-0 bg-dark-navy/40 bg-gradient-to-r from-dark-navy/80 via-dark-navy/40 to-transparent"></div>
          <div className="absolute inset-0 bg-mesh pointer-events-none z-[5]"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0 h-full flex flex-col justify-end pb-28 md:pb-40">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl relative"
          >
            <h1 className="font-heading font-black text-6xl md:text-7xl lg:text-[80px] text-white leading-none tracking-tight mb-2 drop-shadow-lg">
              DAMINER
              <span className="block text-xl md:text-3xl lg:text-[32px] mt-2 text-metallic-silver font-semibold tracking-normal md:whitespace-nowrap drop-shadow-md">
                {t.hero.subtitle}
              </span>
            </h1>
            
            <p className="font-body text-lg md:text-xl lg:text-[22px] text-off-white/90 max-w-2xl mb-8 leading-relaxed">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalog"
                className="inline-flex items-center justify-center bg-primary-blue hover:bg-white hover:text-primary-blue text-white font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-colors duration-300 border border-primary-blue text-center"
              >
                {t.hero.cta}
              </Link>
              <button 
                onClick={() => setIsConsultationModalOpen(true)}
                className="inline-flex items-center justify-center bg-white text-primary-blue border border-white hover:bg-primary-blue hover:text-white hover:border-primary-blue font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-colors duration-300 cursor-pointer text-center"
              >
                {t.hero.ctaConsultation}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <ConsultationModal 
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </>
  );
}
