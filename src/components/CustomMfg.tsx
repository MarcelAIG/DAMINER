import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ConsultationModal } from './ConsultationModal';
import { Settings2, PenTool, Layers, Package } from 'lucide-react';

export function CustomMfg() {
  const { t } = useLanguage();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  
  const icons = [
    <PenTool size={22} strokeWidth={1.5} />,
    <Settings2 size={22} strokeWidth={1.5} />,
    <Layers size={22} strokeWidth={1.5} />,
    <Package size={22} strokeWidth={1.5} />
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="mb-12 md:mb-16">
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark-navy mb-8 tracking-tight uppercase [-webkit-text-stroke:1px_currentColor]">
              {t.mfg.heading}
            </h2>
            <p className="font-body text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {t.mfg.intro}
            </p>
          </div>

          {/* Grid with 1px structural gaps to create clean architectural lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-metallic-silver/30 border-y border-metallic-silver/30 mb-12 md:mb-16">
            {t.mfg.items.map((item, index) => (
              <div 
                key={index}
                className="flex flex-col py-10 px-8 bg-white hover:bg-off-white transition-colors duration-400 group cursor-default"
              >
                <div className="text-primary-blue mb-8">
                  {icons[index]}
                </div>
                <h3 className="font-heading font-bold text-lg text-dark-navy mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal/70 text-[15px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-start">
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="inline-flex items-center justify-center bg-primary-blue border-2 border-primary-blue text-white hover:bg-white hover:text-primary-blue font-heading font-bold text-[11px] tracking-widest uppercase px-8 py-4 transition-colors duration-300 shadow-sm"
            >
              {t.mfg.cta}
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
