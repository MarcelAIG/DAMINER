import React, { useState } from 'react';
import { X, Trash2, CheckCircle2 } from 'lucide-react';
import { useRequest } from '../context/RequestContext';
import { useLanguage } from '../context/LanguageContext';

export function RequestDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, items, updateQuantity, removeItem, clearRequest } = useRequest();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({ orgName: '', contact: '', comment: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isDrawerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email/request to manager
    console.log('Submitted Request:', { items, ...formData });
    setIsSubmitted(true);
    setTimeout(() => {
      clearRequest();
      setIsSubmitted(false);
      setIsDrawerOpen(false);
      setFormData({ orgName: '', contact: '', comment: '' });
    }, 3000);
  };

  const getLocalizedModel = (id: string, originalModel: string) => {
    if (id === "1" && t.featured?.model1) return t.featured.model1;
    if (id === "2" && t.featured?.model2) return t.featured.model2;
    if (id === "3" && t.featured?.model3) return t.featured.model3;
    return originalModel;
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-dark-navy/60 backdrop-blur-sm z-[100]"
        onClick={() => setIsDrawerOpen(false)}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-metallic-silver/30">
          <h2 className="font-heading font-bold text-2xl text-dark-navy">{t.request.title}</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="text-cool-gray hover:text-primary-blue transition-colors">
            <X size={24} />
          </button>
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
                      className="p-2 text-cool-gray hover:text-red-500 transition-colors ml-4"
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
                    onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                    className="w-full p-3 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2 font-heading tracking-widest uppercase">{t.request.contact}</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full p-3 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2 font-heading tracking-widest uppercase">{t.request.comment}</label>
                  <textarea
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({...formData, comment: e.target.value})}
                    className="w-full p-3 bg-off-white border border-metallic-silver/30 focus:border-primary-blue focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary-blue text-white font-heading font-bold text-sm tracking-widest uppercase hover:bg-dark-navy transition-colors mt-4"
                >
                  {t.request.submit}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
