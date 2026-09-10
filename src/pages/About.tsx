import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Cog, Activity, Users, Play, X } from 'lucide-react';

export function About() {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const productionVideos = [
    '/VIDEO NEW/IMG_8851.MOV',
    '/VIDEO NEW/IMG_8459.MOV',
    '/VIDEO NEW/IMG_5186.MOV',
    '/VIDEO NEW/IMG_4422.MOV',
    '/VIDEO NEW/IMG_2922.MOV',
    '/VIDEO NEW/IMG_2910.MOV',
    '/VIDEO NEW/IMG_1105.MOV',
    '/VIDEO NEW/IMG_0077.MOV'
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeVideo !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const valueIcons = [
    <Shield className="w-10 h-10 text-primary-blue mb-4" />,
    <Cog className="w-10 h-10 text-primary-blue mb-4" />,
    <Activity className="w-10 h-10 text-primary-blue mb-4" />,
    <Users className="w-10 h-10 text-primary-blue mb-4" />
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
              <p className="font-body text-charcoal/80 text-lg leading-relaxed whitespace-pre-line">
                {t.aboutPage.productionDesc}
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mt-24 md:mt-32">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-navy mb-12 text-center">
              {t.aboutPage.valuesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
                  {index === 3 && t.aboutPage.valuesSummary && (
                    <p className="font-body text-charcoal/70 leading-relaxed mt-4">
                      {t.aboutPage.valuesSummary}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

          </div>
          
        </div>
      </section>
      
      {/* Production Video Section */}
      <section className="py-20 md:py-28 bg-white border-t border-metallic-silver/20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-navy mb-6">
              {t.aboutPage.productionVideoSection.heading}
            </h2>
            <div className="w-16 h-1 bg-primary-blue mx-auto mb-8"></div>
            <p className="font-body text-charcoal/80 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              {t.aboutPage.productionVideoSection.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {productionVideos.map((src, index) => (
              <div 
                key={index} 
                className="group cursor-pointer flex flex-col relative aspect-[9/16] bg-metallic-silver/10 border border-metallic-silver/20 rounded-md overflow-hidden transition-all duration-300 hover:border-primary-blue/30 hover:shadow-md"
                onClick={() => setActiveVideo(index)}
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video && video.readyState >= 2) {
                    video.play().catch(() => {});
                  }
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
              >
                <video 
                  src={src}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                  loop
                />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none bg-black/10">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-primary-blue transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-navy/95 p-4 md:p-8 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors"
            onClick={() => setActiveVideo(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative h-full max-h-[85vh] aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              src={productionVideos[activeVideo]}
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
      
    </main>
  );
}
