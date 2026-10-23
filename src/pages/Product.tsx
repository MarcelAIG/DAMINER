import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShieldCheck, ZoomIn, ZoomOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRequest } from '../context/RequestContext';
import { formatProductPrice } from '../utils/price';
import { ProductKitAccordion } from '../components/ProductKitAccordion';
import { usePublishedProducts } from '../hooks/usePublishedProducts';
import {
  getCategoryLabel,
  getKitItemCount,
  getKitItemName,
  getProductName,
  getProductPrice,
  getProductDescription,
  getProductShortDescription,
  getSpecName,
  getSpecValue,
} from '../services/publicProductService';

export function Product() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { addItem } = useRequest();
  const { products, loading, error, retry } = usePublishedProducts();

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  // Scroll to top and reset view state on product id change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsDescriptionOpen(false);
    setSelectedImageIdx(0);
    setIsZoomed(false);
  }, [id]);

  const product = products.find((p) => p.id === id);

  const handleZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin(`${x}% ${y}%`);
    }
    setIsZoomed(!isZoomed);
  };

  // Related products from the same category
  const otherProducts = (() => {
    if (!product) return [];
    if (product.categorySlug === 'tools') {
      if (product.id === 'tool-19') {
        return products.filter((item) => ['tool-16', 'tool-15', 'tool-17'].includes(item.id));
      }
      const list = products.filter(
        (item) => item.id !== product.id && item.categorySlug === product.categorySlug
      );
      const tool19 = products.find((item) => item.id === 'tool-19');
      if (tool19) {
        if (product.id === 'tool-16') {
          return [
            tool19,
            ...list.filter((item) => item.id !== 'tool-19' && ['tool-15', 'tool-17'].includes(item.id)),
          ];
        }
        const others = list.filter((item) => item.id !== 'tool-19').slice(0, 2);
        return [tool19, ...others];
      }
      return list.slice(0, 3);
    }
    return products
      .filter((item) => item.id !== product.id && item.categorySlug === product.categorySlug)
      .slice(0, 3);
  })();

  // Loading skeleton
  if (loading && !product) {
    return (
      <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12 animate-pulse">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 lg:pt-6">
          <div className="h-6 w-32 bg-metallic-silver/30 rounded mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
            <div className="aspect-square bg-white border border-metallic-silver/20 rounded-xl" />
            <div className="space-y-6">
              <div className="h-4 w-40 bg-metallic-silver/30 rounded" />
              <div className="h-12 w-3/4 bg-metallic-silver/30 rounded" />
              <div className="h-24 w-full bg-metallic-silver/20 rounded" />
              <div className="h-16 w-full bg-metallic-silver/20 rounded" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error && !product) {
    return (
      <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12 flex items-center justify-center">
        <div className="text-center px-6 max-w-lg">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-dark-navy mb-4">
            {language === 'ua' ? 'Помилка завантаження' : 'Loading Error'}
          </h2>
          <p className="font-body text-charcoal/70 mb-8">
            {language === 'ua'
              ? 'Не вдалося завантажити інформацію про товар.'
              : 'Failed to load product information.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={retry}
              className="px-6 py-3 bg-primary-blue text-white font-heading font-bold text-xs uppercase tracking-widest"
            >
              {language === 'ua' ? 'Спробувати знову' : 'Try Again'}
            </button>
            <Link
              to="/catalog"
              className="px-6 py-3 border border-dark-navy text-dark-navy font-heading font-bold text-xs uppercase tracking-widest hover:bg-dark-navy hover:text-white transition-colors"
            >
              {t.nav.catalog}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Not found or unpublished product
  if (!product) {
    return (
      <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12 flex items-center justify-center">
        <div className="text-center px-6 max-w-lg">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-dark-navy mb-4 uppercase">
            {language === 'ua' ? 'Товар не знайдено' : 'Product Not Found'}
          </h2>
          <p className="font-body text-charcoal/70 mb-8">
            {language === 'ua'
              ? 'Товар недоступний або знятий з публікації.'
              : 'The requested product is unavailable or not published.'}
          </p>
          <Link
            to="/catalog"
            className="inline-flex px-8 py-4 bg-primary-blue text-white font-heading font-black text-xs uppercase tracking-widest hover:bg-dark-navy transition-colors"
          >
            {t.nav.catalog}
          </Link>
        </div>
      </main>
    );
  }

  const model = getProductName(product, language);
  const categoryLabel = getCategoryLabel(product.categorySlug, t, language);
  const descriptionRaw =
    getProductDescription(product, language) || getProductShortDescription(product, language);
  const descriptionParagraphs = descriptionRaw
    ? descriptionRaw.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
    : [];

  const images = product.images.length > 0 ? product.images : (product.primaryImage ? [product.primaryImage] : []);

  const hasCharacteristics =
    (product.specifications && product.specifications.length > 0) ||
    (product.kitContents && product.kitContents.length > 0);

  const backSlug = product.categorySlug || 'probes';

  return (
    <main className="pt-[90px] bg-off-white min-h-screen pb-24 lg:pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-12 lg:pt-6">
        <Link
          to={`/catalog/${backSlug}`}
          className="inline-flex items-center gap-2 text-primary-blue hover:text-dark-navy font-heading font-black text-[13px] uppercase tracking-widest transition-colors duration-300 mb-12 lg:mb-6 relative z-20 py-2 pr-4 w-fit cursor-pointer"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          {t.nav.catalog}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 lg:items-start">
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div
              className={`aspect-[4/5] lg:aspect-square lg:max-h-[65vh] bg-white border border-metallic-silver/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl flex items-center justify-center p-4 lg:p-6 relative overflow-hidden group transition-all duration-300 ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={handleZoom}
            >
              {images && images[selectedImageIdx] ? (
                <img
                  key={`main-img-${selectedImageIdx}`}
                  src={images[selectedImageIdx]}
                  alt={model}
                  className={`w-full h-full object-contain transition-transform duration-500 ease-out ${
                    isZoomed
                      ? 'scale-[1.75]'
                      : product.id === 'tool-2'
                      ? 'scale-[1.35]'
                      : product.id === 'tool-3'
                      ? 'scale-[1.3]'
                      : product.id === 'tool-4'
                      ? 'scale-[1.3]'
                      : product.id === 'tool-5'
                      ? 'scale-[1.3]'
                      : product.id === 'tool-9'
                      ? 'scale-[0.8]'
                      : 'scale-100'
                  }`}
                  style={{ transformOrigin: isZoomed ? zoomOrigin : 'center center' }}
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-cool-gray">
                  Image Placeholder
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-cool-gray/80 group-hover:text-primary-blue shadow-sm border border-metallic-silver/20 transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100">
                {isZoomed ? <ZoomOut size={20} strokeWidth={2} /> : <ZoomIn size={20} strokeWidth={2} />}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {images && images.length > 1 && (
              <div
                className={`grid gap-3 lg:gap-4 ${
                  images.length === 2
                    ? 'grid-cols-2'
                    : images.length === 4
                    ? 'grid-cols-4'
                    : images.length === 5
                    ? 'grid-cols-5'
                    : 'grid-cols-3'
                }`}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIdx(idx);
                      setIsZoomed(false);
                    }}
                    className={`aspect-[4/3] lg:aspect-[3/2] bg-white border rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 p-4 lg:p-6 flex items-center justify-center ${
                      selectedImageIdx === idx
                        ? 'border-primary-blue shadow-md'
                        : 'border-metallic-silver/20 hover:border-primary-blue/50'
                    }`}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={`${model} thumbnail ${idx + 1}`}
                        className={`w-full h-full object-contain pointer-events-none ${
                          product.id === 'tool-2'
                            ? 'scale-[1.35]'
                            : product.id === 'tool-3'
                            ? 'scale-[1.3]'
                            : product.id === 'tool-4'
                            ? 'scale-[1.3]'
                            : product.id === 'tool-5'
                            ? 'scale-[1.3]'
                            : product.id === 'tool-9'
                            ? 'scale-[0.8]'
                            : ''
                        }`}
                        draggable={false}
                      />
                    ) : (
                      <span className="text-xs text-cool-gray">Thumb {idx + 1}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <h4 className="font-heading text-sm text-cool-gray tracking-widest uppercase font-bold mb-4 lg:mb-2">
              {categoryLabel}
            </h4>
            <h1 className="font-heading text-5xl md:text-6xl font-black text-dark-navy mb-8 lg:mb-5 tracking-tight">
              {model}
            </h1>

            <div className="font-body text-charcoal/70 text-lg mb-12 lg:mb-8 leading-relaxed space-y-4">
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{descriptionRaw || model}</p>
              )}
            </div>

            {/* Warranty Info */}
            <div className="bg-white p-6 lg:p-5 mb-12 lg:mb-8 flex items-start gap-4 lg:gap-4 border border-metallic-silver/30 shadow-sm">
              <ShieldCheck size={24} className="text-primary-blue shrink-0 mt-0.5 lg:mt-0" strokeWidth={1.5} />
              <div>
                <h5 className="font-heading font-black text-sm uppercase tracking-widest text-dark-navy mb-2 lg:mb-1.5">
                  {t.featured.warrantyTitle}
                </h5>
                <p className="font-body text-[15px] text-charcoal/80 leading-relaxed lg:leading-normal">
                  {t.featured.warrantyDesc1} <br />
                  {t.featured.warrantyDesc2}
                </p>
              </div>
            </div>

            {/* Price and Action */}
            <div className="pt-8 lg:pt-6 border-t border-metallic-silver/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <div className="font-heading font-black text-base tracking-widest uppercase text-dark-navy">
                {formatProductPrice(getProductPrice(product), language)}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem({ id: product.id, model });
                }}
                className="w-full sm:w-auto py-5 px-12 bg-primary-blue text-white font-heading font-black text-sm tracking-widest uppercase border border-primary-blue hover:bg-white hover:text-primary-blue transition-colors duration-300 inline-flex justify-center"
              >
                {t.request.add}
              </button>
            </div>

            {/* Specifications and Kit Contents Accordion */}
            {hasCharacteristics && (
              <div className="bg-white border border-metallic-silver/30 shadow-sm overflow-hidden transition-all duration-300">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="w-full flex items-center justify-between p-5 lg:p-6 bg-transparent hover:bg-off-white/50 transition-colors duration-300 group"
                >
                  <span className="font-heading font-black text-sm tracking-widest uppercase text-dark-navy group-hover:text-primary-blue transition-colors duration-300">
                    {language === 'ua' ? 'Характеристики' : 'Specifications'}
                  </span>
                  <motion.div
                    animate={{ rotate: isDescriptionOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary-blue opacity-70 group-hover:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isDescriptionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 lg:px-6 pb-6 pt-2">
                        <div className="pt-5 border-t border-metallic-silver/20 space-y-5">
                          <div className="bg-off-white/50 border border-metallic-silver/20 p-4 lg:p-5 rounded-sm space-y-6">
                            {/* Technical specifications */}
                            {product.specifications && product.specifications.length > 0 && (
                              <div>
                                <h5 className="font-heading font-black text-[11px] tracking-widest uppercase text-dark-navy mb-4">
                                  {language === 'ua' ? 'ТЕХНІЧНІ ХАРАКТЕРИСТИКИ:' : 'TECHNICAL CHARACTERISTICS:'}
                                </h5>
                                <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                  {product.specifications.map((spec, sIdx) => {
                                    const sName = getSpecName(spec, language);
                                    const sVal = getSpecValue(spec, language);
                                    if (!sName && !sVal) return null;
                                    return (
                                      <li
                                        key={sIdx}
                                        className="flex justify-between border-b border-metallic-silver/20 pb-1.5 gap-4"
                                      >
                                        <span>{sName}</span>
                                        <span className="font-bold text-dark-navy text-right shrink-0">{sVal}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}

                            {/* Kit contents */}
                            {product.kitContents && product.kitContents.length > 0 && (
                              <ProductKitAccordion count={product.kitContents.length}>
                                <ul className="space-y-2.5 font-body text-[14px] text-charcoal/70">
                                  {product.kitContents.map((kit, kIdx) => {
                                    const kName = getKitItemName(kit, language);
                                    const kCount = getKitItemCount(kit, language);
                                    return (
                                      <li
                                        key={kIdx}
                                        className="flex justify-between border-b border-metallic-silver/20 pb-1.5 gap-4"
                                      >
                                        <span>{kName}</span>
                                        <span className="font-bold text-dark-navy text-right shrink-0">{kCount}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </ProductKitAccordion>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Other Products Section */}
        {otherProducts.length > 0 && (
          <div className="mt-20 lg:mt-24 pt-12 lg:pt-16 border-t border-metallic-silver/30">
            <h2 className="font-heading text-2xl lg:text-3xl font-black text-dark-navy mb-8 lg:mb-10 text-center lg:text-left">
              {t.featured.otherProducts || 'Other Products'}
            </h2>
            <div className="flex overflow-x-auto gap-6 pb-6 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {otherProducts.map((p) => {
                const pModel = getProductName(p, language);
                const pCatLabel = getCategoryLabel(p.categorySlug, t, language);
                return (
                  <Link
                    to={`/product/${p.id}`}
                    key={p.id}
                    className="w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333333%-1rem)] snap-start shrink-0 flex flex-col group cursor-pointer bg-white p-5 lg:p-6 border border-metallic-silver/20 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary-blue/30 rounded-xl transition-all duration-300"
                  >
                    <div className="aspect-square bg-white mb-5 flex items-center justify-center relative overflow-hidden p-4 lg:p-6 border border-metallic-silver/10 rounded-lg group-hover:border-primary-blue/20 transition-colors duration-300">
                      {p.primaryImage ? (
                        <img
                          src={p.primaryImage}
                          alt={pModel}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 relative z-0"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50" />
                      )}
                    </div>
                    <h4 className="font-heading text-[11px] text-cool-gray tracking-widest uppercase font-bold mb-1 lg:mb-0.5">
                      {pCatLabel}
                    </h4>
                    <h3 className="font-heading text-lg lg:text-base font-black text-dark-navy group-hover:text-primary-blue transition-colors duration-300">
                      {pModel}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
