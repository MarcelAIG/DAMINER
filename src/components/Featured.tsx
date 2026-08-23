import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';

export function Featured() {
  const { t, language } = useLanguage();
  const { addItem } = useRequest();
  
  const itemsToRender = [
    {
      id: "1",
      model: t.featured.model1,
      description: t.featured.desc1,
      price: "",
      imageBase64: "/mine1.svg?v=4"
    },
    {
      id: "2",
      model: t.featured.model2,
      description: t.featured.desc2,
      price: "",
      imageBase64: "/mine2.svg?v=4"
    },
    {
      id: "3",
      model: t.featured.model3,
      description: t.featured.desc3,
      price: "",
      imageBase64: "/mine3.svg?v=4"
    }
  ];

  const priceText = language === 'ua' ? 'Ціна за запитом' : 'Price on Request';

  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="max-w-4xl mb-10 md:mb-12 text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark-navy tracking-tight mb-6"
          >
            {t.featured.heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-lg md:text-xl text-charcoal/70 max-w-2xl leading-relaxed"
          >
            {language === 'ua' 
              ? 'Наші передові рішення, перевірені в найскладніших умовах розмінування.' 
              : 'Our advanced solutions, proven in the most demanding demining environments.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-metallic-silver/30 border-y border-metallic-silver/30">
          {itemsToRender.map((product) => (
            <Link 
              to={`/product/${product.id}`} 
              key={product.id} 
              className="flex flex-col group w-full p-8 lg:p-12 transition-colors duration-500"
            >
              <div className="aspect-square bg-off-white/50 mb-10 flex items-center justify-center relative overflow-hidden">
                {product.imageBase64 ? (
                  <img 
                    src={product.imageBase64} 
                    alt={product.model} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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
                {t.featured.probe}
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
