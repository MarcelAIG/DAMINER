import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { User, Phone, Mail, Clock, MapPin, Send, Facebook, Instagram, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { WEB3FORMS_CONFIG } from '../config';

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

export function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
      subject: `Повідомлення з контактної форми / Contact Message — ${formData.name}`,
      from_name: 'DAMINER Website',
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    try {
      const response = await fetch(WEB3FORMS_CONFIG.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setErrorMessage(null);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorMsg = data.message || t.contactPage.error;
        console.error('Web3Forms returned failure:', data);
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error('Contact form submission failed with network error:', error);
      setErrorMessage(t.contactPage.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayPhone = t.contactPage.phone;
  const displayEmail = t.contactPage.email;
  const displayAddress = t.contactPage.address;

  return (
    <main className="pt-[90px] bg-off-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-dark-navy text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-70 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 80%)'
        }}></div>
        <div className="absolute inset-0 bg-mesh pointer-events-none z-[5]"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-[1.05] drop-shadow-lg">
              {t.contactPage.heading}
            </h1>
            <p className="font-body text-xl md:text-2xl text-off-white/90 max-w-2xl leading-relaxed">
              {t.contactPage.subheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-start">
            
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark-navy mb-8">
                DAMINER LLC
              </h2>
              
              <div className="flex flex-col border-t border-metallic-silver/20">
                
                <div className="flex items-start gap-5 py-5 border-b border-metallic-silver/20 group">
                  <div className="mt-0.5 text-primary-blue transition-transform duration-300 group-hover:scale-110">
                    <User size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[11px] tracking-widest text-cool-gray uppercase mb-1">
                      {t.contactPage.personLabel}
                    </h3>
                    <p className="font-body text-[17px] font-medium text-dark-navy">
                      {t.contactPage.person}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 py-5 border-b border-metallic-silver/20 group">
                  <div className="mt-0.5 text-primary-blue transition-transform duration-300 group-hover:scale-110">
                    <Phone size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[11px] tracking-widest text-cool-gray uppercase mb-1">
                      {t.contactPage.phoneLabel}
                    </h3>
                    <a href={`tel:${displayPhone.replace(/[\s-]/g, '')}`} className="font-body text-[17px] font-medium text-dark-navy hover:text-primary-blue transition-colors duration-300">
                      {displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 py-5 border-b border-metallic-silver/20 group">
                  <div className="mt-0.5 text-primary-blue transition-transform duration-300 group-hover:scale-110">
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[11px] tracking-widest text-cool-gray uppercase mb-1">
                      {t.contactPage.emailLabel}
                    </h3>
                    <a href={`mailto:${displayEmail}`} className="font-body text-[17px] font-medium text-dark-navy hover:text-primary-blue transition-colors duration-300">
                      {displayEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 py-5 border-b border-metallic-silver/20 group">
                  <div className="mt-0.5 text-primary-blue transition-transform duration-300 group-hover:scale-110">
                    <Clock size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-[11px] tracking-widest text-cool-gray uppercase mb-1">
                      {t.contactPage.scheduleLabel}
                    </h3>
                    <p className="font-body text-[17px] font-medium text-dark-navy">
                      {t.contactPage.schedule}
                    </p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/share/17RjFu7gEo/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded border border-metallic-silver/30 flex items-center justify-center text-dark-navy hover:text-primary-blue hover:border-primary-blue transition-all duration-300 group/social">
                      <Facebook size={18} strokeWidth={1.5} className="group-hover/social:scale-110 transition-transform duration-300" />
                    </a>
                    <a href="https://www.instagram.com/daminer_ua?igsh=YmN1ajlnMzAwaGR0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded border border-metallic-silver/30 flex items-center justify-center text-dark-navy hover:text-primary-blue hover:border-primary-blue transition-all duration-300 group/social">
                      <Instagram size={18} strokeWidth={1.5} className="group-hover/social:scale-110 transition-transform duration-300" />
                    </a>
                    <a href="https://www.tiktok.com/@daminer3?_r=1&_t=ZS-992JejFgR8u" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded border border-metallic-silver/30 flex items-center justify-center text-dark-navy hover:text-primary-blue hover:border-primary-blue transition-all duration-300 group/social">
                      <TikTokIcon size={18} className="group-hover/social:scale-110 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 md:p-10 border border-metallic-silver/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-md w-full"
            >
              <h3 className="font-heading font-bold text-2xl text-dark-navy mb-8">
                {t.contactPage.formHeading}
              </h3>
              
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle2 size={56} className="text-primary-blue" />
                  <h4 className="font-heading font-bold text-xl text-dark-navy">
                    {t.contactPage.success}
                  </h4>
                </div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block font-heading font-bold text-[11px] tracking-widest text-dark-navy/70 uppercase mb-2">
                      {t.contactPage.formName}
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full bg-white border border-metallic-silver/40 rounded focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-dark-navy placeholder:text-cool-gray/50 outline-none px-4 h-12 font-body transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-heading font-bold text-[11px] tracking-widest text-dark-navy/70 uppercase mb-2">
                      {t.contactPage.formEmail}
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full bg-white border border-metallic-silver/40 rounded focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-dark-navy placeholder:text-cool-gray/50 outline-none px-4 h-12 font-body transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-heading font-bold text-[11px] tracking-widest text-dark-navy/70 uppercase mb-2">
                      {t.contactPage.formMessage}
                    </label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full bg-white border border-metallic-silver/40 rounded focus:border-primary-blue focus:ring-1 focus:ring-primary-blue text-dark-navy placeholder:text-cool-gray/50 outline-none px-4 py-3 font-body transition-all resize-none h-[120px]"
                      placeholder="..."
                    ></textarea>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 rounded">
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
                      <span className="font-body leading-snug">{errorMessage}</span>
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 bg-primary-blue text-white hover:bg-dark-navy font-heading font-bold text-sm tracking-widest uppercase h-12 rounded transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>{t.contactPage.sending}</span>
                      </>
                    ) : (
                      t.contactPage.formSubmit
                    )}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
          
        </div>
      </section>
      
    </main>
  );
}
