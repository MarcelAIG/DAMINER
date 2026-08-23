import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function SiteSearch() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Combine items to search across categories and featured products
  const allItems = [
    ...t.categories.items.map(title => ({ 
      type: 'category', 
      title, 
      label: title, 
      link: '/catalog' 
    })),
    { 
      type: 'product', 
      title: t.featured.model1, 
      label: `${t.featured.probe} ${t.featured.model1}`, 
      link: '/product/1' 
    },
    { 
      type: 'product', 
      title: t.featured.model2, 
      label: `${t.featured.probe} ${t.featured.model2}`, 
      link: '/product/2' 
    },
    { 
      type: 'product', 
      title: t.featured.model3, 
      label: `${t.featured.probe} ${t.featured.model3}`, 
      link: '/product/3' 
    },
  ];

  const filteredItems = query.trim() === '' ? [] : allItems.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-charcoal hover:text-primary-blue transition-colors duration-300 flex items-center"
        title={t.nav.search}
      >
        <Search size={24} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div className="absolute top-[120%] right-0 w-[300px] md:w-[360px] bg-white shadow-2xl border border-metallic-silver/20 z-50 overflow-hidden">
          <div className="flex items-center p-4 border-b border-metallic-silver/20 bg-off-white">
            <Search size={18} className="text-primary-blue mr-3" />
            <input 
              ref={inputRef}
              type="text" 
              placeholder={t.nav.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none font-body text-sm text-charcoal bg-transparent"
            />
            <button onClick={() => setIsOpen(false)} className="text-cool-gray hover:text-primary-blue ml-2">
              <X size={18} />
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() !== '' && filteredItems.length === 0 ? (
              <div className="p-6 text-center text-sm font-body text-cool-gray">
                No results found
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <Link 
                  key={idx} 
                  to={item.link} 
                  onClick={() => setIsOpen(false)}
                  className="block p-4 border-b border-metallic-silver/10 hover:bg-off-white transition-colors duration-300"
                >
                  <div className="font-heading font-bold text-sm text-dark-navy">
                    {item.title}
                  </div>
                  <div className="font-body text-[10px] font-bold text-cool-gray mt-1 uppercase tracking-widest">
                    {item.type === 'category' ? t.nav.catalog : t.featured.probe}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
