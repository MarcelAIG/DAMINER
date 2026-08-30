import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Target, Bomb, Search } from 'lucide-react';

export function WhatWeDo() {
  const { t } = useLanguage();
  
  const icons = [
    <Shield size={40} strokeWidth={1.2} />,
    <Search size={40} strokeWidth={1.2} />,
    <Bomb size={40} strokeWidth={1.2} />,
    <Target size={40} strokeWidth={1.2} />
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0">
        
        <div className="mb-4">
          <span className="font-heading font-black text-[15px] md:text-base tracking-[0.15em] uppercase text-cool-gray inline-flex flex-col relative pb-4 mb-4 lg:mb-6">
            {t.whatWeDo.eyebrow}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-blue"></span>
          </span>
        </div>
        <div className="mb-10 md:mb-12">
          <h2 className="font-heading font-black text-5xl md:text-6xl xl:text-[58px] text-dark-navy mb-6 tracking-tight uppercase [-webkit-text-stroke:1px_currentColor]">
            {t.whatWeDo.title}
          </h2>
          <p className="font-body text-lg text-charcoal/80 leading-relaxed max-w-3xl">
            {t.whatWeDo.intro}
          </p>
        </div>

        {/* 2x2 Grid with 1px architectural lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-metallic-silver/30 border-y border-metallic-silver/30 mb-8 md:mb-12">
          {t.whatWeDo.items.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col p-10 md:p-12 lg:p-14 bg-white hover:bg-off-white transition-colors duration-400 group cursor-default border-b-[3px] border-transparent hover:border-primary-blue"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-heading font-black text-[60px] lg:text-[80px] leading-none text-primary-blue/30 group-hover:text-primary-blue/80 transition-colors duration-500">
                  {item.num}
                </span>
                <div className="text-primary-blue opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-right">
                  {icons[index]}
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl lg:text-2xl text-dark-navy mb-4 tracking-tight uppercase">
                {item.title}
              </h3>
              <p className="font-body text-charcoal/70 text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-start">
          <Link 
            to="/solutions"
            className="inline-flex items-center justify-center bg-primary-blue border-2 border-primary-blue text-white hover:bg-white hover:text-primary-blue font-heading font-bold text-[12px] md:text-[13px] tracking-widest uppercase px-10 py-5 transition-colors duration-300 shadow-sm"
          >
            {t.whatWeDo.cta}
          </Link>
        </div>
        
      </div>
    </section>
  );
}
