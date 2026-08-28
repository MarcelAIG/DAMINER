import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';

export function Product() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { addItem } = useRequest();
  const [showSpecs, setShowSpecs] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setShowSpecs(false);
    setSelectedImageIdx(0);
  }, [id]);

  const items = [
    {
      id: "1",
      model: t.featured.model1,
      description: t.featured.desc1,
      price: "",
      imageBase64: "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png",
      gallery: [
        "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_09 PM.png",
        "/ЩР-1/ChatGPT Image Aug 28, 2026, 09_53_02 PM.png"
      ]
    },
    {
      id: "2",
      model: t.featured.model2,
      description: t.featured.desc2,
      price: "",
      imageBase64: "/ЩР-3:2 /ChatGPT Image Aug 28, 2026, 10_41_22 PM.png",
      gallery: [
        "/ЩР-3:2 /ChatGPT Image Aug 28, 2026, 10_41_22 PM.png",
        "/ЩР-3:2 /ChatGPT Image Aug 28, 2026, 10_41_30 PM.png"
      ]
    },
    {
      id: "3",
      model: t.featured.model3,
      description: t.featured.desc3,
      price: "",
      imageBase64: "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_16 PM.png",
      gallery: [
        "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_16 PM.png",
        "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_05 PM.png"
      ]
    }
  ];

  const product = items.find(item => item.id === id) || items[0];
  const otherProducts = items.filter(item => item.id !== product.id);

  return (
    <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 lg:pt-6">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-cool-gray hover:text-primary-blue font-heading font-bold text-sm uppercase tracking-widest transition-colors duration-300 mb-12 lg:mb-6 relative z-20 py-2 pr-4 w-fit cursor-pointer">
          <ArrowLeft size={16} />
          {t.nav.catalog}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            {showSpecs ? (
              <div className="aspect-[4/5] lg:aspect-square lg:max-h-[65vh] bg-white border border-metallic-silver/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl flex flex-col p-8 md:p-12 overflow-y-auto animate-fadeIn">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-metallic-silver/30">
                  <h3 className="font-heading font-bold text-2xl text-dark-navy">
                    {language === 'ua' ? 'Технічні характеристики' : 'Technical Specifications'}
                  </h3>
                  <button 
                    type="button"
                    onClick={() => setShowSpecs(false)}
                    className="text-cool-gray hover:text-primary-blue transition-colors duration-300 p-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-grow flex flex-col justify-center items-center text-center">
                  <div className="w-full border border-dashed border-metallic-silver/40 p-10 flex flex-col items-center justify-center bg-off-white/50 rounded-sm">
                    <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-sm mb-4">
                      {language === 'ua' ? '[ Характеристики ]' : '[ Specifications ]'}
                    </span>
                    <p className="font-body text-charcoal/60">
                      {language === 'ua' ? 'Клієнт надасть характеристики пізніше.' : 'Client will provide specifications later.'}
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-metallic-silver/30">
                  <button 
                    type="button"
                    onClick={() => setShowSpecs(false)}
                    className="font-heading font-bold text-[11px] tracking-widest uppercase text-primary-blue hover:text-dark-navy transition-colors duration-300 inline-flex items-center gap-3"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {language === 'ua' ? 'До товару' : 'Back to Product'}
                  </button>
                </div>
              </div>
            ) : (
              <div 
                className="aspect-[4/5] lg:aspect-square lg:max-h-[65vh] bg-white border border-metallic-silver/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl flex items-center justify-center p-4 lg:p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setShowSpecs(true)}
              >
                {product.gallery && product.gallery[selectedImageIdx] ? (
                  <img 
                    key={`main-img-${selectedImageIdx}`}
                    src={product.gallery[selectedImageIdx]} 
                    alt={product.model} 
                    className="w-full h-full object-contain animate-fadeIn"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-cool-gray">
                    Image Placeholder
                  </div>
                )}
                {/* Subtle visual hint */}
                <div className="absolute inset-0 bg-dark-navy/0 group-hover:bg-dark-navy/5 transition-colors duration-500 flex items-end justify-center pb-8 pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-heading font-bold text-[11px] uppercase tracking-widest text-dark-navy bg-white/95 backdrop-blur-sm py-3 px-6 shadow-sm border border-metallic-silver/20 flex items-center gap-3">
                    {language === 'ua' ? 'Переглянути характеристики' : 'View Specifications'}
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </div>
              </div>
            )}
            
            {/* Gallery Thumbnails */}
            {!showSpecs && product.gallery && (
              <div className="grid grid-cols-2 gap-4">
                {product.gallery.slice(0, 2).map((img, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIdx(idx);
                    }}
                    className={`aspect-[4/3] lg:aspect-[3/2] bg-white border rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 p-4 lg:p-6 flex items-center justify-center ${
                      selectedImageIdx === idx ? 'border-primary-blue shadow-md' : 'border-metallic-silver/20 hover:border-primary-blue/50'
                    }`}
                  >
                    {img ? (
                      <img 
                        src={img} 
                        alt={`${product.model} thumbnail ${idx + 1}`} 
                        className="w-full h-full object-contain pointer-events-none"
                        draggable={false}
                      />
                    ) : (
                      <span className="text-xs text-cool-gray">Thumb {idx + 1}</span>
                    )}
                  </button>
                ))}
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
            
            <div className="pt-8 lg:pt-6 border-t border-metallic-silver/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="font-heading font-bold text-base tracking-widest uppercase text-dark-navy">
                {t.featured.price}
              </div>
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
        <div className="mt-20 lg:mt-24 pt-12 lg:pt-16 border-t border-metallic-silver/30">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-dark-navy mb-8 lg:mb-10 text-center lg:text-left">
            {t.featured.otherProducts || "Other Products"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-6">
            {otherProducts.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="flex flex-col group cursor-pointer bg-white p-4 lg:p-5 border border-metallic-silver/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary-blue/30 rounded-xl transition-all duration-300">
                <div className="aspect-[3/4] lg:aspect-[3/2] xl:aspect-[16/9] bg-white mb-4 lg:mb-4 flex items-center justify-center relative overflow-hidden p-4 lg:p-6">
                  {p.imageBase64 ? (
                    <>
                      <img 
                        src={p.imageBase64} 
                        alt={p.model} 
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 relative z-0"
                      />
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
