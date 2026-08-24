import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';
import { ConsultationModal } from './ConsultationModal';

export function FinalCTA() {
  const { t } = useLanguage();
  const { setIsDrawerOpen } = useRequest();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  
  return (
    <>
      <section className="relative py-20 md:py-28 bg-dark-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none z-[5]"></div>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0 relative z-10">
          <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-[72px] mb-12 md:mb-16 leading-tight uppercase [-webkit-text-stroke:1px_currentColor]">
            {t.cta.heading}
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="w-full sm:w-auto bg-primary-blue text-white hover:bg-white hover:text-primary-blue font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-colors duration-300 border border-primary-blue"
            >
              {t.cta.btn1}
            </button>
            
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-dark-navy font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-colors duration-300 inline-block text-center cursor-pointer"
            >
              {t.cta.btn2}
            </button>
          </div>
        </div>
      </section>

      <ConsultationModal 
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </>
  );
}
