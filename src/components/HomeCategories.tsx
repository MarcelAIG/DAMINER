import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function HomeCategories() {
  const { t } = useLanguage();
  
  const itemsToRender = t.categories.items.map((title, index) => ({
    id: String(index),
    title,
    description: t.categories.descriptions?.[index] || "",
    imageBase64: null,
  }));

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-heading font-black text-4xl md:text-5xl text-dark-navy tracking-tight"
          >
            {t.categories.heading}
          </motion.h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {itemsToRender.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
              >
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <h3 className="font-heading font-black text-4xl md:text-5xl text-dark-navy mb-6 tracking-tight leading-[1.1]">
                    {item.title}
                  </h3>
                  <div className="w-16 h-1 bg-primary-blue mb-8"></div>
                  <p className="font-body text-xl text-charcoal/80 mb-10 leading-relaxed max-w-lg whitespace-pre-wrap">
                    {item.description}
                  </p>
                  
                  <Link 
                    to="/catalog"
                    className="inline-flex items-center justify-center bg-primary-blue text-white hover:bg-white hover:text-primary-blue border border-primary-blue font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300 w-fit"
                  >
                    {t.categories.viewLink}
                  </Link>
                </motion.div>

                {/* Image or Placeholder */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="w-full lg:w-1/2 aspect-[4/3] bg-off-white border border-metallic-silver/20 relative flex items-center justify-center overflow-hidden group"
                >
                  {item.imageBase64 ? (
                    <img 
                      src={item.imageBase64} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 mix-blend-multiply transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }}></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-metallic-silver/10 to-transparent transition-opacity duration-500 group-hover:opacity-50"></div>
                      <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-sm relative z-10 transition-transform duration-500 group-hover:scale-110">
                        Image Placeholder
                      </span>
                    </>
                  )}
                </motion.div>

              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
