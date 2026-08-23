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
      <section className="py-32 bg-dark-navy text-white text-center">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <h2 className="font-heading font-bold text-4xl md:text-6xl mb-16 leading-tight">
            {t.cta.heading}
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="w-full sm:w-auto bg-primary-blue text-white hover:bg-white hover:text-primary-blue font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-none border border-primary-blue"
            >
              {t.cta.btn1}
            </button>
            
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full sm:w-auto bg-transparent border-2 border-white/40 text-white hover:bg-white hover:text-dark-navy font-heading font-bold text-sm tracking-widest uppercase px-10 py-5 transition-none inline-block text-center cursor-pointer"
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
