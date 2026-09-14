import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';

export function ToolsCategory() {
  const { t, language } = useLanguage();
  const { addItem } = useRequest();
  
  const itemsToRender = [
    {
      id: "tool-1",
      model: language === 'ua' ? 'Електричний кабель на барабані' : 'Electric Cable on Reel',
      description: "",
      price: "",
      imageBase64: "/electric-cable/cable-main.png"
    },
    {
      id: "tool-2",
      model: language === 'ua' ? 'Кактус-5' : 'Kaktus-5',
      description: "",
      price: "",
      imageBase64: "/kaktus-5/kaktus-main.png"
    },
    {
      id: "tool-3",
      model: language === 'ua' ? 'Ключ-1' : 'Key-1',
      description: "",
      price: "",
      imageBase64: "/key-1/key-main.png"
    },
    {
      id: "tool-4",
      model: language === 'ua' ? 'Магнітні граблі' : 'Magnetic Rake',
      description: "",
      price: "",
      imageBase64: "/rake-1/rake-02.png"
    }
  ];

  return (
    <section className="pt-0 md:pt-4 pb-12 md:pb-16 bg-white">
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
                    className={`w-full h-full object-contain transition-transform duration-700 ease-out ${
                      product.id === 'tool-2' ? 'scale-[1.35] group-hover:scale-[1.4]' : 
                      product.id === 'tool-3' ? 'scale-[1.3] group-hover:scale-[1.35]' : 
                      product.id === 'tool-4' ? 'scale-[1.3] group-hover:scale-[1.35]' : 
                      'scale-100 group-hover:scale-105'
                    }`}
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
                {language === 'ua' ? 'САПЕРНЕ ПРИСТОСУВАННЯ' : 'SAPPER TOOL'}
              </h4>
              
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading font-black text-3xl lg:text-4xl text-dark-navy tracking-tight transition-colors duration-300">
                  {product.model}
                </h3>
                <div className="text-right">
                  <span className="block font-body text-[10px] text-cool-gray uppercase tracking-widest mb-0.5">{language === 'ua' ? 'Ціна' : 'Price'}</span>
                  <span className="block font-heading text-[12px] font-bold text-dark-navy tracking-wide uppercase">{language === 'ua' ? 'За запитом' : 'On request'}</span>
                </div>
              </div>
              
              <p className="font-body text-charcoal/70 mb-10 flex-1 leading-relaxed text-[15px]">
                {product.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-metallic-silver/30">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem({ id: product.id, model: product.model });
                  }}
                  className="w-full inline-flex items-center justify-center bg-primary-blue text-white border border-primary-blue hover:bg-white hover:text-primary-blue font-heading font-bold text-[11px] tracking-widest uppercase px-6 py-4 transition-colors duration-300"
                >
                  {t.request.add}
                </button>
              </div>
            </Link>
          ))}
          {/* Empty columns to maintain exact grid styling and borders for row 2 */}
          <div className="hidden md:block w-full p-8 lg:p-12 pointer-events-none"></div>
          <div className="hidden md:block w-full p-8 lg:p-12 pointer-events-none"></div>
        </div>
        
      </div>
    </section>
  );
}
