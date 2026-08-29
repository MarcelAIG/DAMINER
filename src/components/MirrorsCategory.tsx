import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';

export function MirrorsCategory() {
  const { t, language } = useLanguage();
  const { addItem } = useRequest();
  
  const itemsToRender = [
    {
      id: "m1",
      model: language === 'ua' ? "ЗД-1" : "ZD-1",
      description: "",
      price: "",
      imageBase64: "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png"
    },
    {
      id: "m2",
      model: language === 'ua' ? "ЗД-2Д" : "ZD-2D",
      description: "",
      price: "",
      imageBase64: "/ЗД-2Д\"/ChatGPT Image Aug 29, 2026, 01_20_44 PM.png"
    },
    {
      id: "m3",
      model: language === 'ua' ? "ЗД-2У" : "ZD-2U",
      description: "",
      price: "",
      imageBase64: "/ЗД-2У/ChatGPT Image Aug 29, 2026, 01_29_49 PM.png"
    },
    {
      id: "m4",
      model: language === 'ua' ? "ЗД-3" : "ZD-3",
      description: "",
      price: "",
      imageBase64: "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_57_21 PM.png"
    },
    {
      id: "m5",
      model: language === 'ua' ? "ЗД-4" : "ZD-4",
      description: "",
      price: "",
      imageBase64: "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_13_09 PM.png"
    }
  ];

  const priceText = language === 'ua' ? 'Ціна за запитом' : 'Price on Request';

  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-metallic-silver/30 border-y border-metallic-silver/30">
          {itemsToRender.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="flex flex-col group w-full p-8 lg:p-12 transition-colors duration-500"
            >
              <div className="aspect-square bg-white border border-metallic-silver/20 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:border-primary-blue/30 mb-10 flex items-center justify-center relative overflow-hidden p-4 lg:p-6 transition-all duration-500">
                {product.imageBase64 ? (
                  <img 
                    src={product.imageBase64} 
                    alt={product.model} 
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                    <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-xs relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                      Image Placeholder
                    </span>
                  </div>
                )}
              </div>
              
              <h4 className="font-heading text-[11px] text-cool-gray tracking-[0.2em] uppercase font-bold mb-3 transition-colors duration-300">
                {t.featured.mirror}
              </h4>
              
              <h3 className="font-heading font-bold text-3xl lg:text-4xl text-dark-navy mb-6 tracking-tight transition-colors duration-300">
                {product.model}
              </h3>
              
              <p className="font-body text-charcoal/70 mb-10 flex-1 leading-relaxed text-[15px]">
                {product.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-metallic-silver/30 flex items-center justify-between gap-4">
                <span className="font-heading font-bold text-[11px] tracking-widest uppercase text-dark-navy/70">
                  {priceText}
                </span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem({ id: product.id, model: product.model });
                  }}
                  className="inline-flex items-center justify-center bg-primary-blue text-white border border-primary-blue hover:bg-white hover:text-primary-blue font-heading font-bold text-[10px] md:text-[11px] tracking-widest uppercase px-6 py-3 transition-colors duration-300"
                >
                  {t.request.add}
                </button>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
