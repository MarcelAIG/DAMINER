import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Plus } from 'lucide-react';

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-off-white">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 xl:px-0 flex flex-col items-center">
        
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <span className="font-heading font-black text-[15px] md:text-base tracking-[0.15em] uppercase text-cool-gray inline-flex flex-col relative pb-4 mb-4 lg:mb-6 items-center">
            FAQ
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-blue"></span>
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-[54px] text-dark-navy leading-[1.1] tracking-tight uppercase">
            {t.faq.heading}
          </h2>
        </div>
        
        {/* Accordion */}
        <div className="w-full max-w-[800px] mx-auto flex flex-col">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className="border-b border-metallic-silver/30 last:border-b-0"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between py-4 lg:py-5 text-left group"
                >
                  <h3 className={`font-heading font-medium text-base lg:text-lg tracking-tight transition-colors duration-300 pr-8 ${isOpen ? 'text-primary-blue' : 'text-dark-navy group-hover:text-primary-blue'}`}>
                    {item.q}
                  </h3>
                  <div className={`shrink-0 flex items-center justify-center transition-all duration-500 ${isOpen ? 'text-primary-blue rotate-45' : 'text-dark-navy/40 group-hover:text-primary-blue'}`}>
                    <Plus size={20} strokeWidth={1.5} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="pb-6 pt-0 pr-12 text-left">
                        <p className="font-body text-[15px] text-charcoal/80 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
