import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

export function CatalogLanding() {
  const { t, language } = useLanguage();
  
  const categorySlugs = ["probes", "mirrors", "kits", "nets", "tools"];
  const categories = t.categories.items;

  return (
    <section className="py-20 md:py-32 bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-metallic-silver/30 border-y border-metallic-silver/30">
          {categories.map((catName, idx) => {
            const slug = categorySlugs[idx];
            const description = t.categories.descriptions[idx];
            
            return (
              <Link 
                to={`/catalog/${slug}`} 
                key={idx}
                className="flex flex-col group w-full p-8 lg:p-12 transition-colors duration-500"
              >
                <div className="aspect-square bg-white border border-metallic-silver/20 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:border-primary-blue/30 mb-10 flex items-center justify-center relative overflow-hidden p-4 lg:p-6 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-[0.05]" style={{
                      backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                    <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-xs relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                      Image Placeholder
                    </span>
                  </div>
                </div>
                
                <h4 className="font-heading text-[11px] text-cool-gray tracking-[0.2em] uppercase font-bold mb-3 transition-colors duration-300">
                  {language === 'ua' ? 'Категорія' : 'Category'}
                </h4>
                
                <h3 className="font-heading font-bold text-2xl lg:text-3xl text-dark-navy mb-6 tracking-tight transition-colors duration-300 group-hover:text-primary-blue">
                  {catName}
                </h3>
                
                <p className="font-body text-charcoal/70 mb-10 flex-1 leading-relaxed text-[15px]">
                  {description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-metallic-silver/30 flex items-center justify-between gap-4">
                  <span className="font-heading font-bold text-[11px] tracking-widest uppercase text-dark-navy/70 group-hover:text-primary-blue transition-colors duration-300">
                    {t.categories.viewLink}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center border border-metallic-silver/30 rounded-full text-cool-gray group-hover:border-primary-blue group-hover:text-primary-blue group-hover:bg-primary-blue/5 transition-all duration-300 transform group-hover:translate-x-1">
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
