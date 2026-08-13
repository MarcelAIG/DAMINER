import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <header className="h-[90px] bg-white border-b border-metallic-silver/30 flex items-center justify-between px-8 md:px-12 fixed top-0 left-0 w-full z-50">
      <div className="flex-1 flex justify-end gap-12 pr-12 hidden lg:flex">
        <a href="#catalog" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors">{t.nav.catalog}</a>
        <a href="#solutions" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors">{t.nav.solutions}</a>
      </div>
      
      <div className="flex-shrink-0 text-center">
        <a href="#" className="block">
          <img src="https://plain-weur-prod-public.komododecks.com/202608/13/pDZ6VJ2doekh8C8iaLfP/image.png" alt="DAMINER Logo" className="h-12 md:h-16 w-auto" />
        </a>
      </div>
      
      <div className="flex-1 flex justify-between items-center pl-12 hidden lg:flex">
        <div className="flex gap-12">
          <a href="#about" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors">{t.nav.about}</a>
          <a href="#contact" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors">{t.nav.contact}</a>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage('ua')}
            className={`font-heading font-semibold text-sm tracking-widest transition-colors ${language === 'ua' ? 'text-charcoal' : 'text-cool-gray hover:text-primary-blue'}`}
          >
            UA
          </button>
          <span className="text-metallic-silver">/</span>
          <button 
            onClick={() => setLanguage('en')}
            className={`font-heading font-semibold text-sm tracking-widest transition-colors ${language === 'en' ? 'text-charcoal' : 'text-cool-gray hover:text-primary-blue'}`}
          >
            EN
          </button>
        </div>
      </div>
      
      <div className="lg:hidden flex items-center">
        <button className="text-charcoal hover:text-primary-blue transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
