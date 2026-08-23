import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CreditCard, Truck, Globe } from 'lucide-react';

export function Payment() {
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
              {t.footer.payment}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 flex-grow bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Payment */}
            <div className="bg-off-white p-8 rounded border border-metallic-silver/20 shadow-sm hover:border-primary-blue/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded shadow-sm flex items-center justify-center text-dark-navy mb-8 group-hover:text-primary-blue transition-colors duration-300">
                <CreditCard size={28} />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-dark-navy">
                {language === 'ua' ? 'Оплата' : 'Payment'}
              </h2>
              <p className="font-body text-charcoal/70 leading-relaxed">
                {language === 'ua' 
                  ? '[ Детальний текст про умови оплати буде додано клієнтом пізніше. ]'
                  : '[ Detailed payment terms text will be added by the client later. ]'}
              </p>
            </div>

            {/* Delivery within Ukraine */}
            <div className="bg-off-white p-8 rounded border border-metallic-silver/20 shadow-sm hover:border-primary-blue/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded shadow-sm flex items-center justify-center text-dark-navy mb-8 group-hover:text-primary-blue transition-colors duration-300">
                <Truck size={28} />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-dark-navy">
                {language === 'ua' ? 'Доставка по Україні' : 'Delivery within Ukraine'}
              </h2>
              <p className="font-body text-charcoal/70 leading-relaxed">
                {language === 'ua' 
                  ? '[ Текст про умови доставки в межах України буде додано клієнтом пізніше. ]'
                  : '[ Text regarding delivery terms within Ukraine will be added by the client later. ]'}
              </p>
            </div>

            {/* International Delivery */}
            <div className="bg-off-white p-8 rounded border border-metallic-silver/20 shadow-sm hover:border-primary-blue/30 transition-all duration-300 group">
              <div className="w-14 h-14 bg-white rounded shadow-sm flex items-center justify-center text-dark-navy mb-8 group-hover:text-primary-blue transition-colors duration-300">
                <Globe size={28} />
              </div>
              <h2 className="font-heading font-bold text-2xl mb-4 text-dark-navy">
                {language === 'ua' ? 'Міжнародна доставка' : 'International Delivery'}
              </h2>
              <p className="font-body text-charcoal/70 leading-relaxed">
                {language === 'ua' 
                  ? '[ Текст про міжнародну доставку буде додано клієнтом пізніше. ]'
                  : '[ Text regarding international delivery will be added by the client later. ]'}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
