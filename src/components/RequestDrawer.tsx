import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { useRequest } from '../context/RequestContext';
import { useLanguage } from '../context/LanguageContext';
import { WEB3FORMS_CONFIG } from '../config';

export function RequestDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, items, updateQuantity, removeItem, clearRequest } = useRequest();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({ orgName: '', contact: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const getLocalizedModel = (id: string, originalModel: string) => {
    if (id === "1" && t.featured?.model1) return t.featured.model1;
    if (id === "2" && t.featured?.model2) return t.featured.model2;
    if (id === "3" && t.featured?.model3) return t.featured.model3;
    return originalModel;
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const formattedProducts = items
      .map((item, index) => `${index + 1}. ${getLocalizedModel(item.id, item.model)} (ID: ${item.id}) — ${t.request.quantity}: ${item.quantity}`)
      .join('\n');

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const payload = {
      access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
      subject: `Новий запит на товари / Quote Request — ${formData.orgName || formData.contact}`,
      from_name: 'DAMINER Website',
      organization: formData.orgName,
      contact: formData.contact,
      comment: formData.comment || '—',
      products_list: formattedProducts,
      total_items_count: items.length,
      total_units: totalQuantity,
      message: `Деталі запиту на товари:\n\nОрганізація / Компанія: ${formData.orgName}\nКонтактні дані: ${formData.contact}\nКоментар: ${formData.comment || '—'}\n\nСписок товарів:\n${formattedProducts}\n\nВсього найменувань: ${items.length} (одиниць: ${totalQuantity})`
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
          clearRequest();
          setIsSubmitted(false);
          setIsDrawerOpen(false);
          setFormData({ orgName: '', contact: '', comment: '' });
        }, 3000);
      } else {
        const errorMsg = data.message || t.request.error;
        console.error('Web3Forms returned failure:', data);
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      console.error('Submission failed with network error:', error);
      setErrorMessage(t.request.error);
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
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-metallic-silver/30">
          <h2 className="font-heading font-bold text-2xl text-dark-navy">{t.request.title}</h2>
          <button onClick={handleClose} className="text-cool-gray hover:text-primary-blue transition-colors duration-300">
            <X size={24} />
          </button>
        </div>

        <div className="bg-off-white/50 px-6 py-4 flex items-center justify-center gap-3 border-b border-metallic-silver/30">
          <Phone size={18} className="text-primary-blue" />
          <a href={`tel:${t.contactPage.phone.replace(/[\s-()]/g, '')}`} className="font-body font-bold text-lg text-dark-navy hover:text-primary-blue transition-colors duration-300">
            {t.contactPage.phone}
          </a>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle2 size={64} className="text-primary-blue" />
              <h3 className="font-heading font-bold text-xl text-dark-navy">{t.request.success}</h3>
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-cool-gray">
              <p className="font-body text-lg">{t.request.empty}</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-off-white border border-metallic-silver/20">
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-dark-navy">{getLocalizedModel(item.id, item.model)}</h4>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-sm text-cool-gray">{t.request.quantity}:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 p-1 text-center border border-metallic-silver/30 bg-white font-body"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-cool-gray hover:text-red-500 transition-colors duration-300 ml-4"
                      title={t.request.remove}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-6 border-t border-metallic-silver/30">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2 font-heading tracking-widest uppercase">{t.request.orgName}</label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => {
                      setFormData({...formData, orgName: e.target.value});
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-3 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2 font-heading tracking-widest uppercase">{t.request.contact}</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => {
                      setFormData({...formData, contact: e.target.value});
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-3 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2 font-heading tracking-widest uppercase">{t.request.comment}</label>
                  <textarea
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => {
                      setFormData({...formData, comment: e.target.value});
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-3 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors duration-300 resize-none"
                  ></textarea>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5 rounded">
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
                    <span className="font-body leading-snug">{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary-blue text-white font-heading font-bold text-sm tracking-widest uppercase hover:bg-dark-navy transition-colors duration-300 mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>{t.request.sending}</span>
                    </>
                  ) : (
                    t.request.submit
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
