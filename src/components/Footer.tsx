import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-metallic-silver/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-start gap-16">
        
        <div className="flex-1">
          <a href="#" className="block mb-8">
            <img src="https://plain-weur-prod-public.komododecks.com/202608/13/pDZ6VJ2doekh8C8iaLfP/image.png" alt="DAMINER Logo" className="h-16 md:h-20 w-auto" />
          </a>
          <p className="font-body text-charcoal/60 max-w-sm mb-8">
            {t.footer.desc}
          </p>
          <div className="text-sm font-body text-cool-gray">
            &copy; {new Date().getFullYear()} DAMINER. {t.footer.rights}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-16 md:gap-24">
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-dark-navy mb-2">{t.footer.navHeading}</h4>
            <a href="#catalog" className="font-body text-charcoal/80 hover:text-primary-blue hover:translate-x-1 transition-all inline-block w-fit">{t.nav.catalog}</a>
            <a href="#solutions" className="font-body text-charcoal/80 hover:text-primary-blue hover:translate-x-1 transition-all inline-block w-fit">{t.nav.solutions}</a>
            <a href="#about" className="font-body text-charcoal/80 hover:text-primary-blue hover:translate-x-1 transition-all inline-block w-fit">{t.nav.about}</a>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-dark-navy mb-2">{t.footer.contactHeading}</h4>
            <a href="#contact" className="font-body text-charcoal/80 hover:text-primary-blue hover:translate-x-1 transition-all inline-block w-fit">{t.nav.contact}</a>
            <div className="mt-4 flex gap-4">
              <button 
                onClick={() => setLanguage('ua')}
                className={`font-heading font-bold transition-colors ${language === 'ua' ? 'text-dark-navy' : 'text-cool-gray hover:text-dark-navy'}`}
              >
                UA
              </button>
              <span className="text-metallic-silver">/</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`font-heading font-bold transition-colors ${language === 'en' ? 'text-dark-navy' : 'text-cool-gray hover:text-dark-navy'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
