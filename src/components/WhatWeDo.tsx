import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Target, Bomb, Search } from 'lucide-react';

export function WhatWeDo() {
  const { t } = useLanguage();
  
  const icons = [
    <Shield size={22} strokeWidth={1.5} />,
    <Search size={22} strokeWidth={1.5} />,
    <Bomb size={22} strokeWidth={1.5} />,
    <Target size={22} strokeWidth={1.5} />
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="mb-4">
          <span className="font-heading font-bold text-sm tracking-widest uppercase text-dark-navy/60">
            {t.whatWeDo.eyebrow}
          </span>
        </div>
        <div className="mb-12 md:mb-16">
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark-navy mb-8 tracking-tight uppercase [-webkit-text-stroke:1px_currentColor]">
            {t.whatWeDo.title}
          </h2>
          <p className="font-body text-lg text-charcoal/80 leading-relaxed max-w-3xl">
            {t.whatWeDo.intro}
          </p>
        </div>

        {/* 2x2 Grid with 1px architectural lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-metallic-silver/30 border-y border-metallic-silver/30 mb-12 md:mb-16">
          {t.whatWeDo.items.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col p-10 md:p-12 lg:p-14 bg-white hover:bg-off-white transition-colors duration-400 group cursor-default"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-heading font-black text-4xl text-metallic-silver/40 group-hover:text-primary-blue/30 transition-colors duration-500">
                  {item.num}
                </span>
                <div className="text-primary-blue opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {icons[index]}
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl lg:text-2xl text-dark-navy mb-4 tracking-tight uppercase">
                {item.title}
              </h3>
              <p className="font-body text-charcoal/70 text-[15px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-start">
          <Link 
            to="/solutions"
            className="inline-flex items-center justify-center font-heading font-bold text-[13px] tracking-widest uppercase text-dark-navy hover:text-primary-blue transition-colors duration-300 border-b-2 border-primary-blue/30 hover:border-primary-blue pb-1"
          >
            {t.whatWeDo.cta}
          </Link>
        </div>
        
      </div>
    </section>
  );
}
