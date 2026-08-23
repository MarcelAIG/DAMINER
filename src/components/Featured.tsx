import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';

export function Featured() {
  const { t } = useLanguage();
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

  return (
    <section className="py-24 md:py-32 bg-white border-t border-metallic-silver/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="mb-16 md:mb-24">
          <h2 className="font-heading font-black text-4xl md:text-5xl text-dark-navy tracking-tight">
            {t.featured.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {itemsToRender.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="flex flex-col group cursor-pointer">
              <div className="aspect-[3/4] lg:aspect-square xl:aspect-[5/4] bg-white border border-metallic-silver/20 mb-10 lg:mb-5 flex items-center justify-center relative overflow-hidden">
                {product.imageBase64 ? (
                  <>
                    <img 
                      src={product.imageBase64} 
                      alt={product.model} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 relative z-0"
                    />
                    <div className="absolute inset-0 bg-[#1e63d8]/40 mix-blend-color group-hover:opacity-0 transition-opacity duration-700 pointer-events-none z-10" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-metallic-silver/10 to-transparent transition-opacity duration-500 group-hover:opacity-50"></div>
                    
                    <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-sm relative z-10 transition-transform duration-500 group-hover:scale-110">
                      Image Placeholder
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <h4 className="font-heading text-sm text-cool-gray tracking-widest uppercase font-semibold mb-2 lg:mb-1">
                  {t.featured.probe}
                </h4>
                <h3 className="font-heading text-4xl lg:text-3xl font-bold text-dark-navy mb-6 lg:mb-3">
                  {product.model}
                </h3>
                
                <p className="font-body text-charcoal/70 mb-10 lg:mb-5 flex-1 leading-relaxed text-base">
                  {product.description}
                </p>
                
                <div className="pt-8 lg:pt-5 border-t border-metallic-silver/40 mt-auto flex flex-col gap-4">
                  <div className="font-heading font-bold text-[13px] tracking-widest uppercase text-dark-navy/80">
                    {t.featured.price}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({ id: product.id, model: product.model });
                    }}
                    className="w-full py-4 bg-primary-blue text-white font-heading font-bold text-sm tracking-widest uppercase border border-primary-blue hover:bg-white hover:text-primary-blue transition-colors duration-300"
                  >
                    {t.request.add}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
