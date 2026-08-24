import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CadProbe, CadMirror, CadKit, CadNet, CadTool } from './CadDrawings';

export function Categories() {
  const { t, language } = useLanguage();
  const cadIcons = [
    <CadProbe key="probe" />,
    <CadMirror key="mirror" />,
    <CadKit key="kit" />,
    <CadNet key="net" />,
    <CadTool key="tool" />
  ];

  const categorySlugs = ["probes", "mirrors", "kits", "nets", "tools"];

  const itemsToRender = t.categories.items.map((title, index) => ({
    id: String(index),
    title,
    description: t.categories.descriptions?.[index] || "",
    slug: categorySlugs[index],
    CadIcon: cadIcons[index],
  }));

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark-navy mb-12 md:mb-16 tracking-tight uppercase [-webkit-text-stroke:1px_currentColor]">
          {t.nav.catalog}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 lg:gap-y-20 gap-x-8 lg:gap-x-12">
          {itemsToRender.map((item) => (
            <Link to={`/catalog/${item.slug}`} key={item.id} className="group flex flex-col w-full outline-none">
              <div className="relative aspect-[4/3] mb-6 bg-off-white flex items-center justify-center border-2 border-metallic-silver/60 group-hover:border-primary-blue/40 transition-colors duration-500 p-2 lg:p-3">
                <div className="w-full h-full border border-metallic-silver/40 group-hover:border-primary-blue/30 transition-colors duration-500 relative flex items-center justify-center overflow-hidden bg-white/40">
                  
                  {/* CAD Registration Marks */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-dark-navy/20 group-hover:border-primary-blue/40 transition-colors duration-500"></div>
                  
                  {/* Subtle Blueprint Dot Grid */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #1a2530 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }}></div>

                  <div className="w-full h-full p-8 md:p-10 transform transition-transform duration-700 group-hover:scale-105 relative z-10">
                    {item.CadIcon}
                  </div>
                </div>
              </div>
              <div className="border-t border-metallic-silver/40 pt-6 pb-2 flex flex-col gap-6 group-hover:border-primary-blue/40 transition-colors duration-500">
                <h3 className="font-heading font-bold text-2xl text-dark-navy group-hover:text-primary-blue transition-colors duration-500 tracking-tight">
                  {item.title}
                </h3>
                <div className="flex">
                  <span className="inline-flex items-center justify-center bg-primary-blue border-2 border-primary-blue text-white group-hover:bg-white group-hover:text-primary-blue font-heading font-bold text-[11px] tracking-widest uppercase px-6 py-3 transition-colors duration-300 shadow-sm">
                    {language === 'ua' ? 'Переглянути' : 'View Category'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
