import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, RefreshCcw, ArrowLeftRight } from 'lucide-react';

export function Warranty() {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[90px] min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative bg-dark-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 80%)'
        }}></div>
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
              {t.footer.warranty}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 flex-grow bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Warranty */}
            <div className="bg-off-white p-8 rounded border border-metallic-silver/20 shadow-sm hover:border-primary-blue/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded shadow-sm flex items-center justify-center text-dark-navy mb-8 group-hover:text-primary-blue transition-colors duration-300">
                <ShieldCheck size={28} />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-dark-navy">
                {language === 'ua' ? 'Гарантія' : 'Warranty'}
              </h2>
              <div className="font-body text-charcoal/80 leading-relaxed space-y-2">
                <p>{t.featured.warrantyDesc1}</p>
                <p>{t.featured.warrantyDesc2}</p>
              </div>
            </div>

            {/* Returns */}
            <div className="bg-off-white p-8 rounded border border-metallic-silver/20 shadow-sm hover:border-primary-blue/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded shadow-sm flex items-center justify-center text-dark-navy mb-8 group-hover:text-primary-blue transition-colors duration-300">
                <RefreshCcw size={28} />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-dark-navy">
                {language === 'ua' ? 'Повернення' : 'Returns'}
              </h2>
              <p className="font-body text-charcoal/60 leading-relaxed italic">
                {language === 'ua' 
                  ? '[ Остаточні умови повернення будуть надані клієнтом пізніше. ]'
                  : '[ The final return conditions will be provided by the client later. ]'}
              </p>
            </div>

            {/* Exchanges */}
            <div className="bg-off-white p-8 rounded border border-metallic-silver/20 shadow-sm hover:border-primary-blue/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded shadow-sm flex items-center justify-center text-dark-navy mb-8 group-hover:text-primary-blue transition-colors duration-300">
                <ArrowLeftRight size={28} />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-dark-navy">
                {language === 'ua' ? 'Обмін' : 'Exchanges'}
              </h2>
              <p className="font-body text-charcoal/60 leading-relaxed italic">
                {language === 'ua' 
                  ? '[ Остаточні умови обміну будуть надані клієнтом пізніше. ]'
                  : '[ The final exchange conditions will be provided by the client later. ]'}
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
