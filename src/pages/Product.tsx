import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck, ZoomIn, ZoomOut, ChevronDown } from 'lucide-react';
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
  const [isK1KitOpen, setIsK1KitOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsDescriptionOpen(false);
    setSelectedImageIdx(0);
    setIsZoomed(false);
    setIsK1KitOpen(false);
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
    },
    {
      id: "net-1",
      type: "net",
      model: language === 'ua' ? 'Сіткомет' : 'Net Launcher',
      description: "",
      price: "",
      imageBase64: "/Сіткомети протидронові/net-main.png",
      gallery: [
        "/Сіткомети протидронові/net-main.png",
        "/Сіткомети протидронові/net-02.png",
        "/Сіткомети протидронові/net-03.png",
        "/Сіткомети протидронові/net-04.png"
      ]
    },
    {
      id: "tool-1",
      type: "tool",
      model: language === 'ua' ? 'Електричний кабель на барабані' : 'Electric Cable on Reel',
      description: "",
      price: "",
      imageBase64: "/electric-cable/cable-main.png",
      gallery: [
        "/electric-cable/cable-main.png",
        "/electric-cable/cable-02.png",
        "/electric-cable/cable-03.png"
      ]
    },
    {
      id: "tool-2",
      type: "tool",
      model: language === 'ua' ? 'Кактус-5' : 'Kaktus-5',
      description: "",
      price: "",
      imageBase64: "/kaktus-5/kaktus-main.png",
      gallery: [
        "/kaktus-5/kaktus-main.png",
        "/kaktus-5/kaktus-02.png",
        "/kaktus-5/kaktus-03.png",
        "/kaktus-5/kaktus-04.png",
        "/kaktus-5/kaktus-05.jpg"
      ]
    },
    {
      id: "tool-3",
      type: "tool",
      model: language === 'ua' ? 'Ключ-1' : 'Key-1',
      description: "",
      price: "",
      imageBase64: "/key-1/key-main.png",
      gallery: [
        "/key-1/key-main.png",
        "/key-1/key-01.jpg",
        "/key-1/key-02.png",
        "/key-1/key-03.png",
        "/key-1/key-04.png"
      ]
    },
    {
      id: "tool-4",
      type: "tool",
      model: language === 'ua' ? 'Магнітні граблі' : 'Magnetic Rake',
      description: "",
      price: "",
      imageBase64: "/rake-1/rake-02.png",
      gallery: [
        "/rake-1/rake-02.png",
        "/rake-1/rake-main.png",
        "/rake-1/rake-03.png",
        "/rake-1/rake-04.png"
      ]
    }
  ];

  const product = items.find(item => item.id === id) || items[0];
  const otherProducts = items.filter(item => item.id !== product.id);

  return (
    <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 lg:pt-6">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-primary-blue hover:text-dark-navy font-heading font-black text-[13px] uppercase tracking-widest transition-colors duration-300 mb-12 lg:mb-6 relative z-20 py-2 pr-4 w-fit cursor-pointer">
          <ArrowLeft size={18} strokeWidth={2.5} />
          {t.nav.catalog}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 lg:items-start">
          <div className="flex flex-col gap-4">
            <div 
              className={`aspect-[4/5] lg:aspect-square lg:max-h-[65vh] bg-white border border-metallic-silver/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl flex items-center justify-center p-4 lg:p-6 relative overflow-hidden group transition-all duration-300 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={handleZoom}
            >
              {product.gallery && product.gallery[selectedImageIdx] ? (
                <img 
                  key={`main-img-${selectedImageIdx}`}
                  src={product.gallery[selectedImageIdx]} 
                  alt={product.model} 
                  className={`w-full h-full object-contain transition-transform duration-500 ease-out ${
                    isZoomed ? 'scale-[1.75]' : 
                    product.id === 'tool-2' ? 'scale-[1.35]' : 
                    product.id === 'tool-3' ? 'scale-[1.3]' : 
                    product.id === 'tool-4' ? 'scale-[1.3]' : 
                    'scale-100'
                  }`}
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
                        className={`w-full h-full object-contain pointer-events-none ${
                        product.id === 'tool-2' ? 'scale-[1.35]' : 
                        product.id === 'tool-3' ? 'scale-[1.3]' : 
                        product.id === 'tool-4' ? 'scale-[1.3]' : 
                        ''
                      }`}
                        draggable={false}
                      />
                    ) : (
                      <span className="text-xs text-cool-gray">Thumb {idx + 1}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center">
            <h4 className="font-heading text-sm text-cool-gray tracking-widest uppercase font-bold mb-4 lg:mb-2">
              {product.type === 'mirror' ? t.featured.mirror : product.type === 'kit' ? t.featured.kit : product.type === 'net' ? t.featured.net : t.featured.probe}
            </h4>
            <h1 className="font-heading text-5xl md:text-6xl font-black text-dark-navy mb-8 lg:mb-5 tracking-tight">
              {product.model}
            </h1>
            
            <div className="font-body text-charcoal/70 text-lg mb-12 lg:mb-8 leading-relaxed space-y-4">
              {product.id === "1" ? (
                <>
                  <p>Щуп пошуковий ЩР-1 призначений для розвідки та пошуку протипіхотних та протитанкових мін при проведенні робіт з розмінування, а також пошуку інших предметів та схованок при проведенні пошукових робіт.</p>
                  <p>Щуп складається з алюмінієвої рукоятки та двох алюмінієвих подовжувальних штанг, до яких за допомогою накидної гайки кріпляться чотири змінних наконечники — стальний, латунний та два діелектричних.</p>
                  <p>Накидна гайка має два отвори, що дозволяють кріпити змінні наконечники вздовж осі щупа або під кутом 30 градусів.</p>
                  <p>Завдяки цьому щуп може збиратися у двох варіантах — для роботи стоячи або для роботи лежачи.</p>
                  <p>Щуп розміщений у чохлі для переноски.</p>
                </>
              ) : product.id === "2" ? (
                <>
                  <p>Щуп пошуковий ЩР-3/2 призначений для розвідки та пошуку протипіхотних та протитанкових мін при проведенні робіт з розмінування, а також пошуку інших предметів та схованок при проведенні пошукових робіт.</p>
                  <p>Щуп складається з дерев’яної рукоятки та алюмінієвої подовжуючої штанги, до яких за допомогою накидної гайки кріпляться чотири змінних наконечники — стальний, латунний та два діелектричних.</p>
                  <p>Накидна гайка має два отвори, що дозволяють кріпити змінні наконечники вздовж осі щупа або під кутом 30 градусів.</p>
                  <p>Завдяки цьому щуп може збиратися у двох варіантах — для роботи стоячи або для роботи лежачи.</p>
                  <p>Щуп розміщений у чохлі для переноски.</p>
                </>
              ) : product.id === "3" ? (
                <>
                  <p>Щуп пошуковий ЩР-8 призначений для розвідки та пошуку протипіхотних та протитанкових мін при проведенні робіт з розмінування, а також пошуку інших предметів та схованок при проведенні пошукових робіт.</p>
                  <p>Щуп складається з пластикової рукоятки та трьох алюмінієвих подовжуючих штанг, до яких за допомогою накидної гайки кріпляться змінні наконечники — стальний, латунний та два діелектричних.</p>
                  <p>Накидна гайка має два отвори, що дозволяють кріпити змінні наконечники вздовж осі щупа або під кутом 30 градусів.</p>
                  <p>Завдяки цьому щуп може збиратися у двох варіантах — для роботи стоячи або для роботи лежачи.</p>
                  <p>Щуп розміщений у чохлі для переноски.</p>
                </>
              ) : product.id === "m1" ? (
                <>
                  <p className="font-bold text-dark-navy uppercase tracking-wide text-sm mb-1">ДЗЕРКАЛО З РОЗСУВНОЮ ШТАНГОЮ ТА ОСВІТЛЮВАЧЕМ</p>
                  <p>Дзеркало ЗД-1 призначене для огляду приміщень, транспортних засобів, спортивних споруд, пошуку зброї, вибухонебезпечних предметів, контрабанди.</p>
                  <p>Дзеркало може використовуватися працівниками вибухотехнічних служб, служб охорони, митниці, прикордонних військ та іншими підрозділами.</p>
                  <p>Дзеркало виготовляється при сприянні НДІ спецтехніки при ГУ МВС України.</p>
                </>
              ) : product.id === "m2" ? (
                <>
                  <p className="font-bold text-dark-navy uppercase tracking-wide text-sm mb-1">НАБІР ДЗЕРКАЛ З РОЗСУВНОЮ ШТАНГОЮ ТА ОСВІТЛЮВАЧЕМ</p>
                  <p>Набір дзеркал ЗД-2 призначений для огляду приміщень, транспортних засобів, спортивних споруд, пошуку зброї, вибухонебезпечних предметів, контрабанди.</p>
                  <p>Набір може використовуватися працівниками вибухотехнічних служб, служб охорони, митниці, прикордонних військ та іншими підрозділами.</p>
                  <p>Набір виготовляється при сприянні НДІ спецтехніки при ГУ МВС України.</p>
                </>
              ) : product.id === "m3" ? (
                <>
                  <p className="font-bold text-dark-navy uppercase tracking-wide text-sm mb-1">НАБІР ДЗЕРКАЛ З РОЗСУВНОЮ ШТАНГОЮ ТА ОСВІТЛЮВАЧЕМ</p>
                  <p>Набір дзеркал ЗД-2У призначений для огляду приміщень, транспортних засобів, спортивних споруд, пошуку зброї, вибухонебезпечних предметів, контрабанди.</p>
                  <p>Набір може використовуватися працівниками вибухотехнічних служб, служб охорони, митниці, прикордонних військ та іншими підрозділами.</p>
                  <p>Набір виготовляється при сприянні НДІ спецтехніки при ГУ МВС України.</p>
                </>
              ) : product.id === "k1" ? (
                <>
                  <p className="font-bold text-dark-navy uppercase tracking-wide text-sm mb-1">НАБІР ДЛЯ РОЗМІНУВАННЯ / КОМПЛЕКТ САПЕРА ЕОД-1</p>
                  <p>Набір призначений для транспортування і зберігання стандартних і спеціальних приладів та інструментів, які використовуються для виконання специфічних завдань: огляду місць мінувань, пошуку вибухонебезпечних предметів, знешкодження боєприпасів та саморобних вибухових пристроїв.</p>
                  <p>Комплексний набір включає модулі та пристосування для виконання всього комплексу робіт у різноманітних умовах — відкрита місцевість, будівлі та споруди, автомобільний транспорт та ін.</p>
                  <p>Набір має компактні розміри, мінімальну вагу та зручне кріплення за допомогою системи MOLLE, а також ремінь для перенесення.</p>
                </>
              ) : (
                <p>{product.description}</p>
              )}
            </div>
            
            <div className="bg-white p-6 lg:p-5 mb-12 lg:mb-8 flex items-start gap-4 lg:gap-4 border border-metallic-silver/30 shadow-sm">
              <ShieldCheck size={24} className="text-primary-blue shrink-0 mt-0.5 lg:mt-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-heading font-black text-sm uppercase tracking-widest text-dark-navy mb-2 lg:mb-1.5">
                  {t.featured.warrantyTitle}
                </h5>
                <p className="font-body text-[15px] text-charcoal/80 leading-relaxed lg:leading-normal">
                  {t.featured.warrantyDesc1} <br/>
                  {t.featured.warrantyDesc2}
                </p>
              </div>
            </div>
            
            <div className="pt-8 lg:pt-6 border-t border-metallic-silver/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="font-heading font-black text-base tracking-widest uppercase text-dark-navy">
                {t.featured.price}
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addItem({ id: product.id, model: product.model });
                }}
                className="w-full sm:w-auto py-5 px-12 bg-primary-blue text-white font-heading font-black text-sm tracking-widest uppercase border border-primary-blue hover:bg-white hover:text-primary-blue transition-colors duration-300 inline-flex justify-center"
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
                <span className="font-heading font-black text-sm tracking-widest uppercase text-dark-navy group-hover:text-primary-blue transition-colors duration-300">
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
                        {product.id === "1" ? (
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 ТЕХНІЧНІ ДАНІ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Максимальна довжина з рукояткою</span>
                                   <span className="font-bold text-dark-navy text-right">не менше 1250 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Мінімальна довжина з рукояткою</span>
                                   <span className="font-bold text-dark-navy text-right">не менше 630 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Вага комплекту</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 0,8 кг</span>
                                 </li>
                               </ul>
                            </div>
                            
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 КОМПЛЕКТАЦІЯ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Щуп пошуковий</span>
                                   <span className="font-bold text-dark-navy text-right">1 комплект</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Чохол</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                               </ul>
                            </div>
                          </div>
                        ) : product.id === "2" ? (
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 ТЕХНІЧНІ ДАНІ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Максимальна довжина з рукояткою</span>
                                   <span className="font-bold text-dark-navy text-right">не менше 1350 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Мінімальна довжина з рукояткою</span>
                                   <span className="font-bold text-dark-navy text-right">не менше 500 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Вага комплекту</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 1,5 кг</span>
                                 </li>
                               </ul>
                            </div>
                            
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 КОМПЛЕКТАЦІЯ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Щуп пошуковий</span>
                                   <span className="font-bold text-dark-navy text-right">1 комплект</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Чохол</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                               </ul>
                            </div>
                          </div>
                        ) : product.id === "3" ? (
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 ТЕХНІЧНІ ДАНІ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Максимальна довжина з рукояткою</span>
                                   <span className="font-bold text-dark-navy text-right">не менше 1650 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Мінімальна довжина з рукояткою</span>
                                   <span className="font-bold text-dark-navy text-right">не менше 450 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Вага комплекту</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 2,1 кг</span>
                                 </li>
                               </ul>
                            </div>
                            
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 КОМПЛЕКТАЦІЯ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Щуп пошуковий</span>
                                   <span className="font-bold text-dark-navy text-right">1 комплект</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Чохол</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                               </ul>
                            </div>
                          </div>
                        ) : product.id === "m1" ? (
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 ТЕХНІЧНІ ДАНІ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Довжина в робочому положенні</span>
                                   <span className="font-bold text-dark-navy text-right">1200 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Довжина в складеному положенні</span>
                                   <span className="font-bold text-dark-navy text-right">480 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Вага без освітлювача</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 0,5 кг</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Розмір дзеркала</span>
                                   <span className="font-bold text-dark-navy text-right">78 × 120 мм</span>
                                 </li>
                               </ul>
                            </div>
                            
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 КОМПЛЕКТАЦІЯ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Штанга телескопічна</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Дзеркало 75 × 120</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Кронштейн для ліхтаря</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Чохол</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Ліхтар</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Елементи живлення для ліхтаря</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Паспорт</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                               </ul>
                            </div>
                          </div>
                        ) : product.id === "m2" ? (
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 ТЕХНІЧНІ ДАНІ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Довжина в робочому положенні</span>
                                   <span className="font-bold text-dark-navy text-right">1300 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Довжина в складеному положенні</span>
                                   <span className="font-bold text-dark-navy text-right">430 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Вага без освітлювача</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 0,8 кг</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Змінні дзеркала</span>
                                   <span className="font-bold text-dark-navy text-right">Ø150 мм, Ø105 мм, Ø70 мм, 120 × 75 мм</span>
                                 </li>
                               </ul>
                            </div>
                            
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 КОМПЛЕКТАЦІЯ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Штанга телескопічна з шарніром</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Змінні дзеркала</span>
                                   <span className="font-bold text-dark-navy text-right">4 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Кронштейн для ліхтаря</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Валіза з планшетами</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Ліхтар з елементами живлення</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Паспорт</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                               </ul>
                            </div>
                          </div>
                        ) : product.id === "m3" ? (
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 ТЕХНІЧНІ ДАНІ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Довжина в робочому положенні</span>
                                   <span className="font-bold text-dark-navy text-right">1240 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Довжина в складеному положенні</span>
                                   <span className="font-bold text-dark-navy text-right">610 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Вага без освітлювача</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 0,8 кг</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Дзеркало</span>
                                   <span className="font-bold text-dark-navy text-right">Ø170 мм</span>
                                 </li>
                               </ul>
                            </div>
                            
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 КОМПЛЕКТАЦІЯ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Штанга телескопічна з шарніром</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Змінне дзеркало</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Кронштейн для ліхтаря</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Чохол</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Ліхтарик</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Елементи живлення для ліхтаря</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Паспорт</span>
                                   <span className="font-bold text-dark-navy text-right">1 шт.</span>
                                 </li>
                               </ul>
                            </div>
                          </div>
                        ) : product.id === "k1" ? (
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            <div>
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 ТЕХНІЧНІ ДАНІ:
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Габаритні розміри сумки</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 330 × 230 × 120 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>Загальна вага</span>
                                   <span className="font-bold text-dark-navy text-right">не більше 4,7 кг</span>
                                 </li>
                               </ul>
                            </div>
                            
                            <div className="pt-2">
                               <button 
                                 onClick={(e) => { e.preventDefault(); setIsK1KitOpen(!isK1KitOpen); }}
                                 className="w-full flex items-center justify-between bg-white border border-metallic-silver/20 p-3 rounded-sm hover:border-primary-blue/30 transition-colors"
                               >
                                 <div className="flex items-center gap-2">
                                   <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy">
                                     КОМПЛЕКТАЦІЯ
                                   </h5>
                                   <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-blue/10 text-primary-blue rounded-sm">
                                     48 ПОЗИЦІЙ
                                   </span>
                                 </div>
                                 <ChevronDown 
                                   size={16} 
                                   className={`text-primary-blue transition-transform duration-300 ${isK1KitOpen ? 'rotate-180' : ''}`}
                                 />
                               </button>
                               
                               <AnimatePresence>
                                 {isK1KitOpen && (
                                   <motion.div
                                     initial={{ height: 0, opacity: 0 }}
                                     animate={{ height: "auto", opacity: 1 }}
                                     exit={{ height: 0, opacity: 0 }}
                                     className="overflow-hidden"
                                   >
                                     <div className="pt-4 px-1">
                                       <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 font-body text-[13px] text-charcoal/80">
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">1. Сумка з ременем</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">2. Мультитул сапера</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">3. Лопатка саперна</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">4. Паракорд 3 мм, 35 м</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">5. Захват мотузковий</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">6. Кішка для розтяжок</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">7. Кішка для з’єму мін</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">8. Датчик розтяжок</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">9. Карабіни</span><span className="font-bold text-dark-navy whitespace-nowrap">2 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">10. Стяжки пластикові</span><span className="font-bold text-dark-navy whitespace-nowrap">20 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">11. Стропа мотузкова 1 м</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">12. Різак</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">13. Кусачки для ізоляції</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">14. Кусачки бокорізи малі</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">15. Ножиці зігнуті</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">16. Ножиці прямі</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">17. Зажим з фіксатором</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">18. Зажим різьбовий</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">19. Пінцет прямий</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">20. Пінцет зігнутий</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">21. Захват цанговий</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">22. Гачок трьохсторонній</span><span className="font-bold text-dark-navy whitespace-nowrap">3 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">23. Ліхтарик налобний</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">24. Ліхтарик USB малий</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">25. Шнур USB</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">26. Котушка для ізострічки</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">26.1. Ізострічка червона</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">26.2. Ізострічка чорна</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">26.3. Стрічка тканинна</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">26.4. Скотч армований</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">26.5. Скотч двосторонній</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">27. Запобіжні чеки Р-подібні</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">28. Запобіжні чеки Т-подібні</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">29. Запобіжні чеки З-подібні</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">30. Запобіжні чеки довгі</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">31. Перенаправлювач розтяжок</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">32. Булавки</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">33. Карабіни для розтяжок</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">34. Оправка для МУВ</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">35. Універсальний ключ ПТМ</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">36. Котушка дротів/ниток</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">36.1. Дріт сталь (100 м)</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">36.2. Дріт 0,8 мм (20 м)</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">36.3. Нитки чорні (100 м)</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">36.4. Нитки зелені (100 м)</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5 pl-4 text-charcoal/60"><span className="truncate pr-2">36.5. Ліска (100 м)</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">37. Пенал універсальний</span><span className="font-bold text-dark-navy whitespace-nowrap">2 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">38. Комплект скребків</span><span className="font-bold text-dark-navy whitespace-nowrap">1 компл</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">39. Пенал для детонаторів</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">40. Мінідзеркало оглядове</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">41. Щуп малий</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">42. Маркер знайдених мін «М»</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">43. Турбозапальничка газова</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">44. Щітка 20–25 мм</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">45. Саморіз 30 мм</span><span className="font-bold text-dark-navy whitespace-nowrap">10 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">46. Рулетка 3 м</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">47. Котушка підрив. дроту</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                         <li className="flex justify-between border-b border-metallic-silver/10 pb-1.5"><span className="truncate pr-2">48. Чохол для котушки</span><span className="font-bold text-dark-navy whitespace-nowrap">1 шт.</span></li>
                                       </ul>
                                     </div>
                                   </motion.div>
                                 )}
                               </AnimatePresence>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="font-body text-[15px] text-charcoal/80 leading-relaxed">
                              {language === 'ua' ? 'Професійне обладнання, розроблене для ефективного виконання спеціалізованих завдань. Виготовлено з високоміцних та зносостійких матеріалів.' : 'Professional equipment designed for the effective execution of specialized tasks. Manufactured from high-strength and wear-resistant materials.'}
                            </p>
                            
                            <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm">
                               <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                 {language === 'ua' ? 'Базові характеристики:' : 'Basic Specifications:'}
                               </h5>
                               <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>{language === 'ua' ? 'Довжина (мін/макс)' : 'Length (min/max)'}</span>
                                   <span className="font-bold text-dark-navy">800 мм - 1500 мм</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>{language === 'ua' ? 'Вага' : 'Weight'}</span>
                                   <span className="font-bold text-dark-navy">1.2 кг</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>{language === 'ua' ? 'Матеріал' : 'Material'}</span>
                                   <span className="font-bold text-dark-navy text-right">{language === 'ua' ? 'Анодований алюміній / Карбон' : 'Anodized Aluminum / Carbon'}</span>
                                 </li>
                                 <li className="flex justify-between border-b border-metallic-silver/20 pb-1.5">
                                   <span>{language === 'ua' ? 'Робоча температура' : 'Operating Temperature'}</span>
                                   <span className="font-bold text-dark-navy">-20°C ... +60°C</span>
                                 </li>
                                 <li className="flex justify-between">
                                   <span>{language === 'ua' ? 'Клас захисту' : 'Protection Class'}</span>
                                   <span className="font-bold text-dark-navy">IP67</span>
                                 </li>
                               </ul>
                            </div>
                          </>
                        )}
                        
                        <p className="font-body text-[12px] text-cool-gray leading-relaxed italic">
                          {language === 'ua' ? '* Ці характеристики є орієнтовними та будуть оновлені після затвердження фінального опису.' : '* These specifications are indicative and will be updated upon final description approval.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Other Products Section */}
        <div className="mt-20 lg:mt-24 pt-12 lg:pt-16 border-t border-metallic-silver/30">
          <h2 className="font-heading text-2xl lg:text-3xl font-black text-dark-navy mb-8 lg:mb-10 text-center lg:text-left">
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
                <h4 className="font-heading text-[11px] text-cool-gray tracking-widest uppercase font-bold mb-1 lg:mb-0.5">
                  {p.type === 'mirror' ? t.featured.mirror : p.type === 'kit' ? t.featured.kit : p.type === 'net' ? t.featured.net : t.featured.probe}
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
