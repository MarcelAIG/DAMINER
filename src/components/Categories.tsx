import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Categories() {
  const { t } = useLanguage();

  const categorySlugs = ["probes", "mirrors", "kits"];
  
  const catalogImages = [
    "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png",
    "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png",
    "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png"
  ];

  const itemsToRender = categorySlugs.map((slug, index) => ({
    id: slug,
    title: t.categories.items[index],
    description: t.categories.descriptions[index],
    slug,
    imageUrl: catalogImages[index]
  }));

  return (
    <section className="bg-white">

      {/* Catalog Area */}
      <div className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 xl:px-0">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-[52px] text-dark-navy tracking-tight">
              {t.categories.heading}
            </h2>
            <Link to="#" className="inline-flex items-center gap-2 font-heading font-black text-sm md:text-base tracking-widest uppercase text-primary-blue hover:text-dark-navy transition-colors duration-300">
              {t.categories.viewLink}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemsToRender.map((item) => (
              <Link to={`/catalog/${item.slug}`} key={item.id} className="group flex flex-col bg-white border border-[#E3E8EF] rounded-xl overflow-hidden hover:border-primary-blue/30 transition-all duration-300">
                <div className="aspect-[4/3] bg-white flex items-center justify-center p-8 relative overflow-hidden border-b border-[#E3E8EF]/50">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="font-heading font-black text-3xl lg:text-4xl text-dark-navy mb-3 group-hover:text-primary-blue transition-colors duration-300 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-body text-charcoal/70 text-[15px] mb-8 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center font-heading font-black text-xs tracking-widest uppercase text-primary-blue mt-auto group-hover:gap-3 transition-all duration-300 gap-2">
                    {t.categories.learnMore}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
