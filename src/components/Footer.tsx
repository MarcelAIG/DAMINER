import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-metallic-silver/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-start gap-16">
        
        <div className="flex-1">
          <Link to="/" className="block mb-8">
            <img src="https://plain-weur-prod-public.komododecks.com/202608/13/pDZ6VJ2doekh8C8iaLfP/image.png" alt="DAMINER Logo" className="h-16 md:h-20 w-auto" />
          </Link>
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
            <Link to="/catalog" className="font-body text-charcoal/80 hover:text-primary-blue transition-none inline-block w-fit">{t.nav.catalog}</Link>
            <Link to="/solutions" className="font-body text-charcoal/80 hover:text-primary-blue transition-none inline-block w-fit">{t.nav.solutions}</Link>
            <Link to="/about" className="font-body text-charcoal/80 hover:text-primary-blue transition-none inline-block w-fit">{t.nav.about}</Link>
          </div>
          
          <div className="flex flex-col gap-6">
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-dark-navy mb-2">{t.footer.contactHeading}</h4>
            <Link to="/contact" className="font-body text-charcoal/80 hover:text-primary-blue transition-none inline-block w-fit">{t.nav.contact}</Link>
            <div className="mt-4 flex gap-4">
              <button 
                onClick={() => setLanguage('ua')}
                className={`font-heading font-bold transition-none ${language === 'ua' ? 'text-dark-navy' : 'text-cool-gray hover:text-dark-navy'}`}
              >
                UA
              </button>
              <span className="text-metallic-silver">/</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`font-heading font-bold transition-none ${language === 'en' ? 'text-dark-navy' : 'text-cool-gray hover:text-dark-navy'}`}
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
