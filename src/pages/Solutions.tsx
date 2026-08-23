import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Package, Briefcase, Layers, Cog, ArrowRight } from 'lucide-react';

export function Solutions() {
  const { t } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const icons = [
    <Package className="w-12 h-12 text-primary-blue mb-6" />,
    <Briefcase className="w-12 h-12 text-primary-blue mb-6" />,
    <Layers className="w-12 h-12 text-primary-blue mb-6" />,
    <Cog className="w-12 h-12 text-primary-blue mb-6" />
  ];

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
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              {t.solutionsPage.heading}
            </h1>
            <p className="font-body text-lg md:text-xl text-off-white/80 max-w-2xl leading-relaxed">
              {t.solutionsPage.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-10">
            {t.solutionsPage.items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-10 md:p-12 border border-metallic-silver/20 hover:border-primary-blue/30 hover:shadow-[0_20px_50px_-20px_rgba(30,99,216,0.15)] transition-colors duration-300 group flex flex-col h-full"
              >
                {icons[index]}
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-6 group-hover:text-primary-blue transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal/70 leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>
                <div className="pt-8 border-t border-metallic-silver/20 flex items-center justify-between">
                  <span className="font-heading font-bold text-sm tracking-widest text-primary-blue uppercase group-hover:text-dark-navy transition-colors duration-300">
                    DAMINER PRO
                  </span>
                  <ArrowRight size={20} className="text-primary-blue opacity-0 group-hover:opacity-100 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions CTA */}
      <section className="py-24 md:py-32 bg-metallic-silver/10 text-center">
        <div className="max-w-[800px] mx-auto px-6 md:px-12">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-dark-navy mb-10 leading-tight">
            {t.cta.heading}
          </h2>
          <a 
            href="/#contact"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-primary-blue text-white hover:bg-white hover:text-primary-blue border border-primary-blue font-heading font-bold text-sm tracking-widest uppercase px-12 py-5 transition-colors duration-300"
          >
            {t.solutionsPage.cta}
          </a>
        </div>
      </section>
    </main>
  );
}
