import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Package, Layers, Cog, Target, Truck, ClipboardList, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Solutions() {
  const { t } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const icons = [
    <Target className="w-12 h-12 text-primary-blue mb-6" />,
    <Package className="w-12 h-12 text-primary-blue mb-6" />,
    <Cog className="w-12 h-12 text-primary-blue mb-6" />,
    <Layers className="w-12 h-12 text-primary-blue mb-6" />,
    <ClipboardList className="w-12 h-12 text-primary-blue mb-6" />,
    <Truck className="w-12 h-12 text-primary-blue mb-6" />,
    <ShieldCheck className="w-12 h-12 text-primary-blue mb-6" />
  ];

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
            <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              {t.solutionsPage.heading}
            </h1>
            <div className="space-y-4">
              {t.solutionsPage.subheading.map((para: string, i: number) => (
                <p key={i} className="font-body text-lg md:text-xl text-off-white/80 max-w-2xl leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-navy mb-4">
              {t.solutionsPage.offerHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {t.solutionsPage.items.map((item: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 md:p-10 border border-metallic-silver/20 flex flex-col h-full"
              >
                {icons[index % icons.length]}
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-4">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal/70 leading-relaxed flex-grow">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Custom Project CTA */}
      <section className="py-24 md:py-32 bg-metallic-silver/10 text-center">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-dark-navy mb-12 md:whitespace-nowrap">
            {t.solutionsPage.customProject.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 text-left">
            {t.solutionsPage.customProject.paragraphs.map((para: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 md:p-10 border border-metallic-silver/20 h-full flex items-center justify-center text-center"
              >
                <p className="font-body text-lg text-charcoal/80 leading-relaxed">
                  {para}
                </p>
              </motion.div>
            ))}
          </div>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center w-full sm:w-auto bg-primary-blue text-white hover:bg-white hover:text-primary-blue border border-primary-blue font-heading font-bold text-sm tracking-widest uppercase px-12 py-5 transition-colors duration-300"
          >
            {t.solutionsPage.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}
