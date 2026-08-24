import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Lock } from 'lucide-react';
import { FinalCTA } from '../components/FinalCTA';

export function Certificates() {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[90px] min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="relative bg-dark-navy text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 80%)'
        }}></div>
        <div className="absolute inset-0 bg-mesh pointer-events-none z-[5]"></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
              {t.quality.heading}
            </h1>
            <p className="font-body text-xl text-white/80 leading-relaxed max-w-2xl">
              {t.quality.isoDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 flex-grow bg-off-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* ISO Certificate Placeholder */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary-blue rounded-sm flex items-center justify-center text-white shadow-md">
                  <FileText size={24} />
                </div>
                <h2 className="font-heading font-bold text-3xl text-dark-navy">ISO 9001</h2>
              </div>
              
              <div className="aspect-[3/4] max-w-md w-full bg-white border-2 border-dashed border-metallic-silver/30 rounded-sm flex flex-col items-center justify-center p-8 text-center shadow-sm">
                <FileText size={48} className="text-metallic-silver mb-4 opacity-50" />
                <p className="font-body text-charcoal/60 font-medium">
                  {language === 'ua' ? 'Тут буде розміщено офіційний сертифікат ISO 9001' : 'Official ISO 9001 certificate will be placed here'}
                </p>
              </div>
            </div>

            {/* Ministry of Defence info */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-dark-navy rounded-sm flex items-center justify-center text-white shadow-md">
                  <Lock size={24} />
                </div>
                <h2 className="font-heading font-bold text-3xl text-dark-navy">{t.quality.krTitle}</h2>
              </div>
              
              <div className="bg-white border-l-4 border-primary-blue p-8 shadow-sm">
                <p className="font-body text-lg text-charcoal/90 leading-relaxed font-medium">
                  {t.quality.krDesc}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
