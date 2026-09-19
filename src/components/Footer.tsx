import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Instagram } from 'lucide-react';

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-metallic-silver/20 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Top 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <Link to="/" className="block mb-6">
              <img src="https://plain-weur-prod-public.komododecks.com/202608/13/pDZ6VJ2doekh8C8iaLfP/image.png" alt="DAMINER Logo" className="h-14 md:h-16 w-auto" />
            </Link>
            <p className="font-body text-charcoal/70 text-[15px] leading-relaxed pr-4">
              {t.footer.desc}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-[15px] uppercase tracking-widest text-dark-navy mb-3">{t.footer.navHeading}</h4>
            <Link to="/catalog" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.nav.catalog}</Link>
            <Link to="/solutions" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.footer.solutions}</Link>
            <Link to="/about" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.nav.about}</Link>
            <Link to="/contact" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.nav.contact}</Link>
          </div>

          {/* Column 3: Information */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-[15px] uppercase tracking-widest text-dark-navy mb-3">{t.footer.infoHeading}</h4>
            <Link to="/payment-delivery" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.footer.payment}</Link>
            <Link to="/warranty" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.footer.warranty}</Link>
            <Link to="/certificates" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.footer.certificates}</Link>
            <Link to="/catalog" className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">{t.footer.request}</Link>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-[15px] uppercase tracking-widest text-dark-navy mb-3">{t.footer.contactHeading}</h4>
            <a href={`tel:${t.contactPage.phone.replace(/[\s-()]/g, '')}`} className="font-body font-bold text-[15px] text-primary-blue hover:text-dark-navy transition-colors duration-300 w-fit">
              {t.contactPage.phone}
            </a>
            <a href={`mailto:${t.contactPage.email}`} className="font-body text-[15px] text-charcoal/80 hover:text-primary-blue transition-colors duration-300 w-fit">
              {t.contactPage.email}
            </a>
            <p className="font-body text-[15px] text-charcoal/80">
              {t.footer.address}
            </p>
            
            <div className="flex gap-4 mt-3">
              <a href="https://www.facebook.com/share/17RjFu7gEo/" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-primary-blue transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/daminer_ua?igsh=YmN1ajlnMzAwaGR0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-primary-blue transition-colors duration-300">
                <Instagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@daminer3?_r=1&_t=ZS-992JejFgR8u" target="_blank" rel="noopener noreferrer" className="text-charcoal/80 hover:text-primary-blue transition-colors duration-300">
                <TikTokIcon size={24} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-metallic-silver/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[15px] font-body text-cool-gray">
            &copy; {new Date().getFullYear()} DAMINER. {t.footer.rights}
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[15px] font-body">
            <Link to="/privacy" className="text-charcoal/80 hover:text-primary-blue transition-colors duration-300">{t.footer.privacy}</Link>
            <Link to="/terms" className="text-charcoal/80 hover:text-primary-blue transition-colors duration-300">{t.footer.terms}</Link>
            <Link to="/returns-exchange" className="text-charcoal/80 hover:text-primary-blue transition-colors duration-300">{t.footer.returns}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
