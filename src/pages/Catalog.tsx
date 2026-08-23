import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Categories } from '../components/Categories';
import { Featured } from '../components/Featured';

export function Catalog() {
  const { t } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-[90px] bg-off-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-dark-navy text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 80%)'
        }}></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              {t.nav.catalog}
            </h1>
            <p className="font-body text-lg md:text-xl text-off-white/80 max-w-2xl leading-relaxed">
              {t.categories.heading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Content */}
      <div className="pb-24">
        <Categories />
        <div className="pt-12">
          <Featured />
        </div>
      </div>
      
    </main>
  );
}
