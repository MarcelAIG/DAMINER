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
          <h2 className="font-heading font-black text-center text-4xl md:text-5xl lg:text-[54px] mb-4 tracking-tight text-white">
            {t.cta.heading}
          </h2>
          
          <p className="font-body text-[17px] text-white/80 mb-12 md:mb-16 max-w-4xl mx-auto">
            {t.cta.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="inline-flex items-center justify-center bg-primary-blue text-white hover:bg-dark-navy font-heading font-bold text-[14px] tracking-wide uppercase px-8 py-3.5 rounded-md transition-colors duration-300 shadow-sm cursor-pointer"
            >
              {t.cta.btn1}
            </button>
            
            <a 
              href={`tel:${t.contactPage.phone.replace(/[\s-()]/g, '')}`}
              className="inline-flex items-center justify-center bg-white text-primary-blue hover:bg-off-white font-heading font-bold text-[14px] tracking-wide uppercase px-8 py-3.5 rounded-md transition-colors duration-300 shadow-sm cursor-pointer"
            >
              {t.cta.btn2}
            </a>
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
