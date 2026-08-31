import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';

export function Stats() {
  const { language } = useLanguage();

  const stats = [
    {
      value: "2023",
      label: language === 'ua' ? "Рік заснування" : "Founded"
    },
    {
      value: language === 'ua' ? "1+ рік" : "1+ Year",
      label: language === 'ua' ? "Стандартна гарантія" : "Standard Warranty"
    },
    {
      value: "5",
      label: language === 'ua' ? "Категорій продукції" : "Product Categories"
    },
    {
      value: "ISO 9001",
      label: language === 'ua' ? "Система управління якістю" : "Quality Management System"
    }
  ];

  return (
    <section className="pt-4 pb-16 md:pt-8 md:pb-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 xl:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 text-center"
        >
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-[54px] text-dark-navy tracking-tight uppercase [-webkit-text-stroke:1px_currentColor]">
            {language === 'ua' ? 'DAMINER у цифрах' : 'DAMINER in Numbers'}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-metallic-silver/30">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 + (idx * 0.1) }}
              className={`flex flex-col items-center justify-start text-center pt-24 pb-20 px-8 
                ${idx % 2 !== 0 ? 'border-l border-metallic-silver/30' : ''} 
                ${idx > 1 ? 'border-t border-metallic-silver/30 lg:border-t-0' : ''}
                ${idx === 2 ? 'lg:border-l lg:border-metallic-silver/30' : ''}
              `}
            >
              <div className="font-heading font-black text-4xl md:text-5xl lg:text-[54px] xl:text-6xl leading-none text-dark-navy mb-8 tracking-tight whitespace-nowrap">
                {stat.value}
              </div>
              <h3 className="font-heading font-bold text-[13px] text-charcoal/90 uppercase tracking-[0.15em] leading-relaxed max-w-[200px]">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
