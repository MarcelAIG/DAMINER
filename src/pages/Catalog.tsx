import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CadProbe, CadMirror, CadKit, CadNet, CadTool } from '../components/CadDrawings';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Featured } from '../components/Featured';
import { MirrorsCategory } from '../components/MirrorsCategory';
import { KitsCategory } from '../components/KitsCategory';

export function Catalog() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t, language } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const slugs = ["probes", "mirrors", "kits", "nets", "tools"];
  const categoryIndex = categoryId ? slugs.indexOf(categoryId) : -1;
  const categoryTitle = categoryIndex !== -1 ? t.categories.items[categoryIndex] : (t as any).catalogLanding?.heading || t.nav.catalog;
  const categoryDescription = categoryIndex !== -1 ? t.categories.descriptions[categoryIndex] : (t as any).catalogLanding?.subheading;
  
  return (
    <main className="pt-[90px] bg-off-white min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-white pt-2 md:pt-4 pb-2 md:pb-4 relative overflow-hidden border-b border-metallic-silver/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 flex flex-col py-4"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 font-body text-base text-charcoal/60 mb-10 md:mb-16">
              <Link to="/" className="font-bold hover:text-primary-blue transition-colors duration-300">
                {language === 'ua' ? 'Головна' : 'Home'}
              </Link>
              <ChevronRight className="w-4 h-4 text-dark-navy/40" strokeWidth={2.5} />
              <span className="text-dark-navy font-black tracking-wide uppercase text-sm">{categoryTitle}</span>
            </div>
            
            <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-[54px] mb-2 md:mb-4 text-dark-navy tracking-tight leading-[1.1]">
              {categoryTitle}
            </h1>
            
            <p className="font-body text-[17px] md:text-[18px] text-charcoal/70 max-w-lg leading-relaxed">
              {categoryDescription}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 60, y: 20, rotate: 5, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full md:w-1/2 h-[160px] md:h-[220px] lg:h-[260px] relative flex items-center justify-center md:justify-start lg:justify-center"
          >
            {/* Soft Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 md:left-[45%] lg:left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-primary-blue/[0.04] rounded-full blur-[40px] md:blur-[50px] pointer-events-none -z-10"></div>
            {categoryId === 'mirrors' && <div className="group cursor-pointer w-[120%] sm:w-[110%] md:w-[130%] lg:w-[150%] max-w-[550px] scale-110 text-dark-navy/40 hover:text-primary-blue transition-colors duration-75 mix-blend-multiply opacity-90 md:-translate-x-12 lg:-translate-x-20"><CadMirror /></div>}
            {categoryId === 'probes' && <div className="group cursor-pointer w-[120%] sm:w-[110%] md:w-[130%] lg:w-[150%] max-w-[550px] scale-110 text-dark-navy/40 hover:text-primary-blue transition-colors duration-75 mix-blend-multiply opacity-90 md:-translate-x-12 lg:-translate-x-20"><CadProbe /></div>}
            {categoryId === 'kits' && <div className="group cursor-pointer w-[120%] sm:w-[110%] md:w-[130%] lg:w-[150%] max-w-[500px] scale-105 text-dark-navy/40 hover:text-primary-blue transition-colors duration-75 mix-blend-multiply opacity-90 md:-translate-x-8 lg:-translate-x-12"><CadKit /></div>}
            {categoryId === 'nets' && <div className="group cursor-pointer w-[110%] sm:w-[90%] md:w-[110%] lg:w-[120%] max-w-[450px] text-dark-navy/40 hover:text-primary-blue transition-colors duration-75 mix-blend-multiply opacity-90 md:-translate-x-12 lg:-translate-x-20"><CadNet /></div>}
            {categoryId === 'tools' && <div className="group cursor-pointer w-[110%] sm:w-[90%] md:w-[110%] lg:w-[120%] max-w-[450px] text-dark-navy/40 hover:text-primary-blue transition-colors duration-75 mix-blend-multiply opacity-90 md:-translate-x-12 lg:-translate-x-20"><CadTool /></div>}
          </motion.div>
          
        </div>
      </section>

      <div className="pb-24">
        {!categoryId ? (
          <Navigate to="/" replace />
        ) : categoryId === 'probes' ? (
          <Featured />
        ) : categoryId === 'mirrors' ? (
          <MirrorsCategory />
        ) : categoryId === 'kits' ? (
          <KitsCategory />
        ) : (
          <div className="py-32 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 text-center">
             <div className="w-16 h-16 rounded-full bg-dark-navy/5 flex items-center justify-center mx-auto mb-6">
                <div className="w-2 h-2 rounded-full bg-primary-blue animate-ping"></div>
             </div>
             <h2 className="font-heading font-black text-3xl md:text-4xl text-dark-navy tracking-tight mb-6 uppercase">
               {language === 'ua' ? 'Розробка та тестування' : 'In Development'}
             </h2>
             <p className="font-body text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
               {language === 'ua' 
                 ? 'Обладнання в цій категорії наразі проходить фінальні стадії інженерного тестування та сертифікації. Зв\'яжіться з нами для оформлення індивідуального замовлення.' 
                 : 'Equipment in this category is currently undergoing final stages of engineering testing and certification. Contact us for custom manufacturing.'}
             </p>
          </div>
        )}
      </div>
      
    </main>
  );
}
