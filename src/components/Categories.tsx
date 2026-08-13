import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Categories() {
  const { t } = useLanguage();
  
  const categoryImages = [
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?q=80&w=1932&auto=format&fit=crop"
  ];

  return (
    <section id="catalog" className="py-24 md:py-32 bg-off-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="font-heading font-bold text-4xl md:text-5xl text-dark-navy mb-20 tracking-tight">
          {t.categories.heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {t.categories.items.map((categoryTitle, index) => (
            <div key={index} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-metallic-silver/20">
                <img 
                  src={categoryImages[index]} 
                  alt={categoryTitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0 mix-blend-multiply"
                />
              </div>
              <div className="border-t border-metallic-silver/40 pt-6 flex justify-between items-start">
                <h3 className="font-heading font-semibold text-2xl text-charcoal group-hover:text-primary-blue transition-colors">
                  {categoryTitle}
                </h3>
                <span className="flex items-center justify-center w-10 h-10 rounded-full border border-metallic-silver/50 group-hover:bg-primary-blue group-hover:border-primary-blue group-hover:text-white transition-all duration-300">
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
