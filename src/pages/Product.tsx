import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';

export function Product() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { addItem } = useRequest();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsDescriptionOpen(false);
    setSelectedImageIdx(0);
    setIsZoomed(false);
  }, [id]);

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin(`${x}% ${y}%`);
    }
    setIsZoomed(!isZoomed);
  };

  const items = [
    {
      id: "1",
      type: "probe",
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
      type: "probe",
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
      type: "probe",
      model: t.featured.model3,
      description: t.featured.desc3,
      price: "",
      imageBase64: "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_16 PM.png",
      gallery: [
        "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_16 PM.png",
        "/ЩР-8/ChatGPT Image Aug 28, 2026, 11_15_05 PM.png"
      ]
    },
    {
      id: "m1",
      type: "mirror",
      model: language === 'ua' ? "ЗД-1" : "ZD-1",
      description: "",
      price: "",
      imageBase64: "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png",
      gallery: [
        "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (1).png",
        "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_13 AM (2).png",
        "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_14 AM (3).png",
        "/ЗД-1/ChatGPT Image Aug 29, 2026, 12_04_14 AM (4).png"
      ]
    },
    {
      id: "m2",
      type: "mirror",
      model: language === 'ua' ? "ЗД-2Д" : "ZD-2D",
      description: "",
      price: "",
      imageBase64: "/ЗД-2Д\"/ChatGPT Image Aug 29, 2026, 01_20_44 PM.png",
      gallery: [
        "/ЗД-2Д\"/ChatGPT Image Aug 29, 2026, 01_20_44 PM.png",
        "/ЗД-2Д\"/ChatGPT Image Aug 29, 2026, 01_20_48 PM.png"
      ]
    },
    {
      id: "m3",
      type: "mirror",
      model: language === 'ua' ? "ЗД-2У" : "ZD-2U",
      description: "",
      price: "",
      imageBase64: "/ЗД-2У/ChatGPT Image Aug 29, 2026, 01_29_49 PM.png",
      gallery: [
        "/ЗД-2У/ChatGPT Image Aug 29, 2026, 01_29_49 PM.png"
      ]
    },
    {
      id: "m4",
      type: "mirror",
      model: language === 'ua' ? "ЗД-3" : "ZD-3",
      description: "",
      price: "",
      imageBase64: "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_57_21 PM.png",
      gallery: [
        "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_57_21 PM.png",
        "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_44_55 PM.png",
        "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_58_10 PM.png",
        "/ЗД-3/ChatGPT Image Aug 29, 2026, 01_59_22 PM.png",
        "/ЗД-3/ChatGPT Image Aug 29, 2026, 02_00_31 PM.png",
        "/ЗД-3/ChatGPT Image Aug 29, 2026, 02_01_52 PM.png"
      ]
    },
    {
      id: "m5",
      type: "mirror",
      model: language === 'ua' ? "ЗД-4" : "ZD-4",
      description: "",
      price: "",
      imageBase64: "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_13_09 PM.png",
      gallery: [
        "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_13_09 PM.png",
        "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_14_51 PM.png",
        "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_16_22 PM.png",
        "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_17_17 PM.png",
        "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_18_14 PM.png",
        "/ЗД-4/ChatGPT Image Aug 29, 2026, 02_19_28 PM.png"
      ]
    },
    {
      id: "k1",
      type: "kit",
      model: language === 'ua' ? "ЕОД-1" : "EOD-1",
      description: "",
      price: "",
      imageBase64: "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png",
      gallery: [
        "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_49_42 PM.png",
        "/ЕОД-1/ChatGPT Image Aug 29, 2026, 02_59_43 PM.png",
        "/ЕОД-1/ChatGPT Image Aug 29, 2026, 03_00_42 PM.png",
        "/ЕОД-1/ChatGPT Image Aug 29, 2026, 03_03_04 PM.png"
      ]
    },
    {
      id: "k2",
      type: "kit",
      model: language === 'ua' ? "ЕОД-1МН" : "EOD-1MN",
      description: "",
      price: "",
      imageBase64: "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_25_05 PM.png",
      gallery: [
        "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_25_05 PM.png",
        "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_23_51 PM.png",
        "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_26_18 PM.png",
        "/ЕОД-1МН/ChatGPT Image Aug 29, 2026, 03_27_43 PM.png"
      ]
    },
    {
      id: "k3",
      type: "kit",
      model: language === 'ua' ? "КР-04" : "KR-04",
      description: "",
      price: "",
      imageBase64: "/КР-04/ChatGPT Image Aug 29, 2026, 03_58_47 PM.png",
      gallery: [
        "/КР-04/ChatGPT Image Aug 29, 2026, 03_58_47 PM.png",
        "/КР-04/ChatGPT Image Aug 29, 2026, 03_57_49 PM.png",
        "/КР-04/ChatGPT Image Aug 29, 2026, 04_00_29 PM.png",
        "/КР-04/ChatGPT Image Aug 29, 2026, 04_06_20 PM.png",
        "/КР-04/ChatGPT Image Aug 29, 2026, 04_13_49 PM.png"
      ]
    },
    {
      id: "k4",
      type: "kit",
      model: language === 'ua' ? "КР-06" : "KR-06",
      description: "",
      price: "",
      imageBase64: "",
      gallery: []
    }
  ];

  const product = items.find(item => item.id === id) || items[0];
  const otherProducts = items.filter(item => item.id !== product.id);

  return (
    <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 lg:pt-6">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-primary-blue hover:text-dark-navy font-heading font-bold text-[13px] uppercase tracking-widest transition-colors duration-300 mb-12 lg:mb-6 relative z-20 py-2 pr-4 w-fit cursor-pointer">
          <ArrowLeft size={18} strokeWidth={2.5} />
          {t.nav.catalog}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 lg:items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <div 
              className={`aspect-[4/5] lg:aspect-square lg:max-h-[65vh] bg-white border border-metallic-silver/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl flex items-center justify-center p-4 lg:p-6 relative overflow-hidden group transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={handleZoom}
            >
              {product.gallery && product.gallery[selectedImageIdx] ? (
                <img 
                  key={`main-img-${selectedImageIdx}`}
                  src={product.gallery[selectedImageIdx]} 
                  alt={product.model} 
                  className={`w-full h-full object-contain transition-transform duration-500 ease-out ${isZoomed ? 'scale-[1.75]' : 'scale-100'}`}
                  style={{ transformOrigin: isZoomed ? zoomOrigin : 'center center' }}
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-cool-gray">
                  Image Placeholder
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-cool-gray/80 group-hover:text-primary-blue shadow-sm border border-metallic-silver/20 transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100">
                {isZoomed ? <ZoomOut size={20} strokeWidth={2} /> : <ZoomIn size={20} strokeWidth={2} />}
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className={`grid gap-3 lg:gap-4 ${
                product.gallery.length === 2 ? 'grid-cols-2' : 
                product.gallery.length === 4 ? 'grid-cols-4' : 
                product.gallery.length === 5 ? 'grid-cols-5' : 
                'grid-cols-3'
              }`}>
                {product.gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIdx(idx);
                      setIsZoomed(false);
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
              {product.type === 'mirror' ? t.featured.mirror : product.type === 'kit' ? t.featured.kit : t.featured.probe}
            </h4>
            <h1 className="font-heading text-5xl md:text-6xl font-black text-dark-navy mb-8 lg:mb-5 tracking-tight">
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
            
            <div className="pt-8 lg:pt-6 border-t border-metallic-silver/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
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

            {/* Modern Accordion Description */}
            <div className="bg-white border border-metallic-silver/30 shadow-sm overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                className="w-full flex items-center justify-between p-5 lg:p-6 bg-transparent hover:bg-off-white/50 transition-colors duration-300 group"
              >
                <span className="font-heading font-bold text-sm tracking-widest uppercase text-dark-navy group-hover:text-primary-blue transition-colors duration-300">
                  {language === 'ua' ? 'Детальний опис' : 'Detailed Description'}
                </span>
                <motion.div
                  animate={{ rotate: isDescriptionOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary-blue opacity-70 group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isDescriptionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 lg:px-6 pb-6 pt-2">
                      <div className="pt-5 border-t border-metallic-silver/20 space-y-5">
                        <p className="font-body text-[15px] text-charcoal/80 leading-relaxed">
                          {language === 'ua' ? 'Професійне обладнання, розроблене для ефективного виконання спеціалізованих завдань. Виготовлено з високоміцних та зносостійких матеріалів.' : 'Professional equipment designed for the effective execution of specialized tasks. Manufactured from high-strength and wear-resistant materials.'}
                        </p>
                        
                        <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm">
                           <h5 className="font-heading font-bold text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                             {language === 'ua' ? 'Базові характеристики:' : 'Basic Specifications:'}
                           </h5>
                           <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                             <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                               <span>{language === 'ua' ? 'Довжина (мін/макс)' : 'Length (min/max)'}</span>
                               <span className="font-semibold text-dark-navy">800 мм - 1500 мм</span>
                             </li>
                             <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                               <span>{language === 'ua' ? 'Вага' : 'Weight'}</span>
                               <span className="font-semibold text-dark-navy">1.2 кг</span>
                             </li>
                             <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                               <span>{language === 'ua' ? 'Матеріал' : 'Material'}</span>
                               <span className="font-semibold text-dark-navy text-right">{language === 'ua' ? 'Анодований алюміній / Карбон' : 'Anodized Aluminum / Carbon'}</span>
                             </li>
                             <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                               <span>{language === 'ua' ? 'Робоча температура' : 'Operating Temperature'}</span>
                               <span className="font-semibold text-dark-navy">-20°C ... +60°C</span>
                             </li>
                             <li className="flex justify-between">
                               <span>{language === 'ua' ? 'Клас захисту' : 'Protection Class'}</span>
                               <span className="font-semibold text-dark-navy">IP67</span>
                             </li>
                           </ul>
                        </div>
                        
                        <p className="font-body text-[12px] text-cool-gray leading-relaxed italic">
                          {language === 'ua' ? '* Ці характеристики є орієнтовними та будуть оновлені після затвердження фінального опису.' : '* These specifications are indicative and will be updated upon final description approval.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Other Products Section */}
        <div className="mt-20 lg:mt-24 pt-12 lg:pt-16 border-t border-metallic-silver/30">
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-dark-navy mb-8 lg:mb-10 text-center lg:text-left">
            {t.featured.otherProducts || "Other Products"}
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {otherProducts.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1rem)] snap-start shrink-0 flex flex-col group cursor-pointer bg-white p-5 lg:p-6 border border-metallic-silver/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary-blue/30 rounded-xl transition-all duration-300">
                <div className="aspect-square bg-white mb-5 flex items-center justify-center relative overflow-hidden p-4 lg:p-6 border border-metallic-silver/10 rounded-lg group-hover:border-primary-blue/20 transition-colors duration-300">
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
                  {p.type === 'mirror' ? t.featured.mirror : p.type === 'kit' ? t.featured.kit : t.featured.probe}
                </h4>
                <h3 className="font-heading text-lg lg:text-base font-black text-dark-navy group-hover:text-primary-blue transition-colors duration-300">
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
