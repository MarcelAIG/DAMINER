import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';
import { ShoppingBag, Phone, X, Menu, ChevronDown, ChevronRight } from 'lucide-react';

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

/**
 * Single source of truth for catalog navigation (desktop dropdown + mobile accordion).
 * Order must match `t.categories.items`.
 */
const CATALOG_CATEGORIES = [
  { slug: 'probes', Icon: ProbeSvg },
  { slug: 'mirrors', Icon: MirrorSvg },
  { slug: 'kits', Icon: KitSvg },
  { slug: 'nets', Icon: NetGunSvg },
  { slug: 'tools', Icon: ToolSvg },
] as const;

const LG_BREAKPOINT_QUERY = '(min-width: 1024px)';

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { requestCount, setIsDrawerOpen } = useRequest();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const catalogItems = CATALOG_CATEGORIES.map((cat, idx) => ({
    ...cat,
    title: t.categories.items[idx],
  })).filter((cat) => Boolean(cat.title));

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleMobileMenu = () => {
    // When opening, pre-expand the catalog if the user is currently inside it
    if (!isMobileMenuOpen) setIsMobileCatalogOpen(location.pathname.startsWith('/catalog'));
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock page scroll, support Escape, and auto-close when resizing to desktop
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const mql = window.matchMedia(LG_BREAKPOINT_QUERY);
    const onBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    mql.addEventListener('change', onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      mql.removeEventListener('change', onBreakpointChange);
    };
  }, [isMobileMenuOpen]);

  const mobileLinkClass = (path: string) =>
    `block py-3 font-heading font-black text-lg uppercase tracking-widest transition-colors duration-300 ${
      isActive(path) ? 'text-primary-blue' : 'text-dark-navy hover:text-primary-blue'
    }`;
  
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
            <Link 
              id="desktop-nav-catalog"
              to="/catalog"
              className="cursor-pointer text-charcoal font-heading font-black text-sm tracking-widest uppercase group-hover/nav:text-primary-blue transition-colors duration-300 flex items-center gap-1.5 h-full"
            >
              {t.nav.catalog}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover/nav:opacity-100 transition-opacity"><path d="m6 9 6 6 6-6"/></svg>
            </Link>
            
            <div className="absolute top-[90px] left-0 bg-white border border-metallic-silver/10 shadow-[0_15px_40px_-10px_rgba(30,99,216,0.1)] w-[880px] opacity-0 translate-y-3 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 p-10 z-50 rounded-b-md">
              <div className="absolute -top-[1px] left-0 w-full h-[2px] bg-primary-blue"></div>
              
              <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                {catalogItems.map(({ slug, Icon: Visual, title: cat }) => {
                  return (
                    <Link 
                      key={slug}
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

                {/* 6th Slot: View Entire Catalog */}
                <Link 
                  id="desktop-dropdown-all-catalog"
                  to="/catalog"
                  className="relative flex items-center gap-6 p-4 -m-4 bg-off-white/70 border border-metallic-silver/20 hover:border-primary-blue/30 hover:bg-off-white transition-all duration-300 group/item h-[90px] rounded"
                >
                  <div className={`absolute top-0 left-0 w-full h-[3px] bg-primary-blue transition-all duration-200 ${location.pathname === '/catalog' ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`}></div>
                  <div className="w-16 h-16 flex-shrink-0 bg-primary-blue text-white rounded flex items-center justify-center p-3 group-hover/item:bg-dark-navy transition-all duration-300 shadow-sm">
                    <ChevronRight size={22} strokeWidth={2.5} />
                  </div>
                  <div className="font-heading font-black text-[13px] tracking-[0.15em] uppercase text-primary-blue group-hover/item:text-dark-navy transition-colors duration-300 leading-snug">
                    {t.categories.viewLink.replace(/\s*→\s*$/, '')}
                  </div>
                </Link>
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
            id="mobile-menu-toggle"
            type="button"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="text-charcoal hover:text-primary-blue transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay — full height below the header, scrollable */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`lg:hidden fixed inset-x-0 top-[90px] bottom-0 z-40 bg-white overflow-y-auto overscroll-contain transition-[opacity,transform,visibility] duration-300 ease-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'
        }`}
      >
        <nav className="flex flex-col px-8 pt-6 pb-10" aria-label="Mobile navigation">
          {/* Catalog accordion */}
          <div>
            <button
              id="mobile-catalog-toggle"
              type="button"
              onClick={() => setIsMobileCatalogOpen((open) => !open)}
              aria-expanded={isMobileCatalogOpen}
              aria-controls="mobile-catalog-panel"
              className={`w-full flex items-center justify-between py-3 font-heading font-black text-lg uppercase tracking-widest transition-colors duration-300 ${
                isActive('/catalog') || isMobileCatalogOpen ? 'text-primary-blue' : 'text-dark-navy hover:text-primary-blue'
              }`}
            >
              {t.nav.catalog}
              <ChevronDown
                size={22}
                strokeWidth={2}
                className={`transition-transform duration-300 ${isMobileCatalogOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>

            <div
              id="mobile-catalog-panel"
              role="region"
              aria-labelledby="mobile-catalog-toggle"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isMobileCatalogOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <ul className="flex flex-col gap-2 pt-2 pb-4">
                  {catalogItems.map(({ slug, Icon, title }) => {
                    const path = `/catalog/${slug}`;
                    const active = isActive(path);
                    return (
                      <li key={slug}>
                        <Link
                          id={`mobile-catalog-${slug}`}
                          to={path}
                          onClick={closeMobileMenu}
                          tabIndex={isMobileCatalogOpen ? 0 : -1}
                          aria-current={active ? 'page' : undefined}
                          className={`group/m relative flex items-center gap-4 p-3 border transition-all duration-300 active:scale-[0.99] ${
                            active
                              ? 'border-primary-blue/30 bg-off-white'
                              : 'border-metallic-silver/20 bg-white hover:border-primary-blue/30 hover:bg-off-white'
                          }`}
                        >
                          <span className={`absolute top-0 left-0 h-full w-[3px] bg-primary-blue transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0 group-hover/m:opacity-100'}`} />
                          <span
                            className={`w-12 h-12 flex-shrink-0 bg-white border rounded flex items-center justify-center p-2 transition-colors duration-300 ${
                              active
                                ? 'border-primary-blue/30 text-primary-blue'
                                : 'border-metallic-silver/20 text-dark-navy/70 group-hover/m:text-primary-blue group-hover/m:border-primary-blue/30'
                            }`}
                          >
                            <Icon className="w-full h-full" />
                          </span>
                          <span
                            className={`flex-1 font-heading font-black text-[13px] tracking-[0.12em] uppercase leading-snug transition-colors duration-300 ${
                              active ? 'text-primary-blue' : 'text-dark-navy group-hover/m:text-primary-blue'
                            }`}
                          >
                            {title}
                          </span>
                          <ChevronRight
                            size={18}
                            strokeWidth={2}
                            className={`flex-shrink-0 transition-all duration-300 ${
                              active ? 'text-primary-blue' : 'text-dark-navy/30 group-hover/m:text-primary-blue group-hover/m:translate-x-0.5'
                            }`}
                          />
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link
                      id="mobile-catalog-all"
                      to="/catalog"
                      onClick={closeMobileMenu}
                      tabIndex={isMobileCatalogOpen ? 0 : -1}
                      className="flex items-center justify-center gap-2 mt-1 py-3.5 bg-primary-blue text-white font-heading font-black text-xs tracking-widest uppercase hover:bg-dark-navy active:scale-[0.99] transition-all duration-300"
                    >
                      {t.categories.viewLink.replace(/\s*→\s*$/, '')}
                      <ChevronRight size={16} strokeWidth={2.5} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link id="mobile-nav-solutions" to="/solutions" onClick={closeMobileMenu} className={mobileLinkClass('/solutions')}>{t.nav.solutions}</Link>
          <Link id="mobile-nav-about" to="/about" onClick={closeMobileMenu} className={mobileLinkClass('/about')}>{t.nav.about}</Link>
          <Link id="mobile-nav-contact" to="/contact" onClick={closeMobileMenu} className={mobileLinkClass('/contact')}>{t.nav.contact}</Link>
          
          <div className="h-[1px] bg-metallic-silver/20 w-full my-6"></div>
          
          <div className="flex items-center gap-4">
            <button 
              id="mobile-lang-ua"
              type="button"
              onClick={() => { setLanguage('ua'); closeMobileMenu(); }}
              className={`font-heading font-black text-lg tracking-widest transition-colors duration-300 ${language === 'ua' ? 'text-primary-blue' : 'text-cool-gray'}`}
            >
              UA
            </button>
            <span className="text-metallic-silver">/</span>
            <button 
              id="mobile-lang-en"
              type="button"
              onClick={() => { setLanguage('en'); closeMobileMenu(); }}
              className={`font-heading font-black text-lg tracking-widest transition-colors duration-300 ${language === 'en' ? 'text-primary-blue' : 'text-cool-gray'}`}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
