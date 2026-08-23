import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Terms() {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[90px] min-h-screen flex flex-col bg-white">
      <section className="relative bg-dark-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 80%)'
        }}></div>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
              {language === 'ua' ? 'Умови використання' : 'Terms & Conditions'}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-20 flex-grow bg-white">
        <div className="max-w-[800px] mx-auto px-6 md:px-12 prose prose-lg prose-slate text-charcoal/80">
          <h2 className="font-heading font-bold text-2xl mb-4 text-dark-navy">
            {language === 'ua' ? 'Текст буде додано пізніше' : 'Content to be added later'}
          </h2>
          <p className="font-body leading-relaxed">
            {language === 'ua' 
              ? 'Остаточний юридичний текст Умов використання буде надано клієнтом та розміщено тут.'
              : 'The final legal text for the Terms & Conditions will be provided by the client and placed here.'}
          </p>
          <div className="h-64 bg-off-white border border-dashed border-metallic-silver/40 rounded flex items-center justify-center mt-8">
            <span className="text-metallic-silver font-medium uppercase tracking-widest text-sm">
              [ Placeholder Content ]
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
