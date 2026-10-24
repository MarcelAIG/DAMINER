import React, { useState } from 'react';
import { X, CheckCircle2, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { WEB3FORMS_CONFIG } from '../config';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({ name: '', orgName: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
      subject: `Запит на консультацію / Consultation Request — ${formData.name}`,
      from_name: 'DAMINER Website',
      name: formData.name,
      organization: formData.orgName || '—',
      phone: formData.phone,
      email: formData.email,
      message: `Запит на консультацію:\n\nІм'я: ${formData.name}\nОрганізація: ${formData.orgName || '—'}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n\nПовідомлення:\n${formData.message || '—'}`
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
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          setFormData({ name: '', orgName: '', phone: '', email: '', message: '' });
        }, 3000);
      } else {
        const errorMsg = data.message || t.consultation.error;
        console.error('Web3Forms returned failure:', data);
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error('Consultation submission failed with network error:', error);
      setErrorMessage(t.consultation.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-dark-navy/60 backdrop-blur-sm z-[100]"
        onClick={handleClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white shadow-2xl z-[101] flex flex-col overflow-hidden max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-metallic-silver/30 bg-off-white/30">
          <h2 className="font-heading font-bold text-xl text-dark-navy">{t.consultation.title}</h2>
          <button onClick={handleClose} className="text-cool-gray hover:text-primary-blue transition-colors duration-300">
            <X size={20} />
          </button>
        </div>

        <div className="bg-off-white/80 px-5 py-2.5 flex items-center justify-center gap-2 border-b border-metallic-silver/30">
          <Phone size={14} className="text-primary-blue" />
          <a href={`tel:${t.contactPage.phone.replace(/[\s-()]/g, '')}`} className="font-body font-bold text-sm text-dark-navy hover:text-primary-blue transition-colors duration-300">
            {t.contactPage.phone}
          </a>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col">
          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
              <CheckCircle2 size={48} className="text-primary-blue" />
              <h3 className="font-heading font-bold text-lg text-dark-navy">{t.consultation.success}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 font-heading tracking-widest uppercase">{t.consultation.name}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full px-3 py-2 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 font-heading tracking-widest uppercase">{t.consultation.orgName}</label>
                <input
                  type="text"
                  value={formData.orgName}
                  onChange={(e) => {
                    setFormData({...formData, orgName: e.target.value});
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full px-3 py-2 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 font-heading tracking-widest uppercase">{t.consultation.phone}</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full px-3 py-2 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 font-heading tracking-widest uppercase">{t.consultation.email}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full px-3 py-2 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 font-heading tracking-widest uppercase">{t.consultation.message}</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full px-3 py-2 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300 resize-none text-sm"
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
                className="w-full py-3 bg-primary-blue text-white font-heading font-bold text-sm tracking-widest uppercase hover:bg-dark-navy transition-colors duration-300 mt-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>{t.consultation.sending}</span>
                  </>
                ) : (
                  t.consultation.submit
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
