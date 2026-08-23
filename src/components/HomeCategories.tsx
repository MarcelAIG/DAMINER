import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function HomeCategories() {
  const { t, language } = useLanguage();
  
  const itemsToRender = t.categories.items.map((title, index) => ({
    id: String(index),
    title,
    description: t.categories.descriptions?.[index] || "",
    imageBase64: null,
  }));

  const heading = language === 'ua' ? 'Обладнання DAMINER' : 'DAMINER Equipment';
  const intro = language === 'ua' 
    ? 'Високоточні інструменти та системи для професійного розмінування.' 
    : 'High-precision tools and systems for professional demining.';
  const viewText = language === 'ua' ? 'Переглянути категорію' : 'View Category';

  const row1 = itemsToRender.slice(0, 3);
  const row2 = itemsToRender.slice(3, 5);

  const CategoryItem = ({ item, isLast }: { item: any, isLast?: boolean }) => (
    <Link 
      to="/catalog" 
      className={`flex flex-col group w-full ${isLast ? '' : 'border-b md:border-b-0 md:border-r'} border-metallic-silver/30 p-8 lg:p-12 transition-colors duration-500`}
    >
      <div className="aspect-square bg-off-white/50 mb-10 flex items-center justify-center relative overflow-hidden">
        {item.imageBase64 ? (
          <img 
            src={item.imageBase64} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}></div>
            <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-xs relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              Visual
            </span>
          </div>
        )}
      </div>
      
      <h3 className="font-heading font-bold text-2xl lg:text-3xl text-dark-navy mb-4 tracking-tight transition-colors duration-300">
        {item.title}
      </h3>
      
      <p className="font-body text-charcoal/70 mb-10 flex-1 leading-relaxed text-[15px]">
        {item.description}
      </p>
      
      <div className="mt-auto pt-2">
        <span className="inline-flex items-center justify-center border border-metallic-silver/60 group-hover:border-primary-blue text-dark-navy group-hover:text-primary-blue font-heading font-bold text-[10px] md:text-[11px] tracking-widest uppercase px-6 py-3 transition-colors duration-300">
          {viewText}
        </span>
      </div>
    </Link>
  );

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="max-w-4xl mb-16 md:mb-24 text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark-navy tracking-tight mb-6"
          >
            {heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-lg md:text-xl text-charcoal/70 max-w-2xl leading-relaxed"
          >
            {intro}
          </motion.p>
        </div>

        <div className="flex flex-col border-t border-metallic-silver/30">
          {/* Row 1: 3 columns */}
          <div className="flex flex-col md:flex-row border-b border-metallic-silver/30">
            {row1.map((item, idx) => (
              <div key={item.id} className="w-full md:w-1/3 flex">
                <CategoryItem item={item} isLast={idx === row1.length - 1} />
              </div>
            ))}
          </div>
          
          {/* Row 2: 2 columns, centered */}
          <div className="flex flex-col md:flex-row justify-center border-b border-metallic-silver/30">
            {row2.map((item, idx) => (
              <div key={item.id} className="w-full md:w-1/3 flex">
                {/* Ensure border-r on first item, no border on last to simulate centering cleanly */}
                <CategoryItem item={item} isLast={idx === row2.length - 1} />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
