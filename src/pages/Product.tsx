import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';

export function Product() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addItem } = useRequest();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const items = [
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

  const product = items.find(item => item.id === id) || items[0];
  const otherProducts = items.filter(item => item.id !== product.id);

  return (
    <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 lg:pt-6">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-cool-gray hover:text-primary-blue font-heading font-bold text-sm uppercase tracking-widest transition-colors duration-300 mb-12 lg:mb-6">
          <ArrowLeft size={16} />
          {t.nav.catalog}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] lg:aspect-square lg:max-h-[65vh] bg-white border border-metallic-silver/20 flex items-center justify-center relative overflow-hidden"
          >
            {product.imageBase64 ? (
              <img 
                src={product.imageBase64} 
                alt={product.model} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-metallic-silver/10 to-transparent"></div>
                <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-lg relative z-10">
                  Image Placeholder
                </span>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h4 className="font-heading text-sm text-cool-gray tracking-widest uppercase font-semibold mb-4 lg:mb-2">
              {t.featured.probe}
            </h4>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-dark-navy mb-8 lg:mb-5">
              {product.model}
            </h1>
            
            <p className="font-body text-charcoal/70 text-lg mb-12 lg:mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="bg-white p-6 lg:p-5 mb-12 lg:mb-8 flex items-start gap-4 lg:gap-4 border border-metallic-silver/30 shadow-sm">
              <ShieldCheck size={24} className="text-primary-blue shrink-0 mt-0.5 lg:mt-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-heading font-bold text-sm uppercase tracking-widest text-dark-navy mb-2 lg:mb-1.5">
                  {t.featured.warrantyTitle}
                </h5>
                <p className="font-body text-[15px] text-charcoal/80 leading-relaxed lg:leading-normal">
                  {t.featured.warrantyDesc1} <br/>
                  {t.featured.warrantyDesc2}
                </p>
              </div>
            </div>
            
            <div className="pt-8 lg:pt-6 border-t border-metallic-silver/40">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addItem({ id: product.id, model: product.model });
                }}
                className="w-full sm:w-auto py-5 px-12 bg-primary-blue text-white font-heading font-bold text-sm tracking-widest uppercase border border-primary-blue hover:bg-white hover:text-primary-blue transition-colors duration-300 inline-flex justify-center"
              >
                {t.request.add}
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Other Products Section */}
        <div className="mt-16 lg:mt-12 pt-12 lg:pt-8 border-t border-metallic-silver/30">
          <h2 className="font-heading text-2xl lg:text-xl font-bold text-dark-navy mb-8 lg:mb-6 text-center lg:text-left">
            {t.featured.otherProducts || "Other Products"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-6">
            {otherProducts.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="flex flex-col group cursor-pointer bg-white p-4 lg:p-3 border border-metallic-silver/20 hover:border-primary-blue/30 transition-colors duration-300">
                <div className="aspect-[3/4] lg:aspect-[3/2] xl:aspect-[16/9] bg-gray-50 mb-4 lg:mb-2 flex items-center justify-center relative overflow-hidden">
                  {p.imageBase64 ? (
                    <>
                      <img 
                        src={p.imageBase64} 
                        alt={p.model} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 relative z-0"
                      />
                      <div className="absolute inset-0 bg-primary-blue/40 mix-blend-color group-hover:opacity-0 transition-opacity duration-700 pointer-events-none z-10" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50" />
                  )}
                </div>
                <h4 className="font-heading text-[11px] text-cool-gray tracking-widest uppercase font-semibold mb-1 lg:mb-0.5">
                  {t.featured.probe}
                </h4>
                <h3 className="font-heading text-lg lg:text-base font-bold text-dark-navy group-hover:text-primary-blue transition-colors duration-300">
                  {p.model}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
