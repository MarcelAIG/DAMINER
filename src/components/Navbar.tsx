import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';
import { ShoppingBag, Phone, X, Menu } from 'lucide-react';

const ProbeSvg = (props: any) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M30 20 L70 20" strokeWidth="4"/>
    <path d="M50 20 L50 70" />
    <path d="M42 70 L58 70 M46 76 L54 76 M50 82 L50 76" />
  </svg>
);

const MirrorSvg = (props: any) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M25 85 L60 50" />
    <path d="M60 50 L70 40" strokeWidth="4" />
    <ellipse cx="75" cy="35" rx="14" ry="5" transform="rotate(-45 75 35)" />
    <path d="M35 75 L45 85" strokeWidth="4" />
  </svg>
);

const KitSvg = (props: any) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="20" y="35" width="60" height="45" rx="3" />
    <path d="M38 35 L38 25 L62 25 L62 35" />
    <path d="M28 35 L28 80 M72 35 L72 80 M50 35 L50 80" strokeWidth="1.5" opacity="0.4"/>
    <path d="M20 57 L80 57" strokeWidth="1.5" opacity="0.4" />
    <circle cx="50" cy="57" r="3" fill="currentColor" opacity="0.4" />
  </svg>
);

const NetGunSvg = (props: any) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="20" y="45" width="40" height="18" rx="2" />
    <path d="M32 63 L24 82 L36 82 L40 63" strokeLinejoin="miter" />
    <rect x="60" y="48" width="16" height="12" />
    <path d="M76 48 L88 42 L88 66 L76 60 Z" strokeLinejoin="miter" />
    <path d="M88 46 L95 42 M88 54 L95 54 M88 62 L95 66" strokeWidth="1.5" opacity="0.5"/>
  </svg>
);

const ToolSvg = (props: any) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M50 25 L50 80" strokeWidth="4" />
    <circle cx="50" cy="18" r="5" />
    <path d="M50 75 C30 75 22 60 22 52" />
    <path d="M50 75 C70 75 78 60 78 52" />
    <path d="M42 42 L58 42" strokeWidth="1.5" opacity="0.5" />
  </svg>
);
import { SiteSearch } from './SiteSearch';

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { requestCount, setIsDrawerOpen } = useRequest();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <>
      <header className="h-[90px] bg-white border-b border-metallic-silver/30 flex items-center justify-between px-8 md:px-12 fixed top-0 left-0 w-full z-50">
        <div className="flex-1 flex justify-end items-center gap-12 pr-12 hidden lg:flex h-[90px]">
          <div className="flex items-center border-r border-metallic-silver/30 pr-8 mr-8">
            <a href={`tel:${t.contactPage.phone.replace(/[\s-()]/g, '')}`} className="flex items-center gap-2.5 group">
              <Phone size={15} strokeWidth={1.5} className="text-primary-blue/80 group-hover:text-primary-blue transition-colors duration-300" />
              <span className="font-heading font-black text-[14px] lg:text-[15px] text-dark-navy group-hover:text-primary-blue transition-colors duration-300">
                {t.contactPage.phone}
              </span>
            </a>
          </div>
          
          {/* Catalog Dropdown */}
          <div className="relative group/nav h-[90px] flex items-center">
            <div className={`absolute top-0 left-0 w-full h-[5px] bg-primary-blue transition-all duration-200 ${isActive('/catalog') ? 'opacity-100' : 'opacity-0 group-hover/nav:opacity-100'}`}></div>
            <div className="cursor-default text-charcoal font-heading font-black text-sm tracking-widest uppercase group-hover/nav:text-primary-blue transition-colors duration-300 flex items-center gap-1.5 h-full">
              {t.nav.catalog}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover/nav:opacity-100 transition-opacity"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            
            <div className="absolute top-[90px] left-0 bg-white border border-metallic-silver/10 shadow-[0_15px_40px_-10px_rgba(30,99,216,0.1)] w-[880px] opacity-0 translate-y-3 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 p-10 z-50 rounded-b-md">
              <div className="absolute -top-[1px] left-0 w-full h-[2px] bg-primary-blue"></div>
              
              <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                {t.categories.items.map((cat, idx) => {
                  const Illustrations = [ProbeSvg, MirrorSvg, KitSvg, NetGunSvg, ToolSvg];
                  const Visual = Illustrations[idx];
                  const categorySlugs = ["probes", "mirrors", "kits", "nets", "tools"];
                  const slug = categorySlugs[idx];
                  
                  return (
                    <Link 
                      key={idx}
                      to={`/catalog/${slug}`}
                      className="relative flex items-center gap-6 p-4 -m-4 bg-white border border-transparent hover:border-metallic-silver/30 hover:bg-off-white transition-all duration-300 group/item h-[90px]"
                    >
                      <div className={`absolute top-0 left-0 w-full h-[3px] bg-primary-blue transition-all duration-200 ${isActive(`/catalog/${slug}`) ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`}></div>
                      <div className="w-16 h-16 flex-shrink-0 bg-white border border-metallic-silver/20 rounded flex items-center justify-center p-3 text-dark-navy/70 group-hover/item:border-primary-blue/30 group-hover/item:text-primary-blue group-hover/item:shadow-sm transition-all duration-300">
                        <Visual className="w-full h-full" />
                      </div>
                      <div className="font-heading font-black text-[13px] tracking-[0.15em] uppercase text-dark-navy group-hover/item:text-primary-blue transition-colors duration-300 leading-snug">
                        {cat}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
  
          <div className="relative group/nav h-[90px] flex items-center">
            <div className={`absolute top-0 left-0 w-full h-[5px] bg-primary-blue transition-all duration-200 ${isActive('/solutions') ? 'opacity-100' : 'opacity-0 group-hover/nav:opacity-100'}`}></div>
            <Link to="/solutions" className="text-charcoal font-heading font-black text-sm tracking-widest uppercase group-hover/nav:text-primary-blue transition-colors duration-300 h-full flex items-center">{t.nav.solutions}</Link>
          </div>
        </div>
        
        <div className="flex-shrink-0 text-center">
          <Link to="/" className="block">
            <img src="https://plain-weur-prod-public.komododecks.com/202608/13/pDZ6VJ2doekh8C8iaLfP/image.png" alt="DAMINER Logo" className="h-12 md:h-16 w-auto" />
          </Link>
        </div>
        
        <div className="flex-1 flex justify-between items-center pl-12 hidden lg:flex">
          <div className="flex gap-12 h-[90px]">
            <div className="relative group/nav h-full flex items-center">
              <div className={`absolute top-0 left-0 w-full h-[5px] bg-primary-blue transition-all duration-200 ${isActive('/about') ? 'opacity-100' : 'opacity-0 group-hover/nav:opacity-100'}`}></div>
              <Link to="/about" className="text-charcoal font-heading font-black text-sm tracking-widest uppercase group-hover/nav:text-primary-blue transition-colors duration-300 h-full flex items-center">{t.nav.about}</Link>
            </div>
            <div className="relative group/nav h-full flex items-center">
              <div className={`absolute top-0 left-0 w-full h-[5px] bg-primary-blue transition-all duration-200 ${isActive('/contact') ? 'opacity-100' : 'opacity-0 group-hover/nav:opacity-100'}`}></div>
              <Link to="/contact" className="text-charcoal font-heading font-black text-sm tracking-widest uppercase group-hover/nav:text-primary-blue transition-colors duration-300 h-full flex items-center">{t.nav.contact}</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-metallic-silver/30 pr-6">
              <button 
                onClick={() => setLanguage('ua')}
                className={`font-heading font-black text-sm tracking-widest transition-colors duration-300 ${language === 'ua' ? 'text-charcoal' : 'text-cool-gray hover:text-primary-blue'}`}
              >
                UA
              </button>
              <span className="text-metallic-silver">/</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`font-heading font-black text-sm tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-charcoal' : 'text-cool-gray hover:text-primary-blue'}`}
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
                  <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
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
              <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {requestCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-charcoal hover:text-primary-blue transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed top-[90px] left-0 w-full bg-white shadow-xl border-b border-metallic-silver/20 transition-all duration-300 overflow-hidden z-40 ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0 pointer-events-none py-0'}`}>
        <div className="flex flex-col gap-6 px-8">
          <Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-dark-navy font-heading font-black text-lg uppercase tracking-widest">{t.nav.catalog}</Link>
          <Link to="/solutions" onClick={() => setIsMobileMenuOpen(false)} className="text-dark-navy font-heading font-black text-lg uppercase tracking-widest">{t.nav.solutions}</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-dark-navy font-heading font-black text-lg uppercase tracking-widest">{t.nav.about}</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-dark-navy font-heading font-black text-lg uppercase tracking-widest">{t.nav.contact}</Link>
          
          <div className="h-[1px] bg-metallic-silver/20 w-full my-2"></div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setLanguage('ua'); setIsMobileMenuOpen(false); }}
              className={`font-heading font-black text-lg tracking-widest transition-colors duration-300 ${language === 'ua' ? 'text-primary-blue' : 'text-cool-gray'}`}
            >
              UA
            </button>
            <span className="text-metallic-silver">/</span>
            <button 
              onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
              className={`font-heading font-black text-lg tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-primary-blue' : 'text-cool-gray'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
