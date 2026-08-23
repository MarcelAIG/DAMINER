import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';
import { ShoppingBag, Phone } from 'lucide-react';
import { SiteSearch } from './SiteSearch';

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { requestCount, setIsDrawerOpen } = useRequest();
  
  return (
    <header className="h-[90px] bg-white border-b border-metallic-silver/30 flex items-center justify-between px-8 md:px-12 fixed top-0 left-0 w-full z-50">
      <div className="flex-1 flex justify-end items-center gap-12 pr-12 hidden lg:flex">
        <div className="mr-8">
          <a href={`tel:${t.contactPage.phone.replace(/[\s-()]/g, '')}`} className="font-heading font-bold text-sm tracking-widest text-primary-blue flex items-center gap-3 border border-primary-blue hover:bg-primary-blue hover:text-white px-6 py-3 transition-colors duration-300">
            <Phone size={16} />
            {t.contactPage.phone}
          </a>
        </div>
        <Link to="/catalog" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors duration-300">{t.nav.catalog}</Link>
        <Link to="/solutions" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors duration-300">{t.nav.solutions}</Link>
      </div>
      
      <div className="flex-shrink-0 text-center">
        <Link to="/" className="block">
          <img src="https://plain-weur-prod-public.komododecks.com/202608/13/pDZ6VJ2doekh8C8iaLfP/image.png" alt="DAMINER Logo" className="h-12 md:h-16 w-auto" />
        </Link>
      </div>
      
      <div className="flex-1 flex justify-between items-center pl-12 hidden lg:flex">
        <div className="flex gap-12">
          <Link to="/about" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors duration-300">{t.nav.about}</Link>
          <Link to="/contact" className="text-charcoal font-heading font-semibold text-sm tracking-widest uppercase hover:text-primary-blue transition-colors duration-300">{t.nav.contact}</Link>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-metallic-silver/30 pr-6">
            <button 
              onClick={() => setLanguage('ua')}
              className={`font-heading font-semibold text-sm tracking-widest transition-colors duration-300 ${language === 'ua' ? 'text-charcoal' : 'text-cool-gray hover:text-primary-blue'}`}
            >
              UA
            </button>
            <span className="text-metallic-silver">/</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`font-heading font-semibold text-sm tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-charcoal' : 'text-cool-gray hover:text-primary-blue'}`}
            >
              EN
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            <SiteSearch />
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="relative text-charcoal hover:text-primary-blue transition-colors duration-300 flex items-center"
            >
              <ShoppingBag size={24} strokeWidth={1.5} />
              {requestCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {requestCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="lg:hidden flex items-center gap-6">
        <a href={`tel:${t.contactPage.phone.replace(/[\s-()]/g, '')}`} className="text-charcoal hover:text-primary-blue transition-colors duration-300 flex items-center">
          <Phone size={24} strokeWidth={1.5} />
        </a>
        <SiteSearch />
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="relative text-charcoal hover:text-primary-blue transition-colors duration-300 flex items-center"
        >
          <ShoppingBag size={24} strokeWidth={1.5} />
          {requestCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {requestCount}
            </span>
          )}
        </button>
        <button className="text-charcoal hover:text-primary-blue transition-colors duration-300">
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
