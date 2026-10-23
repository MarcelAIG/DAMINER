import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';
import { formatCardPrice } from '../utils/price';
import { usePublishedProducts } from '../hooks/usePublishedProducts';
import {
  getCategoryLabel,
  getProductName,
  getProductPrice,
  getProductShortDescription,
} from '../services/publicProductService';

const DEFAULT_TITLE_CLASS =
  'font-heading font-black text-3xl lg:text-4xl text-dark-navy tracking-tight transition-colors duration-300';

export interface ProductCategoryGridProps {
  /** Firestore categorySlug to display (probes | mirrors | kits | nets | tools). */
  categorySlug: string;
  /** Extra scale classes for the card image (per product id). */
  imageScaleClass?: (id: string) => string;
  /** Full className for the card title (per product id). */
  titleClassName?: (id: string) => string;
  /** Adds invisible cells so the last row keeps the 3-column borders. */
  fillEmptyColumns?: boolean;
}

/**
 * Product card grid for a single catalog category, backed by Firestore.
 * Markup and classes are identical to the previous static category grids.
 */
export function ProductCategoryGrid({
  categorySlug,
  imageScaleClass = () => 'group-hover:scale-105',
  titleClassName = () => DEFAULT_TITLE_CLASS,
  fillEmptyColumns = false,
}: ProductCategoryGridProps) {
  const { t, language } = useLanguage();
  const { addItem } = useRequest();
  const { products, loading, error, retry } = usePublishedProducts();

  const items = products.filter((p) => p.categorySlug === categorySlug);
  const categoryLabel = getCategoryLabel(categorySlug, t, language);
  const fillerCount = fillEmptyColumns ? (3 - (items.length % 3)) % 3 : 0;

  const renderMessage = (content: React.ReactNode) => (
    <div className="py-20 md:py-24 text-center border-y border-metallic-silver/30">{content}</div>
  );

  let body: React.ReactNode;

  if (loading && items.length === 0) {
    body = (
      <div
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-metallic-silver/30 border-y border-metallic-silver/30"
        aria-busy="true"
        aria-label={language === 'ua' ? 'Завантаження товарів' : 'Loading products'}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex-col w-full p-8 lg:p-12 animate-pulse ${i > 0 ? 'hidden md:flex' : 'flex'}`}>
            <div className="aspect-square bg-off-white border border-metallic-silver/20 rounded-xl mb-10" />
            <div className="h-3 w-24 bg-metallic-silver/30 rounded mb-4" />
            <div className="h-8 w-40 bg-metallic-silver/30 rounded mb-6" />
            <div className="h-4 w-full bg-metallic-silver/20 rounded mb-2" />
            <div className="h-4 w-3/4 bg-metallic-silver/20 rounded" />
          </div>
        ))}
      </div>
    );
  } else if (error && items.length === 0) {
    body = renderMessage(
      <>
        <p className="font-body text-lg text-charcoal/70 mb-6">
          {language === 'ua'
            ? 'Не вдалося завантажити товари. Перевірте з’єднання та спробуйте ще раз.'
            : 'Could not load products. Please check your connection and try again.'}
        </p>
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center justify-center bg-primary-blue text-white border border-primary-blue hover:bg-white hover:text-primary-blue font-heading font-bold text-[11px] tracking-widest uppercase px-8 py-4 transition-colors duration-300"
        >
          {language === 'ua' ? 'Спробувати ще раз' : 'Try again'}
        </button>
      </>
    );
  } else if (items.length === 0) {
    body = renderMessage(
      <p className="font-body text-lg text-charcoal/70">
        {language === 'ua'
          ? 'Наразі в цій категорії немає товарів. Зв’яжіться з нами для індивідуального замовлення.'
          : 'There are currently no products in this category. Contact us for a custom order.'}
      </p>
    );
  } else {
    body = (
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-metallic-silver/30 border-y border-metallic-silver/30">
        {items.map((product) => {
          const model = getProductName(product, language);
          return (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="flex flex-col group w-full p-8 lg:p-12 transition-colors duration-500"
            >
              <div className="aspect-square bg-white border border-metallic-silver/20 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:border-primary-blue/30 mb-10 flex items-center justify-center relative overflow-hidden p-4 lg:p-6 transition-all duration-500">
                {product.primaryImage ? (
                  <img
                    src={product.primaryImage}
                    alt={model}
                    loading="lazy"
                    className={`w-full h-full object-contain transition-transform duration-700 ease-out ${imageScaleClass(product.id)}`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-5" style={{
                      backgroundImage: 'radial-gradient(#1e63d8 1px, transparent 1px)',
                      backgroundSize: '24px 24px'
                    }}></div>
                    <span className="font-heading font-bold text-cool-gray/50 uppercase tracking-widest text-xs relative z-10 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                      Image Placeholder
                    </span>
                  </div>
                )}
              </div>

              <h4 className="font-heading text-[11px] text-cool-gray tracking-[0.2em] uppercase font-bold mb-3 transition-colors duration-300">
                {categoryLabel}
              </h4>

              <div className="flex items-start justify-between mb-4">
                <h3 className={titleClassName(product.id)}>
                  {model}
                </h3>
                <div className="text-right">
                  <span className="block font-body text-[10px] text-cool-gray uppercase tracking-widest mb-0.5">{language === 'ua' ? 'Ціна' : 'Price'}</span>
                  <span className="block font-heading text-[12px] font-bold text-dark-navy tracking-wide uppercase whitespace-nowrap">{formatCardPrice(getProductPrice(product), language)}</span>
                </div>
              </div>

              <p className="font-body text-charcoal/70 mb-10 flex-1 leading-relaxed text-[15px]">
                {getProductShortDescription(product, language)}
              </p>

              <div className="mt-auto pt-6 border-t border-metallic-silver/30">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem({ id: product.id, model });
                  }}
                  className="w-full inline-flex items-center justify-center bg-primary-blue text-white border border-primary-blue hover:bg-white hover:text-primary-blue font-heading font-bold text-[11px] tracking-widest uppercase px-6 py-4 transition-colors duration-300"
                >
                  {t.request.add}
                </button>
              </div>
            </Link>
          );
        })}
        {/* Empty columns to maintain exact grid styling and borders */}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} className="hidden md:block w-full p-8 lg:p-12 pointer-events-none"></div>
        ))}
      </div>
    );
  }

  return (
    <section className="pt-0 md:pt-4 pb-12 md:pb-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {body}
      </div>
    </section>
  );
}
