import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-5/12">
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-dark-navy leading-tight mb-6">
              {t.about.heading}
            </h2>
            <p className="font-body text-lg md:text-xl text-charcoal/80 mb-10 leading-relaxed">
              {t.about.desc}
            </p>
            <Link 
              to="/about"
              className="inline-flex items-center justify-center bg-primary-blue text-white hover:bg-white hover:text-primary-blue border border-primary-blue font-heading font-bold text-sm tracking-widest uppercase px-8 py-4 transition-colors duration-300"
            >
              {t.about.cta}
            </Link>
          </div>
          
          <div className="w-full lg:w-7/12">
            <div className="aspect-[4/3] bg-off-white relative">
              <img 
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2000&auto=format&fit=crop" 
                alt="Оператор в полі" 
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-48 h-48 md:w-64 md:h-64 bg-primary-blue hidden sm:flex items-center justify-center p-8 text-center">
                <span className="font-heading font-bold text-white text-2xl md:text-3xl leading-tight">
                  {t.about.badge}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
