import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Cog, Activity } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const valueIcons = [
    <Shield className="w-10 h-10 text-primary-blue mb-4" />,
    <Cog className="w-10 h-10 text-primary-blue mb-4" />,
    <Activity className="w-10 h-10 text-primary-blue mb-4" />
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
              {t.aboutPage.heading}
            </h1>
            <p className="font-body text-lg md:text-xl text-off-white/80 max-w-2xl leading-relaxed">
              {t.aboutPage.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Mission & Production */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-navy mb-6">
                {t.aboutPage.missionTitle}
              </h2>
              <div className="w-16 h-1 bg-primary-blue mb-8"></div>
              <p className="font-body text-charcoal/80 text-lg leading-relaxed">
                {t.aboutPage.missionDesc}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-navy mb-6">
                {t.aboutPage.productionTitle}
              </h2>
              <div className="w-16 h-1 bg-primary-blue mb-8"></div>
              <p className="font-body text-charcoal/80 text-lg leading-relaxed">
                {t.aboutPage.productionDesc}
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mt-24 md:mt-32">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-navy mb-12 text-center">
              {t.aboutPage.valuesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {t.aboutPage.values.map((val, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-off-white p-10 border border-metallic-silver/20 hover:border-primary-blue/30 transition-all duration-300"
                >
                  {valueIcons[index]}
                  <h3 className="font-heading font-bold text-2xl text-dark-navy mb-4">
                    {val.title}
                  </h3>
                  <p className="font-body text-charcoal/70 leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
      
    </main>
  );
}
