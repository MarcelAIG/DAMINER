import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function CustomMfg() {
  const { t } = useLanguage();
  
  return (
    <section className="flex flex-col lg:flex-row w-full bg-white">
      <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto lg:h-[800px] relative">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
          alt="Виробництво DAMINER" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
      
      <div className="w-full lg:w-1/2 bg-off-white flex flex-col justify-center px-8 py-20 lg:px-24">
        <div className="max-w-xl">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark-navy leading-tight mb-8">
            {t.mfg.heading}
          </h2>
          
          <p className="font-body text-xl text-charcoal/80 mb-16 leading-relaxed">
            {t.mfg.desc}
          </p>
          
          <ul className="space-y-6">
            {t.mfg.services.map((service, index) => (
              <li key={index} className="flex items-center gap-6 border-b border-metallic-silver/30 pb-6">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-primary-blue text-primary-blue rounded-full">
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="font-heading font-medium text-xl text-charcoal">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
