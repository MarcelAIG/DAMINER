import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CadProbe, CadMirror, CadKit, CadNet, CadTool } from './CadDrawings';

export function Categories() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const categorySlugs = ["probes", "mirrors", "kits", "nets", "tools"];
  
  const catalogImages = [
    "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png",
    "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png",
    "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png",
    "",
    ""
  ];

  const getCadDrawing = (slug: string) => {
    switch (slug) {
      case 'probes': return <div className="w-[120%] text-dark-navy/20 group-hover:text-primary-blue/30 transition-colors duration-500 scale-125"><CadProbe /></div>;
      case 'mirrors': return <div className="w-[120%] text-dark-navy/20 group-hover:text-primary-blue/30 transition-colors duration-500 scale-125"><CadMirror /></div>;
      case 'kits': return <div className="w-[120%] text-dark-navy/20 group-hover:text-primary-blue/30 transition-colors duration-500 scale-110"><CadKit /></div>;
      case 'nets': return <div className="w-[110%] text-dark-navy/20 group-hover:text-primary-blue/30 transition-colors duration-500"><CadNet /></div>;
      case 'tools': return <div className="w-[110%] text-dark-navy/20 group-hover:text-primary-blue/30 transition-colors duration-500"><CadTool /></div>;
      default: return null;
    }
  };

  const itemsToRender = categorySlugs.map((slug, index) => ({
    id: slug,
    title: t.categories.items[index],
    description: t.categories.descriptions[index],
    slug,
    imageUrl: catalogImages[index]
  }));

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 20);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <section className="bg-white">
      {/* Catalog Area */}
      <div className="py-16 md:py-24 border-b border-metallic-silver/20">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 xl:px-0">
          
          <div className="mb-12 md:mb-16">
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-[54px] text-dark-navy tracking-tight">
              {t.categories.heading}
            </h2>
          </div>
          
          <div className="relative">
            {/* Left Scroll Indicator */}
            <div className={`absolute top-0 left-0 bottom-8 w-24 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none flex items-center justify-start pl-2 md:pl-6 z-10 hidden sm:flex transition-opacity duration-500 ${showLeftScroll ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center text-dark-navy/40 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-2">
                  <path d="m11 17-5-5 5-5"/>
                  <path d="m18 17-5-5 5-5"/>
                </svg>
              </div>
            </div>

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {itemsToRender.map((item) => (
                <Link to={`/catalog/${item.slug}`} key={item.id} className="w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1.33rem)] snap-start shrink-0 group flex flex-col bg-white border border-[#E3E8EF] rounded-xl overflow-hidden hover:border-primary-blue/30 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] bg-white flex items-center justify-center p-8 relative overflow-hidden border-b border-[#E3E8EF]/50 group-hover:border-primary-blue/20 transition-colors duration-300">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 relative z-10" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {getCadDrawing(item.slug)}
                      </div>
                    )}
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

            {/* Right Scroll Indicator */}
            <div className={`absolute top-0 right-0 bottom-8 w-24 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none flex items-center justify-end pr-2 md:pr-6 z-10 hidden sm:flex transition-opacity duration-500 ${showRightScroll ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center text-dark-navy/40 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="translate-x-2">
                  <path d="m13 17 5-5-5-5"/>
                  <path d="m6 17 5-5-5-5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
