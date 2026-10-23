import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { usePublishedProducts } from '../hooks/usePublishedProducts';
import {
  getCategoryLabel,
  getProductName,
  getProductShortDescription,
} from '../services/publicProductService';
import { CATALOG_CATEGORY_SLUGS } from '../data/catalogCategories';

export function SiteSearch() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { products } = usePublishedProducts();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Combine categories and all published Firestore products for search
  const categoryItems = (t.categories.items as string[]).map((title, index) => {
    const slug = CATALOG_CATEGORY_SLUGS[index] || '';
    return {
      type: 'category' as const,
      title,
      badge: t.nav.catalog,
      label: title,
      link: slug ? `/catalog/${slug}` : '/catalog',
    };
  });

  const productItems = products.map((p) => {
    const model = getProductName(p, language);
    const badge = getCategoryLabel(p.categorySlug, t, language);
    const desc = getProductShortDescription(p, language);
    return {
      type: 'product' as const,
      title: model,
      badge,
      label: `${badge} ${model} ${desc}`,
      link: `/product/${p.id}`,
    };
  });

  const allItems = [...categoryItems, ...productItems];

  const filteredItems =
    query.trim() === ''
      ? []
      : allItems.filter((item) =>
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
            <button
              onClick={() => setIsOpen(false)}
              className="text-cool-gray hover:text-primary-blue ml-2"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() !== '' && filteredItems.length === 0 ? (
              <div className="p-6 text-center text-sm font-body text-cool-gray">
                {language === 'ua' ? 'Нічого не знайдено' : 'No results found'}
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
                    {item.badge}
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
