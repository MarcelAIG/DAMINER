import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Featured() {
  const { t } = useLanguage();
  
  const featuredProducts = [
    {
      model: "ЩР-1",
      description: t.featured.desc1,
      image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1954&auto=format&fit=crop"
    },
    {
      model: "ЩР-2",
      description: t.featured.desc2,
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop"
    },
    {
      model: "ЩР-8",
      description: t.featured.desc3,
      image: "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?q=80&w=2038&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white border-t border-metallic-silver/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {featuredProducts.map((product, index) => (
            <div key={index} className="flex flex-col group cursor-pointer">
              <div className="aspect-[3/4] bg-off-white mb-10 flex items-center justify-center p-8 relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${t.featured.probe} ${product.model}`}
                  className="w-full h-full object-cover grayscale mix-blend-darken transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="flex-1 flex flex-col">
                <h4 className="font-heading text-sm text-cool-gray tracking-widest uppercase font-semibold mb-2">
                  {t.featured.probe}
                </h4>
                <h3 className="font-heading text-4xl font-bold text-dark-navy mb-6">
                  {product.model}
                </h3>
                
                <p className="font-body text-charcoal/70 mb-10 flex-1 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex flex-col gap-6 pt-8 border-t border-metallic-silver/40">
                  <span className="font-heading font-semibold text-charcoal">
                    {t.featured.price}
                  </span>
                  
                  <button className="flex items-center gap-4 text-primary-blue font-heading font-bold text-sm tracking-widest uppercase hover:text-dark-navy transition-colors group/btn">
                    {t.featured.details} <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
