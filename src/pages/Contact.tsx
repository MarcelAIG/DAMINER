import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { User, Phone, Mail, Clock, MapPin, Send } from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayPhone = t.contactPage.phone;
  const displayEmail = t.contactPage.email;
  const displayAddress = t.contactPage.address;

  return (
    <main className="pt-[90px] bg-off-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-dark-navy text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 50% 100%, #1e63d8 0%, transparent 70%)'
        }}></div>
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
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-dark-navy mb-10 pt-4">
                DAMINER LLC
              </h2>
              
              <div className="flex flex-col gap-10">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-sm bg-primary-blue flex items-center justify-center flex-shrink-0 shadow-[0_10px_20px_-10px_rgba(30,99,216,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <User className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm tracking-widest text-cool-gray uppercase mb-2">
                      {t.contactPage.personLabel}
                    </h3>
                    <p className="font-body text-2xl font-medium text-dark-navy">
                      {t.contactPage.person}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-sm bg-primary-blue flex items-center justify-center flex-shrink-0 shadow-[0_10px_20px_-10px_rgba(30,99,216,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm tracking-widest text-cool-gray uppercase mb-2">
                      {t.contactPage.phoneLabel}
                    </h3>
                    <a href={`tel:${displayPhone.replace(/[\s-]/g, '')}`} className="font-body text-2xl font-medium text-dark-navy hover:text-primary-blue transition-colors">
                      {displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-sm bg-primary-blue flex items-center justify-center flex-shrink-0 shadow-[0_10px_20px_-10px_rgba(30,99,216,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm tracking-widest text-cool-gray uppercase mb-2">
                      {t.contactPage.emailLabel}
                    </h3>
                    <a href={`mailto:${displayEmail}`} className="font-body text-2xl font-medium text-dark-navy hover:text-primary-blue transition-colors">
                      {displayEmail}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-sm bg-primary-blue flex items-center justify-center flex-shrink-0 shadow-[0_10px_20px_-10px_rgba(30,99,216,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <Clock className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm tracking-widest text-cool-gray uppercase mb-2">
                      {t.contactPage.scheduleLabel}
                    </h3>
                    <p className="font-body text-2xl font-medium text-dark-navy">
                      {t.contactPage.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-dark-navy p-8 md:p-14 shadow-2xl rounded-sm border border-white/10"
            >
              <h3 className="font-heading font-bold text-3xl text-white mb-10">
                {t.contactPage.formHeading}
              </h3>
              
              <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block font-heading font-bold text-sm tracking-widest text-white/70 uppercase mb-3">
                    {t.contactPage.formName}
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 focus:border-primary-blue focus:bg-white/10 text-white placeholder:text-white/30 outline-none px-5 py-4 font-body transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block font-heading font-bold text-sm tracking-widest text-white/70 uppercase mb-3">
                    {t.contactPage.formEmail}
                  </label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 focus:border-primary-blue focus:bg-white/10 text-white placeholder:text-white/30 outline-none px-5 py-4 font-body transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block font-heading font-bold text-sm tracking-widest text-white/70 uppercase mb-3">
                    {t.contactPage.formMessage}
                  </label>
                  <textarea 
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary-blue focus:bg-white/10 text-white placeholder:text-white/30 outline-none px-5 py-4 font-body transition-all resize-none"
                    placeholder="..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="mt-4 w-full inline-flex items-center justify-center gap-3 bg-primary-blue text-white hover:bg-white hover:text-primary-blue border border-primary-blue font-heading font-bold text-base tracking-widest uppercase px-10 py-5 transition-none"
                >
                  {t.contactPage.formSubmit}
                </button>
              </form>
            </motion.div>

          </div>
          
        </div>
      </section>
      
    </main>
  );
}
