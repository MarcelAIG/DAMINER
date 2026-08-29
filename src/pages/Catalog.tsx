import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Featured } from '../components/Featured';
import { MirrorsCategory } from '../components/MirrorsCategory';
import { CatalogLanding } from '../components/CatalogLanding';

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
      <section className="relative bg-dark-navy text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 80%)'
        }}></div>
        <div className="absolute inset-0 bg-mesh pointer-events-none z-[5]"></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1] uppercase">
              {categoryTitle}
            </h1>
            <p className="font-body text-lg md:text-xl text-off-white/80 max-w-2xl leading-relaxed">
              {categoryDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Content */}
      <div className="pb-24">
        {!categoryId ? (
          <CatalogLanding />
        ) : categoryId === 'probes' ? (
          <Featured />
        ) : categoryId === 'mirrors' ? (
          <MirrorsCategory />
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
