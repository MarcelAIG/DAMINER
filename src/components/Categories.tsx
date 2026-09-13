import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CadProbe, CadMirror, CadKit, CadNet, CadTool } from './CadDrawings';

export function Categories() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const scrollLeftBy = () => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth > 1024 ? scrollRef.current.clientWidth / 3 : scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollBy({ left: -Math.max(amount, 300), behavior: 'smooth' });
    }
  };

  const scrollRightBy = () => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth > 1024 ? scrollRef.current.clientWidth / 3 : scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollBy({ left: Math.max(amount, 300), behavior: 'smooth' });
    }
  };

  const categorySlugs = ["probes", "mirrors", "kits", "nets", "tools"];
  
  const catalogImages = [
    "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png",
    "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png",
    "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png",
    "/Сіткомети протидронові/net-main.png",
    "/electric-cable/cable-main.png"
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
            <div className={`absolute top-[150px] md:top-[180px] lg:top-[210px] left-0 z-20 hidden sm:block transition-all duration-500 ${showLeftScroll ? 'opacity-100 translate-x-4 lg:translate-x-8' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
              <button 
                onClick={scrollLeftBy}
                aria-label="Scroll left"
                className="w-14 h-14 bg-white shadow-[0_8px_25px_rgb(0,0,0,0.2)] border border-dark-navy/15 rounded-full flex items-center justify-center text-dark-navy hover:text-primary-blue hover:scale-110 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300"
              >
                <ChevronLeft size={28} strokeWidth={2.5} className="-ml-1" />
              </button>
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
            <div className={`absolute top-[150px] md:top-[180px] lg:top-[210px] right-0 z-20 hidden sm:block transition-all duration-500 ${showRightScroll ? 'opacity-100 -translate-x-4 lg:-translate-x-8' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <button 
                onClick={scrollRightBy}
                aria-label="Scroll right"
                className="w-14 h-14 bg-white shadow-[0_8px_25px_rgb(0,0,0,0.2)] border border-dark-navy/15 rounded-full flex items-center justify-center text-dark-navy hover:text-primary-blue hover:scale-110 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300"
              >
                <ChevronRight size={28} strokeWidth={2.5} className="-mr-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
