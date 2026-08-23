import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Categories() {
  const { t } = useLanguage();
  
  const itemsToRender = t.categories.items.map((title, index) => ({
    id: String(index),
    title,
    description: t.categories.descriptions?.[index] || "",
    imageBase64: null,
  }));

  return (
    <section className="py-24 md:py-32 bg-off-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark-navy mb-20 tracking-tight">
          {t.categories.heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {itemsToRender.map((item) => (
            <div key={item.id} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-white border border-metallic-silver/20 flex items-center justify-center">
                {item.imageBase64 ? (
                  <img 
                    src={item.imageBase64} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 mix-blend-multiply transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-metallic-silver/10 to-transparent transition-opacity duration-500 group-hover:opacity-50"></div>
                    
                    <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-sm relative z-10 transition-transform duration-500 group-hover:scale-110">
                      Image Placeholder
                    </span>
                  </>
                )}
              </div>
              <div className="border-t border-metallic-silver/40 pt-6 flex justify-between items-start">
                <h3 className="font-heading font-semibold text-2xl text-charcoal group-hover:text-primary-blue transition-none">
                  {item.title}
                </h3>
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-metallic-silver/50 group-hover:bg-primary-blue group-hover:border-primary-blue group-hover:text-white transition-none">
                  <ArrowRight size={18} className="transition-none" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
